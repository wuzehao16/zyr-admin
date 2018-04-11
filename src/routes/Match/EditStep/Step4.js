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
        md: { span: 12 },
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
      validateFields((err, values) => {
        console.log(values,err)
        if (!err) {
          dispatch({
            type: 'match/saveStep4FormData',
            payload: {
              ...values,
            },
          });
          dispatch(routerRedux.push('/match/add/step5'));
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
          <Form.Item
            label="请输入本单位连续上班月份"
            {...formItemLayout}
           >
            {getFieldDecorator('specificWorkTime',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="月"/>
            )}
          </Form.Item>
          <Form.Item
            label="近3个月税前月均收入"
            {...formItemLayout}
           >
            {getFieldDecorator('threeMonthsAvgSalary',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="近6个月税前月均收入"
            {...formItemLayout}
           >
            {getFieldDecorator('SixMonthsAvgSalary',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="近12个月税前月均收入"
            {...formItemLayout}
           >
            {getFieldDecorator('thisYearMonthsAvgSalary',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="上一年度税前月均收入"
            {...formItemLayout}
           >
            {getFieldDecorator('lastYearMonthsAvgSalary',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="社保缴纳基数"
            {...formItemLayout}
           >
            {getFieldDecorator('specificInsuranceBase',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="本单位连续缴纳"
            {...formItemLayout}
           >
            {getFieldDecorator('specificInsurancePaymonth',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="月"/>
            )}
          </Form.Item>
          <Form.Item
            label="有无养老保险"
            {...formItemLayout}
           >
            {getFieldDecorator('isEndowmentInsurance',{
              initialValue: [0,1],
            })(
              <CheckboxGroup  >
                <Checkbox value={1}>有</Checkbox>
                <Checkbox value={0}>无</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <Form.Item
            label="本单位有无社保基数调整"
            {...formItemLayout}
           >
            {getFieldDecorator('isInsuranceAdjustment',{
              initialValue: [0,1,2],
            })(
              <CheckboxGroup  >
                <Checkbox value={0}>无</Checkbox>
                <Checkbox value={1}>半年内有</Checkbox>
                <Checkbox value={2}>一年内有</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <Form.Item
            label="调整前社保缴纳基数"
            {...formItemLayout}
           >
            {getFieldDecorator('exInsuranceBase',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="公积金缴纳基数"
            {...formItemLayout}
           >
            {getFieldDecorator('specificProvidentFundBase',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
            )}
          </Form.Item>
          <Form.Item
            label="本单位连续缴纳"
            {...formItemLayout}
           >
            {getFieldDecorator('specificProvidentFundPaymonth',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="月"/>
            )}
          </Form.Item>
          <Form.Item
            label="本单位有无公积金基数调整"
            {...formItemLayout}
           >
            {getFieldDecorator('isProvidentFundAdjustment',{
              initialValue: [0,1,2],
            })(
              <CheckboxGroup  >
                <Checkbox value={0}>无</Checkbox>
                <Checkbox value={1}>半年内有</Checkbox>
                <Checkbox value={2}>一年内有</Checkbox>
              </CheckboxGroup>
            )}
          </Form.Item>
          <Form.Item
            label="调整前公积金缴纳基数"
            {...formItemLayout}
           >
            {getFieldDecorator('exProvidentFundBase',{
              initialValue: ">0",
            })(
                <Input  type="text" style={{width:200}} addonAfter="元"/>
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
