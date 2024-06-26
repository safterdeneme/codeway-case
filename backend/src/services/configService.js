const { getRedisClient, clearCache } = require('../utils/redis');
const ConfigRepository = require('../repositories/configRepository');
const Config = require('../models/configModel');
const { SERVE_CONFIG_CONSTANT_CONFIGS } = require('../constants');

class ConfigService {
  static async getAppConfig(countryCode = null) {
    const redisClient = await getRedisClient();
    let cacheKey = 'configs';
    if (countryCode) {
      cacheKey += `_${countryCode}`;
    }

    try {
      const configs = await redisClient.get(cacheKey);
      if (configs) {
        return JSON.parse(configs);
      }

      const dbConfigs = await ConfigRepository.getAll();
      const countrySpecificConfigs = dbConfigs.map(config => {
        if (countryCode && config?.country_specific?.[countryCode]) {
          return { ...config, value: config.country_specific[countryCode] };
        }
        return config;
      });

      await redisClient.setex(cacheKey, 600, JSON.stringify(countrySpecificConfigs));
      return countrySpecificConfigs;
    } catch (err) {
      console.error('Error', err);
      throw err;
    }
  }

  static async addAppConfig(newConfigData) {
    const redisClient = await getRedisClient();
    const newConfig = new Config(newConfigData);
    newConfig.validate();
    await ConfigRepository.save(newConfig);
    await clearCache({keyName: 'configs', isRegex: true, redisClient})
    return await ConfigService.getAppConfig();
  }

  static async updateAppConfig(id, updatedConfigData) {
    const redisClient = await getRedisClient();

    const updatedConfig = new Config(updatedConfigData);
    try {
      const updatedDoc = await ConfigRepository.update(id, updatedConfig);
      await clearCache({keyName: 'configs', isRegex: true, redisClient})
      return await ConfigService.getAppConfig();
    } catch (error) {
      if (error.message === 'No such document!') {
        throw new Error('Config does not exist.');
      } else if (error.message === 'Config updated by someone else. Refresh to see the latest version.') {
        throw new Error(error.message);
      } else {
        throw new Error('Error updating config. Please try again.');
      }
    }
  }

  static async deleteAppConfig(id) {
    const redisClient = await getRedisClient();
    await ConfigRepository.delete(id);
    await clearCache({keyName: 'configs', isRegex: true, redisClient})
    return await ConfigService.getAppConfig();
  }

  static async serveAppConfig(countryCode) {
    const configs = await ConfigService.getAppConfig(countryCode);

    const configMap = configs.reduce((acc, config) => {
      acc[config.key] = config.value;
      return acc;
    }, {});

    Object.keys(SERVE_CONFIG_CONSTANT_CONFIGS).forEach(key => {
      configMap[key] = SERVE_CONFIG_CONSTANT_CONFIGS[key];
    });

    return configMap;
  }
}

module.exports = ConfigService;
