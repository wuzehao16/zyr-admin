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
    this.props.dispatch({
      type: 'product/fetchModel1',
      payload: {
        loanType: '0'
      },
    });
    this.props.dispatch({
      type: 'product/fetchModel2',
      payload: {
        loanType: '1'
      },
    });
    if (this.props.product && this.props.product.item) {
      const { item } = this.props.product;
      const { getFieldValue } = this.props.form;
      this.props.dispatch({
        type: 'product/getInstitution',
        payload: {
          cityCode: item.cityCode,
          institutionCode: item.institutionCode,
        },
      });
    }
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
        ModelList1,
        ModelList2
      },
      user:{
        currentUser
      },
      submitting,
      dispatch
    } = this.props;
    const item = step || {};
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
    // 匹配模型
    if (ModelList1) {
      var ModelList1Options = ModelList1.map(item => <Option key={item.modeNo} value={item.modeNo}>{item.modeName}</Option>);
    }
    if (ModelList2) {
      var ModelList2Options = ModelList2.map(item => <Option key={item.modeNo} value={item.modeNo}>{item.modeName}</Option>);
    }
      var prodCategoryOptions = prodCategory.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
      var propCategoryOptions = propCategory.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
      var cusCategoryOptions = cusCategory.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
      var repMethodOptions = repMethod.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
      var prodFeaturesOptions = prodFeatures.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
      getFieldDecorator('productId',{
        initialValue: item.productId,})
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
    const onValidateForm = (e) => {
      e.preventDefault();
        // dispatch(routerRedux.push('/product/add/step2'));
      validateFields((err, values) => {
        const { form } = this.props;
        const reg = /^[1-9]+[0-9]*$/;

        if (! reg.test(form.getFieldValue('productTimeLimitStart'))) {
          form.setFields({
            productTimeLimitStart: {
              value: values.productTimeLimitStart,
              errors: [new Error('请输入正整数值!')],
            }
          });
          return
        }

        if (! reg.test(form.getFieldValue('productTimeLimitEnd'))) {
          form.setFields({
            productTimeLimitEnd: {
              value: values.productTimeLimitEnd,
              errors: [new Error('请输入正整数值!')],
            }
          });
          return
        }

        if (reg.test(form.getFieldValue('productTimeLimitEnd')) && (Number(form.getFieldValue('productTimeLimitEnd')) < Number(form.getFieldValue('productTimeLimitStart'))) ) {
          form.setFields({
            productTimeLimitEnd: {
              value: values.productTimeLimitEnd,
              errors: [new Error('请输入大于最小值的正整数!')],
            }
          });
          return
        }

        if (! reg.test(form.getFieldValue('approvalAgingStart'))) {
          form.setFields({
            approvalAgingStart: {
              value: values.approvalAgingStart,
              errors: [new Error('请输入正整数值!')],
            }
          });
          return
        }

        if (! reg.test(form.getFieldValue('approvalAgingEnd'))) {
          form.setFields({
            approvalAgingEnd: {
              value: values.approvalAgingEnd,
              errors: [new Error('请输入正整数值!')],
            }
          });
          return
        }


        if (reg.test(form.getFieldValue('approvalAgingEnd')) && Number((form.getFieldValue('approvalAgingEnd')) < Number(form.getFieldValue('approvalAgingStart')))) {
          form.setFields({
            approvalAgingEnd: {
              value: values.approvalAgingEnd,
              errors: [new Error('请输入大于最小值的正整数!')],
            }
          });
          return
        }

        if (!err) {
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
              matchingMode:values.matchingMode1+','+ values.matchingMode2
            },
          });
          dispatch(routerRedux.push('/product/edit/step2'));
        }
      });
    };
    return (
      <div>
        <Form
          onSubmit={onValidateForm}
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
                              initialValue: item.institutionCode,
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
                              initialValue: item.cityCode,
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
                                  initialValue: item.manageId,
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
                            </Col> : null
           }
            <Col md={12} sm={24}>
              <Form.Item
                label="产品名称"
                {...formItemLayout}
               >
                {getFieldDecorator('productName',{
                  initialValue: item.productName,
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
                  initialValue: item.productMaxLoad,
                  rules: [
                    {
                      required: true,
                      message: '请输入最高可贷',
                    },
                  ],
                })(
                  <Input
                    min={0}
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
                  initialValue: item.productRatio,
                  rules: [
                    {
                      required: true,
                      message: '请输入产品分润比例',
                    },
                  ],
                })(
                  <Input
                    type="number"
                    step="0.01"
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
                  initialValue: item.monthlyFeeRate,
                  rules: [
                    {
                      required: true,
                      message: '请输入月费率',
                    },
                  ],
                })(
                  <Input
                    step="0.001"
                    type="number"
                    max={3}
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
                <Col span={11}>
                  <Form.Item>
                    {getFieldDecorator('productTimeLimitStart',{
                      initialValue:(item.productTimeLimit?item.productTimeLimit.split(',')[0]:''),
                      rules:[{
                        required: true,
                        message: '请输入产品期限'
                      }]
                    })(
                    <Input
                      type="number"
                      min={0}
                      style={{ textAlign: 'center' }} placeholder="最小值" />
                    )}
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                    -
                  </span>
                </Col>
                <Col span={11}>
                  <Form.Item>
                    {getFieldDecorator('productTimeLimitEnd',{
                      initialValue:(item.productTimeLimit?item.productTimeLimit.split(',')[1]:''),
                      rules:[{
                        required: true,
                        message: '请输入产品期限'
                      }]
                    })(
                    <Input style={{textAlign: 'center'}}  placeholder="最大值" />
                    )}
                  </Form.Item>
                </Col>
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
                  initialValue: item.productPoundage,
                })(
                  <Input
                    type="number"
                    max={100}
                    step="0.01"
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
                <Col span={11}>
                  <Form.Item>
                    {getFieldDecorator('approvalAgingStart',{
                      initialValue: item.approvalAging?item.approvalAging.split(',')[0]:'',
                      rules:[{
                        required: true,
                        message: '请输入审批时效'
                      }]
                    })(
                    <Input
                      type="number"
                      min={0}
                      style={{textAlign: 'center' }} placeholder="最小值" />
                    )}
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                    -
                  </span>
                </Col>
                <Col span={11}>
                  <Form.Item>
                    {getFieldDecorator('approvalAgingEnd',{
                      initialValue: item.approvalAging?item.approvalAging.split(',')[1]:'',
                      rules:[{
                        required: true,
                        message: '请输入审批时效'
                      }]
                    })(
                    <Input
                    type="number"
                    min={0}
                    style={{textAlign: 'center'}} placeholder="最大值" />
                    )}
                  </Form.Item>
                </Col>
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
                  initialValue: item.productNotice,
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
                  initialValue: item.productRecommend,
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
                {getFieldDecorator('productSort',{
                  initialValue: item.productSort,
                })(
                  <Input min={1} max={10000} type="number" placeholder="请输入"/>
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="上架状态"
                {...formItemLayout}
               >
                {getFieldDecorator('shelfState',{
                  initialValue: item.shelfState,
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
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="产品类别"
                {...formItemLayout}
               >
                {getFieldDecorator('productType',{
                  initialValue:item.productType?item.productType.split(','):[],
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
          {
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <Form.Item
                  label="模型(信用贷)"
                  {...formItemLayout}
                  style={{
                    display: (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==100).length:'') == '1' ? 'block' : 'none',
                  }}
                 >
                  {getFieldDecorator('matchingMode1',{
                    initialValue: item.matchingMode1,
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择"
                      onChange={this.handleChange}
                    >
                      {ModelList1Options}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col md={12} sm={24}>
                <Form.Item
                  label="模型(抵押贷)"
                  {...formItemLayout}
                  style={{
                    display: (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==110).length:'') == '1' ? 'block' : 'none',
                  }}
                 >
                  {getFieldDecorator('matchingMode2',{
                    initialValue: item.matchingMode2,
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择"
                      onChange={this.handleChange}
                    >
                      {ModelList2Options}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          }
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="房产类型"
                {...formItemLayout1}
                // (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==110?true:'').length:'')
                style={{
                  display: (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==110?true:'').length:'') == '1' ? 'block' : 'none',
                }}
               >
                {getFieldDecorator('propertyType',{
                  initialValue:item.propertyType?item.propertyType.split(','):[],
                })(
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
                  initialValue:item.customerType?item.customerType.split(','):[],
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
                  initialValue:item.productPayWay?item.productPayWay.split(','):[],
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
                  initialValue:item.productFeatures?item.productFeatures.split(','):[],
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
                <FormItem
                  {...formItemLayout}
                   label="是否纳入评测"
                   style={{
                     display: currentUser.data.userIdentity == 0 ? 'block' : 'none',
                   }}
                   >
                   {getFieldDecorator('isEvaluating',{
                     initialValue: item.isEvaluating,
                   })(
                     <Select placeholder="请选择">
                       <Option value={0}>否</Option>
                       <Option value={1}>是</Option>
                     </Select>
                   )}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                   label="是否为火"
                   style={{
                     display: currentUser.data.userIdentity == 0 ? 'block' : 'none',
                   }}
                   >
                   {getFieldDecorator('isFire',{
                     initialValue: item.isFire,
                   })(
                     <Select placeholder="请选择">
                       <Option value='0'>否</Option>
                       <Option value='1'>是</Option>
                     </Select>
                   )}
                </FormItem>
              </Col>
            </Row>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" >
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

export default connect(({ product, user }) => ({
  user,
  product,
  data: product.step,
}))(Step1);
