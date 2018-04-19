import React from 'react';
import { connect } from 'dva';
import { Form, Button, Row, Col, Checkbox   } from 'antd';
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
      validateFields((err, values) => {
        console.log(values,err)
        if (!err) {
          dispatch({
            type: 'match/saveStep2FormData',
            payload: {
              ...values,
            },
          });
          dispatch(routerRedux.push('/match/add/step3'));
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
          {/* <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>

            </Col>
            <Col md={12} sm={24}>

            </Col>
          </Row> */}
          <div style={{fontSize:20,fontWeight:'bold'}}>个人信息</div>
          <Form.Item
            label="年龄要求"
            {...formItemLayout}
           >
            {getFieldDecorator('age',{
              initialValue: [0,1,2,3],
            })(
              <CheckboxGroup  size="small">
                <Checkbox value={0}>18岁以下</Checkbox>
                <Checkbox value={1}>18-24</Checkbox>
                <Checkbox value={2}>25-55</Checkbox>
                <Checkbox value={3}>55以上</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <Form.Item
            label="婚姻状况要求"
            {...formItemLayout}
           >
            {getFieldDecorator('maritalStatus',{
              initialValue: [0,1,2,3],
            })(
              <CheckboxGroup  size="small">
                <Checkbox value={0}>已婚</Checkbox>
                <Checkbox value={1}>未婚</Checkbox>
                <Checkbox value={2}>离异</Checkbox>
                <Checkbox value={3}>丧偶</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          {
            (getFieldValue('maritalStatus').indexOf(0) >= 0)
              ? <div>
                  <Form.Item
                  label="是否必须配偶同意贷款"
                  {...formItemLayout}
                >
                  {getFieldDecorator('isAgreeLoan',{
                    initialValue: [0,1],
                  })(
                    <CheckboxGroup>
                      <Checkbox value={1}>是</Checkbox>
                      <Checkbox value={0}>否</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                </div>:null
          }
          <Form.Item
            label="户籍所在地要求"
            {...formItemLayout}
           >
            {getFieldDecorator('location',{
              initialValue: [0,1,2,3],
            })(
              <CheckboxGroup >
                <Checkbox value={0}>深户</Checkbox>
                <Checkbox value={1}>非深户</Checkbox>
                <Checkbox value={2}>港澳台</Checkbox>
                <Checkbox value={3}>外籍</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <Form.Item
            label="学历要求"
            {...formItemLayout}
           >
            {getFieldDecorator('education',{
              initialValue: [0,1,2,3],
            })(
              <CheckboxGroup>
                <Checkbox value={0}>全日制本科及以上</Checkbox>
                <Checkbox value={1}>全日制大专</Checkbox>
                <Checkbox value={2}>高中及以下</Checkbox>
                <Checkbox value={3}>其他(自考/函授)</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <div style={{fontSize:20,fontWeight:'bold'}}>工作情况</div>
          <Form.Item
            label="职业类别要求"
            {...formItemLayout}
           >
            {getFieldDecorator('occupation',{
              initialValue: [0,1,2,3],
            })(
              <CheckboxGroup>
                <Checkbox value={0}>工薪族</Checkbox>
                <Checkbox value={1}>企业主</Checkbox>
                <Checkbox value={2}>工薪族和企业主</Checkbox>
                <Checkbox value={3}>自由职业</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          {
            (getFieldValue('occupation').indexOf(0) >= 0 || getFieldValue('occupation').indexOf(2) >= 0)
              ? <div>
                    <Form.Item
                      label="单位性质要求"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('unitProperty',{
                        initialValue: [0,1,2,3,4,5,6,7],
                      })(
                        <CheckboxGroup >
                          <Checkbox value={0}>教师医生(公立)</Checkbox>
                          <Checkbox value={1}>公务员</Checkbox>
                          <Checkbox value={2}>事业单位</Checkbox>
                          <Checkbox value={3}>高新企业</Checkbox>

                          <Checkbox value={4}>主板上市公司</Checkbox>
                          <Checkbox value={5}>普通企业</Checkbox>
                          <Checkbox value={6}>上市公司</Checkbox>
                          <Checkbox value={7}>世界500强</Checkbox>
                        </CheckboxGroup>
                      )}
                    </Form.Item>
                    <Form.Item
                      label="工资发放方式要求"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('salaryDistribution',{
                        initialValue: [0,1,2],
                      })(
                        <CheckboxGroup>
                          <Checkbox value={0}>扣税代发</Checkbox>
                          <Checkbox value={1}>固定转账</Checkbox>
                          <Checkbox value={2}>现金发放</Checkbox>
                        </CheckboxGroup>
                      )}
                    </Form.Item>
                    <Form.Item
                      label="现单位上班时长要求"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('workTime',{
                        initialValue: [0,1,2,3,4],
                      })(
                        <CheckboxGroup >
                          <Checkbox value={0}>3个月以下</Checkbox>
                          <Checkbox value={1}>3-6个月</Checkbox>
                          <Checkbox value={2}>6-12个月</Checkbox>
                          <Checkbox value={3}>12-24个月</Checkbox>
                          <Checkbox value={4}>24个月以上</Checkbox>
                        </CheckboxGroup>
                      )}
                    </Form.Item>
                    <Form.Item
                      label="现单位月均工资要求"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('monthAvgSalary',{
                        initialValue: [0,1,2,3,4,5],
                      })(
                        <CheckboxGroup >
                          <Checkbox value={0}>4千以下</Checkbox>
                          <Checkbox value={1}>4-5千</Checkbox>
                          <Checkbox value={2}>5-6千</Checkbox>
                          <Checkbox value={3}>6-8千</Checkbox>
                          <Checkbox value={4}>8千-1万</Checkbox>
                          <Checkbox value={5}>1万以上</Checkbox>
                        </CheckboxGroup>
                      )}
                    </Form.Item>
                    <Form.Item
                      label="是否必须缴纳社保"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('isInsurance',{
                        initialValue: [0,1],
                      })(
                        <CheckboxGroup >
                          <Checkbox value={1}>是</Checkbox>
                          <Checkbox value={0}>否</Checkbox>
                        </CheckboxGroup>
                      )}
                    </Form.Item>
                    {
                      (getFieldValue('isInsurance').indexOf(1) >= 0)
                        ? <div>
                            <Form.Item
                              label="现单位社保缴纳基数要求"
                              {...formItemLayout}
                            >
                              {getFieldDecorator('insurancePaymonth',{
                                initialValue: [0,1,2,3,4],
                              })(
                                <CheckboxGroup  >
                                  <Checkbox value={0}>4千以下</Checkbox>
                                  <Checkbox value={1}>4-5千</Checkbox>
                                  <Checkbox value={2}>5-6千</Checkbox>
                                  <Checkbox value={3}>6-8千</Checkbox>
                                  <Checkbox value={4}>8千以上</Checkbox>
                                </CheckboxGroup>
                              )}
                            </Form.Item>
                            <Form.Item
                              label="现单位社保连续缴纳时长要求"
                              {...formItemLayout}
                            >
                              {getFieldDecorator('insurancePaymonth',{
                                initialValue: [0,1,2,3,4],
                              })(
                                <CheckboxGroup >
                                  <Checkbox value={0}>3个月以下</Checkbox>
                                  <Checkbox value={1}>3-6个月</Checkbox>
                                  <Checkbox value={2}>6-12个月</Checkbox>
                                  <Checkbox value={3}>12-24个月</Checkbox>
                                  <Checkbox value={4}>24个月以上</Checkbox>
                                </CheckboxGroup>
                              )}
                            </Form.Item>
                          </div>: null
                    }
                    <Form.Item
                      label="是否必须缴纳公积金"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('isProvidentFund',{
                        initialValue: [0,1],
                      })(
                        <CheckboxGroup  >
                          <Checkbox value={1}>是</Checkbox>
                          <Checkbox value={0}>否</Checkbox>
                        </CheckboxGroup>
                      )}
                    </Form.Item>
                    {
                      (getFieldValue('isProvidentFund').indexOf(1) >= 0)
                        ? <div>
                            <Form.Item
                              label="现单位公积金缴纳基数要求"
                              {...formItemLayout}
                            >
                              {getFieldDecorator('providentFundBase',{
                                initialValue: [0,1,2,3,4],
                              })(
                                <CheckboxGroup  >
                                  <Checkbox value={0}>4千以下</Checkbox>
                                  <Checkbox value={1}>4-5千</Checkbox>
                                  <Checkbox value={2}>5-6千</Checkbox>
                                  <Checkbox value={3}>6-8千</Checkbox>
                                  <Checkbox value={4}>8千以上</Checkbox>
                                </CheckboxGroup>
                              )}
                            </Form.Item>
                            <Form.Item
                              label="现单位公积金连续缴纳时长要求"
                              {...formItemLayout}
                            >
                              {getFieldDecorator('providentFundPaymonth',{
                                initialValue: [0,1,2,3,4],
                              })(
                                <CheckboxGroup >
                                  <Checkbox value={0}>3个月以下</Checkbox>
                                  <Checkbox value={1}>3-6个月</Checkbox>
                                  <Checkbox value={2}>6-12个月</Checkbox>
                                  <Checkbox value={3}>12-24个月</Checkbox>
                                  <Checkbox value={4}>24个月以上</Checkbox>
                                </CheckboxGroup>
                              )}
                            </Form.Item>
                          </div>: null
                    }
                </div>: null
          }
          {
            (getFieldValue('occupation').indexOf(1) >= 0 || getFieldValue('occupation').indexOf(2) >= 0)
              ? <div>
                  <Form.Item
                    label="本地营业执照注册时长要求"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('licenseRegistTime',{
                      initialValue: [0,1,2,3,4,5],
                    })(
                      <CheckboxGroup  >
                        <Checkbox value={0}>暂未注册</Checkbox>
                        <Checkbox value={1}>3个月以下</Checkbox>
                        <Checkbox value={2}>3-6个月</Checkbox>
                        <Checkbox value={3}>6-12个月</Checkbox>

                        <Checkbox value={4}>12-24个月</Checkbox>
                        <Checkbox value={5}>24个月以上</Checkbox>
                      </CheckboxGroup>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="企业一年开票金额要求"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('invoiceValue',{
                      initialValue: [0,1,2,3],
                    })(
                      <CheckboxGroup  >
                        <Checkbox value={0}>2万以下</Checkbox>
                        <Checkbox value={1}>2-10万</Checkbox>
                        <Checkbox value={2}>10-50万</Checkbox>
                        <Checkbox value={3}>100万以上</Checkbox>
                      </CheckboxGroup>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="股份占比要求"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('shareRatio',{
                      initialValue: [0,1,2,3],
                    })(
                      <CheckboxGroup  >
                        <Checkbox value={0}>0%</Checkbox>
                        <Checkbox value={1}>0%-10%</Checkbox>
                        <Checkbox value={2}>10%-20%</Checkbox>
                        <Checkbox value={3}>20%以上</Checkbox>
                      </CheckboxGroup>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="是否必须是法人"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('isLegalPerson',{
                      initialValue: [0,1],
                    })(
                      <CheckboxGroup  >
                        <Checkbox value={1}>是</Checkbox>
                        <Checkbox value={0}>否</Checkbox>
                      </CheckboxGroup>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="单位座机是否必须能正常接听"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('isPhoneCall',{
                      initialValue: [0,1],
                    })(
                      <CheckboxGroup  >
                        <Checkbox value={1}>是</Checkbox>
                        <Checkbox value={0}>否</Checkbox>
                      </CheckboxGroup>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="公司是否必须方便实地考察"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('isInvestigate',{
                      initialValue: [0,1],
                    })(
                      <CheckboxGroup  >
                        <Checkbox value={1}>是</Checkbox>
                        <Checkbox value={0}>否</Checkbox>
                      </CheckboxGroup>
                    )}
                  </Form.Item>
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
