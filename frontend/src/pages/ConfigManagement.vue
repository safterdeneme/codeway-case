<template>
  <div class="config-management">
    <div class="navbar">
      <img src="../assets/icon.png" alt="Logo" class="logo"/>
      <UserProfile />
    </div> 
    <ConfigTable 
      :parameters="parameters" 
      @add-parameter="addParameter" 
      @update-parameter="updateParameter" 
      @delete-parameter="deleteParameter"
    />
  </div>
</template>

<script>
import ParameterRow from '../components/ParameterRow.vue';
import AddParameter from '../components/AddParameter.vue';
import EditParameter from '../components/EditParameter.vue';
import UserProfile from '../components/UserProfile.vue';
import ConfigTable from '../components/ConfigTable.vue';

import { getConfig, addConfig, deleteConfig, updateConfig } from '../services/apiService'

export default {
  name: 'ConfigManagement',
  components: {
    ParameterRow,
    AddParameter,
    EditParameter,
    UserProfile,
    ConfigTable
  },
  data() {
    return {
      parameters: []
    };
  },
  async mounted() {
      const parameters = await getConfig();
      this.parameters = parameters;   
  },
  methods: {
    async addParameter(newParameter) {
      this.parameters = await addConfig(newParameter)
    },
    async deleteParameter(id) {
      this.parameters = await deleteConfig(id)
    },
    async updateParameter(updatedParam, initialParam, id) {
      this.parameters = await updateConfig(updatedParam, initialParam, id)
      
    }
  }
};
</script>

<style scoped>
.config-management {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0b1120;
  color: #fff;
  height: 100vh;
  padding: 20px;
}

.navbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.logo {
  width: 40px;
  margin-bottom: 20px;
}
</style>
