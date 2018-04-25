import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col, Upload, Modal,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UploadPicture from '../../components/UploadPicture';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ institution, loading }) => ({
  institution,
  submitting: loading.effects['institution/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  componentDidMount() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    if (this.props.institution.item) {
      const { item } = this.props.institution;
      getFieldDecorator('institutionId');
      getFieldDecorator('manageId');
      getFieldDecorator('sublInstitution');
      setFieldsValue({
        institutionCode: item.institutionCode,
        sublInstitution: item.sublInstitution,
        manageName: item.manageName,
      });
      if (item.manageLogoId) {
        this.setState({
          fileList:[{
            uid:-1,
            name:"xxx.png",
            url: item.manageLogoId
          }]
        })
      }
      if (item.institutionId) {
        setFieldsValue({
          institutionId: item.institutionId,
        });
      }
      if (item.manageId) {
        setFieldsValue({
          manageId: item.manageId,
        });
      }
      if (item.cityCode) {
        this.getInstitution(item.cityCode);
      }
      if (item.sublInstitution) {
        this.getSubInstitution(item.sublInstitution)
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          manageLogoId: fieldsValue.manageLogoId,
        };
        this.props.dispatch({
          type: 'institution/update',
          payload: values,
        });
      }
    });
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }
  changeCity = (code) => {
    const { resetFields } = this.props.form;
    resetFields(['sublInstitution','manageId'])
    this.props.dispatch({
      type: 'institution/getInstitution',
      payload: {
        cityCode: code
      },
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
  render() {
    const { institution: { data, city, institutionType, institutionList, subInstitutionList, item }, submitting, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fileList, previewVisible,previewImage } = this.state;
    getFieldDecorator('manageName')
    if (city) {
      var cityOptions = city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (institutionType) {
      var institutionTypeOptions = institutionType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (institutionList) {
      var institutionListOptions = institutionList.map(item => <Option key={item.sublInstitution} value={item.sublInstitution}>{item.manageName}</Option>);
    }
    if (subInstitutionList) {
      var subInstitutionListOptions = subInstitutionList.map(item => <Option key={item.manageId} value={item.manageId}>{item.manageName}</Option>);
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
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <PageHeaderLayout title="编辑机构">
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
                    initialValue: item.institutionCode,
                    rules: [{
                      required: true, message: '请选择机构类型',
                    }],
                  })(
                    <Select disabled placeholder="请选择" style={{ width: '100%' }}>
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
                    initialValue: item.cityCode,
                    rules: [{
                      required: true, message: '请选择算在城市',
                    }],
                  })(
                    <Select disabled placeholder="请选择" style={{ width: '100%' }} onChange={this.changeCity}>
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
                                  <Select disabled placeholder="请选择" style={{ width: '100%' }} onChange={this.getSubInstitution}>
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
                                  <Select disabled placeholder="请选择" style={{ width: '100%' }} >
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
                                    disabled
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
                                  disabled
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
                    initialValue: item.userEmail,
                    rules: [{
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
                   label="用户名">
                  {getFieldDecorator('loginAccount',{
                    initialValue: item.loginAccount,
                    rules: [{
                      required: true, message: '请输入用户名',
                    }],
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
                   label="手机号">
                  {getFieldDecorator('userPhone',{
                    initialValue: item.userPhone,
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
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="排序">
                  {getFieldDecorator('sort',{
                  initialValue: item.sort,
                })(
                    <Input min={1} max={10000} type="number" placeholder="请输入"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="启用状态">
                  {getFieldDecorator('startStatus',{
                    initialValue: item.startStatus,
                    rules: [{
                      required: true, message: '请选择是否启用',
                    }],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value={0}>禁用</Option>
                      <Option value={1}>启用</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="机构logo">
                   {getFieldDecorator('manageLogoId',{
                     initialValue: item.manageLogoId,
                     valuePropName: "fileList",
                       rules:[{
                         required:true,
                         message:'请选择图片'
                       }]
                   })(
                     <UploadPicture />
                   )}
                </FormItem>
              </Col>
            </Row>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button style={{ marginRight: 50 }} type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button onClick={() => dispatch(routerRedux.push('/institution'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
