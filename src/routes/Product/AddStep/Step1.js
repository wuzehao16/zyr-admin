import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, Row, Col, InputNumber  } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

@Form.create()
class Step1 extends React.PureComponent {

  getInstitution = (code) => {
    this.props.dispatch({
      type: 'product/getInstitution',
      payload: {
        cityCode: code
      },
    });
  }
  getSubInstitution = (code) => {
    this.props.dispatch({
      type: 'product/getSubInstitution',
      payload: {
        parentId: code
      },
    });
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const { product: { data, city, institutionType, institutionList, subInstitutionList }, submitting, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form;
    if (city) {
      var cityOptions = city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (institutionType) {
      var institutionTypeOptions = institutionType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (institutionList) {
      var institutionListOptions = institutionList.map(item => <Option key={item.manageId} value={item.manageId}>{item.manageName}</Option>);
    }
    if (subInstitutionList) {
      var subInstitutionListOptions = subInstitutionList.map(item => <Option key={item.sublInstitution} value={item.sublInstitution}>{item.manageName}</Option>);
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
      },
    };
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 19 },
      },
    };


    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const onValidateForm = () => {
        dispatch(routerRedux.push('/product/add/step2'));
      validateFields((err, values) => {
        console.log(values)
        if (!err) {
          dispatch({
            type: 'product/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/product/add/step2'));
        }
      });
    };
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{ marginTop: 8 }}
        >
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem
                {...formItemLayout}
                 label="机构类型">
                {getFieldDecorator('institutionCode', {
                  rules: [{
                    required: true, message: '请选择机构类型',
                  }],
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                  { institutionTypeOptions }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem
                {...formItemLayout}
                 label="所在城市">
                {getFieldDecorator('cityCode', {
                  rules: [{
                    required: true, message: '请选择算在城市',
                  }],
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }} onChange={this.getInstitution}>
                    {cityOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
         <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="机构名称"
                {...formItemLayout}
               >
                {getFieldDecorator('manageName',{
                  rules: [
                    {
                      required: true,
                      message: '请输入机构名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="产品名称"
                {...formItemLayout}
               >
                {getFieldDecorator('productName',{
                  rules: [
                    {
                      required: true,
                      message: '请输入产品名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="最高可贷"
                {...formItemLayout}
               >
                {getFieldDecorator('productMaxLoad',{
                  rules: [
                    {
                      required: true,
                      message: '请输入最高可贷',
                    },
                  ],
                })(
                  <Input
                    addonAfter="元"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="产品分润比例"
                {...formItemLayout}
               >
                {getFieldDecorator('productRatio',{
                  rules: [
                    {
                      required: true,
                      message: '请输入产品分润比例',
                    },
                  ],
                })(
                  <Input
                    addonAfter="%"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="月费率"
                {...formItemLayout}
               >
                {getFieldDecorator('monthlyFeeRate',{
                  rules: [
                    {
                      required: true,
                      message: '请输入月费率',
                    },
                  ],
                })(
                  <Input
                    addonAfter="元"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="产品期限"
                {...formItemLayout}
               >
                {getFieldDecorator('productRatio',{
                  rules: [
                    {
                      required: true,
                      message: '请输入产品分润比例',
                    },
                  ],
                })(
                  <InputGroup >
                    <Col span={8}>
                     <InputNumber />
                   </Col>
                    <Col span={8}>
                     <InputNumber />
                    </Col>
                 </InputGroup>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="手续费"
                {...formItemLayout}
               >
                {getFieldDecorator('productPoundage',{
                  rules: [
                    {
                      required: true,
                      message: '请输入手续费',
                    },
                  ],
                })(
                  <Input
                    addonAfter="元"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="产品期限"
                {...formItemLayout}
               >
                {getFieldDecorator('productRatio',{
                  rules: [
                    {
                      required: true,
                      message: '请输入产品分润比例',
                    },
                  ],
                })(
                  <InputGroup >
                    <Col span={8}>
                     <InputNumber />
                   </Col>
                    <Col span={8}>
                     <InputNumber />
                    </Col>
                 </InputGroup>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="产品须知"
                {...formItemLayout}
               >
                {getFieldDecorator('productNotice',{
                  rules: [
                    {
                      required: true,
                      message: '请输入产品须知',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item
                label="推荐语"
                {...formItemLayout}
               >
                {getFieldDecorator('productRecommend',{
                  rules: [
                    {
                      required: true,
                      message: '请输入推荐语',
                    },
                  ],
                })(
                  <Input
                    addonAfter="元"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="排序"
                {...formItemLayout}
               >
                {getFieldDecorator('productSort',{
                  rules: [
                    {
                      required: true,
                      message: '请输入排序',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="产品类别"
                {...formItemLayout1}
               >
                {getFieldDecorator('productType',{
                  rules: [
                    {
                      required: true,
                      message: '请输入产品类别',
                    },
                  ],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    {children}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="客户类型"
                {...formItemLayout1}
               >
                {getFieldDecorator('propertyType',{
                  rules: [
                    {
                      required: true,
                      message: '请输入产品类别',
                    },
                  ],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    {children}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="还款方式"
                {...formItemLayout1}
               >
                {getFieldDecorator('productPayWay',{
                  rules: [
                    {
                      required: true,
                      message: '请输入产品类别',
                    },
                  ],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    {children}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Form.Item
                label="产品特点"
                {...formItemLayout1}
               >
                {getFieldDecorator('productFeatures',{
                  rules: [
                    {
                      required: true,
                      message: '请输入产品类别',
                    },
                  ],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    {children}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <Form.Item
                label="上架状态"
                {...formItemLayout}
               >
                {getFieldDecorator('shelfState',{
                  rules: [
                    {
                      required: true,
                      message: '请输入上架',
                    },
                  ],
                })(
                  <Select placeholder="请选择">
                    <Option value="1">上架</Option>
                    <Option value="0">下架</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" onClick={onValidateForm}>
              提交
            </Button>
            {/* <Button style={{ marginLeft: 8 }}>保存</Button> */}
          </FormItem>
        </Form>

      </div>
    );
  }
}

export default connect(({ product }) => ({
  product,
  data: product.step,
}))(Step1);
