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
    span: 4,
  },
  wrapperCol: {
    span: 24,
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 9 },
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
 componentDidMount() {
   const { product:{ step } } = this.props;
   this.setState({
     productIntroduction: step.productIntroduction,
     basieReq: step.basieReq,
     creditReq: step.creditReq,
     claims: step.claims,
     positonCount: step.positonCount,
     otherReq: step.otherReq
   })
 }
 productIntroduction = (value) => {
    this.setState({
      productIntroduction: value,
    })
  };
 basieReq = (value) => {
    this.setState({
      basieReq: value,
    })
  };
 creditReq = (value) => {
    this.setState({
      creditReq: value,
    })
  };
  claims = (value) => {
     this.setState({
       claims: value,
     })
   };
 positonCount = (value) => {
    this.setState({
      positonCount: value,
    })
  };
 otherReq = (value) => {
    this.setState({
      otherReq: value,
    })
  };
  // prompt = () => {
  //   notification.open({
  //     message: 'We got value:',
  //     description: <span dangerouslySetInnerHTML={{ __html: this.state.productIntroduction }}></span>,
  //   });
  // };
  render() {
    const { form, data, dispatch, submitting, product:{ step } } = this.props;
    const item = step ||{};
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/product/edit/step1'));
    };
    console.log(item)
    const onValidateForm = (e) => {
      dispatch(routerRedux.push('/product/edit/step3'));
      e.preventDefault();
      // validateFields((err, values) => {
        // if (!err) {
          dispatch({
            type: 'product/saveStepFormData',
            payload: {
              ...data,
              ...this.state,
            },
          });
        // }
      // });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm1}>
        <Form.Item
          {...formItemLayout}
           label="产品介绍">
           <ReactQuill
             defaultValue={item.productIntroduction}
             value={this.state.productIntroduction}
             onChange={this.productIntroduction}
             placeholder='请输入...'
           />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="基本要求">
           <ReactQuill
             defaultValue={item.basieReq}
             value={this.state.basieReq}
             onChange={this.basieReq}
             placeholder='请输入...'
            />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="征信要求">
           <ReactQuill
             defaultValue={item.creditReq}
             value={this.state.creditReq}
             onChange={this.creditReq}
             placeholder='请输入...'
            />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="负债要求">
           <ReactQuill
             defaultValue={item.claims}
             value={this.state.claims}
             onChange={this.claims}
             placeholder='请输入...'
            />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="额度计算">
           <ReactQuill
             defaultValue={item.positonCount}
             value={this.state.positonCount}
             onChange={this.positonCount}
             placeholder='请输入...'
            />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
           label="其它要求">
           <ReactQuill
             defaultValue={item.otherReq}
             value={this.state.otherReq}
             onChange={this.otherReq}
             placeholder='请输入...'
            />
        </Form.Item>

        {/* <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 10, offset: 10 },
          }}
          label=""
        >
          <Button onClick={onPrev} style={{ marginRight: 50 }}>
            上一步
          </Button>
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            下一步
          </Button>
        </Form.Item> */}

        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button onClick={onPrev} style={{ marginRight: 50 }}>
            上一步
            </Button>
            <Button type="primary" onClick={onValidateForm} loading={submitting}>
            下一步
            </Button>
        </Form.Item>
        <style jsx>{`
          .ant-form label{
            font-weight:700;
          }
          `}
        </style>
      </Form>
    );
  }
}

export default connect(({ product, loading }) => ({
  submitting: loading.effects['product/submitStepForm'],
  data: product.step,
  product,
}))(Step2);
