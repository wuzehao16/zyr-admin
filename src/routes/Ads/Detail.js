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

@connect(({ ads }) => ({
  data: ads,
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
      <PageHeaderLayout title="广告管理详情" >
        <Card bordered={false}>
          <DescriptionList size="large" title="广告详情" style={{ marginBottom: 32 }} col={1}>
            <Description term="标题">{item.adsTitle}</Description>
            <Description term="内容">{item.adsContent}</Description>
            <Description term="匹配词">{item.adsMatch}</Description>
            <Description term="图片"><img src={item.adsPic} alt=""/></Description>
            <Description term="跳转链接">{item.adsUrl}</Description>
            <Description term="排序">{item.adsSort}</Description>
            <Description term="上架状态">{item.upState==0?'待上架':item.upState==1?'已上架':'已下架'}</Description>
            <Description term="广告类型">{item.adsTypeName}</Description>
            {
              item.upState ==0
                ? <div>
                  <Description term="自动上下架时间">{moment(item.autoUpTime).format('llll')}</Description>
                  <Description term="自动下架时间">{moment(item.autoDownTime).format('llll')}</Description>
                  </div>
                : <Description></Description>
            }

          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/ads'))}>
            返回
            </Button>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
