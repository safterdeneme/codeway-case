<template>
  <div class="user-profile" @mouseenter="showInfo" @mouseleave="hideInfo" @click="handleClick" >
    <div class="user-icon">
      <i class="fas fa-user"></i>
      <i class="fas fa-caret-down"></i>
    </div>
    <div class="user-info" v-if="isInfoVisible">
      <p><strong>Email:</strong> {{ email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      isInfoVisible: false
    };
  },
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  methods: {
    showInfo() {
      this.isInfoVisible = true;
    },
    hideInfo() {
      this.isInfoVisible = false;
    },
    handleClick() {
      this.$router.push('/sign-in');
    }
  }
};
</script>

<style scoped>
.user-profile {
  position: relative;
  display: inline-block;
  color: white;
}

.user-icon {
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
}

.user-icon i {
  margin-left: 5px;
}

.user-info {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2c2c2c;
  border: 1px solid #4b4b4b;
  border-radius: 5px;
  padding: 10px;
  width: 200px;
  color: #8a93af;
  z-index: 1000;
}

.user-info p {
  margin: 5px 0;
}
</style>
