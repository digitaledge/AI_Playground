/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../App';
import Layout from './Layout';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

describe('Layout', () => {
  test('Layout does render with children', () => {
    const store = mockStore(initialState);
    const wrapper = renderer
      .create(
        <App context={{ insertCss: () => {}, fetch: () => {}, store }}>
          <Layout>
            <div className="child" />
          </Layout>
        </App>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
