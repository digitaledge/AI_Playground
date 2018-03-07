/* @flow */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.css';

type Props = {
  title: string,
};

class NotFound extends React.Component<Props> {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>Sorry, the page you were trying to view does not exist.</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NotFound);
