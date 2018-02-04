import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider,Tabs, Spin, Icon, Input, Col, Row
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@connect(({ user,loading }) => ({
  data: user,
  submitting: loading.effects['member/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    count: 0,
    expandForm1: false,
    expandForm2: false,
    expandForm3: false,
  }
  setCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };
  onGetCaptcha = () => {
    this.props.dispatch({
      type: 'register/getPhoneCaptcha',
      payload: {
        ...this.props.data,
      },
    });
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };
  onCheck = (value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      sysMenus: value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(1)
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'member/update',
          payload: values,
        });
      }
    });
  }
  renderAdvancedForm1() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={1}>
        <Description>修改密码时需要输入当前密码，如果您忘记了当前密码，可以点击这里通过手机号重置或通过邮箱重置您的密码。</Description>
        <Form
          onSubmit={this.handleSubmit}
          >
        <Description term="旧密码">
          <Col sm={12} xs={24}>
            <FormItem
              >
              {getFieldDecorator('oldPassword',{
                rules:[{
                  required: true,
                  message: '请输入旧密码'
                }]
              })(
                <Input style={{width:'200px'}} type="password"/>
            )}
            </FormItem>
          </Col>
        </Description>
        <Description term="新密码">
          <Col sm={12} xs={24}>
            <FormItem >
              {getFieldDecorator('newPassword',{
                rules: [{
                  required: true,
                  message: '请输入新密码'
                }]
              })(
                <Input style={{width:'200px'}} type="password"/>
            )}
            </FormItem>
          </Col>
        </Description>
        <Description>
          <Button  type="primary" htmlType="submit" loading={submitting}>
            保存
          </Button>
        </Description>
        </Form>
        <a style={{ float:'right' }} onClick={this.toggleForm1}>
          收起 <Icon type="up" />
        </a>
      </DescriptionList>

    )
  }
  renderSimpleForm1() {
    return(
    <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={1}>
      <Description>修改密码时需要输入当前密码，如果您忘记了当前密码，可以点击这里通过手机号重置或通过邮箱重置您的密码。</Description>
      <a style={{ float:'right' }} onClick={this.toggleForm1}>
        展开 <Icon type="down" />
      </a>
    </DescriptionList>
    )
  }
  renderAdvancedForm2() {
    const { submitting } = this.props;
    const { count } = this.state;
    const { getFieldDecorator } = this.props.form;
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'register/submitStep2Form',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return(
      <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={1}>
        <Description>为确保是您本人操作，我们将会把验证码发送到您已绑定的邮箱。</Description>
        <Form
          onSubmit={this.handleSubmit}
          >
          <Description>
            <Form.Item>
              {/* <Row gutter={24}> */}
                <Col span={8}>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input  placeholder="验证码" onPressEnter={onValidateForm}/>)}
                </Col>
                <Col span={8}>
                  <Button

                    disabled={count}
                    // className={styles.getCaptcha}
                    onClick={this.onGetCaptcha}
                  >
                    {count ? `${count} s` : '获取验证码'}
                  </Button>
                </Col>
              {/* </Row> */}
            </Form.Item>
          </Description>
          <Description>
            我们已经发送了验证码到您的邮箱
          </Description>
          <Description term="新邮箱">
            <Col sm={12} xs={24}>
              <FormItem
                >
                {getFieldDecorator('oldPassword',{
                  rules:[{
                    required: true,
                    message: '请输入旧密码'
                  }]
                })(
                  <Input style={{width:'200px'}} type="password"/>
              )}
              </FormItem>
            </Col>
          </Description>
          <Description>
            <Form.Item>
              {/* <Row gutter={24}> */}
                <Col span={8}>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input  placeholder="验证码" onPressEnter={onValidateForm}/>)}
                </Col>
                <Col span={8}>
                  <Button

                    disabled={count}
                    // className={styles.getCaptcha}
                    onClick={this.onGetCaptcha}
                  >
                    {count ? `${count} s` : '获取验证码'}
                  </Button>
                </Col>
              {/* </Row> */}
            </Form.Item>
          </Description>
        <Description>
          <Button  type="primary" htmlType="submit" loading={submitting}>
            保存
          </Button>
        </Description>
        </Form>
        <a style={{ float:'right' }} onClick={this.toggleForm2}>
          收起 <Icon type="up" />
        </a>
      </DescriptionList>

    )
  }
  renderSimpleForm2() {
    const { data:{ currentUser } } = this.props;
    return(
    <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={1}>
      <Description>{currentUser.userEmail}</Description>
      <a style={{ float:'right' }} onClick={this.toggleForm2}>
        展开 <Icon type="down" />
      </a>
    </DescriptionList>
    )
  }
  renderForm1() {
    return this.state.expandForm1 ? this.renderAdvancedForm1() : this.renderSimpleForm1();
  }
  renderForm2() {
    return this.state.expandForm2 ? this.renderAdvancedForm2() : this.renderSimpleForm2();
  }
  renderForm3() {
    return this.state.expandForm3 ? this.renderAdvancedForm3() : this.renderSimpleForm3();
  }
  toggleForm1 = () => {
    this.setState({
      expandForm1: !this.state.expandForm1,
    });
  }
  toggleForm2 = () => {
    this.setState({
      expandForm2: !this.state.expandForm2,
    });
  }
  toggleForm3 = () => {
    this.setState({
      expandForm3: !this.state.expandForm3,
    });
  }
  render() {
    const { submitting, data:{ currentUser } , dispatch } = this.props;
    console.log(currentUser,"currentUser")
    return (
      <PageHeaderLayout title="会员等级详情" >
        <Card bordered={false}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
                {currentUser.name ? (
                  <div>


                    {this.renderForm1()}
                    <Divider style={{ marginBottom: 32 }} />
                    {this.renderForm2()}
                    <Divider style={{ marginBottom: 32 }} />
                    <DescriptionList size="large" title="修改手机" style={{ marginBottom: 32 }} col={1}>
                      <Description>{currentUser.userPhone}</Description>
                    </DescriptionList>
                    <Divider style={{ marginBottom: 32 }} />
                  </div>
                ) : <Spin size="small" style={{ marginLeft: 8 }} />}


            </TabPane>
            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
          </Tabs>
        </Card>
      </PageHeaderLayout>
    );
  }
}
