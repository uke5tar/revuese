/* eslint-disable no-shadow */
import Vue from 'vue';
import ISO6391 from 'iso-639-1';

const ISO6391Lang = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$lang', { value: ISO6391 });
  },
};

Vue.use(ISO6391Lang);

export default ISO6391Lang;
