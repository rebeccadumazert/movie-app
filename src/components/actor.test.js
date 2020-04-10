import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Actor from './Actor';

configure({ adapter: new Adapter() });

test('Actor renders correctly', () => {
  const tree = renderer.create(<Actor />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('component should contain anniversaire', () => {
  const actor = shallow(<Actor />);
  expect(actor.text()).toMatch(/Anniversaire/);
});

test('component should contain h1', () => {
  const actor = shallow(<Actor></Actor>);
  expect(actor.find('h1')).toHaveLength(1);
});

// test('')
