import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col, Upload, Modal,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ product, loading }) => ({
  product,
  submitting: loading.effects['product/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
        };
        this.props.dispatch({
          type: 'product/add',
          payload: values,
        });
      }
    });
  }
  getInstitution = (code) => {
    this.props.dispatch({
      type: 'product/getInstitution',
      payload: {
        cityCode: code
      },
    });
  }
  getSubInstitution = (code) => {
    this.props.dispatch({
      type: 'product/getSubInstitution',
      payload: {
        parentId: code
      },
    });
  }
  render() {
    const { product: { data, city, institutionType, institutionList, subInstitutionList }, submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if (city) {
      var cityOptions = city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (institutionType) {
      var institutionTypeOptions = institutionType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (institutionList) {
      var institutionListOptions = institutionList.map(item => <Option key={item.manageId} value={item.manageId}>{item.manageName}</Option>);
    }
    if (subInstitutionList) {
      var subInstitutionListOptions = subInstitutionList.map(item => <Option key={item.sublInstitution} value={item.sublInstitution}>{item.manageName}</Option>);
    }
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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="新增产品">
        <Card bordered={false}>

        </Card>
      </PageHeaderLayout>
    );
  }
}
