/* eslint-disable no-shadow */
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig);

const firebaseApi = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$firebase', { value: firebase });
    Object.defineProperty(Vue.prototype, '$fireauth', { value: firebase.auth() });
    Object.defineProperty(Vue.prototype, '$firestore', { value: firebase.firestore() });
  },
};

Vue.use(firebaseApi);

export default firebaseApi;
