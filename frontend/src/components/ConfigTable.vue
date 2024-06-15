<template>
  <div class="config-table">
    <div class="header">
      <span v-for="(column, index) in columns" :key="index">
        <span
          v-if="column === 'Create Date'"
          @click="sortConfigsByDate"
          class="sortable"
        >
          {{ column }}
          <span class="arrow" :class="{ 'arrow-down': sortAsc, 'arrow-up': !sortAsc }"></span>
        </span>
        <span v-else>{{ column }}</span>
      </span>
      <span></span>
      <span></span>
    </div>
    <div class="config-list">
      <ConfigRow 
        v-for="(config, index) in sortedConfigs" 
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
import { convertTimestampToDate } from '../helpers';

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
      selectedConfig: null,
      sortAsc: true
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
  computed: {
  sortedConfigs() {
    return this.configs.slice().sort((a, b) => {
      const dateA = convertTimestampToDate(a.created_at);
      const dateB = convertTimestampToDate(b.created_at);
      return this.sortAsc ? dateA - dateB : dateB - dateA;
    });
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
      this.isEditing = true; 
    },
    saveEditedConfig(updatedConfig) {
      this.$emit('update-config', updatedConfig, updatedConfig.id);
      this.isEditing = false;
      this.selectedConfig = null;
    },
    closePopup() {
      this.isEditing = false;
      this.selectedConfig = null;
    },
    sortConfigsByDate() {
      this.sortAsc = !this.sortAsc;
    }
  }
};
</script>

<style scoped>
.config-table {
  margin-top: 5rem;
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

.sortable {
  cursor: pointer;
}

.arrow {
  display: inline-block;
  margin-left: 5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  vertical-align: middle;
}

.arrow-down {
  border-top: 5px solid white;
}

.arrow-up {
  border-bottom: 5px solid white;
}

.config-list {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 1024px) {
  .config-table {
    height: 100%;
    overflow: scroll;
  }
  .header {
    display: none;
  }
}
</style>
