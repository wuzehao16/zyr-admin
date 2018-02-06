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
      <PageHeaderLayout title="产品管理详情" >
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={2}>
            {/* <Description term="所在城市">{item.city}</Description> */}

          </DescriptionList>
          <Divider style={{ marginBottom: 12 }} />
          <DescriptionList size="large" title="产品介绍" style={{ marginBottom: 12 }} col={1}>
            {/* <Description>{item.contentIntroduction}</Description> */}
            <div dangerouslySetInnerHTML={{
             __html: item.contentIntroduction
           }}/>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/content'))}>
            返回
            </Button>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
