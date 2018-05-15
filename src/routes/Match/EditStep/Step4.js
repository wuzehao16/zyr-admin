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
    var item = step.income;
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 12 },
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
        sm: { span: 10, offset: 12 },
      },
    };
    const onValidateForm = () => {
      validateFields((err, values) => {
        console.log(values,err)
        if (!err) {
          dispatch({
            type: 'match/saveStep4FormData',
            payload: {
              ...values,
            },
          });
          dispatch(routerRedux.push('/match/edit/step5'));
        }
      });
    };
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{ margin: '30px 0 50px 0' }}
        >
          <Form.Item
            label="请输入本单位连续上班月份要求"
            {...formItemLayout}
           >
            {getFieldDecorator('specificWorkTime',{
              initialValue: item.specificWorkTime,
            })(
                <Input  type="text" style={{width:200}} addonAfter="月"/>
            )}
          </Form.Item>
          <Form.Item
            label="近3个月税前月均收入要求"
            {...formItemLayout}
           >
            {getFieldDecorator('threeMonthsAvgSalary',{
              initialValue: item.threeMonthsAvgSalary,
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="近6个月税前月均收入要求"
            {...formItemLayout}
           >
            {getFieldDecorator('SixMonthsAvgSalary',{
              initialValue: item.SixMonthsAvgSalary,
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="近12个月税前月均收入要求"
            {...formItemLayout}
           >
            {getFieldDecorator('thisYearMonthsAvgSalary',{
              initialValue: item.thisYearMonthsAvgSalary,
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="上一年度税前月均收入要求"
            {...formItemLayout}
           >
            {getFieldDecorator('lastYearMonthsAvgSalary',{
              initialValue: item.lastYearMonthsAvgSalary,
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="社保缴纳基数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('specificInsuranceBase',{
              initialValue: item.specificInsuranceBase,
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="本单位连续缴纳时长要求"
            {...formItemLayout}
           >
            {getFieldDecorator('specificInsurancePaymonth',{
              initialValue: item.specificInsurancePaymonth,
            })(
                <Input  type="text" style={{width:200}} addonAfter="月"/>
            )}
          </Form.Item>
          <Form.Item
            label="是否必须有养老保险"
            {...formItemLayout}
           >
            {getFieldDecorator('isEndowmentInsurance',{
              initialValue: item.isEndowmentInsurance,
              rules:[{
                required:true,
                message:"请选择是否必须有养老保险"
              }]
            })(
              <CheckboxGroup  >
                <Checkbox value={1}>是</Checkbox>
                <Checkbox value={0}>否</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          {
            (getFieldValue('isEndowmentInsurance').length==1 && getFieldValue('isEndowmentInsurance')==1)?
            <div>
              <Form.Item
              label="本单位社保基数调整要求"
              {...formItemLayout}
            >
              {getFieldDecorator('isInsuranceAdjustment',{
                initialValue: item.isInsuranceAdjustment,
                rules:[{
                  required:true,
                  message:"请选择本单位社保基数调整要求"
                }]
              })(
                <CheckboxGroup  >
                  <Checkbox value={0}>无</Checkbox>
                  <Checkbox value={1}>半年内有</Checkbox>
                  <Checkbox value={2}>一年内有</Checkbox>
                </CheckboxGroup>
              )}
            </Form.Item>
            {
              (getFieldValue('isInsuranceAdjustment') ? ( getFieldValue('isInsuranceAdjustment').length!=0 && getFieldValue('isInsuranceAdjustment').indexOf(0) < 0 ) : false) ?
              <div>
                <Form.Item
                label="调整前社保缴纳基数要求"
                {...formItemLayout}
              >
                {getFieldDecorator('exInsuranceBase',{
                  initialValue: item.exInsuranceBase,
                })(
                    <Input  type="text" style={{width:200}} addonAfter="元"/>
                )}
              </Form.Item>
              </div>:null
            }
            </div>:null
          }

          <Form.Item
            label="公积金缴纳基数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('specificProvidentFundBase',{
              initialValue: item.specificProvidentFundBase,
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="本单位连续缴纳时长要求"
            {...formItemLayout}
           >
            {getFieldDecorator('specificProvidentFundPaymonth',{
              initialValue: item.specificProvidentFundPaymonth,
            })(
                <Input  type="text" style={{width:200}} addonAfter="月"/>
            )}
          </Form.Item>
          <Form.Item
            label="本单位公积金基数调整要求"
            {...formItemLayout}
           >
            {getFieldDecorator('isProvidentFundAdjustment',{
              initialValue: item.isProvidentFundAdjustment,
              rules:[{
                required:true,
                message:"请选择本单位公积金基数调整要求"
              }]
            })(
              <CheckboxGroup  >
                <Checkbox value={0}>无</Checkbox>
                <Checkbox value={1}>半年内有</Checkbox>
                <Checkbox value={2}>一年内有</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          {
            ((getFieldValue('isProvidentFundAdjustment').indexOf(1)>=0) || getFieldValue('isProvidentFundAdjustment').indexOf(2)>=0) && getFieldValue('isProvidentFundAdjustment').indexOf(0)<0?
              <div>
                <Form.Item
                  label="调整前公积金缴纳基数要求"
                  {...formItemLayout}
                >
                  {getFieldDecorator('exProvidentFundBase',{
                    initialValue: item.exProvidentFundBase,
                  })(
                      <Input  type="text" style={{width:200}} addonAfter="元"/>
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
