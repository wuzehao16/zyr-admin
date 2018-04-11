import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form, Input, DatePicker, Button, Card, Radio, Icon, Tooltip, Row, Col, Checkbox
} from 'antd';
import moment from 'moment'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UploadPicture from '../../components/UploadPicture';
import styles from './style.less';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 5 },
  },
};

@connect(({ match, loading }) => ({
  match,
  submitting: loading.effects['match/add'],
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
      type: 'match/fetchAdsType',
      payload: {
        type: 'matchType'
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          autoUpTime: fieldsValue.time && moment(fieldsValue.time[0]).local(),
          autoDownTime: fieldsValue.time && moment(fieldsValue.time[1]).local(),
          matchPic: fieldsValue.matchPic,
        };
        this.props.dispatch({
          type: 'match/add',
          payload: values,
        });
      }
    });
  }


  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }
  render() {
    const { match: { data, matchType }, submitting, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const options = [
      { label: 'Apple', value: '1' },
      { label: 'Pear', value: '2' },
      { label: 'Orange', value: '3' },
    ];
    return (
      <PageHeaderLayout title="新增模型">
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
              {getFieldDecorator('matchType', {
                rules: [{
                  required: true,
                  message: '请选择广告类型',
                }],
              })(
                <CheckboxGroup options={options} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="广告类型"
            >
              {getFieldDecorator('matchType', {
                rules: [{
                  required: true,
                  message: '请选择广告类型',
                }],
              })(
                <CheckboxGroup options={options} />
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={() => dispatch(routerRedux.push('/match'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
