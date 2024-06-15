import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sessionTokenExists: false,
    toastMessage: '',
    toastType: 'success'
  },
  getters: {
    userEmail: (state) => state.userEmail,
    isAuthenticated: state => !!state.sessionTokenExists,
    toastMessage: state => state.toastMessage,
    toastType: state => state.toastType
  },
  mutations: {
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setToastMessage(state, { type, message }) {
      state.toastType = type;
      state.toastMessage = message;
    },
    setSessionTokenExists(state, tokenExists) {
      state.sessionTokenExists = tokenExists;
    },
    clearToast(state) {
      state.toastMessage = '';
    }
  },
  actions: {
    setUserEmail({ commit }, email) {
      commit('setUserEmail', email);
    },
    showToast({ commit }, { type, message }) {
      commit('setToastMessage', { type, message });
      setTimeout(() => {
        commit('clearToast');
      }, 3000);
    }
  }
});
