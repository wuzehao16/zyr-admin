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
    var item = step.creditInformation;
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form;

    const formItemLayout = {
      labelCol: {
        offset:2,
      },
      wrapperCol: {
        span:22,
        offset:2,
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
        
        if (!err) {
          dispatch({
            type: 'match/saveStep3FormData',
            payload: {
              ...values,
            },
          });
          if(step.basicInformation.occupation.indexOf(0) > -1 || step.basicInformation.occupation.indexOf(0) > -1){
            dispatch(routerRedux.push('/match/edit/step4'));
          } else {
            dispatch(routerRedux.push('/match/edit/step5'));
          }
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
          <div style={{fontSize:20,fontWeight:'bold'}}>征信基本情况</div>
          <Form.Item
            label="征信记录时长要求"
            {...formItemLayout}
           >
            {getFieldDecorator('recordTime',{
              initialValue: item.recordTime,
              rules:[{
                required:true,
                message:"请选择征信记录时长要求"
              }]
            })(
              <CheckboxGroup  size="small">
                <Checkbox value={0}>无</Checkbox>
                <Checkbox value={1}>1-3个月</Checkbox>
                <Checkbox value={2}>3-6个月</Checkbox>
                <Checkbox value={3}>6-12个月</Checkbox>
                <Checkbox value={4}>12个月以上</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <Form.Item
            label="名下上征信小额类贷款笔数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumPettyLoan',{
              initialValue: item.sumPettyLoan,
              rules:[{
                required:true,
                message:"请选择名下上征信小额类贷款笔数要求"
              }]
            })(
              <CheckboxGroup  size="small">
                <Checkbox value={0}>无</Checkbox>
                <Checkbox value={1}>1笔</Checkbox>
                <Checkbox value={2}>2笔</Checkbox>
                <Checkbox value={3}>3笔</Checkbox>
                <Checkbox value={4}>3笔以上</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <Form.Item
            label="名下上征信消费金融类贷款笔数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumConsumerFinanceLoan',{
              initialValue: item.sumConsumerFinanceLoan,
              rules:[{
                required:true,
                message:"请选择名下上征信消费金融类贷款笔数要求"
              }]
            })(
              <CheckboxGroup  size="small">
                <Checkbox value={0}>无</Checkbox>
                <Checkbox value={1}>1笔</Checkbox>
                <Checkbox value={2}>2笔</Checkbox>
                <Checkbox value={3}>3笔</Checkbox>
                <Checkbox value={4}>3笔以上</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <Form.Item
            label="是否允许使用过微粒贷"
            {...formItemLayout}
           >
            {getFieldDecorator('isParticleLoan',{
              initialValue: item.isParticleLoan,
              rules:[{
                required:true,
                message:"请选择是否允许使用过微粒贷"
              }]
            })(
              <CheckboxGroup  size="small">
                <Checkbox value={1}>是</Checkbox>
                <Checkbox value={0}>否</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          {
            // getFieldValue('isParticleLoan')?(getFieldValue('isParticleLoan').indexOf(1)>=0):''
            getFieldValue('isParticleLoan').length==0 || getFieldValue('isParticleLoan').indexOf(0)>=0 ?
            null:<Form.Item
                  label="使用微粒贷额度要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('particleLoanLimit',{
                    initialValue: item.particleLoanLimit,
                    rules:[{
                      required:true,
                      message:"请选择使用微粒贷额度要求"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={0}>3千以下</Checkbox>
                      <Checkbox value={1}>3-5千</Checkbox>
                      <Checkbox value={2}>5千-1万</Checkbox>
                      <Checkbox value={3}>1万以上</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
          }
          <Form.Item
            label="是否允许名下贷款/信用卡账户状态有冻结/呆账/止付/挂失/收卡/作废"
            {...formItemLayout}
           >
            {getFieldDecorator('isLoanClose',{
              initialValue: item.isLoanClose,
              rules:[{
                required:true,
                message:"请选择是否允许名下贷款/信用卡账户状态有冻结/呆账/止付/挂失/收卡/作废求"
              }]
            })(
              <CheckboxGroup  size="small">
                <Checkbox value={1}>是</Checkbox>
                <Checkbox value={0}>否</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <Form.Item
            label="是否允许名下贷款/信用卡五级分类有关注/次级/可疑/损失"
            {...formItemLayout}
           >
            {getFieldDecorator('isLoanLoss',{
              initialValue: item.isLoanLoss,
              rules:[{
                required:true,
                message:"请选择是否允许名下贷款/信用卡五级分类有关注/次级/可疑/损失"
              }]
            })(
              <CheckboxGroup  size="small">
                <Checkbox value={1}>是</Checkbox>
                <Checkbox value={0}>否</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
            <div style={{fontSize:20,fontWeight:'bold'}}>征信逾期情况</div>
          <Form.Item
            label="是否允许当前有逾期"
            {...formItemLayout}
           >
            {getFieldDecorator('isOverdue',{
              initialValue: item.isOverdue,
              rules:[{
                required:true,
                message:"请选择是否允许当前有逾期"
              }]
            })(
              <CheckboxGroup  size="small">
                <Checkbox value={1}>是</Checkbox>
                <Checkbox value={0}>否</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          {
             getFieldValue('isOverdue').length==0 || getFieldValue('isOverdue').indexOf(0)>=0 ?
              null:<div>
                <Form.Item
                  label="当前逾期类别要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('overdueCategory',{
                    initialValue: item.overdueCategory,
                    rules:[{
                      required:true,
                      message:"请选择当前逾期类别要求"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={0}>信用卡逾期</Checkbox>
                      <Checkbox value={1}>贷款逾期</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="当前逾期天数要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('overdueDays',{
                    initialValue: item.overdueDays,
                    rules:[{
                      required:true,
                      message:"请选择当前逾期天数要求"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={0}>3天以下</Checkbox>
                      <Checkbox value={1}>3-7天</Checkbox>
                      <Checkbox value={2}>7-15天</Checkbox>
                      <Checkbox value={3}>15天以上</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                {
                  (getFieldValue('overdueCategory')?(getFieldValue('overdueCategory').indexOf(0)>-1):false) ?
                      <Form.Item
                        label="当前信用卡逾期金额要求"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('creditCardOverdueMoney',{
                          initialValue: item.creditCardOverdueMoney,
                          rules:[{
                            required:true,
                            message:"请选择当前信用卡逾期金额要求"
                          }]
                        })(
                          <CheckboxGroup  size="small">
                            <Checkbox value={0}>5百以下</Checkbox>
                            <Checkbox value={1}>5百-1千</Checkbox>
                            <Checkbox value={2}>1-2千</Checkbox>
                            <Checkbox value={3}>2千以上</Checkbox>
                          </CheckboxGroup>
                        )}
                      </Form.Item>:null
                  }
                  {
                    (getFieldValue('overdueCategory')?(getFieldValue('overdueCategory').indexOf(1)>-1):false) ?
                      <Form.Item
                        label="当前贷款逾期金额要求"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('loanOverdueMoney',{
                          initialValue: item.loanOverdueMoney,
                          rules:[{
                            required:true,
                            message:"请选择当前贷款逾期金额要求"
                          }]
                        })(
                          <CheckboxGroup  size="small">
                            <Checkbox value={0}>5百以下</Checkbox>
                            <Checkbox value={1}>5百-1千</Checkbox>
                            <Checkbox value={2}>1-2千</Checkbox>
                            <Checkbox value={3}>2千以上</Checkbox>
                          </CheckboxGroup>
                        )}
                      </Form.Item>:null
                  }
                <Form.Item
                  label="是否必须当前逾期已经结算"
                  {...formItemLayout}
                >
                  {getFieldDecorator('isOverdueBalance',{
                    initialValue: item.isOverdueBalance,
                    rules:[{
                      required:true,
                      message:"请选择是否必须当前逾期已经结算"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={1}>是</Checkbox>
                      <Checkbox value={0}>否</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="是否允许2个月内逾期"
                  {...formItemLayout}
                >
                  {getFieldDecorator('isTwoMonthsOverdue',{
                    initialValue: item.isTwoMonthsOverdue,
                    rules:[{
                      required:true,
                      message:"请选择是否允许2个月内逾期"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={1}>是</Checkbox>
                      <Checkbox value={0}>否</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="是否允许3个月内逾期"
                  {...formItemLayout}
                >
                  {getFieldDecorator('isThreeMonthsOverdue',{
                    initialValue: item.isThreeMonthsOverdue,
                    rules:[{
                      required:true,
                      message:"请选择是否允许3个月内逾期"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={1}>是</Checkbox>
                      <Checkbox value={0}>否</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="是否允许近6个月内有逾期30天以上的情况"
                  {...formItemLayout}
                >
                  {getFieldDecorator('isSixMonthsOverdue',{
                    initialValue: item.isSixMonthsOverdue,
                    rules:[{
                      required:true,
                      message:"请选择是否允许近6个月内有逾期30天以上的情况"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={1}>是</Checkbox>
                      <Checkbox value={0}>否</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="是否允许近1年内有逾期60天以上的情况"
                  {...formItemLayout}
                >
                  {getFieldDecorator('isOneYearOverdue',{
                    initialValue: item.isOneYearOverdue,
                    rules:[{
                      required:true,
                      message:"请选择是否允许近1年内有逾期60天以上的情况"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={1}>是</Checkbox>
                      <Checkbox value={0}>否</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="是否允许近2年内有逾期90天以上的情况"
                  {...formItemLayout}
                >
                  {getFieldDecorator('isTwoYearsOverdue',{
                    initialValue: item.isTwoYearsOverdue,
                    rules:[{
                      required:true,
                      message:"请选择是否允许近2年内有逾期90天以上的情况"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={1}>是</Checkbox>
                      <Checkbox value={0}>否</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
                <Form.Item
                  label="是否允许近5年内有逾期120天以上的情况"
                  {...formItemLayout}
                >
                  {getFieldDecorator('isFiveYearsOverdue',{
                    initialValue: item.isFiveYearsOverdue,
                    rules:[{
                      required:true,
                      message:"请选择是否允许近5年内有逾期120天以上的情况"
                    }]
                  })(
                    <CheckboxGroup  size="small">
                      <Checkbox value={1}>是</Checkbox>
                      <Checkbox value={0}>否</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
              </div>
          }
          <div style={{fontSize:20,fontWeight:'bold'}}>征信查询情况</div>
          <Form.Item
            label="近1个月查询次数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumOneMonthQueries',{
              initialValue: item.sumOneMonthQueries,
            })(
                <Input  type="text" style={{width:200}} addonAfter="次"/>
            )}
          </Form.Item>
          <Form.Item
            label="近2个月查询次数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumTwoMonthsQueries',{
              initialValue: item.sumTwoMonthsQueries,
            })(
                <Input  type="text" style={{width:200}} addonAfter="次"/>
            )}
          </Form.Item>
          <Form.Item
            label="近3个月查询次数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumThreeMonthsQueries',{
              initialValue: item.sumThreeMonthsQueries,
            })(
                <Input  type="text" style={{width:200}} addonAfter="次"/>
            )}
          </Form.Item>
          <Form.Item
            label="近6个月查询次数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumSixMonthsQueries',{
              initialValue: item.sumSixMonthsQueries,
            })(
                <Input  type="text" style={{width:200}} addonAfter="次"/>
            )}
          </Form.Item>
          <Form.Item
            label="近12个月查询次数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumOneYearQueries',{
              initialValue: item.sumOneYearQueries,
            })(
                <Input  type="text" style={{width:200}} addonAfter="次"/>
            )}
          </Form.Item>
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
