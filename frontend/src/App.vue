<template>
  <div id="app">
    <router-view/>
    <Toast v-if="toastMessage" :type="toastType" :message="toastMessage" @close="clearToast" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Toast from '../src/components/Toast.vue';

export default {
   name: 'App',
  components: {
    Toast
  },
  computed: {
    ...mapGetters(['toastMessage', 'toastType'])
  },
  methods: {
    ...mapActions(['clearToast'])
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
