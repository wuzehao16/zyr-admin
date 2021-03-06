import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider,Tabs, Spin, Icon, Input, Col, Row,
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@connect(({ setting, user, loading }) => ({
  data: user,
  setting,
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
    visible: false,
    help: '',
  }

  componentDidMount() {
    const { data:{ currentUser } } = this.props;
    const manageId = currentUser.data.manageId;
    this.props.dispatch({
      type: 'setting/fetchDetail',
      payload: {
        manageId: manageId,
      },
    });
  }

  onGetCaptcha1 = () => {
    this.props.dispatch({
      type: 'setting/queryOldEmailCaptcha',
      callback:()=>{
        let count = 59;
        this.setState({ count1: count });
        this.interval1 = setInterval(() => {
          count -= 1;
          this.setState({ count1: count });
          if (count === 0) {
            clearInterval(this.interval1);
          }
        }, 1000);
      }
    });
  };
  onGetCaptcha2 = () => {
    const { getFieldValue } = this.props.form;
    const newEMail = getFieldValue('newEMail');
    if (!newEMail) {
      this.props.form.setFields({
        newEMail:{
          // value:newEMail,
          errors:[new Error('请输入新邮箱')],
        }
      })
      return
    }
    this.props.dispatch({
      type: 'setting/queryNewEmailCaptcha',
      payload: {
        newEMail:newEMail,
      },
      callback: () => {
        let count = 59;
        this.setState({ count2: count });
        this.interval2 = setInterval(() => {
          count -= 1;
          this.setState({ count2: count });
          if (count === 0) {
            clearInterval(this.interval2);
          }
        }, 1000);
      }
    });
  };
  onGetCaptcha3 = () => {
    this.props.dispatch({
      type: 'setting/queryOldPhoneCaptcha',
      callback:()=>{
        let count = 59;
        this.setState({ count3: count });
        this.interval3 = setInterval(() => {
          count -= 1;
          this.setState({ count3: count });
          if (count === 0) {
            clearInterval(this.interval3);
          }
        }, 1000);
      }
    });

  };
  onGetCaptcha4 = () => {
    const { getFieldValue } = this.props.form;
    const newPhone = getFieldValue('newPhone');
    if (!newPhone) {
      this.props.form.setFields({
        newPhone:{
          // value:newPhone,
          errors:[new Error('请输入新手机号')],
        }
      })
      return
    }
    this.props.dispatch({
      type: 'setting/queryNewPhoneCaptcha',
      payload: {
        newPhone:getFieldValue('newPhone'),
      },
      callback: () =>{
        let count = 59;
        this.setState({ count4: count });
        this.interval4 = setInterval(() => {
          count -= 1;
          this.setState({ count4: count });
          if (count === 0) {
            clearInterval(this.interval4);
          }
        }, 1000);
      }
    });

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
          type: 'setting/updatePassword',
          payload: values,
          callback:() => {
            this.props.dispatch({
              type: 'login/logout',
            });
            this.props.dispatch({
              type: 'global/clearMenus',
            });
          },
        },
      );
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
          callback:() =>{
            this.props.dispatch({
              type: 'user/fetchCurrent',
            })
            this.toggleForm2()
          }
        });
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
          callback:() =>{
            this.props.dispatch({
              type: 'user/fetchCurrent',
            })
            this.toggleForm3()
          }
        });

      }
    });
  }
  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  };
  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('error');
    } else if(this.checkPass(value) < 2){
      this.setState({
        help: '请输入6-24位字母、数字或“_”,两种以上',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (value.length < 6) {
        callback('error');
      } else {
        if (!this.state.visible) {
          this.setState({
            visible: !!value,
          });
        }
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };
  checkPass = (s) => {
    if (s.length < 6) {
      return 0;
    }
    let ls = 0;
    if (s.match(/([a-z])+/)) {
      ls += 1;
    }
    if (s.match(/([0-9])+/)) {
      ls += 1;
    }
    if (s.match(/([A-Z])+/)) {
      ls += 1;
    }
    if (s.match(/[^a-zA-Z0-9]+/)) {
      ls += 1;
    }
    return ls
  }
  renderAdvancedForm1() {
    const { help } = this.state;
    const { submitting, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <DescriptionList size="small" title="修改密码" style={{ marginBottom: 32 }} col={1}>
        <Description>修改密码时需要输入当前密码，如果您忘记了当前密码，可以点击这里通过<a  onClick={()=> dispatch(routerRedux.push('/user/reset-password'))}>手机号重置</a>或通过<a onClick={() => dispatch(routerRedux.push('/user/reset-password'))}>邮箱重置</a>您的密码。</Description>
        <Form
          onSubmit={this.handleSubmit}
          >
        <Description>
          <Col sm={24} xs={24}>
            <FormItem
              >
              {getFieldDecorator('oldPassword',{
                rules:[{
                  required: true,
                  message: '请输入旧密码'
                }]
              })(
                <Input style={{width:'400px',marginBottom:20,background:'#f6f6f6'}} type="password" placeholder="请输入旧密码"/>
            )}
            </FormItem>
          </Col>
        </Description>
        <Description>
          <Col sm={24} xs={24}>
            <FormItem
              help={this.state.help}
              >
              {getFieldDecorator('newPassword',{
                rules: [{
                  required: true,
                  message: '请输入新密码'
                },
                {
                  validator: this.checkPassword,
                }]
              })(
                <Input style={{width:'400px',marginBottom:20,background:'#f6f6f6'}} type="password" placeholder="请输入新密码"/>
            )}
            </FormItem>
          </Col>
        </Description>
        <Description>
          <Col sm={24} xs={24}>
            <Form.Item>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码！',
                  },
                  {
                    validator: this.checkConfirm,
                  },
                ],
              })(<Input style={{width:'400px',marginBottom:20,background:'#f6f6f6'}}  type="password" placeholder="确认密码"/>)}
          </Form.Item>
          </Col>
        </Description>
        <Description>
          <Button  type="primary" htmlType="submit" loading={submitting}>
            保存
          </Button>
        </Description>
        </Form>
        <a style={{ float:'right' }} onClick={this.toggleForm1}>
          <Icon type="caret-up" />
        </a>
      </DescriptionList>

    )
  }
  renderSimpleForm1() {
    const {  dispatch } = this.props;
    return(
      <div style={{position:'relative'}}>
        <a style={{ float:'right',position:'absolute',top:0,right:0}} onClick={this.toggleForm1}>
            <Icon type="caret-down" />
          </a>
        <DescriptionList size="large" title="修改密码" style={{ marginBottom: 32}} col={1}>
          <Description>修改密码时需要输入当前密码，如果您忘记了当前密码，可以点击这里通过<a  onClick={()=> dispatch(routerRedux.push('/user/reset-password'))}>手机号重置</a>或通过<a onClick={() => dispatch(routerRedux.push('/user/reset-password'))}>邮箱重置</a>您的密码。</Description>
        </DescriptionList>
    </div>
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
          <Description style={{ marginBottom: 20 }}>
            <Form.Item>
              {/* <Row gutter={24}> */}
              <Col sm={24} xs={24}>
                  {getFieldDecorator('codeByoldEMail', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input style={{width:'400px',background:'#f6f6f6'}} placeholder="请输入验证码" />)}
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
          <Description  style={{ marginBottom: 20 }}>
            我们已经发送了验证码到您的邮箱
          </Description>
          <Description  style={{ marginBottom: 20 }}>
            <Col sm={24} xs={24}>
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
                  <Input style={{width:'400px',background:'#f6f6f6'}} placeholder="请输入新的邮箱地址"/>
              )}
              </FormItem>
            </Col>
          </Description>
          <Description style={{ marginBottom: 20 }}>
            <Form.Item>
              {/* <Row gutter={24}> */}
              <Col sm={24} xs={24}>
                  {getFieldDecorator('codeByNewEmail', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input  style={{width:'400px',background:'#f6f6f6'}} placeholder="请输入验证码" />)}
                  <Button style={{marginLeft:'50'}}

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
          <Icon type="caret-up" />
        </a>
      </DescriptionList>

    )
  }
  renderSimpleForm2() {
    const { data:{ currentUser } } = this.props;
    return(
      <div style={{position:'relative'}}>
        <a style={{ float:'right',position:'absolute',top:0,right:0 }} onClick={this.toggleForm2}>
          <Icon type="caret-down" />
        </a>
        <DescriptionList size="large" title="修改邮箱" style={{ marginBottom: 32 }} col={1}>
          <Description>{currentUser.data.userEmail}</Description>
        </DescriptionList>
      </div>
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
          <Description style={{ marginBottom: 20}}>
            <Form.Item>
              {/* <Row gutter={24}> */}
                <Col sm={24} xs={24}>
                  {getFieldDecorator('codeByOldPhone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input  style={{width:'400px',background:'#f6f6f6'}} placeholder="请输入验证码" />)}
                  <Button
                    disabled={count3}
                    // className={styles.getCaptcha}
                    // style={{color:'#ee5648',border:'none'}}
                    onClick={this.onGetCaptcha3}
                  >
                    {count3 ? `${count3} s` : '获取验证码'}
                  </Button>
                </Col>
              {/* </Row> */}
            </Form.Item>
          </Description>
          <Description >
            {/* 我们已经发送了验证码到您的手机 */}
          </Description>
          <Description style={{ marginBottom: 20}}>
            <Col sm={24} xs={24}>
              <FormItem
                >
                {getFieldDecorator('newPhone',{
                  rules:[{
                    required: true,
                    message: '请输入新手机'
                  }]
                })(
                  <Input style={{width:'400px',background:'#f6f6f6'}} placeholder="请输入新手机" />
              )}
              </FormItem>
            </Col>
          </Description>
          <Description style={{ marginBottom: 20}}>
            <Form.Item>
              {/* <Row gutter={24}> */}
                <Col sm={24} xs={24}>
                  {getFieldDecorator('codeByNewPhone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input  style={{width:'400px',background:'#f6f6f6'}} placeholder="请输入验证码" />)}
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
        <Description style={{ marginBottom: 20}}>
          <Button  type="primary" htmlType="submit" loading={submitting}>
            保存
          </Button>
        </Description>
        </Form>
        <a style={{ float:'right' }} onClick={this.toggleForm3}>
          <Icon type="caret-up" />
        </a>
      </DescriptionList>

    )
  }
  renderSimpleForm3() {
    const { data:{ currentUser } } = this.props;
    return(
      <div style={{position:'relative'}}>
        <a style={{ float:'right',position:'absolute',top:0,right:0 }} onClick={this.toggleForm3}>
            <Icon type="caret-down" />
          </a>
        <DescriptionList size="large" title="修改手机" style={{ marginBottom: 32 }} col={1}>
          <Description>{currentUser.data.userPhone}</Description>
        </DescriptionList>
      </div>
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
    const { submitting, data:{ currentUser } , setting:{ item }, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      // <PageHeaderLayout title="账号设置">
      <PageHeaderLayout>
        <Card bordered={false} style={{padding:'26px 147px 136px 147px'}}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本设置" key="1" style={{paddingLeft:'1%',paddingRight:'1%'}}>
                {currentUser.data.loginAccount ? (
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
            <TabPane tab="基本信息" key="2" style={{paddingLeft:'1%',paddingRight:'1%'}}>
              <DescriptionList size="large" title="机构logo" style={{ marginBottom: 32 }} col={2}>
                <Description>
                  {
                    item.manageLogoId?<img src={item.manageLogoId} alt="" width={80} height={80}/>:<div/>
                  }
                </Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />
              <DescriptionList size="large" title="其他信息" style={{ marginBottom: 32 }} col={1}>
                <Description term="机构类型">{item.institutionCode?(item.institutionCode==1?'银行':item.institutionCode==2?'金融机构':'小额贷款'):''}</Description>
                <Description term="所在城市">{item.city}</Description>
                <Description term="机构名称">{item.manageName}</Description>
                {/* <p>如需修改基本信息联系客服（0755）21046730</p> */}
              </DescriptionList>
            </TabPane>
          </Tabs>
        </Card>
        <style jsx>{`
          .ant-tabs-tab , .ant-tabs-tab-active {
            font-size:18px;
            font-weight:700;
         }
        `}
        </style>
      </PageHeaderLayout>
    );
  }
}
