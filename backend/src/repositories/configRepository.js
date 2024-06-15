const { db, getFirebaseServerTimestamp } = require('../utils/Firebase');
const Config = require('../models/configModel');
const { compareTimestamps } = require('../utils/helpers');

class ConfigRepository {
  static async getAll() {
    const configRef = db.collection('configs');
    const snapshot = await configRef.get();
    return snapshot.docs.map(doc => Config.fromFirestore(doc));
  }

  static async getById(id) {
    const configRef = db.collection('configs').doc(id);
    const doc = await configRef.get();
    if (!doc.exists) {
      throw new Error('No such document!');
    }
    return Config.fromFirestore(doc);
  }

  static async save(config) {
    if (config.id) {
      await db.collection('configs').doc(config.id).set(config.toFirestoreObject());
    } else {
      const docRef = await db.collection('configs').add(config.toFirestoreObject());
      config.id = docRef.id;
    }
    return config;
  }

  static async update(id, updatedConfig) {
    const configRef = db.collection('configs').doc(id);
    return await db.runTransaction(async (transaction) => {
      const docSnapshot = await transaction.get(configRef);

      if (!docSnapshot.exists) {
        throw new Error('No such document!');
      }
      const currentUpdatedAt = docSnapshot.get('updated_at');
  
      if (currentUpdatedAt && !compareTimestamps(currentUpdatedAt, updatedConfig?.updated_at)){
        throw new Error('Config updated by someone else. Refresh to see the latest version.');
      }

      updatedConfig.updated_at = getFirebaseServerTimestamp();
      transaction.update(configRef, updatedConfig.toFirestoreObject());
      return Config.fromFirestore(docSnapshot);
    });
  }

  static async delete(id) {
    const configRef = db.collection('configs').doc(id);
    await configRef.delete();
  }
}

module.exports = ConfigRepository;
