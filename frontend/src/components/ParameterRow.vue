<template>
  <div class="parameter-row">
    <span><span class="label">Parameter Key: </span>{{ parameter.key }}</span>
    <span><span class="label">Value: </span>{{ parameter.value }}</span>
    <span><span class="label">Description: </span>{{ parameter.description }}</span>
    <span><span class="label">Create Date: </span>{{ parameter.created_at }}</span>
    <div class='button-container'>
    <button class='edit-button' @click="editParameter">EDIT</button>
    <button class='delete-button' @click="deleteParameter">DELETE</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParameterRow',
  props: {
    parameter: Object
  },
  methods: {
    editParameter() {
      this.$emit('edit-parameter', this.parameter);
    },
    deleteParameter() {
      this.$emit('delete-parameter', this.parameter.id);
    }
  }
};
</script>

<style scoped>

span {
      padding: 5px;
    }

.parameter-row {
  display: grid;
  grid-template-columns: 2fr 2fr 4fr 2fr 1fr 1fr; 
  text-align: left;
  gap: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  white-space: nowrap;
}

.label {
  display: none;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
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

@media (max-width: 768px) {
  .parameter-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid #4b4b4b;
    border-radius: 30px;
    padding: 20px;
    width: 90%;

    .label {
    display: inline;
    font-weight: bold;
    }


    button {
      padding: 10px;
      width: 50%;
    }
  }

    
}
</style>
