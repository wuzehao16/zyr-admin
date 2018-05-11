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
      <PageHeaderLayout title="机构详情" >
        <Card bordered={false}>
          <DescriptionList size="large" style={{ marginTop:30,marginBottom: 15,marginLeft:'15%'}} col={2}>
            <div style={{marginBottom:'20px'}}>
              <Description>
                <img  src={item.manageLogoId} alt="机构logo" width={80} height={80}/>
              </Description>
            </div>
            <Description term="机构类型">{item.institutionCode==1?'银行':item.institutionCode==2?'金融机构':'小额贷款'}</Description>
            <Description term="所在城市">{item.city}</Description>
            <Description term="机构名称">{item.manageName}</Description>
            <Description term="用户名称">{item.loginAccount}</Description>
            <Description term="邮箱地址">{item.userEmail}</Description>
            <Description term="手机号码">{item.userPhone}</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 50,marginLeft:'15%' }} col={2} offset={1}>
            <Description term="机构排序">{item.sort}</Description>
            <Description term="启用状态">{item.startStatus==1?'启用':'禁用'}</Description>
            <Description term="操 作 者 ">{item.oper}</Description>
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
