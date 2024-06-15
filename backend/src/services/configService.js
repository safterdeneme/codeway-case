const getRedisClient = require('../utils/redis');
const ConfigRepository = require('../repositories/configRepository');
const Config = require('../models/configModel');
const { SERVE_CONFIG_CONSTANT_CONFIGS } = require('../constants');

class ConfigService {
  static async getAppConfig() {
    const redisClient = await getRedisClient();

    try {
      const configs = await redisClient.get('configs');
      if (configs) {
        return JSON.parse(configs);
      }

      const dbConfigs = await ConfigRepository.getAll();
      await redisClient.setex('configs', 600, JSON.stringify(dbConfigs));
      return dbConfigs;
    } catch (err) {
      console.error('Error getting configs from Redis:', err);
      throw err;
    }
  }

  static async addAppConfig(newConfigData) {
    const redisClient = await getRedisClient();
    const newConfig = new Config(newConfigData);
    newConfig.validate();
    await ConfigRepository.save(newConfig);
    await redisClient.del('configs');
    return await ConfigService.getAppConfig();
  }

  static async updateAppConfig(id, initialConfig, updatedConfig) {
    const redisClient = await getRedisClient();
    const config = await ConfigRepository.getById(id);
    if (ConfigService.isDocChanged(config, initialConfig)) {
      throw new Error('Config updated from someone else. Refresh to see the latest version');
    }
    await ConfigRepository.update(id, updatedConfig);
    await redisClient.del('configs');
    return await ConfigService.getAppConfig();
  }

  static async deleteAppConfig(id) {
    const redisClient = await getRedisClient();
    await ConfigRepository.delete(id);
    await redisClient.del('configs');
    return await ConfigService.getAppConfig();
  }

  static async serveAppConfig() {
    const configs = await ConfigService.getAppConfig();

    const configMap = configs.reduce((acc, config) => {
      acc[config.key] = config.value;
      return acc;
    }, {});

    Object.keys(SERVE_CONFIG_CONSTANT_CONFIGS).forEach(key => {
      configMap[key] = SERVE_CONFIG_CONSTANT_CONFIGS[key];
    });

    return configMap;
  }

  static isDocChanged(doc, initialDoc) {
    for (const key in initialDoc) {
      if (initialDoc[key] !== doc[key]) {
        return true;
      }
    }
    return false;
  }
}

module.exports = ConfigService;