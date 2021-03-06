import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Select, Button, Card, InputNumber, Icon, Tooltip, Checkbox, Radio, Modal,
} from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TreeSelect from '../../components/TreeSelect';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
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

@connect(({ systemMenu, loading }) => ({
  data: systemMenu,
  submitting: loading.effects['systemMenu/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    modalVisible: false,
    item: {},
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemMenu/fetch',
    });
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
          type: 'systemMenu/add',
          payload: values,
        });
      }
    });
  }

  renderCatalogue() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <FormItem
          {...formItemLayout}
          label="菜单URL"
        >
          {getFieldDecorator('url', {
            rules: [{
              required: true, message: '请输入菜单URL',
            }],
          })(
            <Input placeholder="菜单URL" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="菜单排序"
        >
          {getFieldDecorator('orderNum', {
            rules: [{
              required: true, message: '请输入菜单排序',
            }],
          })(
            <Input min={1} max={10000} type="number" placeholder="请输入菜单排序"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="菜单图标"
          help="获取图标：https://ant.design/components/icon-cn/#header"
        >
          {getFieldDecorator('icon', {
            rules: [{
              required: true, message: '菜单名称或按钮图标',
            }],
          })(
            <Input placeholder="请输入菜单名称或按钮图标" />
          )}
        </FormItem>
      </div>
    );
  }
  renderMenu() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <FormItem
          {...formItemLayout}
          label="菜单URL"
        >
          {getFieldDecorator('url', {
            rules: [{
              required: true, message: '请输入菜单URL',
            }],
          })(
            <Input placeholder="菜单URL" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="授权标识"
        >
          {getFieldDecorator('perms')(
            <Input placeholder="多个用逗号分隔，如：user:list,user:create" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="菜单排序"
        >
          {getFieldDecorator('orderNum', {
            rules: [{
              required: true, message: '请输入菜单排序号',
            }],
          })(
            <Input min={1} max={10000} type="number" placeholder="请输入菜单排序"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="菜单图标"
          help="获取图标：https://ant.design/components/icon-cn/#header"
        >
          {getFieldDecorator('icon', {
            rules: [{
              required: true, message: '菜单名称或按钮图标',
            }],
          })(
            <Input placeholder="请输入菜单名称或按钮图标" />
          )}
        </FormItem>
      </div>
    );
  }
  renderBtn() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem
        {...formItemLayout}
        label="授权标识"
      >
        {getFieldDecorator('perms')(
          <Input placeholder="多个用逗号分隔，如：user:list,user:create" />
        )}
      </FormItem>
    );
  }
  renderForm() {
    switch (this.props.form.getFieldValue('type')) {
      case 0:
        return this.renderCatalogue();
        break;
      case 1:
        return this.renderMenu();
        break;
      case 2:
        return this.renderBtn();
        break;
      default:
    }
  }
  render() {
    const { submitting, data, dispatch } = this.props;
    var treeData = [];
    if (data && data.data && data.data.data) {
        treeData = [data.data.data]
    }
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { modalVisible } = this.state;
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 10 },
      },
    };

    return (
      <PageHeaderLayout title="新增菜单" >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="菜单类型"
            >
              {getFieldDecorator('type', {
                initialValue: 1,
              })(
                <RadioGroup name="type">
                  <Radio value={0}>目录</Radio>
                  <Radio value={1}>菜单</Radio>
                  <Radio value={2}>按钮</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜单名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '菜单名称或按钮名称',
                }],
              })(
                <Input placeholder="请输入菜单名称或按钮名称" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上级菜单"
            >
              {getFieldDecorator('parentId', {
                rules: [{
                  required: true,
                  message: '菜单名称或按钮名称',
                }],
              })(
                <TreeSelect
                  data={treeData}
                  // onChange={this.selectTree}
                  />
              )}
            </FormItem>
            {this.renderForm()}
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 50 }} onClick={() => dispatch(routerRedux.push('/system/menu'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
        {/* <style jsx>{`
          span.ant-select, span.ant-select-enabled {
            width:100%;
          }
        `}
        </style> */}
      </PageHeaderLayout>
    );
  }
}
