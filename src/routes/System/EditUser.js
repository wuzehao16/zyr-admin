import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Select, Button, Card, InputNumber, Icon, Tooltip, Checkbox
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

@connect(({systemUser, loading }) => ({
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
  //     loginpassord: Form.createFormField(item.loginpassord),
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
  componentWillMount () {
    this.queryAllRole();
  }
  queryAllRole = () => {
    this.props.dispatch({
      type: 'systemUser/queryAllRole',
    });
  }
  componentDidMount () {
    const { setFieldsValue } = this.props.form;
    if (this.props.data.data.item) {
      const item = this.props.data.data.item;
      var sysRoles = [];
      if (item.sysRoles) {
         sysRoles = item.sysRoles.map(item=>{return item.roleId})
      }
      setFieldsValue({
        loginAccount: item.loginAccount,
        loginpassord: item.loginpassord,
        userName: item.userName,
        islock: item.islock,
        userId: item.userId,
        sysRoles: sysRoles,
      })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let newValue = values;
      if (newValue.sysRoles) {
        newValue.sysRoles.map((item,index,arr) => {
           arr[index] = {roleId:item}
        })
      }

      if (!err) {
        this.props.dispatch({
          type: 'systemUser/update',
          payload: newValue,
        });
        newValue = {}
      }
    });
  }
  onChange = (value) => {
    console.log(value)
  }
  render() {
    const { submitting, data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if (data.data.roleList) {
      var RoleOptions = data.data.roleList.map(item => <Checkbox key={item.roleId} value={item.roleId}>{item.roleName}</Checkbox>);
    }
    getFieldDecorator('userId')
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
                <Input placeholder="请输入用户账号" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户密码"
            >
              {getFieldDecorator('loginpassord', {
                rules: [{
                  required: true, message: '请输入用户密码',
                }],
              })(
                <Input placeholder="请输入用户密码" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户姓名"
            >
              {getFieldDecorator('userName', {
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
              {getFieldDecorator('islock',{
                rules: [{
                  required: true, message: '请选择是否锁定用户',
                }],
              })(
                <Select
                  placeholder="请选择是否锁定用户"
                >
                  <Option value="0">否</Option>
                  <Option value="1">是</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否锁定"
              >
              {getFieldDecorator('sysRoles')(
                <CheckboxGroup  onChange={this.onChange} >
                  {RoleOptions}
                </CheckboxGroup>

              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              {/* <Button style={{ marginLeft: 8 }}>保存</Button> */}
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
