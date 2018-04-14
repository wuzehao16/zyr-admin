import React from 'react';
import { connect } from 'dva';
import { Form, Button, Row, Col, Radio, Input    } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const options = [
  { label: '信用贷款', value: 0 },
  { label: '抵押贷款', value: 1 },
];
@Form.create()
class Step1 extends React.PureComponent {
  componentDidMount () {

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
        sm: { span: 11 },
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
      validateFields((err, values) => {
        console.log(values,err)
        if (!err) {
          dispatch({
            type: 'match/saveStep1FormData',
            payload: {
              ...values,
              loanType:[values.loanType]
            },
          });
          dispatch(routerRedux.push('/match/add/step2'));
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
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                style={{marginTop:100}}
                label="模型名称"
                {...formItemLayout}
               >
                {getFieldDecorator('modelName',{
                  rules:[{
                  required:true,
                  message:"请输入模型名称"
                }]})(
                  <Input  type="text" style={{width:200}}/>
                )}
              </Form.Item>
            </Col>
            <Col md={24} sm={24}>
              <Form.Item
                label="贷款类型"
                {...formItemLayout}
               >
                {getFieldDecorator('loanType',{
                  initialValue: 0,
                })(
                  <RadioGroup  options={options}  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" onClick={onValidateForm}>
              下一步
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
