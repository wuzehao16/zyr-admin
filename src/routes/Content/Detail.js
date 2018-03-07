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

@connect(({ content }) => ({
  data: content,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  render() {
    const { submitting, data: { item }, dispatch } = this.props
    console.log(item)
    return (
      <PageHeaderLayout title="内容管理详情" >
        <Card bordered={false}>
          <DescriptionList size="large" title="内容详情" style={{ marginBottom: 32 }} col={2}>
            <Description term="ID">{item.channelId}</Description>
            <Description term="栏目分类">{item.channelTypeName}</Description>
            <Description term="栏目名称">{item.channelName}</Description>
            <Description term="标题">{item.contentTitle}</Description>
            <Description term="简介">{item.contentBrief}</Description>
            <Description term="封面图"><img src={item.contentPic} alt="" height={80} width={80}/></Description>
            <Description term="排序">{item.contentSort}</Description>
            <Description term="来源">{item.source}</Description>
            <Description term="来源网址">{item.sourceSite}</Description>
            <Description term="内容类型">{item.contentTypeName}</Description>
            <Description term="是否显示">{item.isDisplay==1?'是':'否'}</Description>
            <Description term="标签选择">{item.contentTag==0?'荐':item.contentTag==1?'热':'无'}</Description>

          </DescriptionList>
          <Divider style={{ marginBottom: 12 }} />
          <DescriptionList size="large" title="内容" style={{ marginBottom: 12 }} col={1}>
            {/* <Description>{item.contentIntroduction}</Description> */}
            <div dangerouslySetInnerHTML={{
             __html: item.content
           }}/>
           <Description term="发布者">{item.oper}</Description>
           <Description term="更新时间">{moment(item.updateTime).format('llll')}</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/content/information'))}>
            返回
            </Button>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
