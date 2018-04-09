import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
import StandardTable from '../../components/ProductTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './List.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible, item } = props;
  const { getFieldDecorator } = form;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.productId = item.productId;
      fieldsValue.shelfState = item.shelfState==1 ? 0: 1;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title={item.shelfState==1?"下架产品":"上架产品"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        style={{ textAlign: 'center',fontSize:'24px' }}
      >
        确认{item.shelfState==1?"下架":"上架"}{item.productName}?
      </FormItem>
    </Modal>
  );
});

@connect(({ user, product, loading }) => ({
  user,
  product,
  loading: loading.models.product,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    item: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/fetch',
    });
    dispatch({
      type: 'product/fetchCity',
      payload: {
        type: 'city'
      }
    });
    dispatch({
      type: 'product/fetchIntRange',
      payload: {
        type: 'intRange'
      }
    });
    dispatch({
      type: 'product/fetchAudit',
      payload: {
        type: 'auditStatus'
      }
    });
    dispatch({
      type: 'product/fetchInstitutionType',
      payload: {
        type: 'orgType'
      }
    });
  }
  handleResetPassword = (v) => {
    this.setState({
      item: {
        productName: v.productName,
        productId: v.productId,
        shelfState: v.shelfState
      },
    });
    this.handleModalVisible(true);
  }
  handleEdit = (item) => {
    this.props.dispatch({
      type: 'product/fetchEdit',
      payload: {
        productId: item.productId,
      },
    });
  }
  handleDetail = (item) => {
    this.props.dispatch(routerRedux.push('/product/Detail/' + item.productId));
  }
  handleReview = (item) => {
    this.props.dispatch(routerRedux.push('/product/Review/' + item.productId));
    // this.props.dispatch({
    //   type: 'product/fetchReview',
    //   payload: {
    //     productId: item.productId,
    //   },
    // });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'product/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'product/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'product/remove',
          payload: {
            productId: selectedRows.map(row => row.productId).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        date: [],
        startTime: fieldsValue.date && moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
        endTime: fieldsValue.date && moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'product/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'product/updateShelvesStatus',
      payload: fields,
    });
    this.setState({
      modalVisible: false,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    const { product: { city, audit }, user:{ currentUser }  } = this.props;
    if (city) {
      var cityOptions = city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (audit) {
      var auditOptions = audit.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}
          style={{display:currentUser.data.userIdentity==0?'block':'none'}}
          >
          <Col md={8} sm={24}>
            <FormItem label="机构名称">
              {getFieldDecorator('manageName')(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="所在城市">
              {getFieldDecorator('cityCode')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {cityOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}
          style={{display:currentUser.data.userIdentity==1?'block':'none'}}
          >
          <Col md={8} sm={24}>
            <FormItem label="产品名称">
              {getFieldDecorator('productName')(
                  <Input placeholder="请输入"/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="审核状态">
              {getFieldDecorator('approvalStatuts')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  { auditOptions }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    const { product: { city, audit, institutionType, intRange }, user:{ currentUser }  } = this.props;
    if (city) {
      var cityOptions = city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (audit) {
      var auditOptions = audit.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (institutionType) {
      var institutionTypeOptions = institutionType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (intRange) {
      var intRangeOptions = intRange.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}
          style={{display:currentUser.data.userIdentity==0?'block':'none'}}
          >
          <Col md={8} sm={24}>
            <FormItem label="机构名称">
              {getFieldDecorator('manageName')(
                  <Input placeholder="请输入"/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="所在城市">
              {getFieldDecorator('cityCode')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {cityOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="机构类型">
              {getFieldDecorator('institutionCode')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                { institutionTypeOptions }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="产品名称">
              {getFieldDecorator('productName')(
                  <Input placeholder="请输入"/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="审核状态">
              {getFieldDecorator('approvalStatuts')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  { auditOptions }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否纳入评测">
              {getFieldDecorator('isEvaluating')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">否</Option>
                  <Option value="1">是</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="上架状态">
              {getFieldDecorator('shelfState')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">已下架</Option>
                  <Option value="1">已上架</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="更新时间">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }} placeholder={['开始时间', '结束时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="利息区间">
              {getFieldDecorator('monthlyFeeRate')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  { intRangeOptions }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { product: { data, city }, user:{ currentUser } , loading, dispatch } = this.props;
    const { selectedRows, modalVisible, addInputValue, item } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => dispatch(routerRedux.push('/product/add'))}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    {/* <Button>批量操作</Button> */}
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              userIdentity={currentUser.data.userIdentity}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              handleResetPassword={this.handleResetPassword}
              handleEdit={this.handleEdit}
              handleDetail={this.handleDetail}
              handleReview={this.handleReview}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          item={item}
        />
      </PageHeaderLayout>
    );
  }
}
