import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, Divider } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = Login;
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  }

  handleSubmit = (err, values) => {
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <h2 className={styles.title}>登陆</h2>
        <Divider style={{ margin: '10px 0 24px' }} />
        <p className={styles.subtitle}>请输入您的账号、密码登陆</p>
        <Login
          onSubmit={this.handleSubmit}
          defaultActiveKey={type}
          className={styles.tabtitle}
        >
          {/* <Tab key="account" tab="账户密码登录">
            {
              login.status === 'error' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')
            }
            <UserName name="loginAccount" placeholder="手机/用户名/邮箱" />
            <Password name="loginPassword" placeholder="请输入密码" />
          </Tab> */}
          <UserName name="loginAccount" placeholder="手机/用户名/邮箱" maxLength="24"/>
          <Password name="loginPassord" placeholder="请输入密码" />
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <Link style={{ float: 'right' }} to="/user/reset-password">忘记密码</Link>
          </div>
            <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            如果您还没有账号，
            {/* <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" /> */}
            <Link className={styles.register} to="/user/register">注册账户</Link>
          </div>
        </Login>
      </div>
    );
  }
}
