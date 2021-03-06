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
    return (
      // <PageHeaderLayout title="内容管理详情" >
      <PageHeaderLayout>
        <Card bordered={false}>
          <DescriptionList size="large" title="内容信息" style={{ marginBottom: 32, marginLeft: "15%" }} col={2}>
            <div style={{margin:'20px 0'}}>
              <Description><img src={item.contentPic} alt="栏目封面图" height={240} width={400}/></Description>
            </div>
            <Description term="ID">{item.channelId}</Description>
            <Description term="栏目分类">{item.channelTypeName}</Description>
            <Description term="栏目名称">{item.channelName}</Description>
            <Description term="标题">{item.contentTitle}</Description>
            <Description term="简介">{item.contentBrief}</Description>
            <Description term="排序">{item.contentSort}</Description>
            <Description term="来源">{item.source}</Description>
            <Description term="来源网址">{item.sourceSite}</Description>
            <Description term="内容类型">{item.contentType==0?'图文':'视频'}</Description>
            <Description term="是否显示">{item.isDisplay==1?'是':'否'}</Description>
            {
              item.contentType == '0'
              ?<Description term="标签选择">{item.contentTag==0?'荐':item.contentTag==1?'热':'无'}</Description> :<Description></Description>
            }

          </DescriptionList>
          <Divider style={{ marginBottom: 12, marginLeft:'15%', width:'70%' }} />
          {
            item.contentType == 0
              ? <div>
                <DescriptionList size="large" title="内容详情" style={{ marginBottom: 12 , marginLeft: "15%",marginRight:'15%' }} col={2}>
                  {/* <Description>{item.contentIntroduction}</Description> */}
                  <div dangerouslySetInnerHTML={{
                   __html: item.content
                 }}/>
                </DescriptionList>
              </div>: <div style={{marginLeft: "15%",marginBottom:'32px'}}>
                      <video src={item.content} controls="controls">
                      您的浏览器不支持 video 标签。
                      </video>
                    </div>
          }
          <DescriptionList size="large" style={{ marginBottom: 32, marginLeft: "15%" }} col={2}>
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
