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
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

@connect(({ loading }) => ({
  submitting: loading.effects['systemUser/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
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
          type: 'form/submitRegularForm',
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
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    console.log(this , "edituser")
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
              {getFieldDecorator('sysRoles', {
                initialValue:['Pear']
              })(
                <CheckboxGroup options={options} onChange={this.onChange} />
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
