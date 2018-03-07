import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>AI Playground</h1>
            <p className={s.bannerDesc}>Node.js + OpenCV + React = fun!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
