
const { getAppConfig, updateAppConfig, deleteAppConfig, addAppConfig } = require('../services/Firebase');


const getConfig = async (req, res) => {
  try {
    const config = await getAppConfig();
    res.status(200).json({ message: 'Configs retrieved successfully', config });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateConfig = async (req, res) => {
  try {
    const id = req.params.id
    const {updatedParameter, initialParameter} = req.body
    const config = await updateAppConfig(id, initialParameter, updatedParameter);
    res.status(200).json({ message: 'Config updated successfully', config });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteConfig = async (req, res) => {
  try {
    const id = req.params.id
    const config = await deleteAppConfig(id);    
    res.status(200).json({ message: 'Config deleted successfully', config  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addConfig = async (req, res) => {
  try {
    const configData = req.body
    const config = await addAppConfig(configData);
    res.status(200).json({ message: 'Config added successfully', config });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getConfig,
  updateConfig,
  deleteConfig,
  addConfig

};