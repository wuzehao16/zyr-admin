import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Select, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;
const InputGroup = Input.Group;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step1 extends React.PureComponent {
  changePrefix = (value) => {
    this.setState({
      prefix: value,
    });
  };
  checkPhone(rule, value, callback) {
    var regex = /^1[3|4|5|8]\d{9}$/;
    if (value && value.length > 10) {
      //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
      if (regex.test(value)) {
        callback();
      } else {
        callback('请输入正确的手机号码！');
      }
    } else {
      callback();
      //这里的callback函数会报错
    }
  };
  render() {
    const { form, dispatch, data, submitting } = this.props;
    console.log("data",data)
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!/^1[3|4|5|8]\d{9}$/.test(values.userPhone)) {
          form.setFields({
            userPhone: {
              value: values.userPhone,
              errors: [new Error('请输入正确的手机号码！')],
            },
          });
          return
        }
        if (!err) {
          dispatch({
            type: 'register/submitStep1Form',
            payload: {
              ...data,
              ...values,
            },
          });
          // dispatch({
          //   type: 'form/saveStepFormData',
          //   payload: values,
          // });
          // dispatch(routerRedux.push('/user/register/confirm'));
        }
      });
    };
    return (
      <div>
        <h2 className={styles.title}>注册</h2>
        <Divider style={{ margin: '10px 0 24px' }} />
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item>
            <InputGroup compact>
              <Select
                value={data.prefix}
                onChange={this.changePrefix}
                style={{ width: '20%' }}
                size="large"
              >
                <Option value="86">+86</Option>
              </Select>
              {getFieldDecorator('userPhone', {
                rules: [
                  {
                    required: true,
                    message: '请输入手机号!',
                  },
                  {
                    validator: this.checkPhone,
                  },
                  // {
                    // pattern: /^1[3|4|5|8]\d{9}$/,
                  //   message: '手机号格式错误！',
                  //   min: 11
                  // },
                ],
              })(
                <Input
                  size="large"
                  maxLength="11"
                  style={{ width: '80%' }}
                  placeholder="请输入手机号"
                  onPressEnter={onValidateForm}
                />
              )}
            </InputGroup>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 24, offset: 0 },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm} className={styles.step1next} loading={submitting}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.other}>
          已经注册过企业账号，
          <Link className={styles.register} to="/user/login">直接登录</Link>
        </div>
      </div>
    );
  }
}
export default connect(({ register, loading }) => ({
  submitting: loading.effects['register/submitStep1Form'],
  data: register.step,
}))(Step1);
