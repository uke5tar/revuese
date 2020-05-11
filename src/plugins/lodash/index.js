/* eslint-disable no-shadow */
import Vue from 'vue';

/*
    How to use:
    1. import lodash methods here via `import {method} from 'lodash/{method}`
    2. add it to customLodash Object
    3. use it in the app via `this._.{method}`
*/
const customLodash = {};

const lodash = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '_', { value: customLodash });
  },
};

Vue.use(lodash);

export default lodash;
