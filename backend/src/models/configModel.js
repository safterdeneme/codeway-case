class Config {
    constructor(data) {
      this.id = data.id || null;
      this.key = data.key;
      this.value = data.value;
      this.description = data.description;
      this.created_at = data.created_at || new Date().toLocaleString();
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
        created_at: this.created_at,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Config({ id: doc.id, ...data });
    }
  }
  
  module.exports = Config;
  