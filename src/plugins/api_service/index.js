/* eslint-disable no-shadow */
import Vue from 'vue';
import FirebaseApi from './firebase';


const apiService = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$firebaseApi', { value: new FirebaseApi() });
  },
};

Vue.use(apiService);

export default apiService;
