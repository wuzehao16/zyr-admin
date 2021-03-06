import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col,Steps, Popover,Input } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';

const Step = Steps.Step;
class Step3 extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
        step1: props.data.step1,
        step2: props.data.step2,
        step3: props.data.step3,
        step4: props.data.step4,
        step5: props.data.step5,
        step6: props.data.step6,
      }
  }

  onChangeStep1 = (e) =>{
    this.setState({
      step1: e.target.value
    })
  }
  onChangeStep2 = (e) =>{
    this.setState({
      step2: e.target.value
    })
  }
  onChangeStep3 = (e) =>{
    this.setState({
      step3: e.target.value
    })
  }
  onChangeStep4 = (e) =>{
    this.setState({
      step4: e.target.value
    })
  }
  onChangeStep5 = (e) =>{
    this.setState({
      step5: e.target.value
    })
  }
  onChangeStep6 = (e) =>{
    this.setState({
      step6: e.target.value
    })
  }
  render() {
    const { dispatch, data, submitting } = this.props;
    const onFinish = () => {
      const applyFlow = Object.values(this.state).join(",")
      dispatch({
        type: 'product/submitStepForm',
        payload: {
          ...data,
          productFeatures: data.productFeatures && data.productFeatures.join(','),
          productPayWay: data.productPayWay && data.productPayWay.join(','),
          customerType: data.customerType && data.customerType.join(','),
          productType: data.productType && data.productType.join(','),
          propertyType: data.propertyType && data.propertyType.join(','),
          applyFlow
        },
      });
    };
    const customDot = (dot, { status, index }) => (
      <Popover content={<span>step {index + 1} status: {status}</span>}>
        {dot}
      </Popover>
    );
    const onPrev = () => {
      dispatch({
        type: 'product/saveStepFormData',
        payload: {
          ...data,
          ...this.state,
        },
      });
      dispatch(routerRedux.push('/product/add/step2'));
    };
    return (
      <div style={{marginTop:"50px"}}>
        <h1>申请流程:</h1>
        <Steps current={6} progressDot style={{marginTop:"50px"}} >
          <Step title="1" description={<Input value={this.state.step1} onChange={this.onChangeStep1} placeholder="请输入"/>} />
          <Step title="2" description={<Input value={this.state.step2} onChange={this.onChangeStep2} placeholder="请输入"/>} />
          <Step title="3" description={<Input value={this.state.step3} onChange={this.onChangeStep3} placeholder="请输入"/>} />
          <Step title="4" description={<Input value={this.state.step4} onChange={this.onChangeStep4} placeholder="请输入"/>} />
          <Step title="5" description={<Input value={this.state.step5} onChange={this.onChangeStep5} placeholder="请输入"/>} />
          <Step title="6" description={<Input value={this.state.step6} onChange={this.onChangeStep6} placeholder="请输入"/>} />
        </Steps>
        <div style={{marginTop:"50px",textAlign:'center'}}>
          <Button onClick={onPrev} style={{ marginRight: 30 }}>
            上一步
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(({ product, loading }) => ({
  data: product.step,
  submitting: loading.effects['product/submitStepForm'],
}))(Step3);
