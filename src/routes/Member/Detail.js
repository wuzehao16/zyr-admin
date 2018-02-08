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

@connect(({ member }) => ({
  data: member,
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
    const { submitting, data: { item }, dispatch } = this.props;

    return (
      <PageHeaderLayout title="用户详情" >
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={2}>
            <Description term="用户编号">{item.userId}</Description>
            <Description term="手机号码">{item.loginAccount}</Description>
            <Description term="用户名称">{item.userName}</Description>
            <Description term="微信号">{item.wachatNo}</Description>
            <Description term="用户头像">
              <img src={item.userHead} alt="" height={80} width={80}/>
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="认证消息" style={{ marginBottom: 32 }} col={2}>
            <Description term="真实姓名">{item.realName}</Description>
            <Description term="性别">{item.userSex === 1 ? '女' : '男'}</Description>
            <Description term="身份证号">{item.idNumber}</Description>
            <Description>&nbsp;</Description>
            <Description >
              <img src={item.upperPictureId} alt="" height={200} width={400}/>
            </Description>
            <Description >
              <img src={item.backPictureId} alt="" height={200} width={400}/>
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="会员信息" style={{ marginBottom: 32 }} col={2}>
            <Description term="是否为会员">{item.isMember === 1 ? '否' : '是'}</Description>
            <Description term="会员类型">{item.leveName}</Description>
            <Description term="购买时间">{moment(item.buyTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
            <Description term="有效时间">{moment(item.expirdTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
            <Description term="购买时长">{item.longTime}个月</Description>
            <Description term="价格">{item.memberPrice}元</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="其他信息" style={{ marginBottom: 32 }} col={2}>
            <Description term="是否为客服">{item.isCustom === 1 ? '是' : '否'}</Description>
            <Description term="客服类型">{item.userIdentity === 1 ? '机构客服' : '平台客服'}</Description>
            <Description term="机构名称">{item.manageName}</Description>
            <Description term="启用状态">{item.islock === 1 ? '启用' : '禁用'}</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/member'))}>
            返回
            </Button>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
