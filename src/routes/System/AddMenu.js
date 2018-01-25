import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Select, Button, Card, InputNumber, Icon, Tooltip, Checkbox, Radio, Modal
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Treebeard from "../../components/Treebeard"
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
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

@connect(({ systemMenu, loading }) => ({
  data:systemMenu,
  submitting: loading.effects['systemMenu/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    modalVisible: false,
    item: {}
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemUser/fetch',
    });
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
          type: 'systemMenu/add',
          payload: newValue,
        });
        newValue = {}
      }
    });
  }
  onChange = (value) => {
    console.log(value)
  }
  handleModalVisible = (flag) => {
    const { form } = this.props;
    this.setState({
      modalVisible: !!flag,
      // isAdd: true,
    });
  }
  handleAdd = () => {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const { item } = this.state;
    this.handleModalVisible();
    getFieldDecorator('parentId')
    setFieldsValue({
      parentName: item.name,
      parentId: item.meunId,
    })
  }
  onToggle = (item) => {
    const { getFieldDecorator } = this.props.form;
    this.setState({
      item: item,
    })
  }
  renderCatalogue() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <FormItem
          {...formItemLayout}
          label="排序号"
         >
          {getFieldDecorator('orderNum', {
            rules: [{
              required: true, message: '请输入排序号',
            }],
          })(
            <InputNumber style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图标"
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
          label="排序号"
         >
          {getFieldDecorator('orderNum', {
            rules: [{
              required: true, message: '请输入排序号',
            }],
          })(
            <InputNumber style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图标"
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
        {getFieldDecorator('"perms')(
          <Input placeholder="多个用逗号分隔，如：user:list,user:create" />
        )}
      </FormItem>
    );
  }
  renderForm() {
    switch (this.props.form.getFieldValue('type')) {
      case 0:
        return  this.renderCatalogue();
        break;
      case 1:
        return  this.renderMenu();
        break;
      case 2:
        return  this.renderBtn();
        break;
      default:

    }
  }
  onClick(v) {
    console.log(v)
  }
  render() {
    const { submitting, data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { modalVisible } = this.state;
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
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
              label="类型"
              >
              {getFieldDecorator('type', {
                initialValue:1
              })(
                <RadioGroup name="type">
                  <Radio value={0}>目录</Radio>
                  <Radio value={1}>菜单</Radio>
                  <Radio value={2}>按钮</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <Modal
              title="选择上级菜单"
              visible={modalVisible}
              onOk={this.handleAdd}
              onCancel={() => this.handleModalVisible()}
            >
              <Form>
                <Treebeard
                  data={data}
                  onToggle={this.onToggle}
                />
              </Form>
            </Modal>

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
              {getFieldDecorator('parentName', {
                rules: [{
                  required: true, message: '菜单名称或按钮名称',
                }],
              })(
                <Input placeholder="请输入菜单名称或按钮名称" onClick={() => this.handleModalVisible(true)}/>
              )}
            </FormItem>
            {this.renderForm()}
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