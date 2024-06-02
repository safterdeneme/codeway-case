<template>
  <div class="parameter-row">
    <span>{{ parameter.key }}</span>
    <span>{{ parameter.value }}</span>
    <span>{{ parameter.description }}</span>
    <span>{{ parameter.created_at }}</span>
    <button class='edit-button' @click="updateParameter">Edit</button>
    <button class='delete-button' @click="deleteParameter">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'ParameterRow',
  props: {
    parameter: Object
  },
  methods: {
    updateParameter() {
      this.$emit('update-parameter', this.parameter.key);
    },
    deleteParameter() {
      this.$emit('delete-parameter', this.parameter.id);
    }
  }
};
</script>

<style scoped>
.parameter-row {
  display: grid;
  grid-template-columns: 2fr 2fr 4fr 2fr 1fr 1fr; 
  text-align: left;
  gap: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

button:hover {
  opacity: 0.8;
}
.edit-button {
  background-color: #3a7cff;
}
.delete-button {
  background-color: #e74c3c;

}



</style>
