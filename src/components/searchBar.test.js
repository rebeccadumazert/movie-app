import React from 'react';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import SearchBar from './SearchBar';

configure({ adapter: new Adapter() });

afterEach(() => {
  // cleaning up the mess left behind the previous test
  axios.reset();
});

test('Actor renders correctly', () => {
  const tree = renderer.create(<SearchBar.WrappedComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('simulate click events', () => {
  const searchBar = shallow(<SearchBar.WrappedComponent />);
  console.log(searchBar.text());
  searchBar.find('button').simulate('click');
  expect(axios.get).toHaveBeenCalledTimes(1);
});
