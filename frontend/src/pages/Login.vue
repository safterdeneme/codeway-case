<template>
  <div class="sign-in-container">
    <img src="../assets/icon.png" alt="Logo" class="logo" />
    <h2>Please sign in</h2>
    <form @submit.prevent="signIn">
      <div class="input-container">
        <input
          type="email"
          v-model="email"
          placeholder="E-mail address"
          required
          class="top-rounded"
        />
      </div>
      <div class="input-container">
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="bottom-rounded"
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
    <footer>Codeway © 2021</footer>
    <Toast v-if="toastMessage" :type="toastType" :message="toastMessage" @close="clearToast"/>
  </div>
</template>

<script>
import { login } from '../services/apiService'
import Toast from '../components/Toast.vue';
import { mapActions } from 'vuex';

export default {
    name: 'SignIn',
    components: {
    Toast
    },
    data() {
      return {
        email: '',
        password: '',
        toastMessage: '',
        toastType: 'success'
      };
    },
    methods: {
      ...mapActions(['setUserEmail']),
      async signIn() {

        try {
                await login(this.email, this.password)
                this.setUserEmail(this.email);
                this.$router.push('/');
              } catch (err) {
                this.showToast('error', 'Email or Password is incorrect!');
                console.log(err)
              }
        },
      showToast(type, message) {
      this.toastType = type;
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = '';
      }, 3000);
    }
    },
    
  };
</script>

<style scoped>
.sign-in-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0b1120;
  color: #fff;
  text-align: center;
}

.logo {
  width: 250px;
  height: auto;
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #8a93af;
}

.input-container {
  margin-bottom: 0;
}

input {
  width: 300px;
  padding: 10px;
  border: 1px solid #4b4b4b;
  border-bottom: none;
  background-color: #1a1a1a;
  color: #fff;
  transition: border 0.3s;
}

input.top-rounded {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

input.bottom-rounded {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: 1px solid #4b4b4b;
}

input:focus {
  border-color: #8a93af;
  outline: none;
}

input::placeholder {
  color: #8a93af;
}

button {
  width: 320px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #3a7cff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  transition: background-color 0.3s, border 0.3s;
}

button:hover {
  background-color: #0057e7;
}

button:focus {
  outline: none;
}

footer {
  margin-top: 50px;
  color: #8a93af;
}
</style>
