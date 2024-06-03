<template>
    <div v-if="isVisible" :class="['toast', type]" @click="hideToast">
      <i :class="iconClass"></i>  <span class="toast-message">{{ message }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Toast',
    props: {
      type: {
        type: String,
        default: 'success'
      },
      message: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        isVisible: true
      };
    },
    computed: {
      iconClass() {
        return this.type === 'success' ? 'fas fa-check-circle' : 'fas fa-times-circle';
      }
    },
    mounted() {
      setTimeout(() => {
        this.isVisible = false;
      }, 3000);
    },
    methods: {
      hideToast() {
        this.isVisible = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    z-index: 1000;
    transition: opacity 10.3s ease;
  }
  .toast-message {
    margin-left: 10px;
  }
  .toast.success {
    background-color: #28a745;
    color: white;
  }
  
  .toast.error {
    background-color: #dc3545;
    color: white;
  }
  
  .toast i {
    margin-right: 10px;
  }
  
  @media (max-width: 1024px) {
    .toast {
      width: 30%;
    }
  }
  </style>
  