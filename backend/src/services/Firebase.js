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


const isDocChanged = (doc, initialDoc) => {
  for (const key in initialDoc) {
    if (initialDoc[key] !== doc[key]) {
      return true;
    }
  }
  return false;
};

const updateAppConfig = async (id, initialParameter, updatedParameter) => {
  const configRef = db.collection('configs').doc(id); 
  const docSnapshot = await configRef.get();
  const currentData = docSnapshot.data();
  const isChangedExternally = isDocChanged(currentData, initialParameter)

  if(!isChangedExternally){
    await configRef.update(updatedParameter);
  }
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
