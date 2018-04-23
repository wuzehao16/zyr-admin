import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Input, Button, Card, Divider, Col, Select,
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
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    getFieldDecorator('userId',{initialValue:item.userId});
    console.log(item)
    if (institutionList) {
      var institutionListOptions = institutionList.map(item => <Option key={item.manageId} title={item.manageName} >{item.manageName}</Option>);
    }
    return (
      <PageHeaderLayout title="编辑用户详请" >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={2}>
              <Description term="用户编号">{item.userId}</Description>
              <Description term="手机">{item.loginAccount}</Description>
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
              { item.isMember === 0 ? (
                <div>
                  <Description term="会员等级">{item.leveName}</Description>
                  <Description term="购买时间">{moment(item.appMemberInfo.buyTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
                  <Description term="有效时间">{moment(item.appMemberInfo.expirdTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
                  <Description term="购买时长">{item.appMemberInfo.longTime}个月</Description>
                  <Description term="价格">{item.appMemberInfo.memberPrice}元</Description>
                </div>  ) : <Description>&nbsp;</Description>
             }
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="其他信息" style={{ marginBottom: 32 }} col={2}>
              <Description term="是否为客服">
                <Col sm={12} xs={24}>
                  <FormItem >
                    {getFieldDecorator('isCustom',{
                      initialValue:item.isCustom,
                    })(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                        <Option value={0}>否</Option>
                        <Option value={1}>是</Option>
                      </Select>
                  )}
                  </FormItem>
                </Col>
              </Description>
              <Description
                term="客服类型"
                style={{
                display: getFieldValue('isCustom') === 1 ? 'block' : 'none',
              }}
              >
                <Col sm={12} xs={24}>
                  <FormItem >
                    {getFieldDecorator('userIdentity',{
                      initialValue:item.userIdentity,
                    })(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                        <Option value={1}>机构客服</Option>
                        <Option value={2}>平台客服</Option>
                      </Select>
                  )}
                  </FormItem>
                </Col>
              </Description>
              <Description
                term="机构名称"
                style={{
                display: getFieldValue('userIdentity') === 1 ? 'block' : 'none',
              }}
              >
                <Col sm={12} xs={24}>
                  <FormItem >
                    {getFieldDecorator('manageId',{
                      initialValue:item.manageId,
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
                </Col>
              </Description>
              <Description term="启用状态">
                <Col sm={12} xs={24}>
                  <FormItem >
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
              </Description>
            </DescriptionList>
            <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
              <Button style={{ marginRight: 50 }} type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
              <Button onClick={() => dispatch(routerRedux.push('/member'))}>
                返回
              </Button>
            </DescriptionList>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
