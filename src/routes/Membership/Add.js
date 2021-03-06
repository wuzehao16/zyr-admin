import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form, Input, Button, Card, InputNumber, Checkbox,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const options = [
  { label: '智能匹配', value: '1' },
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
          payload: {...values,levePower:'智能匹配、高阶'},
        });
      }
    });
  }
  render() {
    const { submitting, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 6, offset: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 6 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 10 },
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
                <Input type="string" maxLength="10" placeholder="请输入会员等级" />
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
                <Input type="number" min={0} max={100} addonAfter="%" placeholder="请输入分润比例" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="价格/月"
            >
              {getFieldDecorator('levePrice', {
                rules: [{
                  required: true, message: '请输入价格',
                }],
              })(
                <Input type="number" step="0.01" min={0} max={10000} addonAfter="元" placeholder="请输入价格" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="等级权限"
            >
              <CheckboxGroup options={ options } defaultValue={ ['1', '2'] } disabled/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="会员排序"
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
              <Button onClick={() => dispatch(routerRedux.push('/membership'))}>
                返回
              </Button>
              <Button  style={{ marginLeft: 50 }} type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
