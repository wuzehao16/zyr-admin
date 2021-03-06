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
    const { getFieldDecorator } = this.props.form;
    const id = this.props.location.search.split("=")[1];
    this.props.dispatch({
      type:'match/fetchDetail',
      payload:{
        id:id
      }
    })
    getFieldDecorator('id',{
      initialValue: id,})
  }
  render() {
    const {
      match: {
        step,
      },
      submitting,
      dispatch
    } = this.props;
    var item = step.loanDemand || {}
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 11 },
        md: { span: 10 },
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
        sm: { span: 10, offset: 10 },
      },
    };
    const onValidateForm = () => {
      validateFields((err, values) => {
        
        if (!err) {
          dispatch({
            type: 'match/saveStep1FormData',
            payload: {
              ...values,
              loanType:[values.loanType]
            },
          });
          dispatch(routerRedux.push('/match/edit/step2'));
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
          <Row>
            <Col md={{span:16,offset:5}} sm={24}>
              <div style={{fontSize:13,color:'#666',margin:'30px 0 50px 0'}}>
                <p style={{textIndent: '-4.5em'}}>提示：1、选择题：请取消勾选不允许存在的选项，比如该产品只面向年龄为18岁及以上的客户，请取消勾选：“18岁以下”；若该产品对学历无要求，则保持全选状态，
                依次类推！</p>
                <p style={{textIndent: '-1.5em'}}>2、填空题：填写阈值时，阈值前必须使用"&gt;"、"&gt;="、"&lt;"、"&lt;=",不填写阈值表示对该选题无要求！</p>
              </div>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="模型名称"
                {...formItemLayout}
               >
                {getFieldDecorator('modelName',{
                  initialValue:step.modelName,
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
                  initialValue: item.loanType?item.loanType[0]:null,
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
