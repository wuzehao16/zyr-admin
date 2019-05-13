import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form, Input, Select, Button, Card, InputNumber, Icon, Tooltip, Checkbox,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

@connect(({ systemUser, loading }) => ({
  data: systemUser,
  submitting: loading.effects['systemUser/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentWillMount() {
    this.queryAllRole();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var newValues = [];
          newValues = JSON.parse(JSON.stringify(values))
          newValues.sysRoles.map((item, index, arr) => {
            arr[index] = { roleId: item };
          });
        this.props.dispatch({
          type: 'systemUser/add',
          payload: newValues,
        });
      }
    });
  }
  queryAllRole = () => {
    this.props.dispatch({
      type: 'systemUser/queryAllRole',
    });
  }
  render() {
    const { submitting, data, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if (data.data.roleList) {
      var RoleOptions = data.data.roleList.map(item => <Checkbox key={item.roleId} value={item.roleId}>{item.roleName}</Checkbox>);
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 8 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 10 },
      },
    };

    return (
      <PageHeaderLayout title="新增用户" >
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
              {getFieldDecorator('loginPassord', {
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
              {getFieldDecorator('islock', {
                rules: [{
                  required: true, message: '请选择是否锁定用户',
                }],
              })(
                <Select
                  placeholder="请选择是否锁定用户"
                >
                  <Option value="0">是</Option>
                  <Option value="1">否</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户权限"
            >
              {getFieldDecorator('sysRoles')(
                <CheckboxGroup  >
                  {RoleOptions}
                </CheckboxGroup>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 50 }} onClick={() => dispatch(routerRedux.push('/system/user'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
