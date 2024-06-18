import axios from 'axios';

import { auth, signInWithEmailAndPassword } from './firebase';
import store from '../store';

const API_URL = '/api/';

const api = axios.create({
  baseURL: API_URL,
});

const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      store.commit('setSessionTokenExists', true);
    } else {
      localStorage.removeItem('token');
      store.commit('setSessionTokenExists', false);
    }
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };
  
  const initializeToken = () => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  };

const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();
  setToken(idToken);
  return idToken;
};

const getConfig = async () => {
  const response = await api.get('/get');
  return response?.data?.config;
};

const addConfig = async (newConfig) => {
  const response = await api.post('/add', newConfig);
  return response?.data?.config;
};

const updateConfig = async (updatedConfig, id) => {
  const response = await api.put(`/update/${id}`, { updatedConfig });
  return response?.data?.config;
};

const deleteConfig = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response?.data?.config;
};

const serveConfig = async (countryCode) => {
  const response = await api.get(`/serve?country=${countryCode}`, {
    headers: {
      'api-token': process.env.VUE_API_TOKEN
    }
  })
  return response?.data?.config
}

export { login, getConfig, addConfig, updateConfig, deleteConfig, initializeToken, serveConfig };
