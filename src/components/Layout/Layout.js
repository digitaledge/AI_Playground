/* @flow */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';

import s from './Layout.css';
import Header from '../Header';

type Props = {
  children: any,
};

class Layout extends React.Component<Props> {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
