import React from 'react';
import { connect } from 'dva';
import { Form, Button, Row, Col, Checkbox, Input   } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

@Form.create()
class Step1 extends React.PureComponent {
  componentDidMount () {

  }
  toArray(array) {
    return array.map(item => {return item.value})
  }
  render() {
    const {
      match: {
        step,
      },
      submitting,
      dispatch
    } = this.props;
    var item = step.assets;
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 17 },
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
        sm: { span: 10, offset: 10 },
      },
    };
    const onValidateForm = () => {
      dispatch(routerRedux.push('/match/detail/step6'));
    };
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{ marginTop: 8 }}
        >
          {/* <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>

            </Col>
            <Col md={12} sm={24}>

            </Col>
          </Row> */}
          <div style={{fontSize:20,fontWeight:'bold'}}>房产状况</div>
          <Form.Item
            label="名下是否必须有房产"
            {...formItemLayout}
           >
            {getFieldDecorator('isHouseProperty',{
              initialValue: item.isHouseProperty,
            })(
              <CheckboxGroup  >
                <Checkbox value={1}>是</Checkbox>
                <Checkbox value={0}>否</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          {
            (getFieldValue('isHouseProperty').indexOf(0) < 0 && getFieldValue('isHouseProperty').indexOf(1) >= 0)?
              <div>
                <Form.Item
                  label="名下房产数量要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('sumHouseProperty',{
                    initialValue: item.sumHouseProperty,
                  })(
                      <Input  type="text" style={{width:200}} addonAfter="套"/>
                  )}
                </Form.Item>
                <Form.Item
                  label="名下房产属地要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('housePropertyDependency',{
                    initialValue: item.housePropertyDependency,
                  })(
                    <CheckboxGroup  >
                      <Checkbox value={0}>深房</Checkbox>
                      <Checkbox value={1}>省内房产</Checkbox>
                      <Checkbox value={2}>省外房产</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="产权归属要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('ownership',{
                    initialValue: item.ownership,
                  })(
                    <CheckboxGroup  >
                      <Checkbox value={0}>本人</Checkbox>
                      <Checkbox value={1}>配偶</Checkbox>
                      <Checkbox value={2}>子女</Checkbox>
                      <Checkbox value={3}>父母</Checkbox>
                      <Checkbox value={4}>联名房</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="产权占比要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('propertyRightRatio',{
                    initialValue: item.propertyRightRatio,
                  })(
                      <Input  type="text" style={{width:200}} addonAfter="%"/>
                  )}
                </Form.Item>
                <Form.Item
                  label="房产类型要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('propertyType',{
                    initialValue: item.propertyType,
                  })(
                    <CheckboxGroup  >
                      <Checkbox value={0}>住宅</Checkbox>
                      <Checkbox value={1}>公寓</Checkbox>
                      <Checkbox value={2}>商铺</Checkbox>
                      <Checkbox value={3}>写字楼</Checkbox>
                      <Checkbox value={4}>自建房</Checkbox>
                      <Checkbox value={5}>厂房</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="房产状态要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('propertyStatus',{
                    initialValue: item.propertyStatus,
                  })(
                    <CheckboxGroup  >
                      <Checkbox value={0}>红本在手</Checkbox>
                      <Checkbox value={1}>银行按揭</Checkbox>
                      <Checkbox value={2}>银行抵押</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                {
                  (getFieldValue('propertyStatus').indexOf(1) >= 0 || getFieldValue('propertyStatus').indexOf(2) >= 0)?
                    <div>
                      <Form.Item
                        label="还款方式要求"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('repaymentMethod',{
                          initialValue: item.repaymentMethod,
                        })(
                          <CheckboxGroup  >
                            <Checkbox value={0}>等额本息</Checkbox>
                            <Checkbox value={1}>先息后本</Checkbox>
                            <Checkbox value={2}>随借随还</Checkbox>
                          </CheckboxGroup>
                        )}
                      </Form.Item>
                      <Form.Item
                        label="本笔抵押贷款余额要求"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('mortgageBalance',{
                          initialValue: item.mortgageBalance,
                        })(
                            <Input  type="text" style={{width:200}} addonAfter="元"/>
                        )}
                      </Form.Item>
                      <Form.Item
                        label="每月还款金额要求"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('mortgageMonthRepayment',{
                          initialValue: item.mortgageMonthRepayment,
                        })(
                            <Input  type="text" style={{width:200}} addonAfter="元"/>
                        )}
                      </Form.Item>
                      <Form.Item
                        label="本笔抵押贷款期限要求"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('mortgageTerm',{
                          initialValue: item.mortgageTerm,
                        })(
                            <Input  type="text" style={{width:200}} addonAfter="月"/>
                        )}
                      </Form.Item>
                      <Form.Item
                        label="已还月份数要求"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('returnedMonths',{
                          initialValue: item.returnedMonths,
                        })(
                            <Input  type="text" style={{width:200}} addonAfter="月"/>
                        )}
                      </Form.Item>
                    </div>: null
                }
                <Form.Item
                  label="本房产总面积要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('propertyTotalArea',{
                    initialValue: item.propertyTotalArea,
                  })(
                      <Input  type="text" style={{width:200}} addonAfter="平"/>
                  )}
                </Form.Item>
                <Form.Item
                  label="本房产总市值要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('propertyTotalMarketValue',{
                    initialValue: item.propertyTotalMarketValue,
                  })(
                      <Input  type="text" style={{width:200}} addonAfter="万元"/>
                  )}
                </Form.Item>
              </div>: null
          }
          {/* 保单 */}
          <div style={{fontSize:20,fontWeight:'bold'}}>商业保单</div>
          <Form.Item
            label="名下是否必须有商业保单"
            {...formItemLayout}
           >
            {getFieldDecorator('businessPolicy',{
              initialValue: item.businessPolicy,
            })(
              <CheckboxGroup  >
                <Checkbox value={1}>是</Checkbox>
                <Checkbox value={0}>否</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          {
            (getFieldValue('businessPolicy').indexOf(0) < 0 && getFieldValue('businessPolicy').indexOf(1) >= 0)?
              <div>
                <Form.Item
                  label="名下保单份数要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('sumBusinessPolicy',{
                    initialValue: item.sumBusinessPolicy,
                  })(
                      <Input  type="text" style={{width:200}} addonAfter="份"/>
                  )}
                </Form.Item>
                <Form.Item
                  label="保单品牌要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('policyBrand',{
                    initialValue: item.policyBrand,
                  })(
                    <CheckboxGroup  >
                      <Checkbox value={0}>中国平安</Checkbox>
                      <Checkbox value={1}>中国人寿</Checkbox>
                      <Checkbox value={2}>新华保险</Checkbox>
                      <Checkbox value={3}>泰康人寿</Checkbox>
                      <Checkbox value={4}>太平保险</Checkbox>
                      <Checkbox value={5}>民生保险</Checkbox>
                      <Checkbox value={6}>天安保险</Checkbox>
                      <Checkbox value={7}>华夏人寿</Checkbox>
                      <Checkbox value={8}>中邮人寿</Checkbox>
                      <Checkbox value={9}>友邦保险</Checkbox>
                      <Checkbox value={10}>安邦人寿</Checkbox>
                      <Checkbox value={11}>招商信诺</Checkbox>
                      <Checkbox value={12}>工银安盛</Checkbox>
                      <Checkbox value={13}>安联保险</Checkbox>
                      <Checkbox value={14}>中英保险</Checkbox>
                      <Checkbox value={15}>阳光保险</Checkbox>
                      <Checkbox value={16}>太平洋保险</Checkbox>
                      <Checkbox value={17}>中国人民人寿</Checkbox>
                      <Checkbox value={18}>富德生命人寿</Checkbox>
                      <Checkbox value={19}>其他</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="保单缴费方式要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('policyBrandPaymentMethod',{
                    initialValue: item.policyBrandPaymentMethod,
                  })(
                    <CheckboxGroup  >
                      <Checkbox value={0}>年缴</Checkbox>
                      <Checkbox value={1}>季缴</Checkbox>
                      <Checkbox value={2}>月缴</Checkbox>
                      <Checkbox value={3}>趸缴</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="保单缴费时长要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('policyPaymentYears',{
                    initialValue: item.policyPaymentYears,
                  })(
                    <CheckboxGroup  >
                      <Checkbox value={0}>1年以下</Checkbox>
                      <Checkbox value={1}>1-2年</Checkbox>
                      <Checkbox value={2}>2-3年</Checkbox>
                      <Checkbox value={3}>3年以上</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="保单年缴费金额要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('policyPayment',{
                    initialValue: item.policyPayment,
                  })(
                      <Input  type="text" style={{width:200}} addonAfter="元"/>
                  )}
                </Form.Item>
              </div>: null
          }
          {/* 汽车 */}
          <div style={{fontSize:20,fontWeight:'bold'}}>车辆状况</div>
          <Form.Item
            label="名下是否必须有家用汽车"
            {...formItemLayout}
           >
            {getFieldDecorator('isFamilyCar',{
              initialValue: item.isFamilyCar,
            })(
              <CheckboxGroup  >
                <Checkbox value={1}>是</Checkbox>
                <Checkbox value={0}>否</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          {
            (getFieldValue('isFamilyCar').indexOf(0) < 0 && getFieldValue('isFamilyCar').indexOf(1) >= 0)?
              <div>
                <Form.Item
                  label="名下车辆数量要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('sumFamilyCar',{
                    initialValue: item.sumFamilyCar,
                  })(
                      <Input  type="text" style={{width:200}} addonAfter="辆"/>
                  )}
                </Form.Item>
                <Form.Item
                  label="车辆登记证状态要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('carRegistStatus',{
                    initialValue: item.carRegistStatus,
                  })(
                    <CheckboxGroup  >
                      <Checkbox value={0}>绿本在手</Checkbox>
                      <Checkbox value={1}>银行按揭</Checkbox>
                      <Checkbox value={2}>信用卡按揭</Checkbox>
                      <Checkbox value={3}>车贷机构抵押</Checkbox>
                      <Checkbox value={4}>汽车金融按揭</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="车辆残值评估价格要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('carPotentialPrice',{
                    initialValue: item.carPotentialPrice,
                  })(
                      <Input  type="text" style={{width:200}} addonAfter="元"/>
                  )}
                </Form.Item>
                {
                  (getFieldValue('carRegistStatus').indexOf(1) >= 0 || getFieldValue('carRegistStatus').indexOf(2) >= 0 || getFieldValue('carRegistStatus').indexOf(3) >= 0 || getFieldValue('carRegistStatus').indexOf(4) >= 0) ?
                    <div>
                      <Form.Item
                      label="车辆贷款余额要求"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('carLoanBalance',{
                        initialValue: item.carLoanBalance,
                      })(
                          <Input  type="text" style={{width:200}} addonAfter="元"/>
                      )}
                    </Form.Item>
                    <Form.Item
                      label="车贷还款金额要求"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('carRepayment',{
                        initialValue: item.carRepayment,
                      })(
                          <Input  type="text" style={{width:200}} addonAfter="元"/>
                      )}
                    </Form.Item>
                    <Form.Item
                      label="车贷还款月份要求"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('carrRepaymentMonths',{
                        initialValue: item.carrRepaymentMonths,
                      })(
                          <Input  type="text" style={{width:200}} addonAfter="月"/>
                      )}
                    </Form.Item>
                    </div>: null
                }
              </div>: null
          }

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" onClick={onValidateForm}>
              下一步
            </Button>
            {/* <Button style={{ marginLeft: 50 }} onClick={() => dispatch(routerRedux.push('/match'))}>
              返回
            </Button> */}
          </FormItem>
        </Form>

      </div>
    );
  }
}

export default connect(({  match }) => ({
  match,
  data: match.step,
}))(Step1);
