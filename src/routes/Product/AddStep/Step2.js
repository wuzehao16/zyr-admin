import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, notification } from 'antd';
import { routerRedux } from 'dva/router';
import ReactQuill from '../../../components/Quill';
import 'react-quill/dist/quill.snow.css';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';
import quill from './quill.less'
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 24,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  state = {
   productIntroduction: '',
   basieReq: '',
   creditReq: '',
   positonCount: '',
   claims:'',
   otherReq: '',
 };
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/product/add/step1'));
    };
    const onValidateForm = (e) => {

      e.preventDefault();
      validateFields((err, values) => {
        console.log(values)
        if (!err) {
          dispatch({
            type: 'product/saveStepFormData',
            payload: {
              ...data,
              ...values,
            },
          });
          dispatch(routerRedux.push('/product/add/step3'));
        }
      });
    };
    return (
      <Form
        layout="horizontal"
        hideRequiredMark
        className={styles.stepForm1}>
        <Form.Item
          {...formItemLayout}
           label="产品介绍"
           >
           {getFieldDecorator('productIntroduction',{
             initialValue: data.productIntroduction,
             valuePropName: "defaultValue",
           })(
             <ReactQuill
               placeholder='请输入...'
             />
           )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="基本要求">
           {getFieldDecorator('basieReq',{
             initialValue: data.basieReq,
             valuePropName: "defaultValue",
           })(
             <ReactQuill
               placeholder='请输入...'
             />
           )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="征信要求">
           {getFieldDecorator('creditReq',{
             initialValue: data.creditReq,
             valuePropName: "defaultValue",
           })(
             <ReactQuill
               placeholder='请输入...'
             />
           )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="负债要求">
           {getFieldDecorator('claims',{
             initialValue: data.claims,
             valuePropName: "defaultValue",
           })(
             <ReactQuill
               placeholder='请输入...'
             />
           )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="额度计算">
           {getFieldDecorator('positonCount',{
             initialValue: data.positonCount,
             valuePropName: "defaultValue",
           })(
             <ReactQuill
               placeholder='请输入...'
             />
           )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="其它要求">
           {getFieldDecorator('otherReq',{
             initialValue: data.otherReq,
             valuePropName: "defaultValue",
           })(
             <ReactQuill
               placeholder='请输入...'
             />
           )}
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
          }}
          label=""
        >
          <Button onClick={onPrev} style={{ marginRight: 30 }}>
            上一步
          </Button>
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            下一步
          </Button>

        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ product }) => ({
  data: product.step,
}))(Step2);
