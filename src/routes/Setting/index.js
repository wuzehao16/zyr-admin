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
    count1: 0,
    count2: 0,
    count3: 0,
    count4: 0,
    expandForm1: false,
    expandForm2: false,
    expandForm3: false,
  }
  onGetCaptcha1 = () => {
    this.props.dispatch({
      type: 'setting/queryOldEmailCaptcha',
    });
    let count = 59;
    this.setState({ count1: count });
    this.interval1 = setInterval(() => {
      count -= 1;
      this.setState({ count1: count });
      if (count === 0) {
        clearInterval(this.interval1);
      }
    }, 1000);
  };
  onGetCaptcha2 = () => {
    const { getFieldValue } = this.props.form;
    this.props.dispatch({
      type: 'setting/queryNewEmailCaptcha',
      payload: {
        newEMail:getFieldValue('newEMail'),
      },
    });
    let count = 59;
    this.setState({ count2: count });
    this.interval2 = setInterval(() => {
      count -= 1;
      this.setState({ count2: count });
      if (count === 0) {
        clearInterval(this.interval2);
      }
    }, 1000);
  };
  onGetCaptcha3 = () => {
    this.props.dispatch({
      type: 'setting/queryOldPhoneCaptcha',
    });
    let count = 59;
    this.setState({ count3: count });
    this.interval3 = setInterval(() => {
      count -= 1;
      this.setState({ count3: count });
      if (count === 0) {
        clearInterval(this.interval3);
      }
    }, 1000);
  };
  onGetCaptcha4 = () => {
    const { getFieldValue } = this.props.form;
    this.props.dispatch({
      type: 'setting/queryNewPhoneCaptcha',
      payload: {
        newPhone:getFieldValue('newPhone'),
      },
    });
    let count = 59;
    this.setState({ count4: count });
    this.interval4 = setInterval(() => {
      count -= 1;
      this.setState({ count4: count });
      if (count === 0) {
        clearInterval(this.interval4);
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'member/update',
          payload: values,
        });
      }
    });
  }
  handleSubmit2 = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'setting/updateEmail',
          payload: values,
        });
        this.props.dispatch({
          type: 'user/fetchCurrent',
        })
      }
    });
  }
  handleSubmit3 = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'setting/updatePhone',
          payload: values,
        });
        this.props.dispatch({
          type: 'user/fetchCurrent',
        })
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
    const { count1, count2 } = this.state;
    const { getFieldDecorator } = this.props.form;
    return(
      <DescriptionList size="large" title="修改邮箱" style={{ marginBottom: 32 }} col={1}>
        <Description>为确保是您本人操作，我们将会把验证码发送到您已绑定的邮箱。</Description>
        <Form
          onSubmit={this.handleSubmit2}
          >
          <Description>
            <Form.Item>
              {/* <Row gutter={24}> */}
                <Col span={14}>
                  {getFieldDecorator('codeByoldEMail', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input  placeholder="验证码" />)}
                </Col>
                <Col span={10}>
                  <Button

                    disabled={count1}
                    // className={styles.getCaptcha}
                    onClick={this.onGetCaptcha1}
                  >
                    {count1 ? `${count1} s` : '获取验证码'}
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
                {getFieldDecorator('newEMail',{
                  rules:[{
                      type: 'email',
                      message: '请输入邮箱',
                    },{
                    required: true,
                    message: '请输入邮箱'
                  }]
                })(
                  <Input style={{width:'200px'}} />
              )}
              </FormItem>
            </Col>
          </Description>
          <Description>
            <Form.Item>
              {/* <Row gutter={24}> */}
                <Col span={14}>
                  {getFieldDecorator('codeByNewEmail', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input  placeholder="验证码" />)}
                </Col>
                <Col span={10}>
                  <Button

                    disabled={count2}
                    // className={styles.getCaptcha}
                    onClick={this.onGetCaptcha2}
                  >
                    {count2 ? `${count2} s` : '获取验证码'}
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
    <DescriptionList size="large" title="修改邮箱" style={{ marginBottom: 32 }} col={1}>
      <Description>{currentUser.userEmail}</Description>
      <a style={{ float:'right' }} onClick={this.toggleForm2}>
        展开 <Icon type="down" />
      </a>
    </DescriptionList>
    )
  }
  renderAdvancedForm3() {
    const { submitting } = this.props;
    const { count3, count4 } = this.state;
    const { getFieldDecorator } = this.props.form;
    return(
      <DescriptionList size="large" title="修改手机" style={{ marginBottom: 32 }} col={1}>
        <Description>为确保是您本人操作，我们将会把验证码发送到您已绑定的手机。</Description>
        <Form
          onSubmit={this.handleSubmit3}
          >
          <Description>
            <Form.Item>
              {/* <Row gutter={24}> */}
                <Col span={14}>
                  {getFieldDecorator('codeByoldPhone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input  placeholder="验证码" />)}
                </Col>
                <Col span={10}>
                  <Button

                    disabled={count3}
                    // className={styles.getCaptcha}
                    onClick={this.onGetCaptcha3}
                  >
                    {count3 ? `${count3} s` : '获取验证码'}
                  </Button>
                </Col>
              {/* </Row> */}
            </Form.Item>
          </Description>
          <Description>
            {/* 我们已经发送了验证码到您的手机 */}
          </Description>
          <Description term="新手机">
            <Col sm={12} xs={24}>
              <FormItem
                >
                {getFieldDecorator('newPhone',{
                  rules:[{
                    required: true,
                    message: '请输入新手机'
                  }]
                })(
                  <Input style={{width:'200px'}} />
              )}
              </FormItem>
            </Col>
          </Description>
          <Description>
            <Form.Item>
              {/* <Row gutter={24}> */}
                <Col span={14}>
                  {getFieldDecorator('codeByNewPhone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input  placeholder="验证码" />)}
                </Col>
                <Col span={10}>
                  <Button

                    disabled={count4}
                    // className={styles.getCaptcha}
                    onClick={this.onGetCaptcha4}
                  >
                    {count4 ? `${count4} s` : '获取验证码'}
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
        <a style={{ float:'right' }} onClick={this.toggleForm3}>
          收起 <Icon type="up" />
        </a>
      </DescriptionList>

    )
  }
  renderSimpleForm3() {
    const { data:{ currentUser } } = this.props;
    return(
    <DescriptionList size="large" title="修改手机" style={{ marginBottom: 32 }} col={1}>
      <Description>{currentUser.userPhone}</Description>
      <a style={{ float:'right' }} onClick={this.toggleForm3}>
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
      expandForm2: false,
      expandForm3: false,
    });
  }
  toggleForm2 = () => {
    this.setState({
      expandForm1: false,
      expandForm3: false,
      expandForm2: !this.state.expandForm2,
    });
  }
  toggleForm3 = () => {
    this.setState({
      expandForm1: false,
      expandForm2: false,
      expandForm3: !this.state.expandForm3,
    });
  }
  render() {
    const { submitting, data:{ currentUser } , dispatch } = this.props;
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
                    {this.renderForm3()}
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
