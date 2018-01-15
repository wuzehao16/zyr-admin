import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
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

  onTabChange = (type) => {
    this.setState({ type });
  }

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
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
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="账户密码登录">
            {
              login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')
            }
            <UserName name="loginAccount" placeholder="手机/用户名/邮箱" />
            <Password name="loginPassword" placeholder="请输入密码" />
          </Tab>
          <Tab key="mobile" tab="后台账号登录">
            {
              login.status === 'error' &&
              login.type === 'mobile' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')
            }
            <UserName name="userName" placeholder="手机/用户名/邮箱" />
            <Password name="password" placeholder="请输入密码" />
          </Tab>
          <Submit loading={submitting}>登录</Submit>
          <div>
            {/* <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox> */}
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div>

          <div className={styles.other}>
            如果你还又没账号，
            {/* <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" /> */}
            <Link  to="/user/register">注册账户</Link>
          </div>
        </Login>
      </div>
    );
  }
}
