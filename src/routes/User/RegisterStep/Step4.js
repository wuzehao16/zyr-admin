import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, Row, Col, Popover, Progress, Upload, Modal, Icon, Cascader, Select } from 'antd';
import { routerRedux } from 'dva/router';
import options from '../../../common/addressOptions';
import { digitUppercase } from '../../../utils/utils';
import UploadPicture from '../../../components/UploadPicture'
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const { Option } = Select;

@Form.create()
class Step4 extends React.PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    count: '',
    userEmail: '',
    fileList: [],
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidMount () {
    this.props.dispatch({
      type: 'register/queryCity',
      payload: {
        type: 'city'
      },
    });
    this.getInstitutionType();
  }
  onGetCaptcha = () => {
    const { form } = this.props;
    const userEmail = form.getFieldValue('userEmail');
    const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!regex.test(userEmail)) {
      form.setFields({
        userEmail: {
          value: userEmail,
          errors: [new Error('请输入正确的邮箱地址！')],
        },
      });
      return
    }
    this.props.dispatch({
      type:'register/getEmailCaptcha',
      payload:{
        userEmail,
      }
    })
    setTimeout(()=>{
      if(this.props.data.isEmailRegister === 1){
        this.setState({ count: 0 });
        return
      } else {
        this.captcha();
      }
    },1000)

  };
  captcha = () => {
    let count = 9;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'pool';
  };
  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => this.setState({ fileList })
  getInstitutionType = () => {
    this.props.dispatch({
      type: 'register/getInstitutionType',
    });
  }
  getInstitution = (code) => {
    this.props.dispatch({
      type: 'register/getInstitution',
      payload: {
        cityCode: code
      },
    });
  }
  getSubInstitution = (code) => {
    this.props.dispatch({
      type: 'register/getSubInstitution',
      payload: {
        parentId: code
      },
    });
  }
  handleUpload = v => {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    getFieldDecorator('manageLogoId')
    if (v[0] && v[0].response) {
      const res = v[0].response;
      if ( res.code === 0) {
        setFieldsValue({
          manageLogoId: res.data.match(/ima[^\n]*Ex/)[0].slice(0,-3)
        })
      }
    }
  }
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields, getFieldValue  } = form;
    const { previewVisible, previewImage, count, fileList, userEmail } = this.state;
    if (data.city) {
      var  cityOptions = data.city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (data.institutionTypeList) {
      var institutionTypeListOptions = data.institutionTypeList.map(item => <Option key={item.institutionCode} value={item.institutionCode}>{item.institutionName}</Option>);
    }
    if (data.institutionList) {
      var institutionListOptions = data.institutionList.map(item => <Option key={item.sublInstitution} value={item.sublInstitution}>{item.manageName}</Option>);
    }
    if (data.subInstitutionList) {
      var subInstitutionListOptions = data.subInstitutionList.map(item => <Option key={item.manageId} value={item.manageId}>{item.manageName}</Option>);
    }
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          const ndata = Object.assign(data,{city:''})
          dispatch({
            type: 'register/submitStep4Form',
            payload: {
              ...ndata,
              ...values,
            },
          });
        }
      });
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <h2 className={styles.title}>机构信息</h2>
        <Divider style={{ margin: '10px 0 24px' }} />
        <div className="clearfix">
          <UploadPicture onChange={this.handleUpload}/>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <Form layout="horizontal" className={styles.stepForm}>
          <Form.Item
            label="所在城市"
            {...formItemLayout}
          >
            {getFieldDecorator('cityCode', {
              rules: [
                {
                  required: true,
                  message: '请选择所在城市！',
                },
              ],
            })(
              <Select placeholder="所在城市" onChange={this.getInstitution}>
                {cityOptions}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="机构类型"
            {...formItemLayout}
          >
            {getFieldDecorator('institutionCode', {
              rules: [
                {
                  required: true,
                  message: '请选择机构类型！',
                },
              ],
            })(
              <Select placeholder="机构类型">
                {institutionTypeListOptions}
              </Select>
            )}
          </Form.Item>
          {
            ((value = getFieldValue('institutionCode'))=> {
              switch(value){
               case '1':
                return <div>
                        <Form.Item
                          label="银行名称"
                          {...formItemLayout}
                         >
                          {getFieldDecorator('sublInstitution', {
                            rules: [
                              {
                                required: true,
                                message: '请选择机构类型！',
                              },
                            ],
                          })(
                            <Select placeholder="银行名称" onChange={this.getSubInstitution}>
                              {data.institutionList
                                ? institutionListOptions
                                : null}
                            </Select>
                          )}
                        </Form.Item>
                        <Form.Item
                          label="下属机构"
                          {...formItemLayout}
                          >
                          {getFieldDecorator('manageId')(
                            <Select placeholder="下属机构">
                              {data.subInstitutionList
                                ? subInstitutionListOptions
                                : null}
                            </Select>
                          )}
                        </Form.Item>
                       </div>
                case '2':
                  return      <Form.Item
                          label="机构名称"
                          {...formItemLayout}
                         >
                          {getFieldDecorator('manageName',{
                            rules: [
                              {
                                required: true,
                                message: '机构名称',
                              },
                            ],
                          })(
                            <Input
                              placeholder="机构名称"
                            />
                          )}
                        </Form.Item>
                case '3':
                  return      <Form.Item
                          label="机构名称"
                          {...formItemLayout}
                         >
                          {getFieldDecorator('manageName',{
                            rules: [
                              {
                                required: true,
                                message: '机构名称',
                              },
                            ],
                          })(
                            <Input
                              placeholder="机构名称"
                            />
                          )}
                        </Form.Item>
                  default:
                    return null
            }
          })()
          }
          <Form.Item
            label="邮箱"
            {...formItemLayout}
            >
            {getFieldDecorator('userEmail', {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱地址！',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误！',
                },
              ],
            })(<Input placeholder="邮箱" />)}
          </Form.Item>
          <Form.Item
            label="验证码"
            {...formItemLayout}
            >
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('emailCode', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ],
                })(<Input placeholder="验证码" />)}
              </Col>
              <Col span={8}>
                <Button
                  disabled={count || !getFieldValue('userEmail')}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <h2 style={{textAlign: 'center'}}>个人信息</h2>
          <Form.Item
            >
            {getFieldDecorator('userName')(
              <Input size="large" type="text" maxLength="15" placeholder="请输入账号" />
            )}
          </Form.Item>
          <Form.Item
            >
              <Input size="large" type="text" value={data.userPhone} disabled/>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 8 }}
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 24, offset: 0 },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm} loading={submitting} className={styles.step1next}>
              完成
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(({ register, loading }) => ({
  submitting: loading.effects['register/submitStep4Form'],
  data: register.step,
}))(Step4);
