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
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 11 },
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
        sm: { span: 10, offset: 10 },
      },
    };
    const onValidateForm = () => {
      const { data } = this.props;
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'match/submitStepForm',
            payload: {
              ...data,
              capitalDebtSituation:{
              ...values,
              }
            },
          });
          // dispatch(routerRedux.push('/match/add/step4'));
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
          {/* <div style={{fontSize:20,fontWeight:'bold'}}>名下负债状况</div> */}
          <Form.Item
            label="信用类贷款笔数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumCreditLoan',{
              initialValue: "<10",
            })(
                <Input  type="text" style={{width:200}} addonAfter="笔"/>
            )}
          </Form.Item>
          <Form.Item
            label="等额本息类笔数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumEqualInterest',{
              initialValue: "<10",
            })(
                <Input  type="text" style={{width:200}} addonAfter="笔"/>
            )}
          </Form.Item>
          <Form.Item
            label="等额本息类贷款总余额要求"
            {...formItemLayout}
           >
            {getFieldDecorator('equalInterestTotalBalance',{
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="等额本息每月还款总额要求"
            {...formItemLayout}
           >
            {getFieldDecorator('equalInteresMonthPayment',{
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="先息后本类要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumFirstInterest',{
              initialValue: "<10",
            })(
                <Input  type="text" style={{width:200}} addonAfter="笔"/>
            )}
          </Form.Item>
          <Form.Item
            label="先息后本类贷款总余额要求"
            {...formItemLayout}
           >
            {getFieldDecorator('firstInterestTotalBalance',{
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="先息后本每月还利息要求"
            {...formItemLayout}
           >
            {getFieldDecorator('firstInterestMonthPayment',{
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="随借随还类要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumAlongLoan',{
              initialValue: "<10",
            })(
                <Input  type="text" style={{width:200}} addonAfter="笔"/>
            )}
          </Form.Item>
          <Form.Item
            label="随借随还类贷款总余额要求"
            {...formItemLayout}
           >
            {getFieldDecorator('alongLoanTotalBalance',{
              initialValue: "<10",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="随借随还每月还利息要求"
            {...formItemLayout}
           >
            {getFieldDecorator('alongLoanMonthPayment',{
              initialValue: "<10",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="信用卡笔数要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumCreditCard',{
              initialValue: "<10",
            })(
                <Input  type="text" style={{width:200}} addonAfter="笔"/>
            )}
          </Form.Item>
          <Form.Item
            label="信用卡总额度要求"
            {...formItemLayout}
           >
            {getFieldDecorator('creditCardTotalLimit',{
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="信用卡当月已使用额度要求"
            {...formItemLayout}
           >
            {getFieldDecorator('creditCardUsedLimit',{
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="信用卡近6个月平均使用额度要求"
            {...formItemLayout}
           >
            {getFieldDecorator('creditCardSixMonthsAvgUsedLimit',{
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="信用卡办理分期还款数量要求"
            {...formItemLayout}
           >
            {getFieldDecorator('sumStagesCreditCard',{
            })(
                <Input  type="text" style={{width:200}} addonAfter="张"/>
            )}
          </Form.Item>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" onClick={onValidateForm}>
              提交
            </Button>
            <Button style={{ marginLeft: 50 }} onClick={() => dispatch(routerRedux.push('/match'))}>
              返回
            </Button>
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
