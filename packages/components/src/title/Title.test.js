/* eslint-disable import/no-extraneous-dependencies */
import { shallowMount } from '@vue/test-utils';
import Title from './Title';


describe('Title', () => {
  const wrapper = shallowMount(Title, {
    propsData: {
      type: 'h1',
    },
    slots: {
      default: 'Hello World',
    },
  });

  it('Renders as h1 when given prop type h1', () => {
    expect(wrapper.html()).toMatch('h1');
  });

  it('Renders a title when passed as slot', () => {
    expect(wrapper.text()).toBe('Hello World');
  });
});
