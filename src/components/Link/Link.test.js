/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */
import React from 'react';
import renderer from 'react-test-renderer';
import Link from './Link';

describe('Link', () => {
  test('Link does render width children', () => {
    const wrapper = renderer
      .create(
        <Link to="/" onClick={() => console.log('clicked')}>
          <div>Some link</div>
        </Link>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
