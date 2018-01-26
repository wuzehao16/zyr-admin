import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Select, Button, Card, InputNumber, Icon, Tooltip, Checkbox
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RoleTree from '../../components/RoleTree'
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

@connect(({ systemRole, loading }) => ({
  data:systemRole,
  submitting: loading.effects['systemRole/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  // componentWillMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'systemRole/fetchMenu',
  //   });
  // }
  componentDidMount () {
    const { setFieldsValue } = this.props.form;
    if (this.props.data.item) {
      const item = this.props.data.item;
      var sysMenus = [];
      if (item.sysMenus) {
         sysMenus = item.sysMenus.map(item=>{return item.meunId})
      }
      setFieldsValue({
        remark: item.remark,
        roleId: item.roleId,
        roleName: item.roleName,
        sysMenus: sysMenus,
      })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.sysMenus) {
          values.sysMenus.map((item,index,arr) => {
             arr[index] = {roleId:item}
          })
        }
        this.props.dispatch({
          type: 'systemRole/add',
          payload: values,
        });
      }
    });
  }
  onCheck = (value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      sysMenus: value,
    })
  }
  render() {
    const { submitting, data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('roleId');
    // this.onCheck(getFieldValue('sysMenus'));
    if (data.data.roleList) {
      var RoleOptions = data.data.roleList.map(item => <Checkbox key={item.roleId} value={item.roleId}>{item.roleName}</Checkbox>);
    }
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
              label="备注"
            >
              {getFieldDecorator('remark', {
                rules: [{
                  required: true, message: '怎么可以不输入备注呢',
                }],
              })(
                <Input placeholder="请输入备注" />
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
