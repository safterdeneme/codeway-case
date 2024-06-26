<template>
  <div class="config-management">
    <div class="navbar">
      <img src="../assets/icon.png" alt="Logo" class="logo"/>
      <UserProfile :email="userEmail" />
    </div> 

    <div class="tabs">
      <div @click="swapToPanel" class="tab" :class="{ active: tabType === 'panel' }"><i class="fas fa-cogs"></i><span class="tab-text">Config Panel</span></div>
      <div @click="swapToMap" class="tab" :class="{ active: tabType === 'map' }"><i class="fas fa-globe"></i><span class="tab-text">World Map</span></div>
    </div>
    
    
    <div v-if="tabType === 'panel'">
    <ConfigTable 
      :configs="configs" 
      @add-config="addConfig" 
      @update-config="updateConfig" 
      @delete-config="deleteConfig"
    />
    </div>
    
    <div class="world-map-tab" v-else-if="tabType === 'map'">
      <WorldConfigMap />
    </div>
    
    <Toast v-if="toastMessage" :type="toastType" :message="toastMessage" @close="clearToast"/>
  </div>
</template>

<script>
import ConfigRow from '../components/ConfigRow.vue';
import AddConfig from '../components/AddConfig.vue';
import EditConfig from '../components/EditConfig.vue';
import UserProfile from '../components/UserProfile.vue';
import ConfigTable from '../components/ConfigTable.vue';
import WorldConfigMap from '../components/WorldConfigMap.vue';
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
    WorldConfigMap, 
    Toast
  },
  data() {
    return {
      configs: [],
      toastMessage: '',
      toastType: 'success',
      tabType: 'panel'
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
    },
    swapToPanel() {
      this.tabType = 'panel';
    },
    swapToMap() {
      this.tabType = 'map';
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
  padding: 20px 40px 0px 40px;
  box-sizing: border-box;
  top: 0;
}

.logo {
  width: 40px;
  margin-bottom: 20px;
}

.tabs {
  margin-top: 70px;
  display: flex;
  gap: 10px;
}

.tab {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #333;
  color: white;
  transition: background-color 0.3s;
}
.tab-text{
  padding-left: 3px;
}
.tab.active, .tab:hover {
  background-color: #00d1b2;
}

.world-map-tab {
  overflow: scroll;
  margin: 2rem;
  width: 100%;
}

@media (max-width: 1024px) {
  .config-management {
    height: 100%;
  }
  .navbar {
    padding: 10px 20px;
  }

  .tabs {
    z-index: 10;
    position: fixed;
    margin: 0;
    top: 6px;
  }
  .tab-text {
    display: none;
  }
}
</style>
