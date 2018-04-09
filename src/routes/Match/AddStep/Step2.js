import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, Row, Col, InputNumber  } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;

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
        sm: { span: 10, offset: 10 },
      },
    };
    const onValidateForm = () => {
      validateFields((err, values) => {
        console.log(values,err)
        if (!err) {
          dispatch({
            type: 'match/saveStepFormData',
            payload: {
              ...values,
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
            <Col md={12} sm={24}>
              <Form.Item
                label="手续费"
                {...formItemLayout}
               >
                {getFieldDecorator('matchPoundage',{
                  initialValue: step.matchPoundage,
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
                     style={{ width: '40%', textAlign: 'center' }} placeholder="最小值" />
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
                   <Input style={{ width: '40%', textAlign: 'center', borderLeft: 0 }} placeholder="最大值" />
                   )}
                 </InputGroup>

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
