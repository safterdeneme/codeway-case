<template>
  <div class="add-parameter-container">
    <input type="text" v-model="newParameter.key" placeholder="New Parameter" />
    <input type="text" v-model="newParameter.value" placeholder="Value" />
    <input type="text" v-model="newParameter.description" placeholder="New Description" />
    <button @click="addParameter">ADD</button>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'AddParameter',
  data() {
    return {
      newParameter: {
        key: '',
        value: '',
        description: '',
      }
    };
  },
  methods: {
    addParameter() {
      if (this.newParameter.key && this.newParameter.value && this.newParameter.description) {
        this.$emit('add-parameter', { ...this.newParameter });
        this.newParameter.key = '';
        this.newParameter.value = '';
        this.newParameter.description = '';
      }
    }
  }
};
</script>

<style scoped>
.add-parameter-container {
  display: grid;
  gap: 10px;
  grid-template-columns: 2fr 2fr 6fr 1fr 1fr; 
  width: 100%;
  height: 30px;
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
</style>
