import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col, Upload, Modal, message
} from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UploadPicture from '../../components/UploadPicture'
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ institution, loading }) => ({
  institution,
  submitting: loading.effects['institution/add'],
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
      type: 'institution/fetchCity',
      payload: {
        type: 'city'
      }
    });
    dispatch({
      type: 'institution/fetchInstitutionType',
      payload: {
        type: 'orgType'
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
        };
        this.props.dispatch({
          type: 'institution/add',
          payload: values,
        });
      }
    });
  }
  getInstitution = (code) => {
    this.props.dispatch({
      type: 'institution/getInstitution',
      payload: {
        cityCode: code
      },
    });
  }
  getSubInstitution = (code) => {
    this.props.dispatch({
      type: 'institution/getSubInstitution',
      payload: {
        parentId: code
      },
    });
  }
  handleUpload = v => {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    getFieldDecorator('manageLogoId')
    if (v[0] && v[0].response) {
      const res = v[0].response;
      if ( res.code === 0) {
        setFieldsValue({
          manageLogoId: res.data.match(/ima[^\n]*Ex/)[0].slice(0,-3)
        })
      }
    }
  }
  render() {
    const { institution: { data, city, institutionType, institutionList, subInstitutionList }, submitting, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fileList, previewVisible,previewImage } = this.state;
    const cityOptions = city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    const institutionTypeOptions = institutionType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    const institutionListOptions = institutionList.map(item => <Option key={item.sublInstitution} value={item.sublInstitution}>{item.manageName}</Option>);
    const subInstitutionListOptions = subInstitutionList.map(item => <Option key={item.manageId} value={item.manageId}>{item.manageName}</Option>);
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
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <PageHeaderLayout title="新增机构">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="机构类型">
                  {getFieldDecorator('institutionCode', {
                    rules: [{
                      required: true, message: '请选择机构类型',
                    }],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                    { institutionTypeOptions }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="所在城市">
                  {getFieldDecorator('cityCode', {
                    rules: [{
                      required: true, message: '请选择算在城市',
                    }],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }} onChange={this.getInstitution}>
                      {cityOptions}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            {
              ((value = getFieldValue('institutionCode'))=> {
                switch(value){
                 case '1':
                  return <div>
                          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={12} sm={24}>
                              <FormItem
                                {...formItemLayout}
                                 label="银行名称">
                                {getFieldDecorator('sublInstitution')(
                                  <Select placeholder="请选择" style={{ width: '100%' }} onChange={this.getSubInstitution}>
                                  { institutionListOptions }
                                  </Select>
                                )}
                              </FormItem>
                            </Col>
                            <Col md={12} sm={24}>
                              <FormItem
                                {...formItemLayout}
                                 label="下属机构">
                                {getFieldDecorator('manageId')(
                                  <Select placeholder="请选择" style={{ width: '100%' }} >
                                    { subInstitutionListOptions }
                                  </Select>
                                )}
                              </FormItem>
                            </Col>
                          </Row>
                         </div>
                  case '2':
                    return <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={12} sm={24}>
                              <Form.Item
                                label="机构名称"
                                {...formItemLayout}
                               >
                                {getFieldDecorator('manageName',{
                                  rules: [
                                    {
                                      required: true,
                                      message: '机构名称',
                                    },
                                  ],
                                })(
                                  <Input
                                    placeholder="机构名称"
                                  />
                                )}
                              </Form.Item>
                            </Col>
                          </Row>
                  case '3':
                  return <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                          <Col md={12} sm={24}>
                            <Form.Item
                              label="机构名称"
                              {...formItemLayout}
                             >
                              {getFieldDecorator('manageName',{
                                rules: [
                                  {
                                    required: true,
                                    message: '机构名称',
                                  },
                                ],
                              })(
                                <Input
                                  placeholder="机构名称"
                                />
                              )}
                            </Form.Item>
                          </Col>
                        </Row>
                    default:
                      return null
              }
            })()
            }
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="邮箱">
                  {getFieldDecorator('userEmail',{
                    rules: [{
                        type: 'email',
                        message: '请输入合法的邮箱',
                    }, {
                      required: true, message: '请输入邮箱',
                    }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="手机号">
                  {getFieldDecorator('userPhone',{
                    rules: [{
                      required: true, message: '请输入手机号',
                    },{
                      pattern: /^1[3|4|5|8]\d{9}$/,
                      message: '手机号格式错误！',
                    },],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>

              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="排序">
                  {getFieldDecorator('sort')(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="启用状态">
                  {getFieldDecorator('startStatus',{
                    rules: [{
                      required: true, message: '请选择是否启用',
                    }],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">禁用</Option>
                      <Option value="1">启用</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="机构logo">
                     <UploadPicture onChange={this.handleUpload}/>

                   {/* <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                     <img alt="example" style={{ width: '100%' }} src={previewImage} />
                   </Modal> */}
                </FormItem>
              </Col>
            </Row>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={() => dispatch(routerRedux.push('/institution'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
