import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider, Progress } from 'antd';
import styles from './style.less';

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  pool: <div className={styles.error}>强度：短</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  pool: 'exception',
};

@Form.create()
class Step3 extends React.PureComponent {
  state = {
    confirmDirty: false,
    visible: false,
    help: '',
  };
  checkPass = (s) => {
    // if (s.length < 8) {
    //   return 0;
    // }
    let ls = 0;
    if (s.match(/([a-z])+/)) {
      ls += 1;
    }
    if (s.match(/([0-9])+/)) {
      ls += 1;
    }
    if (s.match(/([A-Z])+/)) {
      ls += 1;
    }
    if (s.match(/[^a-zA-Z0-9]+/)) {
      ls += 1;
    }
    return ls
  }
  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('loginPassword');
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
        visible: !!value,
      });
      callback('error');
    } else if(this.checkPass(value) < 2){
      this.setState({
        help: '请输入6-24位字母、数字或“_”,两种以上',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (value.length < 6) {
        callback('error');
      } else {
        if (!this.state.visible) {
          this.setState({
            visible: !!value,
          });
        }
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };
  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('loginPassword');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          style={{width:230}}
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('loginPassword')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
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
      <div>
        <h2 className={styles.title}>注册</h2>
        <Divider style={{ margin: '10px 0 24px' }} />
        <Form layout="horizontal" className={styles.stepForm}>
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
                {getFieldDecorator('loginPassword', {
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
  submitting: loading.effects['register/submitStep3Form'],
  data: register.step,
}))(Step3);
