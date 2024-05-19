const { db } = require('../utils/Firebase');

const getAppConfig = async () => {
  const configRef = db.collection('config').doc('appConfig');
  const doc = await configRef.get();
  if (!doc.exists) {
    throw new Error('No such document!');
  } else {
    return doc.data();
  }
};

const updateAppConfig = async (newConfig) => {
  const configRef = db.collection('config').doc('appConfig');
  await configRef.set(newConfig, { merge: true });
};

module.exports = {
  getAppConfig,
  updateAppConfig,
};
