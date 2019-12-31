import Vue from 'vue';
import registerGlobalComponents from '@components/global';
import './registerServiceWorker';
import App from './App';
import plugins from './plugins';
import firebaseApi from '@/plugins/api_service/firebase/methods/firebase';
// eslint-disable-next-line no-unused-expressions
import(/* webpackPreload: true */ 'typeface-roboto/index.css');


Vue.config.productionTip = false;

registerGlobalComponents();

let app;
firebaseApi.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      ...plugins,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
