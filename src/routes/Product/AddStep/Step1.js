import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, Row, Col, InputNumber  } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

@Form.create()
class Step1 extends React.PureComponent {
  componentDidMount () {
    this.props.dispatch({
      type: 'product/fetchProdCategory',
      payload: {
        type: "prodCategory"
      },
    });
    this.props.dispatch({
      type: 'product/fetchPropCategory',
      payload: {
        type: "propCategory"
      },
    });
    this.props.dispatch({
      type: 'product/fetchCusCategory',
      payload: {
        type: 'cusCategory'
      },
    });
    this.props.dispatch({
      type: 'product/fetchRepMethod',
      payload: {
        type: 'repMethod'
      },
    });
    this.props.dispatch({
      type: 'product/fetchProdFeatures',
      payload: {
        type: 'prodFeatures'
      },
    });
  }
  getInstitution = (code) => {
    const { getFieldValue } = this.props.form;
    this.props.dispatch({
      type: 'product/getInstitution',
      payload: {
        cityCode: code,
        institutionCode: getFieldValue('institutionCode'),
      },
    });
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const {
      product: {
        data,
        city,
        institutionType,
        institutionList,
        subInstitutionList,
        prodCategory,
        propCategory,
        cusCategory,
        repMethod,
        prodFeatures,
        step,
      },
      user: {
        currentUser
      },
      submitting,
      dispatch
    } = this.props;
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form;
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
      var prodCategoryOptions = prodCategory.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
      var propCategoryOptions = propCategory.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
      var cusCategoryOptions = cusCategory.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
      var repMethodOptions = repMethod.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
      var prodFeaturesOptions = prodFeatures.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
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
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 19 },
      },
    };


    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const onValidateForm = () => {
        // dispatch(routerRedux.push('/product/add/step2'));
      validateFields((err, values) => {
        console.log(values,err)
        if (!err) {
          console.log(1)
          dispatch({
            type: 'product/saveStepFormData',
            payload: {
              ...values,
              productFeatures: values.productFeatures && values.productFeatures.join(','),
              productPayWay: values.productPayWay && values.productPayWay.join(','),
              customerType: values.customerType && values.customerType.join(','),
              productType: values.productType && values.productType.join(','),
              propertyType: values.propertyType && values.propertyType.join(','),
              productTimeLimit: values.productTimeLimitStart + ',' + values.productTimeLimitEnd,
              approvalAging: values.approvalAgingStart + ',' + values.approvalAgingEnd,
              productPoundage: values.productPoundage ? values.productPoundage : 0,
            },
          });
          dispatch(routerRedux.push('/product/add/step2'));
        }
      });
    };
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{ marginTop: 8 }}
        >
          {
            currentUser.data.userIdentity == 0
            ?  <Row gutter={{ md: 8, lg: 24, xl: 48 }}
                        >
                        <Col md={12} sm={24}>
                          <FormItem
                            {...formItemLayout}
                             label="机构类型">
                            {getFieldDecorator('institutionCode', {
                              initialValue: step.institutionCode,
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
                              initialValue: step.cityCode,
                              rules: [{
                                required: true, message: '请选择所在城市',
                              }],
                            })(
                              <Select placeholder="请选择" style={{ width: '100%' }} onChange={this.getInstitution}>
                                {cityOptions}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                      </Row> : null
          }
         <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
           {
             currentUser.data.userIdentity == 0
                ?             <Col md={12} sm={24}
                              >
                              <Form.Item
                                label="机构名称"
                                {...formItemLayout}
                               >
                                {getFieldDecorator('manageId',{
                                  initialValue: step.manageId,
                                  rules: [
                                    {
                                      required: true,
                                      message: '请输入机构名称',
                                    },
                                  ],
                                })(
                                  <Select
                                    // mode="combobox"
                                    style={{ width: '100%' }}
                                    placeholder="请选择"
                                    // defaultValue={['a10', 'c12']}
                                    onChange={this.handleChange}
                                  >
                                    {institutionListOptions}
                                  </Select>
                                )}
                              </Form.Item>
                            </Col> : <div>{getFieldDecorator('manageId',{initialValue: currentUser.data.manageId})}</div>
           }
            <Col md={12} sm={24}>
              <Form.Item
                label="产品名称"
                {...formItemLayout}
               >
                {getFieldDecorator('productName',{
                  initialValue: step.productName,
                  rules: [
                    {
                      required: true,
                      message: '请输入产品名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="最高可贷"
                {...formItemLayout}
               >
                {getFieldDecorator('productMaxLoad',{
                  initialValue: step.productMaxLoad,
                  rules: [
                    {
                      required: true,
                      message: '请输入最高可贷',
                    },
                  ],
                })(
                  <Input
                    type="number"
                    addonAfter="万"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="分润比例"
                {...formItemLayout}
               >
                {getFieldDecorator('productRatio',{
                  initialValue: step.productRatio,
                  rules: [
                    {
                      required: true,
                      message: '请输入产品分润比例',
                    },
                  ],
                })(
                  <Input
                    type="number"
                    max={100}
                    min={0}
                    addonAfter="%"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="月费率"
                {...formItemLayout}
               >
                {getFieldDecorator('monthlyFeeRate',{
                  initialValue: step.monthlyFeeRate,
                  rules: [
                    {
                      required: true,
                      message: '请输入月费率',
                    },
                  ],
                })(
                  <Input
                    type="number"
                    max={100}
                    min={0}
                    addonAfter="%"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="产品期限(期)"
                {...formItemLayout}
               >
                 <InputGroup
                    compact>
                   {getFieldDecorator('productTimeLimitStart',{
                     initialValue: step.productTimeLimitStart,
                     rules:[{
                       required: true,
                       message: '请输入产品期限'
                     }]
                   })(
                  <Input
                    type="number"
                    style={{ width: '40%', textAlign: 'center' }} placeholder="Minimum" />
                  )}
                   <Input
                     type="number"
                     style={{ width: '20%',borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                   {getFieldDecorator('productTimeLimitEnd',{
                     initialValue: step.productTimeLimitEnd,
                     rules:[{
                       required: true,
                       message: '请输入产品期限'
                     }]
                   })(
                   <Input style={{ width: '40%', textAlign: 'center', borderLeft: 0 }}  placeholder="Maximum" />
                   )}
                 </InputGroup>

              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="手续费"
                {...formItemLayout}
               >
                {getFieldDecorator('productPoundage',{
                  initialValue: step.productPoundage,
                })(
                  <Input
                    type="number"
                    max={100}
                    min={0}
                    addonAfter="%"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="审批时效(天)"
                {...formItemLayout}
               >
                 <InputGroup compact>
                    {getFieldDecorator('approvalAgingStart',{
                      initialValue: step.approvalAgingStart,
                      rules:[{
                        required: true,
                        message: '请输入审批时效'
                      }]
                    })(
                   <Input
                     type="number"
                     style={{ width: '40%', textAlign: 'center' }} placeholder="Minimum" />
                   )}
                   <Input
                     type="number"
                     style={{ width: '20%', borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                   {getFieldDecorator('approvalAgingEnd',{
                     initialValue: step.approvalAgingEnd,
                     rules:[{
                       required: true,
                       message: '请输入审批时效'
                     }]
                   })(
                   <Input style={{ width: '40%', textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />
                   )}
                 </InputGroup>

              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="产品须知"
                {...formItemLayout}
               >
                {getFieldDecorator('productNotice',{
                  initialValue: step.productNotice,
                  rules: [
                    {
                      required: true,
                      message: '请输入产品须知',
                    },
                  ],
                })(
                  <Input
                    maxLength='25'
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="推荐语"
                {...formItemLayout}
               >
                {getFieldDecorator('productRecommend',{
                  initialValue: step.productRecommend,
                  rules: [
                    {
                      required: true,
                      message: '请输入推荐语',
                    },
                  ],
                })(
                  <Input
                    maxLength='25'
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="排序"
                {...formItemLayout}
               >
                {getFieldDecorator('productSort', {
                  initialValue: step.productSort,
                })(
                  <Input
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="产品类别"
                {...formItemLayout1}
               >
                {getFieldDecorator('productType',{
                  initialValue: step.productType,
                  rules: [
                    {
                      required: true,
                      message: '请选择产品类别',
                    },
                  ],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    {prodCategoryOptions}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="房产类型"
                {...formItemLayout1}
                // (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==110?true:'').length:'')
                // style={{
                //   display: (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==110?true:'').length:'') == '1' ? 'block' : 'none',
                // }}
               >
                {getFieldDecorator('propertyType')(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    {propCategoryOptions}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="客户类型"
                {...formItemLayout1}
               >
                {getFieldDecorator('customerType',{
                  initialValue: step.customerType,
                  rules: [
                    {
                      required: true,
                      message: '请选择客户类型',
                    },
                  ],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    {cusCategoryOptions}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="还款方式"
                {...formItemLayout1}
               >
                {getFieldDecorator('productPayWay',{
                  initialValue: step.productPayWay,
                  rules: [
                    {
                      required: true,
                      message: '请选择还款方式',
                    },
                  ],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    {repMethodOptions}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="产品特点"
                {...formItemLayout1}
               >
                {getFieldDecorator('productFeatures',{
                  initialValue: step.productFeatures,
                  rules: [
                    {
                      required: true,
                      message: '请选择产品特点',
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (value) {
                          if (value.length > 5) {
                            callback("最多只可以选择5个产品特点");
                          } else if (value.length <= 5) {
                            callback();
                          }
                        }
                        callback("最多只可以选择5个产品特点");
                      }
                    }
                  ],
                })(
                  <Select
                    maxTagCount={5}
                    max={5}
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    {prodFeaturesOptions}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="上架状态"
                {...formItemLayout}
               >
                {getFieldDecorator('shelfState',{
                  initialValue: step.shelfState,
                  rules: [
                    {
                      required: true,
                      message: '请输入上架状态',
                    },
                  ],
                })(
                  <Select placeholder="请选择">
                    <Option value="1">上架</Option>
                    <Option value="0">下架</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" onClick={onValidateForm}>
              下一步
            </Button>
            <Button style={{ marginLeft: 50 }} onClick={() => dispatch(routerRedux.push('/product'))}>
              返回
            </Button>
          </FormItem>
        </Form>

      </div>
    );
  }
}

export default connect(({ user, product }) => ({
  user,
  product,
  data: product.step,
}))(Step1);
