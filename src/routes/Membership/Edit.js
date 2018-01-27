import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form, Input, Button, Card, Checkbox, InputNumber,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group
const options = [
  { label: '智能匹配', value: '1' },
  { label: '高阶课程', value: '2' },
];

@connect(({ membership, loading }) => ({
  data: membership,
  submitting: loading.effects['membership/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    if (this.props.data.item) {
      const { item } = this.props.data;
      setFieldsValue({
        leveName: item.leveName,
        levePrice: item.levePrice,
        leveSort: item.leveSort,
        profitRatio: item.profitRatio*100,
        leveId: item.leveId,
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
        this.props.dispatch({
          type: 'membership/update',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting, data, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('leveId');
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
      <PageHeaderLayout title="编辑会员等级" >
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
                <Input maxLength='10' placeholder="请输入会员等级" />
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
                <Input type="number" min={0} addonAfter="元" placeholder="请输入价格" />
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
              <Button style={{ marginLeft: 16 }} onClick={() => dispatch(routerRedux.push('/membership'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
