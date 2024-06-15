const ConfigRepository = require('../repositories/configRepository');
const Config = require('../models/configModel');
const { SERVE_CONFIG_CONSTANT_CONFIGS } = require('../constants');

class ConfigService {
  static async getAppConfig() {
    return await ConfigRepository.getAll();
  }

  static async addAppConfig(newConfigData) {
    const newConfig = new Config(newConfigData);
    newConfig.validate();
    await ConfigRepository.save(newConfig);
    return await ConfigService.getAppConfig();
  }

  static async updateAppConfig(id, initialConfig, updatedConfig) {
    const config = await ConfigRepository.getById(id);
    if (ConfigService.isDocChanged(config, initialConfig)) {
      throw new Error('Config updated from someone else. Refresh to see the latest version');
    }
    await ConfigRepository.update(id, updatedConfig);
    return await ConfigService.getAppConfig();
  }

  static async deleteAppConfig(id) {
    await ConfigRepository.delete(id);
    return await ConfigService.getAppConfig();
  }

  static async serveAppConfig() {
    const configsArray = await ConfigRepository.getAll();
    const configs = configsArray.reduce((acc, config) => {
      acc[config.key] = config.value;
      return acc;
    }, {});

    Object.keys(SERVE_CONFIG_CONSTANT_CONFIGS).forEach(key => {
      configs[key] = SERVE_CONFIG_CONSTANT_CONFIGS[key];
    });

    return configs;
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
