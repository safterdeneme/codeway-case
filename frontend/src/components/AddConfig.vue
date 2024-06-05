<template>
  <div class="add-config-container">
    <input type="text" v-model="newConfig.key" placeholder="New Config" />
    <input type="text" v-model="newConfig.value" placeholder="Value" />
    <input type="text" v-model="newConfig.description" placeholder="New Description" />
    <div class= 'button-container'>
    <button @click="addConfig">ADD</button>
  </div>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'AddConfig',
  data() {
    return {
      newConfig: {
        key: '',
        value: '',
        description: '',
      }
    };
  },
  methods: {
    addConfig() {
      if (this.newConfig.key && this.newConfig.value && this.newConfig.description) {
        this.$emit('add-config', { ...this.newConfig });
        this.newConfig.key = '';
        this.newConfig.value = '';
        this.newConfig.description = '';
      }
    }
  }
};
</script>

<style scoped>
.add-config-container {
  display: grid;
  gap: 10px;
  grid-template-columns: minmax(0, 2fr) minmax(0, 2fr) minmax(0, 6fr) minmax(0, 1fr) minmax(0, 1fr); 
  width: 100%;
  padding: 10px;
  border-radius: 5px;
}

input {
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
@media (max-width: 1024px) {
  .add-config-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #4b4b4b;
    border-radius: 20px;
    width: 80%;
    padding: 20px;

    .button-container {
      width: 100%;
      display: flex;
      justify-content: center
    }
    button {
      width: 100%;
    }
  }
    
}
</style>
