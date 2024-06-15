<template>
  <div class="config-management">
    <div class="navbar">
      <img src="../assets/icon.png" alt="Logo" class="logo"/>
      <UserProfile :email="userEmail" />
    </div> 
    <ConfigTable 
      :configs="configs" 
      @add-config="addConfig" 
      @update-config="updateConfig" 
      @delete-config="deleteConfig"
    />
    <Toast v-if="toastMessage" :type="toastType" :message="toastMessage" @close="clearToast"/>
  </div>
</template>

<script>
import ConfigRow from '../components/ConfigRow.vue';
import AddConfig from '../components/AddConfig.vue';
import EditConfig from '../components/EditConfig.vue';
import UserProfile from '../components/UserProfile.vue';
import ConfigTable from '../components/ConfigTable.vue';
import Toast from '../components/Toast.vue';

import { mapGetters } from 'vuex';
import { getConfig, addConfig, deleteConfig, updateConfig } from '../services/apiService'

export default {
  name: 'ConfigManagement',
  components: {
    ConfigRow,
    AddConfig,
    EditConfig,
    UserProfile,
    ConfigTable,
    Toast
  },
  data() {
    return {
      configs: [],
      toastMessage: '',
      toastType: 'success'
    };
  },
  computed: {
    ...mapGetters(['userEmail']),
  },
  async mounted() {
      const configs = await getConfig();
      this.configs = configs;   
  },
  methods: {
    async addConfig(newConfig) {
      try {
        const response = await addConfig(newConfig);
        this.configs = response;
        this.showToast('success', response?.data?.message || 'Config added successfully.');
      } catch (error) {
        this.showToast('error', error.response?.data?.error || 'Failed to add config.');
      }
    },
    async deleteConfig(id) {
      try {
        const response = await deleteConfig(id);
        this.configs = response;
        this.showToast('success', response?.data?.message || 'Config deleted successfully.');
      } catch (error) {
        this.showToast('error', error.response?.data?.error || 'Failed to delete config.');
      }
    },
    async updateConfig(updatedParam, initialParam, id) {
      try {
        const response = await updateConfig(updatedParam, initialParam, id);
        this.configs = response;
        this.showToast('success', response?.data?.message || 'Config updated successfully.');
      } catch (error) {
        this.showToast('error', error.response?.data?.error || 'Failed to update config.');
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
  position: fixed;
  background-color: #0b1120;  
  justify-content: space-between;
  padding: 10px 40px 0px 40px;
  box-sizing: border-box;
  top: 0;
  height: 3rem;
}

.logo {
  width: 40px;
  margin-bottom: 20px;
  height: fit-content;
}
</style>
