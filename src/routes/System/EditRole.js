import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card,
} from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RoleTree from '../../components/RoleTree1';

const FormItem = Form.Item;

@connect(({ systemRole, loading }) => ({
  data: systemRole,
  submitting: loading.effects['systemRole/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    if (this.props.data.item) {
      const { item } = this.props.data;
      let sysMenus = [];
      if (item.sysMenus) {
        sysMenus = item.sysMenus.map((m) => {
          return m.meunId;
        });
      }
      setFieldsValue({
        remark: item.remark,
        roleId: item.roleId,
        roleName: item.roleName,
        sysMenus,
      });
    }
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
          if (values.sysMenus) {
            values.sysMenus.forEach((item, index, arr) => {
              arr[index] = { meunId: item };
            });
          }
          /* eslint-disable no-param-reassign */
        }
        this.props.dispatch({
          type: 'systemRole/update',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting, data, data:{ item }, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('roleId');
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
      <PageHeaderLayout title="编辑角色" >
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
                initialValue: item.grade,
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
                  defaultCheckedKeys={getFieldValue('sysMenus')}
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
