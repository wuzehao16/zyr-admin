import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, Row, Col, } from 'antd';
import { routerRedux } from 'dva/router';
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

@Form.create()
class Step2 extends React.PureComponent {
  state = {
    count: 0,
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidMount = () => {
    this.onGetCaptcha();
  };
  onGetCaptcha = () => {
    this.props.dispatch({
      type: 'register/getPhoneCaptcha',
      payload: {
        ...this.props.data,
      },
    });
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
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { count } = this.state;
    // const onPrev = () => {
    //   dispatch(routerRedux.push('/form/step-form'));
    // };
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'register/submitStep2Form',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (
      <div>
        <h2 className={styles.title}>注册</h2>
        <Divider style={{ margin: '10px 0 24px' }} />
        <div style={{marginLeft: 8}}>已向{data.userPhone}发送短信，请输入四位验证码</div>
        <Form layout="horizontal" className={styles.stepForm}>
          <Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ],
                })(<Input size="large" placeholder="验证码" onPressEnter={onValidateForm}/>)}
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
          <Form.Item
            style={{ marginBottom: 8 }}
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 24, offset: 0 },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm} loading={submitting} className={styles.step1next}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(({ register, loading }) => ({
  submitting: loading.effects['register/submitStepForm'],
  data: register.step,
}))(Step2);
