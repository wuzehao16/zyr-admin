import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {
  Checkbox,
  Alert,
  Icon,
  Divider,
  Form,
  Input,
  Progress
} from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const {
  Tab,
  UserName,
  Password,
  Mobile,
  Captcha,
  Submit
} = Login;

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  pool: <div className={styles.error}>强度：弱</div>
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  pool: 'exception'
};

@connect(({login, loading}) => ({login, submitting: loading.effects['resetPassword/reset']}))
@Form.create()
export default class LoginPage extends Component {
  // type 1手机 2邮箱
  state = {
    type: '1',
    userEmail: '',
    userPhone: '',
    confirmDirty: false,
    visible: false,
    help: '',
    previewVisible: false
  }

  onTabChange = (type) => {
    this.setState({type});
    this.props.form.resetFields();
  }

  handleSubmit = (err, values) => {
    const {type} = this.state;
    const {form} = this.props;
    const password = form.getFieldValue('password');
    this.props.form.validateFields((err) => {
      if (!err) {
        var newvalues = {}
        newvalues.code = values.phoneCaptcha
          ? values.phoneCaptcha
          : values.emailCaptcha
        newvalues.myPhonerEmail = values.userPhone
          ? values.userPhone
          : values.userEmail
        this.props.dispatch({
          type: 'resetPassword/reset',
          payload: {
            ...newvalues,
            type,
            password
          }
        });
      }
    });
    // if (!err) {
    //   this.props.dispatch({
    //     type: 'resetPassword/reset',
    //     payload: {
    //       ...values,
    //       type,
    //       password,
    //     },
    //   });
    // }
  }
  getPhoneCaptcha = (userPhone) => {
    this.props.dispatch({type: 'resetPassword/getPhoneCaptcha', payload: {
        userPhone
      }});
  }
  getEmailCaptcha = (userEmail) => {
    this.props.dispatch({type: 'resetPassword/getEmailCaptcha', payload: {
        userEmail
      }});
  }
  renderMessage = (content) => {
    return (<Alert style={{
        marginBottom: 24
      }} message={content} type="error" showIcon="showIcon"/>);
  }
  checkPass = (s) => {
    // if (s.length < 8) {
    //   return 0;
    // }
    let ls = 0;
    if (s.match(/([a-z])+/)) {
      ls++;
    }
    if (s.match(/([0-9])+/)) {
      ls++;
    }
    if (s.match(/([A-Z])+/)) {
      ls++;
    }
    if (s.match(/[^a-zA-Z0-9]+/)) {
      ls++;
    }
    return ls

  }
  getPasswordStatus = () => {
    const {form} = this.props;
    const value = form.getFieldValue('password');
    if (value && this.checkPass(value) > 3 && value.length > 7) {
      return 'ok';
    }
    if (value && this.checkPass(value) > 2 && value.length > 8) {
      return 'ok';
    }
    if (value && this.checkPass(value) > 1 && value.length > 9) {
      return 'ok';
    }
    if (value && this.checkPass(value) > 3 && value.length > 6) {
      return 'pass';
    }
    if (value && this.checkPass(value) > 2 && value.length > 6) {
      return 'pass';
    }
    if (value && this.checkPass(value) > 1 && value.length > 7) {
      return 'pass';
    }
    return 'pool';
  };
  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value
      });
      callback('error');
    } else if (this.checkPass(value) < 2 || value.length < 6) {
      this.setState({
        help: '请输入6-24位字母、数字或“_”,两种以上',
        visible: !!value
      });
      callback('error');
    } else {
      this.setState({help: ''});
      if (value.length < 6) {
        callback('error');
      } else {
        if (!this.state.visible) {
          this.setState({
            visible: !!value
          });
        }
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], {force: true});
        }
        callback();
      }
    }
  };
  renderPasswordProgress = () => {
    const {form} = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length
      ? (<div className={styles[`progress-${passwordStatus}`]}>
        <Progress style={{
            width: 230
          }} status={passwordProgressMap[passwordStatus]} className={styles.progress} strokeWidth={6} percent={value.length * 10 > 100
            ? 100
            : value.length * 10} showInfo={false}/>
      </div>)
      : null;
  };
  checkConfirm = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  };
  render() {
    const {login, submitting, form} = this.props;
    const {getFieldDecorator, validateFields} = form;
    const {type} = this.state;
    return (<div className={styles.main}>
      <h2 className={styles.title}>重置密码</h2>
      <Divider style={{
          margin: '10px 0 24px'
        }}/>
      <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
        <Tab key="1" tab="手机号重置密码">
          {login.status === 'error' && login.type === 'account' && !login.submitting}
          <Mobile name="userPhone" maxLength="11"/>
          <Captcha name="phoneCaptcha" onGetCaptcha={this.getPhoneCaptcha}/>
          <div style={{
              marginBottom: 15
            }}>设置您的登录密码</div>
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
                > */
            }
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword
                  }
                ]
              })(<Input size="large" type="password" maxLength="24" placeholder="至少6位密码，区分大小写"/>)
            }
            {/* </Popover> */}
          </Form.Item>
          {
            this.state.visible
              ? <div style={{
                    padding: '4px 0'
                  }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{
                      marginTop: 10
                    }}>
                    {/* 请至少输入 6 个字符。请不要使用容易被猜到的密码。 */}
                  </div>
                </div>
              : null
          }

          <div style={{
              marginBottom: 15
            }}>确认您的登录密码</div>
          <Form.Item>
            {
              getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码！'
                  }, {
                    validator: this.checkConfirm
                  }
                ]
              })(<Input size="large" maxLength="24" type="password" placeholder="确认密码"/>)
            }
          </Form.Item>
        </Tab>
        <Tab key="2" tab="邮箱重置密码">
          {login.status === 'error' && login.type === 'mobile' && !login.submitting}
          <UserName name="userEmail" placeholder="请输入您的邮箱"/>
          <Captcha name="emailCaptcha" onGetCaptcha={this.getEmailCaptcha}/>
          <div style={{
              marginBottom: 15
            }}>设置您的登录密码</div>
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
                > */
            }
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword
                  }
                ]
              })(<Input size="large" type="password" maxLength="24" placeholder="至少6位密码，区分大小写"/>)
            }
            {/* </Popover> */}
          </Form.Item>
          {
            this.state.visible
              ? <div style={{
                    padding: '4px 0'
                  }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{
                      marginTop: 10
                    }}>
                    {/* 请至少输入 6 个字符。请不要使用容易被猜到的密码。 */}
                  </div>
                </div>
              : null
          }

          <div style={{
              marginBottom: 15
            }}>确认您的登录密码</div>
          <Form.Item>
            {
              getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码！'
                  }, {
                    validator: this.checkConfirm
                  }
                ]
              })(<Input size="large" maxLength="24" type="password" placeholder="确认密码"/>)
            }
          </Form.Item>
        </Tab>
        <Submit loading={submitting}>保存新密码</Submit>
      </Login>
    </div>);
  }
}
