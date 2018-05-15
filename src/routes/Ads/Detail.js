import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider,
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const FormItem = Form.Item;

const { Description } = DescriptionList;

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 10 },
  },
};

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
      // <PageHeaderLayout title="广告管理详情" >
      <PageHeaderLayout>
        <Card bordered={false}>
          <DescriptionList size="large" title="广告详情" style={{ marginBottom: 50,marginLeft:'15%'}} col={2}>
            <div>
              <Description term=""><img src={item.adsPic}  style={{width:80,height:80,margin:'20px 0'}} alt="广告图片"/></Description>
            </div>
            <Description term="广告标题">{item.adsTitle}</Description>
            <Description term="广告类型">{item.adsTypeName}</Description>
            <Description term="匹配词">{item.adsMatch}</Description>
            <Description term="广告排序">{item.adsSort}</Description>
            <Description term="上架状态">{item.upState==0?'待上架':item.upState==1?'已上架':'已下架'}</Description>
            {
              item.upState ==0
                ? <div>
                  <Description term="自动上下架时间">{moment(item.autoUpTime).format('llll')}</Description>
                  <Description term="自动下架时间">{moment(item.autoDownTime).format('llll')}</Description>
                  </div>
                : <Description></Description>
            }
            <Description term="广告内容">{item.adsContent}</Description>
            <Description term="跳转链接">{item.adsUrl}</Description>
          </DescriptionList>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button onClick={() => dispatch(routerRedux.push('/ads'))}>
                返回
              </Button>
          </FormItem>
        </Card>
      </PageHeaderLayout>
    );
  }
}
