import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider, Switch
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;

@connect(({ member }) => ({
  data: member,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch({
      type: 'member/fetchDetail',
      payload: {
        userId: id,
      },
    });
  }
  render() {
    const { submitting, data: { item }, dispatch } = this.props;
    console.log('item',item)
    return (
      // <PageHeaderLayout title="用户详情" >
      <PageHeaderLayout>
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32, marginLeft:'15%' }} col={2}>
            <div>
              {item.appUser.userHead?
                <Description>
                <img src={item.appUser.userHead} alt="用户头像" style={{margin:'20px 0'}} height={80} width={80}/>
                </Description>
                :null}
            </div>
            <Description term="用户编号">{item.appUser.userId}</Description>
            <Description term="手机号码">{item.appUser.loginAccount}</Description>
            <Description term="用户名称">{item.appUser.userName}</Description>
            <Description term="微信号">{item.appUser.wachatNo}</Description>

          </DescriptionList>
          <Divider style={{ marginBottom: 32, width:'70%', marginLeft:'15%' }} />
          <DescriptionList size="large" title="认证消息" style={{ marginBottom: 32, marginLeft:'15%'  }} col={2}>
            <Description term="真实姓名">{item.appUser.realName}</Description>
            <Description term="性别">{item.appUser.userSex?(item.appUser.userSex === 1 ? '女' : '男'):''}</Description>
            <Description term="身份证号">{item.appUser.idNumber}</Description>
            <Description>&nbsp;</Description>
            {/* {item.idNumber?

          } */}
            <Description >
              {item.appUser.upperPictureId?
                <img src={item.appUser.upperPictureId} alt="" height={200} width={400}/>:null
              }
            </Description>
            <Description >
            {item.appUser.backPictureId?
              <img src={item.appUser.backPictureId} alt="" height={200} width={400}/>:null
            }
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32, width:'70%', marginLeft:'15%' }} />
          <DescriptionList size="large" title="会员信息" style={{ marginBottom: 18, marginLeft:'15%'  }} col={2}>
            <Description term="是否会员">{item.appUser.isMember === 1 ? '否' : '是'}</Description>
          </DescriptionList>
          { item.appUser.isMember === 0
              ?            <DescriptionList size="large" style={{ marginBottom: 18, marginLeft:'15%'  }} col={2}>
                            <Description term="会员等级">{item.appUser.leveName}</Description>
                            <Description term="购买时间">{moment(item.appUser.appMemberInfo.buyTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
                            <Description term="有效时间">{moment(item.appUser.appMemberInfo.expirdTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
                            <Description term="购买时长">{item.appUser.appMemberInfo.longTime}个月</Description>
                            <Description term="价格">{item.appUser.appMemberInfo.memberPrice}元</Description>
                          </DescriptionList>: null
          }
          <Divider style={{ marginBottom: 32, width:'70%', marginLeft:'15%' }} />
          {/* 招聘资质审核，待修改字段 */}
          <DescriptionList size="large" title="公司信息" style={{ marginBottom: 32, marginLeft:'15%' }} col={2}>
              <Description term="公司名称">{item.appUser.leveName}</Description>
              <Description term="公司简称">{item.appUser.leveName}</Description>
              <Description term="机构类型">{item.appUser.leveName}</Description>
              <Description term="公司规模">{item.appUser.leveName}</Description>
              <Description term="接收邮箱">{item.appUser.leveName}</Description>
              <Description term="任职岗位">{item.appUser.leveName}</Description>
              <div>
              <Description term="所在地址">{item.appUser.leveName}</Description>
              </div>
              {/* <Description term="招聘资格">
                {getFieldDecorator('islock',{
                    initialValue:item.islock,
                  })(
                    <Select placeholder="请选择" style={{ width: '60%' }}>
                      <Option value={1}>有</Option>
                      <Option value={0}>无</Option>
                    </Select>
                )}
              </Description> */}
              {item.appUser.userHead?
              <div>
                <Description term="营业执照">
                <img src={item.appUser.userHead} alt="营业执照"  style={{margin:'20px 0',borderRadius:'3px'}} height={150} width={200}/>
                </Description>
                <Description term="营业执照">
                  <img src={item.appUser.userHead} alt="营业执照"  style={{margin:'20px 0',borderRadius:'3px'}} height={150} width={200}/>
                </Description>
              </div>:null
              }

              <Description term="招聘资格">
                <Switch checkedChildren="有" unCheckedChildren="无" disabled={item.appUser.islock} />
              </Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32, width:'70%', marginLeft:'15%'  }} />

          <DescriptionList size="large" title="其他信息" style={{ marginBottom: 18, marginLeft:'15%'  }} col={2}>
            <Description term="是否客服">{item.appUser.isCustom === 1 ? '是' : '否'}</Description>
              { item.appUser.isCustom === 1
                ?<div>
                  <Description term="客服类型">{item.appUser.userIdentity === 1 ? '机构客服' : '平台客服'}</Description>
                  { item.appUser.userIdentity === 1 ? <Description term="机构名称">{item.manageName}</Description> : null}
                  <Description term="启用状态">{item.appUser.islock === 1 ? '启用' : '禁用'}</Description>
                </div> : <div></div>
              }
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button onClick={() => dispatch(routerRedux.push('/member'))}>
            返回
            </Button>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
