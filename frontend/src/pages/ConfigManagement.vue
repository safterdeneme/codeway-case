<template>
  <div class="config-management">
    <div class="navbar">
      <img src="@/assets/icon.png" alt="Logo" class="logo"/>
      <UserProfile />
    </div> 
     <ConfigTable :parameters="parameters" @add-parameter="addParameter"/>
  </div>
</template>

<script>
import ParameterRow from '../components/ParameterRow.vue';
import AddParameter from '../components/AddParameter.vue';
import UserProfile from '../components/UserProfile.vue';
import ConfigTable from '../components/ConfigTable.vue';

export default {
  name: 'ConfigManagement',
  components: {
    ParameterRow,
    AddParameter,
    UserProfile,
    ConfigTable
    
  },
  data() {
    return {
      parameters: [
        { key: 'min_version', value: '1.4.4', description: 'Minimum required version of the app', createDate: '10/05/2021 01:58' },
        { key: 'latest_version', value: '1.4.7', description: 'Latest version of the app', createDate: '10/05/2021 01:58' },
        { key: 'pricing_tier', value: 't6', description: 'Pricing tier of the user', createDate: '07/07/2021 11:13' },
        { key: 'scroll', value: '5', description: 'Index of Scroll Paywall for free users.', createDate: '25/08/2021 10:22' },
        { key: 'scroll_limit', value: '13', description: 'Index of Scroll Limit Paywall for free users.', createDate: '25/08/2021 10:23' }
      ]
    };
  },
  methods: {
    addParameter(newParameter) {
      this.parameters.push(newParameter);
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
  display:flex;
  flex-direction: row;
  justify-content: space-between;

}
.logo {
  width: 40px;
  margin-bottom: 20px;
}
</style>
