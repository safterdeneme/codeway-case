const { db } = require("../utils/Firebase");

const getAppConfig = async () => {
  const configs = [];
  const configRef = db.collection('configs');
  const snapshot = await configRef.get();
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.created_at) {
      data.created_at = data.created_at.toDate().toLocaleString();
    }
    configs.push({ id: doc.id, ...data });
  });
  return configs;
};

const addAppConfig = async (newParameter) => {
  const configWithCreatedAt = {...newParameter, created_at: new Date()}
  await db.collection('configs').add(configWithCreatedAt);
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

  if(isChangedExternally){
    throw new Error('Config updated from someone else. Refresh to obtain latest version') 
  }

  await configRef.update(updatedParameter);
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
