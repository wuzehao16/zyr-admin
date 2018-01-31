import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col, Upload, Modal,
} from 'antd';
import moment from 'moment'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
  },
};

@connect(({ ads, loading }) => ({
  ads,
  submitting: loading.effects['ads/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          autoUpTime: fieldsValue.time && fieldsValue.time[0],
          autoDownTime: fieldsValue.time && fieldsValue.time[1],
        };
        this.props.dispatch({
          type: 'ads/add',
          payload: values,
        });
      }
    });
  }
  renderForm() {
    switch (this.props.form.getFieldValue('adsType')) {
      case '11100':
        return this.renderProduct();
        break;
      case '11200':
        return this.renderBanner();
        break;
      case '11300':
        return this.renderTrumpet();
        break;
      case '11400':
        return this.renderBanner();
        break;
      default:
    }
  }
  renderProduct = ()=> {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <FormItem
          {...formItemLayout}
          label="匹配词"
        >
          {getFieldDecorator('adsMatch', {
            rules: [{
              required: true,
              message: '请选择匹配词',
            }],
          })(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
      </div>
    );
  }
  renderBanner = ()=> {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <FormItem
          {...formItemLayout}
          label="内容"
        >
          {getFieldDecorator('adsContent', {
            rules: [{
              required: true,
              message: '请选择内容',
            }],
          })(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="跳转链接"
        >
          {getFieldDecorator('adsUrl')(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
      </div>
    );
  }
  renderTrumpet = ()=> {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <FormItem
          {...formItemLayout}
          label="内容"
        >
          {getFieldDecorator('adsContent', {
            rules: [{
              required: true,
              message: '请选择内容',
            }],
          })(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="跳转链接"
        >
          {getFieldDecorator('adsUrl')(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
      </div>
    );
  }
  render() {
    const { ads: { data, adsType }, submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if (adsType) {
      var adsTypeOptions = adsType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="新增产品">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="广告类型"
            >
              {getFieldDecorator('adsType', {
                rules: [{
                  required: true,
                  message: '请选择广告类型',
                }],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {adsTypeOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('adsTitle', {
                rules: [{
                  required: true,
                  message: '请选择标题',
                }],
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            {this.renderForm()}
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator('adsSort')(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上架状态"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '0',
                })(
                  <Radio.Group>
                    <Radio value="0">待上架</Radio>
                    <Radio value="1">上架</Radio>
                    <Radio value="2">下架</Radio>
                  </Radio.Group>
                )}
                <FormItem
                  style={{
                    display: getFieldValue('public') === '1' ? 'block' : 'none',
                  }}
                  >
                  {getFieldDecorator('time')(
                    <RangePicker
                     // disabledDate={disabledDate}
                     // disabledTime={disabledRangeTime}
                     showTime={{
                       hideDisabledOptions: true,
                       defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                     }}
                     format="YYYY-MM-DD HH:mm:ss"
                   />
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
