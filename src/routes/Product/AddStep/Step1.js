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
  }
  getInstitution1 = (code) => {
    const { resetFields,getFieldValue } = this.props.form;
    if(getFieldValue('manageId')){
      resetFields(['manageId'])
    }
    this.props.dispatch({
      type: 'product/getInstitution',
      payload: {
        cityCode: getFieldValue('cityCode'),
        institutionCode: code,
      },
    });
  }
  getInstitution = (code) => {
    const { resetFields,getFieldValue } = this.props.form;
    if(getFieldValue('manageId')){
      resetFields(['manageId'])
    }
    this.props.dispatch({
      type: 'product/getInstitution',
      payload: {
        cityCode: code,
        institutionCode: getFieldValue('institutionCode'),
      },
    });
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 14 },
      },
    };

    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const formItemLayout3 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 4, offset: 0.5 },
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
        sm: { span: 13, offset: 10 },
      },
    };

    // const formItemLayout4 = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 7 },
    //     md: { span: 11 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 12 },
    //     md: { span: 10 },
    //   },
    // };

    // const formItemLayout5 = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 7 },
    //     md: { span: 6 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 12 },
    //     md: { span: 10 },
    //   },
    // };

    const onValidateForm = (e) => {
      e.preventDefault();
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

        if (reg.test(form.getFieldValue('productTimeLimitEnd')) && Number((form.getFieldValue('productTimeLimitEnd')) < Number(form.getFieldValue('productTimeLimitStart')))) {
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

        ;
        if (!err) {
          dispatch({
            type: 'product/saveStepFormData',
            payload: {
              ...values,
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
          onSubmit={onValidateForm}
          hideRequiredMark
          style={{ marginTop: 50 }}
        >
          {
            currentUser.data.userIdentity == 0
            ?  <Row gutter={{ md: 8, lg: 24, xl: 48 }}
                        >
                        <Col md={12} sm={24}>
                          <FormItem
                            {...formItemLayout2}
                             label="机构类型">
                            {getFieldDecorator('institutionCode', {
                              initialValue: step.institutionCode,
                              rules: [{
                                required: true, message: '请选择机构类型',
                              }],
                            })(
                              <Select placeholder="请选择机构类型" style={{ width: '100%' }} onChange={this.getInstitution1}>
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
                              <Select placeholder="请选择所在城市" style={{ width: '100%' }} onChange={this.getInstitution}>
                                {cityOptions}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                      </Row> : null
          }
           {
             currentUser.data.userIdentity == 0
                ? <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={12} sm={24}>
                    <Form.Item
                      label="机构名称"
                      {...formItemLayout2}
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
                          placeholder="请选择机构名称"
                          // defaultValue={['a10', 'c12']}

                        >
                          {institutionListOptions}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
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
                          maxLength='10'
                          placeholder="请输入产品名称"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  </Row>:
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                      {getFieldDecorator('manageId',{initialValue: currentUser.data.manageId})}
                      <Col md={12} sm={24}>
                        <Form.Item
                          label="产品名称"
                          {...formItemLayout2}
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
                              placeholder="请输入产品名称"
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
              }

          {/* {
            currentUser.data.userIdentity == 1?
            :
          } */}
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="最高可贷"
                {...formItemLayout2}
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
                    min={0}
                    type="number"
                    addonAfter="万"
                    placeholder="请输入最高可贷"
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
                    step="0.01"
                    max={100}
                    min={0}
                    addonAfter="%"
                    placeholder="请输入产品分润比例"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="月均费率"
                {...formItemLayout2}
               >
                {getFieldDecorator('monthlyFeeRate',{
                  initialValue: step.monthlyFeeRate,
                  rules: [
                    {
                      required: true,
                      message: '请输入月均费率',
                    },
                  ],
                })(
                  <Input
                    type="number"
                    step="0.0001"
                    max={3}
                    min={0}
                    addonAfter="%"
                    placeholder="请输入月均费率"
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
                  <Form.Item style={{display:"inline-block"}}>
                   {getFieldDecorator('productTimeLimitStart',{
                     initialValue: step.productTimeLimitStart,
                     rules:[{
                       required: true,
                       message: '请输入产品期限'
                     }]
                   })(
                    <Input
                      min={0}
                      type="number"
                      style={{textAlign: 'center' }} placeholder="最小值"
                    />
                    )}
                  </Form.Item>
                  </Col>
                  <Col span={2}>
                    <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                      -
                    </span>
                  </Col>
                  <Col span={11}>
                    <Form.Item style={{display:"inline-block"}}>
                      {getFieldDecorator('productTimeLimitEnd',{
                        initialValue: step.productTimeLimitEnd,
                        rules:[{
                          required: true,
                          message: '请输入产品期限'
                        }]
                      })(
                      <Input style={{ textAlign: 'center'}}  placeholder="最大值"
                          min={0}
                      />
                      )}
                    </Form.Item>
                  </Col>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="手续费用"
                {...formItemLayout2}
               >
                {getFieldDecorator('productPoundage',{
                  initialValue: step.productPoundage,
                })(
                  <Input
                    type="number"
                    step="0.01"
                    max={100}
                    min={0}
                    addonAfter="%"
                    placeholder="请输入手续费用"
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
                      initialValue: step.approvalAgingStart,
                      rules:[{
                        required: true,
                        message: '请输入审批时效'
                      }]
                    })(
                    <Input
                      type="number"
                      min={0}
                      style={{textAlign: 'center'}} placeholder="最小值"
                      />
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
                     initialValue: step.approvalAgingEnd,
                     rules:[{
                       required: true,
                       message: '请输入审批时效'
                     }]
                   })(
                   <Input
                    type="number"
                    min={0}
                    style={{textAlign: 'center'}} placeholder="最大值"
                   />
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
                {...formItemLayout2}
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
                    placeholder="请输入产品须知"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="产品简介"
                {...formItemLayout}
               >
                {getFieldDecorator('productRecommend',{
                  initialValue: step.productRecommend,
                  rules: [
                    {
                      required: true,
                      message: '请输入产品简介',
                    },
                  ],
                })(
                  <Input
                    maxLength='12'
                    placeholder="请输入产品简介"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="产品排序"
                {...formItemLayout2}
               >
                {getFieldDecorator('productSort', {
                  initialValue: step.productSort,
                })(
                  <Input
                    type="number"
                    min={1}
                    placeholder="请输入产品排序"
                  />
                )}
              </Form.Item>
            </Col>
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
                      message: '请选择上架状态',
                    },
                  ],
                })(
                  <Select placeholder="请选择上架状态">
                    <Option value="1">上架</Option>
                    <Option value="0">下架</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <div style={{paddingRight: 48}}>
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
                      placeholder="请选择产品类别"
                      // defaultValue={['a10', 'c12']}

                    >
                      {prodCategoryOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          {
            <div>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={24} sm={24}>
                  <Form.Item
                    label="模型(信用贷)"
                    {...formItemLayout1}
                    style={{
                      display: (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==100).length:'') == '1' ? 'block' : 'none',
                    }}
                  >
                    {getFieldDecorator('matchingMode1',{
                      initialValue: step.matchingMode1,
                    })(
                      <Select
                        style={{ width: '100%' }}
                        placeholder="请选择信用贷模型"

                      >
                        {ModelList1Options}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={24} sm={24}>
                    <Form.Item
                      label="模型(抵押贷)"
                      {...formItemLayout1}
                      style={{
                        display: (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==110).length:'') == '1' ? 'block' : 'none',
                      }}
                    >
                      {getFieldDecorator('matchingMode2',{
                        initialValue: step.matchingMode2,
                      })(
                        <Select
                          style={{ width: '100%' }}
                          placeholder="请选择抵押贷模型"

                        >
                          {ModelList2Options}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
              </Row>
            </div>
          }
          </div>
          <div style={{paddingRight: 48}}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={24} sm={24}>
                <Form.Item
                  label="房产类型"
                  {...formItemLayout1}
                  // (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==110?true:'').length:'')
                  style={{
                    display: (getFieldValue('productType')?getFieldValue('productType').filter((item)=> item==110).length:'') == '1' ? 'block' : 'none',
                  }}
                >
                  {getFieldDecorator('propertyType', {
                    initialValue: step.propertyType,
                  })(
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="请选择房产类型"
                      // defaultValue={['a10', 'c12']}

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
                      placeholder="请选择客户类型"
                      // defaultValue={['a10', 'c12']}

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
                      placeholder="请选择还款方式"
                      // defaultValue={['a10', 'c12']}

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
                      placeholder="请选择产品特点"
                      // defaultValue={['a10', 'c12']}

                    >
                      {prodFeaturesOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout2}
                   label="纳入评测"
                   style={{
                     display: currentUser.data.userIdentity == 0 ? 'block' : 'none',
                   }}
                   >
                   {getFieldDecorator('isEvaluating',{
                     initialValue:step.isEvaluating,
                   })(
                     <Select placeholder="请选择是否纳入评测">
                       <Option value={0}>否</Option>
                       <Option value={1}>是</Option>
                     </Select>
                   )}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem
                  {...formItemLayout3}
                   label="是否热门"
                   style={{
                     display: currentUser.data.userIdentity == 0 ? 'block' : 'none',
                    //  marginRight:'28px'
                   }}
                   >
                   {getFieldDecorator('isFire',{
                     initialValue:step.isFire,
                   })(
                     <Select placeholder="请选择是否热门">
                       <Option value='0'>否</Option>
                       <Option value='1'>是</Option>
                     </Select>
                   )}
                </FormItem>
              </Col>
            </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          </Row>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" >
              下一步
            </Button>
            <Button style={{ marginLeft: 100 }} onClick={() => dispatch(routerRedux.push('/product'))}>
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
