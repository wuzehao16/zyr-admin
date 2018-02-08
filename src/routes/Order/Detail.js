import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider, Steps,
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;
const Step = Steps.Step;

@connect(({ order }) => ({
  data: order,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  onCheck = (value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      sysMenus: value,
    });
  }
  renderForm() {
    const { submitting, data: { item }, dispatch } = this.props
    switch (item.orderStatus) {
      case 5:
        return this.renderloan();
        break;
      case 6:
        return this.renderReject();
        break;
      case 7:
        return this.renderCancel();
        break;
      default:
        return this.renderDefault();
    }
  }
  renderDefault = ()=> {
    const { submitting, data: { item }, dispatch } = this.props
    return (
      <Steps progressDot  current={item.orderStatus} style={{ marginBottom: 80 }}>
        <Step title="申请中" />
        <Step title="已申请" />
        <Step title="已初审" />
        <Step title="已终审" />
        <Step title="已面签" />
        <Step title="已放款" />
      </Steps>
    )
  }
  renderReject = ()=> {
    const { submitting, data: { item }, dispatch } = this.props
    return (
      <div>
      <Steps progressDot   current={0} style={{ marginBottom: 80 }}>
        <Step title="已拒绝" />
        <Step title="申请中" />
        <Step title="已申请" />
        <Step title="已初审" />
        <Step title="已终审" />
        <Step title="已面签" />
        <Step title="已放款" />
      </Steps>
      <DescriptionList size="large" style={{ marginBottom: 32 }} col={2}>
        <Description term="拒绝原因">{item.cancelReason}</Description>
      </DescriptionList>
      </div>
    )
  }
  renderCancel = ()=> {
    const { submitting, data: { item }, dispatch } = this.props
    return (
      <Steps progressDot status="error"  current={0} style={{ marginBottom: 80 }}>
        <Step title="已取消" />
        <Step title="申请中" />
        <Step title="已申请" />
        <Step title="已初审" />
        <Step title="已终审" />
        <Step title="已面签" />
        <Step title="已放款" />
      </Steps>
    )
  }
  renderloan = ()=> {
    const { submitting, data: { item }, dispatch } = this.props
    return (
      <div>
        <Steps progressDot  current={item.orderStatus} style={{ marginBottom: 80 }}>
          <Step title="申请中" />
          <Step title="已申请" />
          <Step title="已初审" />
          <Step title="已终审" />
          <Step title="已面签" />
          <Step title="已放款" />
        </Steps>
        <DescriptionList size="large" title="申请贷款信息" style={{ marginBottom: 32 }} col={2}>
          <Description term="贷款金额">{item.realLoanMoney}万</Description>
          <Description term="贷款期限">{item.loanLimit}期</Description>
          <Description term="还款方式">{item.realLoanTypeName}</Description>
          <Description term="平台收益">{item.platformIncome}</Description>
          <Description term="提单人佣金">{item.soleCommission}</Description>
        </DescriptionList>
      </div>
    )
  }
  render() {
    const { submitting, data: { item }, dispatch } = this.props
    return (
      <PageHeaderLayout title="订单详情" >
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={2}>
            <Description term="订单号">{item.orderNo}</Description>
            <Description term="更新时间">{moment(item.updateTime).format('llll')}</Description>
            <Description term="城市">{item.city}</Description>
            <Description term="机构名称">{item.manageName}</Description>
            <Description term="产品名称">{item.productName}</Description>
            <Description term="推荐语">{item.productRecommend}</Description>
            <Description term="提单人">{item.userName}</Description>
            <Description term="提单人手机">{item.userPhone}</Description>
            <Description term="产品分润比例">{item.productRatio}</Description>
          </DescriptionList>
          <DescriptionList size="large" title="贷款人信息" style={{ marginBottom: 32 }} col={2}>
            <Description term="姓名">{item.loanName}</Description>
            <Description term="年龄">{item.loanAge}</Description>
            <Description term="名族">{item.nationality}</Description>
            <Description term="身份证">{item.idNumber}</Description>
            <Description term="发证机关">{item.issuingOrgan}</Description>
            <Description term="有效期至">{item.effectiveDate}</Description>
            <Description term="住址">{item.address}</Description>
          </DescriptionList>
          <DescriptionList size="large" title="申请贷款信息" style={{ marginBottom: 32 }} col={2}>
            <Description term="贷款金额">{item.loanMoney}万</Description>
            <Description term="贷款期限">{item.loanLimit}期</Description>
            <Description term="还款方式">{item.payTypeName}</Description>
            <Description term="申请备注">{item.applicationNotes}</Description>
          </DescriptionList>
          {this.renderForm()}
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/order'))}>
            返回
            </Button>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
