import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider, Row, Col, Radio, Input, Select,
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Description } = DescriptionList;
const Option = Select.Option;

@connect(({ product, loading }) => ({
  product,
  submitting: loading.effects['product/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    if (this.props.product.item) {
      const { item } = this.props.product;
      if (item.productId) {
        setFieldsValue({
          productId: item.productId,
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
          type: 'product/update',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting, product: { item }, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue  } = this.props.form;
    getFieldDecorator('productId')
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
        md: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 18 },
      },
    };

    return (
      <PageHeaderLayout title="产品审核" >
        <Card bordered={false}>
          <Form
                 onSubmit={this.handleSubmit}
                 hideRequiredMark
                 style={{ marginTop: 8 }}
               >
           <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }} col={2}>
             <Description term="所在城市">{item.city}</Description>
             <Description term="机构类型">{item.institutionCode==1?'银行':item.institutionCode==2?'金融机构':'小额贷款'}</Description>
             <Description term="机构名称">{item.manageName}</Description>
             <Description term="产品名称">{item.productName}</Description>
             <Description term="最高可贷">{item.productMaxLoad}</Description>
             <Description term="产品分润比例">{item.productRatio}</Description>
             <Description term="月费率">{item.monthlyFeeRate}%</Description>
             <Description term="产品期限">{item.productTimeLimit?item.productTimeLimit.replace(',','-'):''}期</Description>
             <Description term="手续费">{item.productPoundage}%</Description>
             <Description term="审批时效">{item.approvalAging?item.approvalAging.replace(',','-'):''}天</Description>
             <Description term="产品须知">{item.productNotice}</Description>
             <Description term="推荐语">{item.productRecommend}期</Description>
             <Description term="排序">{item.productSort}</Description>
             <Description term="上架状态">{item.shelfState==1?'已上架':'已下架'}</Description>
           </DescriptionList>
           <DescriptionList size="large" style={{ marginBottom: 32 }} col={1}>
             <Description term="产品类别">{item.productTypeName}</Description>
             <Description term="房产类型">{item.propertyTypeName}</Description>
             <Description term="客户类别">{item.customerTypeName}</Description>
             <Description term="还款方式">{item.productPayWayName}</Description>
             <Description term="产品特点">{item.productFeaturesName}</Description>
           </DescriptionList>
          {item.approvalStatuts == 1
           ?  <div>
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                      <Col md={12} sm={24}>
                        <FormItem
                          {...formItemLayout}
                           label="审核状态">
                           {getFieldDecorator('approvalStatuts')(
                             <Radio.Group style={{ width: '100%' }}>
                               <Radio value="2">通过</Radio>
                               <Radio value="0">不通过</Radio>
                             </Radio.Group>
                           )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        <Col md={12} sm={24}>
                          <FormItem
                            {...formItemLayout}
                             label="是否纳入评测"
                             style={{
                               display: getFieldValue('approvalStatuts') === '2' ? 'block' : 'none',
                             }}
                             >
                             {getFieldDecorator('isEvaluating')(
                               <Select placeholder="请选择">
                                 <Option value='0'>否</Option>
                                 <Option value='1'>是</Option>
                               </Select>
                             )}
                          </FormItem>
                        </Col>
                        <Col md={12} sm={24}>
                          <FormItem
                            {...formItemLayout}
                             label="是否为火"
                             style={{
                               display: getFieldValue('approvalStatuts') === '2' ? 'block' : 'none',
                             }}
                             >
                             {getFieldDecorator('isFire')(
                               <Select placeholder="请选择">
                                 <Option value='0'>否</Option>
                                 <Option value='1'>是</Option>
                               </Select>
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
                               display: getFieldValue('approvalStatuts') === '0' ? 'block' : 'none',
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
            <Button onClick={() => dispatch(routerRedux.push('/product'))}>
              返回
            </Button>
          </DescriptionList>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
