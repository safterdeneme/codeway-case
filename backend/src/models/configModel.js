const { getFirebaseServerTimestamp } = require('../utils/Firebase')
class Config {
    constructor(data) {
      this.id = data.id || null;
      this.key = data.key;
      this.value = data.value;
      this.description = data.description;
      this.country_specific = data.country_specific;
      this.created_at = data.created_at || getFirebaseServerTimestamp();
      this.updated_at = data.updated_at || getFirebaseServerTimestamp();
    }
    validate() {
      if (!this.key || typeof this.key !== 'string') {
        throw new Error('Invalid key');
      }
      if (!this.value) {
        throw new Error('Invalid value');
      }
    }
  
    toFirestoreObject() {
      return {
        key: this.key,
        value: this.value,
        description: this.description,
        country_specific: this.country_specific,
        created_at: this.created_at,
        updated_at: this.updated_at
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Config({ id: doc.id, ...data });
    }
  }

  module.exports = Config;
