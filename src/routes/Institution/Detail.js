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

@connect(({ institution }) => ({
  data: institution,
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
      <PageHeaderLayout title="机构管理详情" >
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={2}>
            <Description term="机构类型">{item.institutionCode==1?'银行':item.institutionCode==2?'金融机构':'小额贷款'}</Description>
            <Description term="所在城市">{item.city}</Description>
            <Description term="机构名称">{item.manageName}</Description>
            <Description term="用户名">{item.loginAccount}</Description>
            <Description term="邮箱">{item.userEmail}</Description>
            <Description term="手机">{item.userPhone}</Description>
            <Description term="机构logo">
              <img src={item.manageLogoId} alt="" width={80} height={80}/>
            </Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }} col={2}>
            <Description term="排序">{item.sort}</Description>
            <Description term="启用状态">{item.startStatus==1?'启用':'禁用'}</Description>
            <Description term="操作者">{item.oper}</Description>
            <Description term="审核时间">{moment(item.approvalTime).format('llll')}</Description>
            <Description term="注册时间">{moment(item.registrationTime).format('llll')}</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/institution'))}>
            返回
            </Button>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
