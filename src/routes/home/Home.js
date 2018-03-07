/* @flow */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './Home.css';
import ImageGridItem from '../../components/ImageGridItem';
import FileInput from '../../components/FileInput';
import { scoreImage } from '../../actions/app';

class Home extends React.Component {
  static renderImage(item, idx) {
    return <ImageGridItem key={idx} src={item.src} score={item.score} />;
  }

  uploadImage(data) {
    if (data && data.file) {
      this.props.dispatch(scoreImage(data));
    }
  }

  render() {
    const { app } = this.props;
    const buttonTitle = app.images ? 'Add more images' : 'Try it out now...';
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.actionZone}>
            <h1>Image Moderation</h1>
            <p>Open NSFW by Yahoo (caffe model) & Inception5h (tensorflow)</p>
            <FileInput id="fileInput" onChange={this.uploadImage.bind(this)}>
              <button className={s.button}>{buttonTitle}</button>
            </FileInput>
          </div>
          <div className={s.imageGrid}>
            {app.images &&
              app.images.map((item, idx) => Home.renderImage(item, idx))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
});

export default withStyles(s)(connect(mapStateToProps)(Home));
