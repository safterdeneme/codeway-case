<template>
  <div class="edit-config-overlay" v-if="isVisible">
    <div class="edit-config-container">
      <div class="close-button" @click="$emit('close-popup')">
        <i class="fas fa-times-circle"></i>
      </div>
      <div class="text-label">Parameter Key </div>
      <input class="parameter-key-input" disabled type="text" v-model="editedConfig.key" placeholder="Parameter Key" />
      <div class="text-label">Value </div>
      <input type="text" v-model="editedConfig.value" placeholder="Value" />
      <div class="text-label">Description</div>
      <input type="text" v-model="editedConfig.description" placeholder="Description" />
      
      <div class="text-label">Country-Specific Configurations</div>
      <div v-for="(value, country) in editedConfig.country_specific" :key="country" class="country-config-row">
        <select v-model="country" disabled>
          <option :value="country">{{ country }}</option>
        </select>
        <input type="text" v-model="editedConfig.country_specific[country]" placeholder="Value" />
        <button class="minus-button" @click="removeCountryConfig(country)">-</button>
      </div>
      <div class="country-config-row">
        <select v-model="newCountryConfig.country">
          <option value="" disabled selected>Select Country</option>
          <option v-for="country in availableCountries" :key="country" :value="country">{{ country }}</option>
        </select>
        <input type="text" v-model="newCountryConfig.value" placeholder="Value" />
        <button class="plus-button" @click="addCountryConfig">+</button>
      </div>

      <div class="button-container">
        <button @click="saveConfig">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditConfig',
  props: {
    config: Object,
    isVisible: Boolean
  },
  data() {
    return {
      editedConfig: { 
        ...this.config,
        country_specific: this.config.country_specific || {}
      },
      newCountryConfig: { country: '', value: '' },
      allCountries: ['TR', 'US', 'DE', 'FR']
    };
  },
  computed: {
    availableCountries() {
      return this.allCountries.filter(country => !this.editedConfig.country_specific.hasOwnProperty(country));
    }
  },
  watch: {
    config(newParam) {
      this.editedConfig = { 
        ...newParam,
        country_specific: newParam.country_specific || {}
      };
    }
  },
  methods: {
    saveConfig() {
      if (this.editedConfig.key && this.editedConfig.value && this.editedConfig.description) {
        this.$emit('save-config', { ...this.editedConfig });
      }
    },
    addCountryConfig() {
      if (this.newCountryConfig.country && this.newCountryConfig.value) {
        this.$set(this.editedConfig.country_specific, this.newCountryConfig.country, this.newCountryConfig.value);
        this.newCountryConfig = { country: '', value: '' };
      }
    },
    removeCountryConfig(country) {
      this.$delete(this.editedConfig.country_specific, country);
    }
  }
};
</script>

<style scoped>
.edit-config-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.edit-config-container {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
  width: 90%;
  max-width: 400px;
  padding: 45px 20px 20px 20px;
  background-color: #333;
  border-radius: 10px;
  position: relative;
  margin: 0rem 2rem 0rem 2rem;
}

input, select {
  flex: 1;
  padding: 10px;
  border: 1px solid #4b4b4b;
  border-radius: 5px;
  background-color: transparent;
  color: white;
}

input::placeholder {
  color: #8a93af;
}

.parameter-key-input {
  opacity: 50%;
}

select {
  color: white;
}

.text-label {
  display: flex;
  justify-content: flex-start;
  font-size: 10px;
  font-weight: 700;
  color: #00d1b2;
  margin-bottom: -7px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #00d1b2;
  color: white;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.button-container {
  max-height: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

button {
  width: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
}

.country-config-row {
  display: flex;
  align-items: center;
  gap: 10px;

.plus-button, .minus-button{
  display: flex;
  width: 1rem;
  justify-content: center
  }
.minus-button {
  background-color: red;
}
.plus-button {
  background-color: greenyellow;
}
}
</style>
