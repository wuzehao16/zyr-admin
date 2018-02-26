import { Upload, Icon, Modal, message } from 'antd';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    loading: false,
    previewImage: '',
    fileList: [],
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if ((typeof nextProps.value === "string") && 'initialValue' in nextProps["data-__meta"] ) {
      this.setState({
        fileList:[{
          uid:-1,
          url: nextProps.value
        }],
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  beforeUpload = (file) => {
    const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isPic) {
      message.error('上传的文件不是图片类型，请重新上传！');
      this.setState({ fileList: [] })
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传图片大小应该小于 2MB!');
    }
    return isPic && isLt2M;
  }

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
    }

    if (fileList[0] && fileList[0].response) {
      const res = fileList[0].response;
      if ( res.code === 0) {
        // this.setState({ fileList })
      } else {
        message.error(res.msg)
        this.setState({ fileList: [] })
      }
    }
    console.log(fileList)

    if (fileList[0] && fileList[0].status) {
        this.setState({ fileList })
        if (this.props.onChange) {
          this.props.onChange(fileList)
        }
    }


  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="http://47.104.27.184:8000/sysAnno/uploadImage"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall;
