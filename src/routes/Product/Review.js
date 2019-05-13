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
  submitting: loading.effects['product/updateAprovalStatus'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch({
      type: 'product/fetchDetail',
      payload: {
        productId: id,
      },
    });
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
          type: 'product/updateAprovalStatus',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting, product: { item }, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue  } = this.props.form;
    getFieldDecorator('productId',{initialValue:item.productId})
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
      // <PageHeaderLayout title="产品审核" >
      <PageHeaderLayout>
        <Card bordered={false}>
          <Form
                 onSubmit={this.handleSubmit}
                 hideRequiredMark
                 style={{ marginTop: 8 }}
               >
           <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32, marginLeft:'15%' }} col={2}>
             <Description term="所在城市">{item.city}</Description>
             <Description term="机构类型">{item.institutionCode==1?'银行':item.institutionCode==2?'金融机构':'小额贷款'}</Description>
             <Description term="机构名称">{item.manageName}</Description>
             <Description term="产品名称">{item.productName}</Description>
             <Description term="最高可贷">{item.productMaxLoad}万元</Description>
             <Description term="产品分润比例">{item.productRatio}%</Description>
             <Description term="月费率">{item.monthlyFeeRate}%</Description>
             <Description term="产品期限">{item.productTimeLimit?item.productTimeLimit.replace(',','-'):''}期</Description>
             <Description term="手续费">{item.productPoundage}%</Description>
             <Description term="审批时效">{item.approvalAging?item.approvalAging.replace(',','-'):''}天</Description>
             <Description term="产品须知">{item.productNotice}</Description>
             <Description term="推荐语">{item.productRecommend}</Description>
             <Description term="排序">{item.productSort}</Description>
             <Description term="上架状态">{item.shelfState==1?'已上架':'已下架'}</Description>
           </DescriptionList>
           <DescriptionList size="large" style={{ marginBottom: 40, marginLeft:'15%'  }} col={2}>
             <Description term="产品类别">{item.productTypeName}</Description>
             {
               item.matchingModeName1
               ?<Description term="匹配模型（信用贷款）">{item.matchingModeName1}</Description>:<div/>
             }
             {
               item.matchingModeName2
               ? <Description term="匹配模型（抵押贷款）">{item.matchingModeName2}</Description>:<div/>
             }
             <Description term="房产类型">{item.propertyTypeName}</Description>
             <Description term="客户类别">{item.customerTypeName}</Description>
             <Description term="还款方式">{item.productPayWayName}</Description>
             <Description term="产品特点">{item.productFeaturesName}</Description>
           </DescriptionList>

           {item.approvalStatuts == 1
              ?<DescriptionList size="large" style={{ marginBottom: 32, marginLeft:'15%'  }} col={2}>
                <div>
                  <Description term="审核状态">
                    {getFieldDecorator('approvalStatuts')(
                             <Radio.Group style={{ width: '100%' }}>
                               <Radio value="2">通过</Radio>
                               <Radio value="0">不通过</Radio>
                             </Radio.Group>
                    )}
                  </Description>
                </div>
                <Description term="是否纳入评测" style={{display: getFieldValue('approvalStatuts') === '2' ? 'block' : 'none',}}>
                  {getFieldDecorator('isEvaluating')(
                    <Select placeholder="请选择" style={{width:'40%'}}>
                      <Option value='0'>否</Option>
                      <Option value='1'>是</Option>
                    </Select>
                  )}
                </Description>
                <Description term="是否热门" style={{display: getFieldValue('approvalStatuts') === '2' ? 'block' : 'none',}}>
                  {getFieldDecorator('isFire')(
                    <Select placeholder="请选择"  style={{width:'40%'}}>
                      <Option value='0'>否</Option>
                      <Option value='1'>是</Option>
                    </Select>
                  )}
                </Description>
                <Description term="审核备注" style={{display: getFieldValue('approvalStatuts') === '0' ? 'block' : 'none',}}>
                  {getFieldDecorator('approvalRemarks')(
                    <Input.TextArea style={{ width: '100%' }}/>
                  )}
                </Description>
              </DescriptionList>: null
          }
          {/* {item.approvalStatuts == 1
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
                             {getFieldDecorator('approvalRemarks')(
                               <Input.TextArea style={{ width: '100%' }}/>
                             )}
                          </FormItem>
                        </Col>
                      </Row>
                    </div>
                : null
          } */}
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
