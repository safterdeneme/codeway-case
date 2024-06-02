<template>
    <div class="edit-parameter-container" v-if="isVisible">
      <input type="text" v-model="editedParameter.key" placeholder="Parameter Key" />
      <input type="text" v-model="editedParameter.value" placeholder="Value" />
      <input type="text" v-model="editedParameter.description" placeholder="Description" />
      <button @click="saveParameter">Save</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditParameter',
    props: {
      parameter: Object,
      isVisible: Boolean
    },
    data() {
      return {
        editedParameter: { ...this.parameter }
      };
    },
    watch: {
      parameter(newParam) {
        this.editedParameter = { ...newParam };
      }
    },
    methods: {
      saveParameter() {
        if (this.editedParameter.key && this.editedParameter.value && this.editedParameter.description) {
          this.$emit('save-parameter', { ...this.editedParameter });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-parameter-container {
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
  