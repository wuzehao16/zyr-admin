import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Input, Button, Card, Divider, Col, Select, Row, Switch
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { Description } = DescriptionList;

@connect(({ member, loading }) => ({
  data: member,
  submitting: loading.effects['member/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'member/getInstitution',
    });
    const id = this.props.match.params.id;
    this.props.dispatch({
      type: 'member/fetchDetail',
      payload: {
        userId: id,
      },
    });
  }
  onCheck = (value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      sysMenus: value,
    });
  }
  handleChange = (value) => {
    this.props.dispatch({
      type: 'member/getInstitution',
      payload: {
        manageName: value,
      },
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'member/update',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting, data: { item, institutionList }, dispatch } = this.props;
    console.log('item',item)
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    getFieldDecorator('userId',{initialValue:item.userId});
    if (institutionList) {
      var institutionListOptions = institutionList.map(item => <Option key={item.manageId} title={item.manageName} >{item.manageName}</Option>);
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 11 },
      },
    };

    return (
      // <PageHeaderLayout title="编辑用户详请" >
      <PageHeaderLayout>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32, marginLeft:'15%' }} col={2}>
            <div>
              {item.appUser.userHead?
                <Description>
                <img src={item.appUser.userHead} alt="用户头像" style={{margin:'20px 0'}} height={80} width={80}/>
                </Description>
                :null}
            </div>
              <Description term="用户编号">{item.appUser.userId}</Description>
              <Description term="手机">{item.appUser.loginAccount}</Description>
              <Description term="用户名称">{item.appUser.userName}</Description>
              <Description term="微信号">{item.appUser.wachatNo}</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32, width:'70%', marginLeft:'15%'  }} />
            <DescriptionList size="large" title="认证信息" style={{ marginBottom: 32, marginLeft:'15%' }} col={2}>
              <Description term="真实姓名">{item.appUser.realName}</Description>
              <Description term="性别">{item.appUser.userSex?(item.appUser.userSex === 1 ? '女' : '男'):''}</Description>
              <Description term="身份证号">{item.appUser.idNumber}</Description>
              <Description>&nbsp;</Description>
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
              {/* <Description >
                <img src={item.upperPictureId} alt="" height={200} width={400}/>
              </Description>
              <Description >
                <img src={item.backPictureId} alt="" height={200} width={400}/>
              </Description> */}
            </DescriptionList>
            <Divider style={{ marginBottom: 32, width:'70%', marginLeft:'15%'  }} />
            <DescriptionList size="large" title="会员信息" style={{ marginBottom: 32, marginLeft:'15%' }} col={2}>
              <Description term="是否会员">{item.appUser.isMember === 1 ? '否' : '是'}</Description>
              { item.appUser.isMember === 0 ? (
                <div>
                  <Description term="会员等级">{item.appUser.leveName}</Description>
                  <Description term="购买时间">{moment(item.appUser.appMemberInfo.buyTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
                  <Description term="有效时间">{moment(item.appUser.appMemberInfo.expirdTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
                  <Description term="购买时长">{item.appUser.appMemberInfo.longTime}个月</Description>
                  <Description term="价格">{item.appUser.appMemberInfo.memberPrice}元</Description>
                </div>  ) : <Description>&nbsp;</Description>
             }
            </DescriptionList>
            <Divider style={{ marginBottom: 32, width:'70%', marginLeft:'15%'  }} />
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
              {
                item.appUser.userHead?<div>
                  <Description term="营业执照">
                  <img src={item.appUser.userHead} alt="营业执照"  style={{margin:'20px 0',borderRadius:'3px'}} height={150} width={200}/>
                </Description>
                <Description term="公司logo">
                  <img src={item.appUser.userHead} alt="公司logo"  style={{margin:'20px 0',borderRadius:'3px'}} height={150} width={200}/>
                </Description>
                </div>:null
              }
              <Description term="招聘资格">
                <Switch checkedChildren="有" unCheckedChildren="无" />
              </Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32, width:'70%', marginLeft:'15%'  }} />

            <DescriptionList size="large" title="其他信息" style={{ marginBottom: 50, marginLeft:'15%' }} col={2}>
              <Description term="是否客服">
                {getFieldDecorator('isCustom',{
                      initialValue:item.appUser.isCustom,
                      rules:[{
                        required:true,
                        message:'请选择是否为客服'
                      }]
                    })(
                      <Select placeholder="请选择" style={{ width: '60%' }}>
                        <Option value={0}>否</Option>
                        <Option value={1}>是</Option>
                      </Select>
                )}
              </Description>
              <Description term="启用状态">
                {getFieldDecorator('islock',{
                    initialValue:item.appUser.islock,
                  })(
                    <Select placeholder="请选择" style={{ width: '60%' }}>
                      <Option value={0}>禁用</Option>
                      <Option value={1}>启用</Option>
                    </Select>
                )}
              </Description>
              {
                getFieldValue('isCustom') === 1
                  ?<Description term="客服类型">
                      {getFieldDecorator('userIdentity',{
                        initialValue:item.appUser.userIdentity,
                        rules:[{
                          required:true,
                          message:'请选择客服类型'
                        }]
                      })(
                        <Select placeholder="请选择" style={{ width: '60%' }}>
                          <Option value={1}>机构客服</Option>
                          <Option value={2}>平台客服</Option>
                        </Select>
                    )}
                </Description>: <div></div>
              }
              {
                getFieldValue('userIdentity') === 1
                ?<Description term="机构名称">
                  {getFieldDecorator('manageId',{
                    initialValue:item.appUser.manageId,
                    rules:[{
                      required:true,
                      message:'请选择机构名称'
                    }]
                  })(
                    <Select
                      // mode="tags"
                      // value={this.state.value}
                      placeholder={this.props.placeholder}
                      style={this.props.style}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      showSearch={true}
                      filterOption={false}
                      onSearch={this.handleChange}
                      style={{ width: '60%' }}
                    >
                      {institutionListOptions}
                    </Select>
                  )}
                </Description>: <div></div>
              }
            {/* <Row>
                <Col sm={12} xs={24}>
                  <FormItem
                    label="是否客服"
                    {...formItemLayout}
                    >
                    {getFieldDecorator('isCustom',{
                      initialValue:item.isCustom,
                      rules:[{
                        required:true,
                        message:'请选择是否为客服'
                      }]
                    })(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                        <Option value={0}>否</Option>
                        <Option value={1}>是</Option>
                      </Select>
                  )}
                  </FormItem>
                </Col>
                  <Col sm={12} xs={24}>
                    <FormItem
                      label="启用状态"
                      {...formItemLayout}
                      >
                      {getFieldDecorator('islock',{
                        initialValue:item.islock,
                      })(
                        <Select placeholder="请选择" style={{ width: '100%' }}>
                          <Option value={0}>禁用</Option>
                          <Option value={1}>启用</Option>
                        </Select>
                    )}
                    </FormItem>
                  </Col>
                </Row>
              <Row>
              {
                getFieldValue('isCustom') === 1
                  ?   <Col sm={12} xs={24}>
                                    <FormItem
                                      label="客服类型"
                                      {...formItemLayout}
                                      >
                                      {getFieldDecorator('userIdentity',{
                                        initialValue:item.userIdentity,
                                        rules:[{
                                          required:true,
                                          message:'请选择客服类型'
                                        }]
                                      })(
                                        <Select placeholder="请选择" style={{ width: '100%' }}>
                                          <Option value={1}>机构客服</Option>
                                          <Option value={2}>平台客服</Option>
                                        </Select>
                                    )}
                                    </FormItem>
                                  </Col>: <div></div>
              }
              {
                getFieldValue('userIdentity') === 1
                ?  <Col sm={12} xs={24}>
                    <FormItem
                      label="机构名称"
                      {...formItemLayout}
                      >
                      {getFieldDecorator('manageId',{
                        initialValue:item.manageId,
                        rules:[{
                          required:true,
                          message:'请选择机构名称'
                        }]
                      })(
                        <Select
                          // mode="tags"
                          // value={this.state.value}
                          placeholder={this.props.placeholder}
                          style={this.props.style}
                          defaultActiveFirstOption={false}
                          showArrow={false}
                          showSearch={true}
                          filterOption={false}
                          onSearch={this.handleChange}
                        >
                          {institutionListOptions}
                        </Select>
                    )}
                    </FormItem>
                  </Col>: <div></div>
              }
              </Row> */}
            </DescriptionList>
            {/* <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={2}> */}
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button style={{ marginRight: 50 }} type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
              <Button onClick={() => dispatch(routerRedux.push('/member'))}>
                返回
              </Button>
            </FormItem>
            {/* </DescriptionList> */}
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
