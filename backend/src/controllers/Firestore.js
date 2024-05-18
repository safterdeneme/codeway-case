const { getAppConfig, updateAppConfig } = require('../services/Firestore');


const getConfig = async () => {
  try {
    const config = await getAppConfig();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateConfig = async (req, res) => {
  try {
    await updateAppConfig(req.body);
    res.status(200).json({ message: 'Config updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getConfig,
  updateConfig
};