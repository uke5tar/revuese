import Vue from 'vue';

const globalComponents = [];


export default () => globalComponents.forEach((component) => Vue.component(component.name, component));
