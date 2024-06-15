const { db } = require("../utils/Firebase");

const SERVE_CONFIG_CONSTANT_CONFIGS = {
  support_email: 'support@codeway.co',
  privacy_page: "https://codeway.com/privacy_en.html"
  
}

const getAppConfig = async () => {
  const configs = [];
  const configRef = db.collection('configs');
  const snapshot = await configRef.get();
  snapshot.forEach(doc => {
    const data = doc.data();
    configs.push({ id: doc.id, ...data });
  });
  return configs;
};

const addAppConfig = async (newConfig) => {
  const configWithCreatedAt = { ...newConfig, created_at: new Date().toLocaleString() };
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

const updateAppConfig = async (id, initialConfig, updatedConfig) => {
  const configRef = db.collection('configs').doc(id); 
  const docSnapshot = await configRef.get();
  const currentData = docSnapshot.data();
  const isChangedExternally = isDocChanged(currentData, initialConfig)

  if(isChangedExternally){
    throw new Error('Config updated from someone else. Refresh to see the latest version') 
  }

  await configRef.update(updatedConfig);
  return await getAppConfig()
};

const deleteAppConfig = async (id) => {
  const configRef = db.collection('configs').doc(id);
  await configRef.delete()
  return await getAppConfig()
};



const serveAppConfig = async () => {
  const configs = {};
  const configRef = db.collection('configs');
  const snapshot = await configRef.get();
  snapshot.forEach(doc => {
    const data = doc.data();
    configs[data.key] = data.value
  });
  
  Object.keys(SERVE_CONFIG_CONSTANT_CONFIGS).forEach(key => {
    configs[key] =  SERVE_CONFIG_CONSTANT_CONFIGS[key]
  });

  return configs;
};



module.exports = {
  getAppConfig,
  updateAppConfig,
  deleteAppConfig,
  addAppConfig,
  serveAppConfig
};
