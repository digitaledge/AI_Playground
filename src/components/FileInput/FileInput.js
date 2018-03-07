/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: ?any,
  onChange: Function,
};

export default class FileInput extends React.Component<Props> {
  handleChange = async e => {
    const result = await new Promise(resolve => {
      const files = e.target.files;
      const file = files[0];
      const fileReader = new FileReader();

      fileReader.onload = result => {
        resolve({
          file,
          dataURL: result.currentTarget.result,
        });
      };

      fileReader.readAsDataURL(file);
    });

    this.props.onChange(result);
  };

  triggerInput = e => {
    ReactDOM.findDOMNode(this._reactFileReaderInput).click();
  };

  render() {
    const { children, style, ...props } = this.props;
    const hiddenInputStyle = children
      ? {
          position: 'absolute',
          top: '-9999px',
        }
      : {};

    return (
      <div
        className="_react-file-reader-input"
        onClick={this.triggerInput}
        style={style}
      >
        <input
          {...props}
          type="file"
          onChange={this.handleChange}
          ref={c => {
            this._reactFileReaderInput = c;
          }}
          onClick={() => {
            this._reactFileReaderInput.value = null;
          }}
          style={hiddenInputStyle}
        />
        {children}
      </div>
    );
  }
}
