import { Upload, Icon, Modal, message, Button } from 'antd';

class UploadVideo extends React.Component {
  state = {
    previewVisible: false,
    loading: false,
    withCredentials: true,
    previewImage: '',
    fileList: [],
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.fileList.length > 0 ) return
    if ('fileList' in nextProps && nextProps.fileList != "") {
      this.setState({
        fileList:[{
          uid:-1,
          status: 'done',
          url: nextProps.fileList
        }],
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })


  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    const f = fileList[0];
    if (!f) {
      this.setState({ fileList })
      if (this.props.onChange) {
        this.props.onChange("");
      }
    }


    if (fileList[0] && fileList[0].status) {
      const file = fileList[0];
        this.setState({ fileList })
        if (this.props.onChange) {
          this.props.onChange("");
        }
    }
    // 处理返回参数并且格式化参数
    if (fileList[0] && fileList[0].response) {
      const res = fileList[0].response;
      if ( res.code === 0) {
        if (this.props.onChange) {
          this.props.onChange(res.data);
        }
      } else {
        message.error(res.msg)
        this.setState({ fileList: [] })
      }
    }


  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <Button>
        <Icon type="upload" /> Click to Upload
      </Button>
    );
    return (
      <div className="clearfix">
        {/* http://47.104.27.184:8000/sysAnno/uploadImage */}
        <Upload
          action="https://app.ibankmatch.com:8000/module/uploadVideo"
          // listType="picture-card"
          // headers={
          //   authorization=authorization-text
          // }
          fileList={fileList}
          // onPreview={this.handlePreview}
          // beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>

      </div>
    );
  }
}
export default UploadVideo;
