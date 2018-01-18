import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, Divider, Form, Input } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['resetPassword/reset'],
}))
@Form.create()
export default class LoginPage extends Component {
  // type 1手机 2邮箱
  state = {
    type: '1',
    confirmDirty: false,
    visible: false,
    help: '',
    previewVisible: false,
  }

  onTabChange = (type) => {
    this.setState({ type });
    this.props.form.resetFields();
  }

  handleSubmit = (err, values) => {
    const { type } = this.state;
    console.log(err,values)
    if (!err) {
      this.props.dispatch({
        type: 'resetPassword/reset',
        payload: {
          ...values,
          type,
        },
      });
    }
  }
  getPhoneCaptcha = (err, values) => {
    const { type } = this.state;
    console.log(this)
    this.props.dispatch({
      type: 'resetPassword/getPhoneCaptcha',
      payload: {
        type,
      },
    });
  }
  getEmailCaptcha = (err, values) => {
    const { type } = this.state;
    this.props.dispatch({
      type: 'resetPassword/getEmailCaptcha',
      payload: {
        ...values,
        type,
      },
    });
  }
  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { login, submitting, form } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { type } = this.state;
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
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
    return (
      <div className={styles.main}>
        <h2 className={styles.title}>重置密码</h2>
        <Divider style={{ margin: '10px 0 24px' }} />
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="1" tab="手机号重置密码">
            {
              login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting
            }
            <Mobile name="mobile" />
            <Captcha name="phoneCaptcha" onGetCaptcha={this.getPhoneCaptcha}/>
            <div style={{ marginBottom: 15 }}>设置您的登录密码</div>
            <Form.Item help={this.state.help}>
                {/* <Popover
                  content={
                    <div style={{ padding: '4px 0' }}>
                      {passwordStatusMap[this.getPasswordStatus()]}
                      {this.renderPasswordProgress()}
                      <div style={{ marginTop: 10 }}>
                        请至少输入 6 个字符。请不要使用容易被猜到的密码。
                      </div>
                    </div>
                  }
                  overlayStyle={{ width: 240 }}
                  placement="right"
                  visible={this.state.visible}
                > */}
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        validator: this.checkPassword,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="password"
                      placeholder="至少6位密码，区分大小写"
                    />
                  )}
                {/* </Popover> */}
              </Form.Item>
              {
                this.state.visible
                  ?
                  <div style={{ padding: '4px 0' }}>
                    {passwordStatusMap[this.getPasswordStatus()]}
                    {this.renderPasswordProgress()}
                    <div style={{ marginTop: 10 }}>
                      {/* 请至少输入 6 个字符。请不要使用容易被猜到的密码。 */}
                    </div>
                  </div>
                  : null
              }

              <div style={{ marginBottom: 15 }}>确认您的登录密码</div>
              <Form.Item>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: '请确认密码！',
                    },
                    {
                      validator: this.checkConfirm,
                    },
                  ],
                })(<Input size="large" type="password" placeholder="确认密码" onPressEnter={onValidateForm}/>)}
            </Form.Item>
          </Tab>
          <Tab key="2" tab="邮箱重置密码">
            {
              login.status === 'error' &&
              login.type === 'mobile' &&
              !login.submitting
            }
            <UserName name="userName" placeholder="请输入您的邮箱" />
            <Captcha name="emailCaptcha" onGetCaptcha={this.getEmailCaptcha}/>
            <div style={{ marginBottom: 15 }}>设置您的登录密码</div>
            <Form.Item help={this.state.help}>
                {/* <Popover
                  content={
                    <div style={{ padding: '4px 0' }}>
                      {passwordStatusMap[this.getPasswordStatus()]}
                      {this.renderPasswordProgress()}
                      <div style={{ marginTop: 10 }}>
                        请至少输入 6 个字符。请不要使用容易被猜到的密码。
                      </div>
                    </div>
                  }
                  overlayStyle={{ width: 240 }}
                  placement="right"
                  visible={this.state.visible}
                > */}
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        validator: this.checkPassword,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="password"
                      placeholder="至少6位密码，区分大小写"
                    />
                  )}
                {/* </Popover> */}
              </Form.Item>
              {
                this.state.visible
                  ?
                  <div style={{ padding: '4px 0' }}>
                    {passwordStatusMap[this.getPasswordStatus()]}
                    {this.renderPasswordProgress()}
                    <div style={{ marginTop: 10 }}>
                      {/* 请至少输入 6 个字符。请不要使用容易被猜到的密码。 */}
                    </div>
                  </div>
                  : null
              }

              <div style={{ marginBottom: 15 }}>确认您的登录密码</div>
              <Form.Item>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: '请确认密码！',
                    },
                    {
                      validator: this.checkConfirm,
                    },
                  ],
                })(<Input size="large" type="password" placeholder="确认密码" onPressEnter={onValidateForm}/>)}
            </Form.Item>
          </Tab>
          <Submit loading={submitting}>保存新密码</Submit>
        </Login>
      </div>
    );
  }
}
