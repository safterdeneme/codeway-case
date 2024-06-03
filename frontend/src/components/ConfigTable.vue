<template>
  <div class="config-table">
    <div class="header">
      <span v-for="(column, index) in columns" :key="index">{{ column }}</span>
      <span></span>
      <span></span>
    </div>
    <div class="config-list">
      <ConfigRow 
        v-for="(config, index) in configs" 
        :key="index" 
        :config="config" 
        :columns="columns" 
        @edit-config="editConfig"
        @update-config="updateConfig" 
        @delete-config="deleteConfig"
      />
      <EditConfig 
      v-if="isEditing" 
      :config="selectedConfig" 
      :isVisible="isEditing" 
      @close-popup="closePopup"
      @save-config="saveEditedConfig"
    />
    <AddConfig @add-config="addConfig" :columns="columns"/>
    </div>
    
  </div>
</template>

<script>
import ConfigRow from './ConfigRow.vue';
import AddConfig from './AddConfig.vue';
import EditConfig from './EditConfig.vue';

export default {
  name: 'ConfigTable',
  components: {
    ConfigRow,
    AddConfig,
    EditConfig
  },
  data() {
    return {
      isEditing: false,
      selectedConfig: null
    };
  },
  props: {
    configs: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      default: () => ['Parameter Key', 'Value', 'Description', 'Create Date']
    }
  },
  methods: {
    addConfig(newConfig) {
      this.$emit('add-config', newConfig);
    },
    deleteConfig(id) {
      this.$emit('delete-config', id);
    },
    updateConfig(updatedParam, id) {
      this.$emit('update-config', updatedParam, id);
    },
    editConfig(config) {
      this.selectedConfig = config;
      const { id, ...restConfig } = config;
      this.initialConfig = { ...restConfig };
      this.isEditing = true;
    },
    saveEditedConfig(updatedConfig) {
      this.$emit('update-config', updatedConfig, this.initialConfig, updatedConfig.id);
      this.isEditing = false;
      this.selectedConfig = null;
    },
    closePopup() {
      this.isEditing = false;
      this.selectedConfig = null;
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
  white-space: nowrap;
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

.config-list {
  width: 100%;
}

@media (max-width: 1024px) {
  .config-table {
    height: 100%;
    overflow: scroll;
  }
  .header{
    display: none;
  }
}
</style>
