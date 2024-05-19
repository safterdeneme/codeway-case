<template>
  <div class="config-table">
    <div class="header">
      <span v-for="(column, index) in columns" :key="index">{{ column }}</span>
      <span></span>
      <span></span>
    </div>
    <div class="parameter-list">
      <ParameterRow v-for="(parameter, index) in parameters" :key="index" :parameter="parameter" :columns="columns"/>
    </div>
    <AddParameter @add-parameter="addParameter" :columns="columns"/>
  </div>
</template>

<script>
import ParameterRow from './ParameterRow.vue';
import AddParameter from './AddParameter.vue';

export default {
  name: 'ConfigTable',
  components: {
    ParameterRow,
    AddParameter
  },
  props: {
    parameters: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      default: () => ['Parameter Key', 'Value', 'Description', 'Create Date']
    }
  },
  methods: {
    addParameter(newParameter) {
      this.$emit('add-parameter', newParameter);
    }
  }
};
</script>

<style scoped>
.config-table {
  display: grid;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
}

.header {
  text-align: left;
  display: grid;
  gap: 10px;
  grid-template-columns: 2fr 2fr 4fr 2fr 1fr 1fr;
  width: 100%;
    padding: 10px;

  margin-bottom: 10px;
  color: #8a93af;
}

.parameter-list {
  width: 100%;
}
</style>
