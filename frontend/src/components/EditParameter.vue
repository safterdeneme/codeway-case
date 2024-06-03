<template>
  <div class="edit-parameter-overlay" v-if="isVisible">
    <div class="edit-parameter-container">
      <div class="close-button" @click="$emit('close-popup')">
        <i class="fas fa-times-circle"></i>
      </div>
      <input type="text" v-model="editedParameter.key" placeholder="Parameter Key" />
      <input type="text" v-model="editedParameter.value" placeholder="Value" />
      <input type="text" v-model="editedParameter.description" placeholder="Description" />
      <div class="button-container">
        <button @click="saveParameter">SAVE</button>
      </div>
    </div>
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
.edit-parameter-overlay {
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

.edit-parameter-container {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
  width: 90%;
  max-width: 400px;
  padding: 45px 20px 20px 20px;
  background-color: #333;
  border-radius: 10px;
  position: relative;
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

.button-container {
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

</style>
