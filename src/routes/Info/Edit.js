import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
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
    sm: { span: 12 },
    md: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 9 },
  },
};

@connect(({ info, loading }) => ({
  info,
  submitting: loading.effects['info/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          autoUpTime: fieldsValue.time && moment(fieldsValue.time[0]).local(),
          autoDownTime: fieldsValue.time && moment(fieldsValue.time[1]).local(),
        };
        this.props.dispatch({
          type: 'info/update',
          payload: values,
        });
      }
    });
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }
  render() {
    const { info: { data, mesType, item }, submitting, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('paltforMsgId', {
      initialValue: item.paltforMsgId,
    })
    var mesTypeOptions = mesType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 10 },
      },
    };

    return (
      <PageHeaderLayout title="编辑系统通知">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            // hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="消息类型"
            >
              {getFieldDecorator('paltforMsgType', {
                initialValue:item.paltforMsgType,
                rules: [{
                  required: true,
                  message: '请选择消息类型',
                }],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {mesTypeOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="消息标题"
            >
              {getFieldDecorator('paltforMsgTitle', {
                initialValue: item.paltforMsgTitle,
                rules: [{
                  required: true,
                  message: '请输入标题',
                }],
              })(
                <Input maxLength="30" placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="消息内容"
            >
              {getFieldDecorator('paltforMsgContent', {
                initialValue: item.paltforMsgContent,
                rules: [{
                  required: true,
                  message: '请输入内容',
                }],
              })(
                <Input.TextArea rows={4} maxLength="200" placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上架状态"
            >
              {getFieldDecorator('unlockStatus', {
                initialValue: item.unlockStatus,
                rules: [{
                  required: true,
                  message: '请选择上架状态',
                }],
              })(
                <Select  placeholder="请选择">
                  <Option value={1}>上架</Option>
                  <Option value={2}>下架</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 50 }} onClick={() => dispatch(routerRedux.push('/info/notification'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
