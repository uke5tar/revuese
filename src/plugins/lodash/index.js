/* eslint-disable no-shadow */
import Vue from 'vue';

const customLodash = {};

const lodash = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '_', { value: customLodash });
  },
};

Vue.use(lodash);

export default lodash;
