import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider, Row, Col, Radio, Input
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Description } = DescriptionList;

@connect(({ institution, loading }) => ({
  institution,
  submitting: loading.effects['institution/update'],
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
          type: 'institution/update',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting, institution: { item }, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue  } = this.props.form;
    getFieldDecorator('manageId')
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
        md: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 18 },
      },
    };

    return (
      <PageHeaderLayout title="机构审核" >
        <Card bordered={false}>
          <Form
                 onSubmit={this.handleSubmit}
                 hideRequiredMark
                 style={{ marginTop: 8 }}
               >
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={2}>
            <Description term="机构类型">{item.institutionCode==1?'银行':item.institutionCode==2?'金融机构':'小额贷款'}</Description>
            <Description term="所在城市">{item.city}</Description>
            <Description term="机构名称">{item.manageName}</Description>
            <Description term="登录账号">{item.loginAccount}</Description>
            <Description term="邮箱">{item.userEmail}</Description>
            <Description term="手机">{item.userPhone}</Description>
            <Description term="机构logo">
              <img src="https://picsum.photos/80/80?random" alt="" />
            </Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }} col={2}>
            <Description term="排序">{item.sort}</Description>
            <Description term="启用状态">{item.startStatus==1?'启用':'禁用'}</Description>
            <Description term="操作者">{item.oper}</Description>
            <Description term="审核时间">{item.approvalTime}</Description>
            <Description term="注册时间">{item.registrationTime}</Description>
            <Description term="注册时间">{item.approvalStatus}</Description>
          </DescriptionList>
          {item.approvalStatus == 1
           ?  <div>
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                      <Col md={12} sm={24}>
                        <FormItem
                          {...formItemLayout}
                           label="审核状态">
                           {getFieldDecorator('approvalStatus')(
                             <Radio.Group style={{ width: '100%' }}>
                               <Radio value="0">通过</Radio>
                               <Radio value="1">不通过</Radio>
                             </Radio.Group>
                           )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        <Col md={12} sm={24}>
                          <FormItem
                            {...formItemLayout}
                             label="审核备注"
                             style={{
                               display: getFieldValue('approvalStatus') === '1' ? 'block' : 'none',
                             }}
                             >
                             {getFieldDecorator('approvalRemaeks')(
                               <Input.TextArea style={{ width: '100%' }}/>
                             )}
                          </FormItem>
                        </Col>
                      </Row>
                    </div>
                : null
          }
          <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
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
