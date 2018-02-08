import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider, Steps, Col , Select, Input, InputNumber,
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const Step = Steps.Step;
const { TextArea } = Input;
const Option = Select.Option;
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'order/updateOrderState',
          payload: values,
        });
      }
    });
  }
  renderForm() {
    const { submitting, data: { item }, dispatch } = this.props
    switch (item.orderStatus) {
      case 4:
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
      <DescriptionList size="large" title="" style={{ marginBottom: 32 }} col={2}>
      <Description term="更新状态">
        <Col sm={12} xs={24}>
          <FormItem >
            {getFieldDecorator('orderStatus', {
              rules: [{
                 required: true,
                 message: '请选择更新状态'
               }],
             })(
              <Select placeholder="请选择" style={{ width: '100%' }}>

                <Option
                  style={{display:(item.orderStatus < 5)?'block':'none'}}
                  value={item.orderStatus+1}>下一步</Option>
                <Option value={6}>拒绝</Option>
              </Select>
          )}
          </FormItem>
        </Col>
      </Description>
      </DescriptionList>
      </div>
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
        <DescriptionList size="large" title="" style={{ marginBottom: 32 }} col={2}>
        <Description term="更新状态">
          <Col sm={12} xs={24}>
            <FormItem >
              {getFieldDecorator('orderStatus', {
                rules: [{
                   required: true,
                   message: '请选择更新状态'
                 }],
               })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option
                    style={{display:(item.orderStatus < 5)?'block':'none'}}
                    value={item.orderStatus+1}>下一步</Option>
                  <Option value={6}>拒绝</Option>
                </Select>
            )}
            </FormItem>
          </Col>
        </Description>
        </DescriptionList>
        <DescriptionList size="large" title="" style={{ marginBottom: 32 }} col={2}>
        <Description term="贷款金额">
          <Col sm={12} xs={24}>
            <FormItem >
              {getFieldDecorator('realLoanMoney', {
                rules: [{
                   required: true,
                   message: '请输入贷款金额'
                 }],
          })(
                  <Input type="number" min={0} max={10000} addonAfter="万" placeholder="请输入"/>
            )}
            </FormItem>
          </Col>
        </Description>
        <Description term="贷款期限">
          <Col sm={12} xs={24}>
            <FormItem >
              {getFieldDecorator('loanLimit', {
                rules: [{
                   required: true,
                   message: '请输入贷款期限'
                 }],
               })(
                  <Input type="number" min={0} max={100} addonAfter="期" placeholder="请输入"/>
            )}
            </FormItem>
          </Col>
        </Description>
        <Description term="还款方式">
          <Col sm={12} xs={24}>
            <FormItem >
              {getFieldDecorator('realLoanType', {
                rules: [{
                   required: true,
                   message: '请选择还款方式'
                 }],
               })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={6}>拒绝</Option>
                </Select>
            )}
            </FormItem>
          </Col>
        </Description>
        </DescriptionList>
      </div>
    )
  }
  render() {
    const { submitting, data: { item }, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('orderId',{initialValue: item.orderId})
    return (
      <PageHeaderLayout title="订单详情" >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
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
          <DescriptionList col={1} style={{ marginBottom: 32 }}>
          <Description
            term="拒绝原因"
            style={{
            display: getFieldValue('orderStatus') === 6 ? 'block' : 'none',
          }}
          >
            <Col sm={12} xs={24}>
              <FormItem >
                {getFieldDecorator('cancelReason')(
                  <TextArea  rows={4}/>
              )}
              </FormItem>
            </Col>
          </Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} type="primary" htmlType="submit" loading={submitting}>
              保存
            </Button>
            <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/order'))}>
            返回
            </Button>
          </DescriptionList>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
