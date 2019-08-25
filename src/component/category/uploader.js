import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import axios from "../../utils/requestConfig";
import { previewImage, Notify, Progress } from "zent";

const imageMaxSize = 2000000;

export default class uploader extends Component {
  state = {
    percentCompleted: 0
  };

  static propTypes = {
    file: PropTypes.object,
    onAddImage: PropTypes.func.isRequired,
    onChangeUploadStatus: PropTypes.func.isRequired,
    onRemoveImage: PropTypes.func.isRequired,
    status: PropTypes.number.isRequired
  };

  onDrop = acceptFile => {
    if (acceptFile.length !== 0) {
      this.addFileToMedia(acceptFile[0]);
    }
  };

  onReject = file => {
    if (file[0].size > imageMaxSize) {
      Notify.error("file size is more than 2MB", 5000);
    }
  };

  handlePreview = e => {
    previewImage({
      images: [e.target.src],
      index: 0,
      parentComponent: this,
      showRotateBtn: false,
      scaleRatio: 3
    });
  };

  addFileToMedia = file => {
    this.props.onChangeUploadStatus(1);
    const self = this;
    const fr = new FormData();
    fr.append("file", file, file.name);
    fr.append("fileTypeId", this.props.typeId);
    axios
      .post("/files", fr, {
        onUploadProgress: progressEvent => {
          let percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          self.setState({
            percentCompleted: percentage
          });
        }
      })
      .then(res => {
        self.setState({
          percentCompleted: 0
        });
        this.props.onAddImage(res.data.data, this.props.status);
      })
      .catch(err => {
        Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        self.setState({ percentCompleted: 0 });
        this.props.onChangeUploadStatus(0);
      });
  };

  render() {
    let dropzoneRef;
    const { percentCompleted } = this.state;
    const { file, status, title } = this.props;
    const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
    return (
      <div className="zent-form__control-group ">
        <label className="zent-form__control-label">{title} image</label>
        <div className="zent-form__controls">
          <Dropzone
            ref={node => {
              dropzoneRef = node;
            }}
            accept="image/jpg,image/jpeg,image/png,image/gif"
            onDrop={this.onDrop}
            onDropRejected={this.onReject}
            maxSize={imageMaxSize}
            minSize={1}
            multiple={false}
            className="dropzone"
            acceptClassName="dropzone-active"
            disabledClassName="dropzone-disable"
            disableClick
          >
            {file === null && (
              <React.Fragment>
                <div
                  className="dropzone-box"
                  onClick={() => {
                    dropzoneRef.open();
                  }}
                >
                  <div className={percentCompleted === 0 && file === null ? "dropzone-icon show-icon" : "dropzone-icon"} />
                  {percentCompleted === 0 && file === null ? (
                    <span className="dropzone-title">Upload image</span>
                  ) : (
                    <Progress strokeWidth={5} type="circle" width={70} percent={percentCompleted} />
                  )}
                </div>
              </React.Fragment>
            )}
            {file !== null && (
              <div className="dropzone-items">
                <img onClick={this.handlePreview} src={`http://45.82.137.69:8001/files/${file.fileId}/data?authorization=${userInfo.token}`} alt={title} />
                <span onClick={() => this.props.onRemoveImage(status)} className="remove-image" />
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
}
