import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card,
} from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RoleTree from '../../components/RoleTree';

const FormItem = Form.Item;
@connect(({ systemRole, loading }) => ({
  data: systemRole,
  submitting: loading.effects['systemRole/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/fetchMenu',
    });
  }
  onCheck = (value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      sysMenus: value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.sysMenus) {
          /* eslint-disable no-param-reassign */
          values.sysMenus.forEach((item, index, arr) => {
            arr[index] = { meunId: item };
          });
        } else {
          values.sysMenus = [];
          /* eslint-disable no-param-reassign */
        }
        this.props.dispatch({
          type: 'systemRole/add',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting, data, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
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
      <PageHeaderLayout title="新增角色" >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="角色名称"
            >
              {getFieldDecorator('roleName', {
                rules: [{
                  required: true, message: '请输入角色名称',
                }],
              })(
                <Input placeholder="请输入角色名称" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色等级"
            >
              {getFieldDecorator('grade', {
                rules: [{
                  required: true, message: '请输入角色等级',
                }],
              })(
                <Input type="number" min={1} max={100} placeholder="请输入角色等级" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色备注"
            >
              {getFieldDecorator('remark', {
                rules: [{
                  required: true, message: '请输入角色备注',
                }],
              })(
                <Input placeholder="请输入角色备注" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="功能权限"
            >
              {getFieldDecorator('sysMenus')(
                <RoleTree
                  data={data.menuList}
                  onCheck={this.onCheck}
                />
                )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button onClick={() => dispatch(routerRedux.push('/system/role'))}>
                返回
              </Button>
              <Button type="primary" style={{ marginLeft: 50 }}  htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
