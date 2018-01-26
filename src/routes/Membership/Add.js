import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card, InputNumber, Checkbox,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const options = [
  { label: '职能匹配', value: '1' },
  { label: '高阶课程', value: '2' },
];

@connect(({ loading }) => ({
  submitting: loading.effects['membership/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'membership/fetchMenu',
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'membership/add',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
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
      <PageHeaderLayout title="新增会员等级" >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="会员等级"
            >
              {getFieldDecorator('leveName', {
                rules: [{
                  required: true, message: '请输入会员等级',
                }],
              })(
                <Input placeholder="请输入会员等级" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="分润比例"
            >
              {getFieldDecorator('profitRatio', {
                rules: [{
                  required: true, message: '请输入分润比例',
                }],
              })(
                <Input max={100} addonAfter="%" placeholder="请输入分润比例" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="价格/月"
            >
              {getFieldDecorator('levePrice', {
                rules: [{
                  required: true, message: '请输入分润比例',
                }],
              })(
                <Input addonAfter="元" placeholder="请输入分润比例" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="等级权限"
            >
              <CheckboxGroup options={options} defaultValue={['1','2']} disabled/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator('leveSort', {
                rules: [{
                  required: true, message: '请输入排序号',
                }],
              })(
                <InputNumber min={1} style={{ width: '100%' }} placeholder="请输入排序号" />
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
