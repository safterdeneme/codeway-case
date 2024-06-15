const { db } = require('../utils/Firebase');
const Config = require('../models/configModel');

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

  static async update(id, updatedData) {
    const configRef = db.collection('configs').doc(id);
    await configRef.update(updatedData);
  }

  static async delete(id) {
    const configRef = db.collection('configs').doc(id);
    await configRef.delete();
  }
}

module.exports = ConfigRepository;
