import Vue from 'vue';
import Title from '@components/title';

const globalComponents = [
  Title,
];


export default () => globalComponents.forEach((component) => Vue.component(component.name, component));
