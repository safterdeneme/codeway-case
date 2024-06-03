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
    <Toast v-if="toastMessage" :type="toastType" :message="toastMessage" @close="clearToast"/>
  </div>
</template>

<script>
import ParameterRow from '../components/ParameterRow.vue';
import AddParameter from '../components/AddParameter.vue';
import EditParameter from '../components/EditParameter.vue';
import UserProfile from '../components/UserProfile.vue';
import ConfigTable from '../components/ConfigTable.vue';
import Toast from '../components/Toast.vue';

import { getConfig, addConfig, deleteConfig, updateConfig } from '../services/apiService'

export default {
  name: 'ConfigManagement',
  components: {
    ParameterRow,
    AddParameter,
    EditParameter,
    UserProfile,
    ConfigTable,
    Toast
  },
  data() {
    return {
      parameters: [],
      toastMessage: '',
      toastType: 'success'
    };
  },
  async mounted() {
      const parameters = await getConfig();
      this.parameters = parameters;   
  },
  methods: {
    async addParameter(newParameter) {
      try {
        const response = await addConfig(newParameter);
        this.parameters = response;
        this.showToast('success', response?.data?.message || 'Parameter added successfully.');
      } catch (error) {
        this.showToast('error', error.response?.data?.error || 'Failed to add parameter.');
      }
    },
    async deleteParameter(id) {
      try {
        const response = await deleteConfig(id);
        this.parameters = response;
        this.showToast('success', response?.data?.message || 'Parameter deleted successfully.');
      } catch (error) {
        this.showToast('error', error.response?.data?.error || 'Failed to delete parameter.');
      }
    },
    async updateParameter(updatedParam, initialParam, id) {
      try {
        const response = await updateConfig(updatedParam, initialParam, id);
        this.parameters = response;
        this.showToast('success', response?.data?.message || 'Parameter updated successfully.');
      } catch (error) {
        this.showToast('error', error.response?.data?.error || 'Failed to update parameter.');
      }
    },
    showToast(type, message) {
      this.toastType = type;
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = '';
      }, 3000);
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
