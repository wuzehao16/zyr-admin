import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider,
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;

@connect(({ product }) => ({
  data: product,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  onCheck = (value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      sysMenus: value,
    });
  }
  render() {
    const { submitting, data: { item }, dispatch } = this.props
    return (
      <PageHeaderLayout title="产品管理详情" >
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={2}>
            <Description term="所在城市">{item.city}</Description>
            <Description term="机构类型">{item.institutionCode==1?'银行':item.institutionCode==2?'金融机构':'小额贷款'}</Description>
            <Description term="机构名称">{item.manageName}</Description>
            <Description term="产品名称">{item.productName}</Description>
            <Description term="最高可贷">{item.productMaxLoad}</Description>
            <Description term="产品分润比例">{item.productRatio}</Description>
            <Description term="月费率">{item.productMaxLoad}%</Description>
            <Description term="产品期限">{item.productTimeLimit?item.productTimeLimit.replace(',','-'):''}期</Description>
            <Description term="手续费">{item.productPoundage}%</Description>
            <Description term="审批时效">{item.approvalAging?item.approvalAging.replace(',','-'):''}天</Description>
            <Description term="产品须知">{item.productNotice}</Description>
            <Description term="推荐语">{item.productRecommend}期</Description>
            <Description term="排序">{item.productSort}</Description>
            <Description term="上架状态">{item.shelfState==1?'已上架':'已下架'}</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }} col={1}>
            <Description term="产品类别">{item.productType}</Description>
            <Description term="房产类型">{item.propertyType}</Description>
            <Description term="客户类别">{item.customerType}</Description>
            <Description term="还款方式">{item.productPayWay}</Description>
            <Description term="产品特点">{item.productFeatures}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 12 }} />
          <DescriptionList size="large" title="产品介绍" style={{ marginBottom: 12 }} col={1}>
            {/* <Description>{item.productIntroduction}</Description> */}
            <div dangerouslySetInnerHTML={{
             __html: item.productIntroduction
           }}/>
          </DescriptionList>
          <Divider style={{ marginBottom: 12 }} />
          <DescriptionList size="large" title="基本要求" style={{ marginBottom: 12 }} col={1}>
            {/* <Description>{item.basieReq}</Description> */}
            <div dangerouslySetInnerHTML={{
             __html: item.basieReq
           }}/>
          </DescriptionList>
          <Divider style={{ marginBottom: 12 }} />
          <DescriptionList size="large" title="征信要求" style={{ marginBottom: 12 }} col={1}>
            {/* <Description>{item.creditReq}</Description> */}
            <div dangerouslySetInnerHTML={{
             __html: item.creditReq
           }}/>
          </DescriptionList>
          <Divider style={{ marginBottom: 12 }} />
          <DescriptionList size="large" title="额度计算" style={{ marginBottom: 12 }} col={1}>
            {/* <Description>{item.positonCount}</Description> */}
            <div dangerouslySetInnerHTML={{
             __html: item.positonCount
           }}/>
          </DescriptionList>
          <Divider style={{ marginBottom: 12 }} />
          <DescriptionList size="large" title="其他要求" style={{ marginBottom: 12 }} col={1}>
            {/* <Description>{item.otherReq}</Description> */}
            <div dangerouslySetInnerHTML={{
             __html: item.otherReq
           }}/>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/product'))}>
            返回
            </Button>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
