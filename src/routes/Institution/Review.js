import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider, Row, Col, Radio, Input,Icon
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Description } = DescriptionList;

@connect(({ institution, loading }) => ({
  institution,
  submitting: loading.effects['institution/review'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    if (this.props.institution.item) {
      const { item } = this.props.institution;
      if (item.manageId) {
        setFieldsValue({
          manageId: item.manageId,
        });
      }
    }
  }
  onCheck = (value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      sysMenus: value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'institution/review',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting, institution: { item }, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue  } = this.props.form;
    getFieldDecorator('manageId')
    getFieldDecorator('orderId',{initialValue: item.orderId})
    getFieldDecorator('userEmail',{initialValue: item.userEmail})
    getFieldDecorator('loginAccount',{initialValue: item.loginAccount})
    getFieldDecorator('userPhone',{initialValue: item.userPhone})
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 },
    //     md: { span: 7 },
    //     lg: { span: 4 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 },
    //     md: { span: 17 },
    //     lg: { span: 20 },
    //   },
    // };

    return (
      <PageHeaderLayout title="机构审核" >
        <Card bordered={false}>
          <Form
                 onSubmit={this.handleSubmit}
                 hideRequiredMark
                 style={{ marginTop: 8 }}
               >
          <DescriptionList size="large" style={{ marginBottom: 15, marginLeft:'15%' }} col={2}>
            <div style={{margin:'20px 0'}}>
              <Description>
                <img src={item.manageLogoId} alt="" width={80} height={80}/>
              </Description>
            </div>
            <Description term="机构类型">{item.institutionCode==1?'银行':item.institutionCode==2?'金融机构':'小额贷款'}</Description>
            <Description term="所在城市">{item.city}</Description>
            <Description term="机构名称">{item.manageName}</Description>
            <Description term="用户名称">{item.loginAccount}</Description>
            <Description term="邮箱地址">{item.userEmail}</Description>
            <Description term="手机号码">{item.userPhone}</Description>
          </DescriptionList>

          <DescriptionList size="large" style={{ marginBottom: 32, marginLeft:'15%' }} col={2}>
            <Description term="机构排序">{item.sort}</Description>
            <Description term="启用状态">{item.startStatus==1?'启用':'禁用'}</Description>
            <Description term="操 作 者 ">{item.oper}</Description>
            <Description term="审核时间">{moment(item.approvalTime).format('llll')}</Description>
            <Description term="注册时间">{moment(item.registrationTime).format('llll')}</Description>
          </DescriptionList>

          {item.approvalStatus == 1
           ?
            <DescriptionList  size="large" style={{ marginBottom: 50, marginLeft:'15%' }} col={2}>
              <div style={{margin:'20px 0'}}>
                <Description term="审核状态">
                  {getFieldDecorator('approvalStatus')(
                    <Radio.Group style={{ width: '100%' }}>
                      <Radio value="2">通过</Radio>
                      <Radio value="0">不通过</Radio>
                    </Radio.Group>
                  )}
                </Description>
              </div>
              <Description term="审核备注" style={{display: getFieldValue('approvalStatus') === '0' ? 'block' : 'none',verticalAlign:'top'}}>
                {getFieldDecorator('approvalRemaeks')(
                  <Input.TextArea style={{ width: '100%' }} />
                )}
              </Description>
            </DescriptionList>: null
          }
          <DescriptionList size="large" style={{ marginTop:'30px', marginBottom: 32, textAlign: 'center' }} col={1}>
            <Button style={{ marginRight: 50 }} type="primary" htmlType="submit" loading={submitting}>
              保存
            </Button>
            <Button onClick={() => dispatch(routerRedux.push('/institution'))}>
              返回
            </Button>
          </DescriptionList>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
