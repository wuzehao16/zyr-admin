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
  render() {
    const { form, dispatch, data, submitting } = this.props;
    console.log("data",data)
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
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
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ],
              })(
                <Input
                  size="large"
                  style={{ width: '80%' }}
                  placeholder="请输入手机号"
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
