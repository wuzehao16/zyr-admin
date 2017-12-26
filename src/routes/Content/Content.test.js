import React from 'react';
import { shallow } from 'enzyme';
import Content from './Content';

it('renders with Result', () => {
  const wrapper = shallow(<Content />);
  expect(wrapper.find('Result').length).toBe(1);
  expect(wrapper.find('Result').prop('type')).toBe('success');
});
