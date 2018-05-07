import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider, Steps, Devider
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
  componentDidMount () {
    const id = this.props.match.params.id;
    this.props.dispatch({
      type: 'order/fetchDetail',
      payload: {
        orderId: id,
      },
    });
  }
  render() {
    const { submitting, data: { item }, dispatch } = this.props
    return (
      <PageHeaderLayout style={{ marginBottom: 32}} style={{fontWeight:'normal'}}>
        <Card bordered={false} style={{padding:'0 146px 0 135px'}}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32,position:'relative'}} col={2}>
            <Description term="订单号">{item.orderNo}</Description>
            <Description term="更新时间">{moment(item.updateTime).format('llll')}</Description>
            <Description term="城市">{item.city}</Description>
            <Description term="机构名称">{item.manageName}</Description>
            <Description term="产品名称">{item.productName}</Description>
            <Description term="推荐语">{item.productRecommend}</Description>
            <Description term="提单人">{item.userName}</Description>
            <Description term="提单人手机">{item.userPhone}</Description>
            <Description term="产品分润比例">{item.productRatio + '%'}</Description>
            <div className='banklogo' style={{position:'absolute',top:'0',right:'0',width:'260px',height:'140px'}}>
              <img src={item.manageLogoId} />
            </div>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="贷款人信息" style={{ marginBottom: 32}} col={2}>
            <Description term="姓名">{item.loanName}</Description>
            <Description term="年龄">{item.loanAge}</Description>
            <Description term="民族">{item.nationality}</Description>
            <Description term="身份证">{item.idNumber}</Description>
            <Description term="签发机关">{item.issuingOrgan}</Description>
            <Description term="有效期至">{moment(item.effectiveDate).format('l')}</Description>
            <Description term="住址">{item.address}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="申请贷款信息" style={{ marginBottom: 32}} col={2}>
            <Description term="贷款金额">{item.loanMoney + '万'}</Description>
            <Description term="贷款期限">{item.loanLimit + '期'}</Description>
            <Description term="还款方式">{item.payTypeName}</Description>
            <Description term="申请备注">{item.applicationNotes}</Description>
          </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/order'))}>
            返回
            </Button>
          </DescriptionList>
        </Card>
          <style jsx>{`
            .banklogo img{
              max-width: 100%;
               max-height: 100%;
              border:1px solid #c8c8c8;
            }
            @media screen and (max-width:1400px) {
              .banklogo {
                display:none;
              }
            }
          `}
          </style>
      </PageHeaderLayout>
    );
  }
}
