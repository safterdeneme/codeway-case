const { db } = require("../utils/Firebase");

const getAppConfig = async () => {
  const configs = [];
  const configRef = db.collection('configs');
  const snapshot = await configRef.get();
  snapshot.forEach(doc => {
    configs.push({ id: doc.id, ...doc.data() });
  });
  return configs;
};

const addAppConfig = async (newParameter) => {
  await db.collection('configs').add(newParameter);
  return await getAppConfig()
};


const updateAppConfig = async (id, configData) => {
  const configRef = db.collection('configs').doc(id); 
  await configRef.update(configData);
  return await getAppConfig()
  
};

const deleteAppConfig = async (id) => {
  const configRef = db.collection('configs').doc(id);
  await configRef.delete()
  return await getAppConfig()
};


module.exports = {
  getAppConfig,
  updateAppConfig,
  deleteAppConfig,
  addAppConfig
};
