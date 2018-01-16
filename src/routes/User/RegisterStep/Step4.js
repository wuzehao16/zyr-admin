import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, Row, Col, Popover, Progress, Upload, Modal, Icon, Cascader, Select } from 'antd';
import { routerRedux } from 'dva/router';
import options from '../../../common/addressOptions';
import { digitUppercase } from '../../../utils/utils';
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
    count:'',
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };
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
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields, getFieldValue  } = form;
    const { previewVisible, previewImage, count } = this.state;
    // const onPrev = () => {
    //   dispatch(routerRedux.push('/form/step-form'));
    // };
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        console.log(123)
        if (!err) {
          dispatch({
            type: 'register/submitStep3Form',
            payload: {
              ...data,
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
        <Form layout="horizontal" className={styles.stepForm}>
          <Form.Item>
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={data.fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {data.fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item
            label="所在城市"
            {...formItemLayout}
          >
            {getFieldDecorator('city', {
              rules: [
                {
                  required: true,
                  message: '请选择所在城市！',
                },
              ],
            })(
              <Cascader options={options} placeholder="所在城市" />
            )}
          </Form.Item>
          <Form.Item
            label="机构类型"
            {...formItemLayout}
          >
            {getFieldDecorator('institutionName', {
              rules: [
                {
                  required: true,
                  message: '请选择机构类型！',
                },
              ],
            })(
              <Select placeholder="机构类型">
                <Option value="0">银行</Option>
                <Option value="1">机构</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="机构名称"
            {...formItemLayout}
            >
            {getFieldDecorator('manageName', {
              rules: [
                {
                  required: true,
                  message: '请输选择机构名称！',
                },
              ],
            })(
              <Select placeholder="机构名称">
                <Option value="2">平安银行</Option>
                <Option value="1">华夏银行</Option>
                <Option value="">其他</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="机构名称"
            {...formItemLayout}
            style={{
              display: getFieldValue('manageName') === '' ? 'block' : 'none',
            }}
          >
            {getFieldDecorator('otherManageName')(
              <Input
                placeholder="机构名称"
              />
            )}
          </Form.Item>
          {/* <Form.Item
            label="下属结构"
            {...formItemLayout}
            >
            {getFieldDecorator('sublInstitution')(
              <Input type="text" placeholder="下属机构" />
            )}
          </Form.Item> */}
          <Form.Item
            label="邮箱"
            {...formItemLayout}
            >
            {getFieldDecorator('contactEmail', {
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
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ],
                })(<Input size="large" placeholder="验证码" />)}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
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
            {getFieldDecorator('sublInstitution')(
              <Input size="large" type="text" placeholder="如何称呼您" />
            )}
          </Form.Item>
          <Form.Item
            >
              <Input size="large" type="text" value={data.contactPhone} disabled/>
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
