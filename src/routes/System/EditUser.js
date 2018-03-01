import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Select, Button, Card, InputNumber, Icon, Tooltip, Checkbox,
} from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

@connect(({ systemUser, loading }) => ({
  data: systemUser,
  submitting: loading.effects['systemUser/update'],
}))
@Form.create({
  // mapPropsToFields(props) {
  //   console.log('mapPropsToFields', props);
  //   const item = props.data.data.item;
  //   console.log(item.loginAccount)
  //   return {
  //     loginAccount: Form.createFormField(item.loginAccount),
  //     loginPassord: Form.createFormField(item.loginPassord),
  //     userName: Form.createFormField(item.userNames),
  //     islock: Form.createFormField(item.islock),
  //     userId: Form.createFormField(item.islock),
  //   };
  // },
  // onFieldsChange(props, fields) {
  //   console.log('onFieldsChange', fields);
  //   props.dispatch({
  //     type: 'save_fields',
  //     payload: fields,
  //   });
  // },
  //  onValuesChange(_, values) {
  //   console.log(values);
  // },
})
export default class BasicForms extends PureComponent {
  componentWillMount() {
    this.queryAllRole();
  }
  queryAllRole = () => {
    this.props.dispatch({
      type: 'systemUser/queryAllRole',
    });
  }
  componentDidMount() {
    const { getFieldDecorator,setFieldsValue } = this.props.form;
    if (this.props.data.data.item) {
      const item = this.props.data.data.item;
      let sysRoles = [];
      if (item.sysRoles) {
        sysRoles = item.sysRoles.map((item) => { return item.roleId; });
      }
      getFieldDecorator('userName')
      getFieldDecorator('islock')
      setFieldsValue({
        loginAccount: item.loginAccount,
        loginPassord: item.loginPassord,
        userName: item.userName,
        islock: item.islock,
        userId: item.userId,
        userIdentity: item.userIdentity,
        sysRoles,
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.sysRoles) {
          values.sysRoles.map((item, index, arr) => {
            arr[index] = { roleId: item };
          });
        }
        this.props.dispatch({
          type: 'systemUser/update',
          payload: values,
        });
      }
    });
  }
  onChange = (value) => {
    console.log(value);
  }
  render() {
    const { submitting, data:{ data}, data:{ data: { item } },  dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if (data.roleList) {
      var RoleOptions = data.roleList.map(item => <Checkbox key={item.roleId} value={item.roleId}>{item.roleName}</Checkbox>);
    }
    getFieldDecorator('userId');
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="修改用户" >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="用户账号"
            >
              {getFieldDecorator('loginAccount', {
                rules: [{
                  required: true, message: '请输入用户账号',
                }],
              })(
                <Input placeholder="请输入用户账号" disabled />
              )}
            </FormItem>
            {
              getFieldValue('userIdentity') === 0
                ? <div>
                  <FormItem
                    {...formItemLayout}
                    label="用户密码"
                  >
                    {getFieldDecorator('loginPassord')(
                      <Input type="password" placeholder="请输入用户密码" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="用户姓名"
                  >
                    {getFieldDecorator('userName', {
                      // initialValue: item.userName,
                      rules: [{
                        required: true, message: '请输入用户姓名',
                      }],
                    })(
                      <Input placeholder="请输入用户姓名" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="是否锁定"
                  >
                    {getFieldDecorator('islock', {
                      // initialValue: item.islock,
                      rules: [{
                        required: true, message: '请选择是否锁定用户',
                      }],
                    })(
                      <Select
                        placeholder="请选择是否锁定用户"
                      >
                        <Option value={0}>是</Option>
                        <Option value={1}>否</Option>
                      </Select>
                    )}
                  </FormItem>
                </div> : null
            }
            <FormItem
              {...formItemLayout}
              label="用户权限"
            >
              {getFieldDecorator('sysRoles')(
                <CheckboxGroup onChange={this.onChange} >
                  {RoleOptions}
                </CheckboxGroup>

              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={() => dispatch(routerRedux.push('/system/user'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
