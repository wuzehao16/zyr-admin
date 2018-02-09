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
    sm: { span: 7 },
    md: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
  },
};

@connect(({ content, loading }) => ({
  content,
  submitting: loading.effects['content/addColumn'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'content/fetchColumnType',
      payload: {
        type: 'chaClassify'
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue.adsPic)
        const values = {
          ...fieldsValue,
        };
        this.props.dispatch({
          type: 'content/addColumn',
          payload: values,
        });
      }
    });
  }

  render() {
    const { content: { data, columnType }, submitting, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const columnTypeOptions = columnType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="新增栏目">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            // hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="栏目分类"
            >
              {getFieldDecorator('channelType', {
                rules: [{
                  required: true,
                  message: '请选择栏目分类',
                }],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {columnTypeOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="栏目名称"
            >
              {getFieldDecorator('channelName', {
                rules: [{
                  required: true,
                  message: '请输入栏目名称',
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator('adsSort', {
                rules: [{
                  required: true,
                  message: '请输入排序',
                }],
              })(
                <Input min={1} max={10000} type="number" placeholder="请输入"/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="是否显示"
            >
              {getFieldDecorator('channelDisplay', {
                initialValue: 1
              })(
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={() => dispatch(routerRedux.push('/content/column'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
