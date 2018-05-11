import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, AutoComplete } from 'antd';
import StandardTable from '../../components/OrderTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './List.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const InputGroup = Input.Group;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible, item } = props;
  const { getFieldDecorator } = form;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.orderId = item.orderId;
      fieldsValue.upState = item.upState==1 ? 2: 1;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title={item.upState==1?"下架产品":"上架产品"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        style={{ textAlign: 'center',fontSize:'24px' }}
      >
        确认{item.upState==1?"下架":"上架"}{item.orderName}?
      </FormItem>
    </Modal>
  );
});

@connect(({ user, order, loading }) => ({
  user,
  order,
  loading: loading.models.order,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    selectedRows: [],
    formValues: {},
    item: {},
    selectValues:'keyword'
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/fetch',
    });
    dispatch({
      type: 'order/fetchOrderType',
      payload: {
        type: 'ordStatus'
      }
    });
    dispatch({
      type: 'order/fetchCity',
      payload: {
        type: 'city'
      }
    });
  }
  handleResetPassword = (v) => {
    this.setState({
      item: {
        orderName: v.orderName,
        orderId: v.orderId,
        upState: v.upState
      },
    });
    this.handleModalVisible(true);
  }
  handleReview = (item) => {
    this.props.dispatch(routerRedux.push('/order/review/' + item.orderId));
  }
  handleDetail = (item) => {
    this.props.dispatch(routerRedux.push('/order/detail/' + item.orderId));
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
      type: 'order/fetch',
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
      type: 'order/fetch',
      payload: {},
    });
  }


  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'order/remove',
          payload: {
            orderId: selectedRows.map(row => row.orderId).join(','),
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
        type: 'order/fetch',
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
      type: 'order/updateOrderState',
      payload: fields,
    });
    this.setState({
      modalVisible: false,
    });
  }

  handleSelectChanges = (val) => {
    this.setState({
      selectValues: val,
    })
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    const { order: { city, orderType }, user:{ currentUser }  } = this.props;
    if (orderType) {
      var orderTypeOptions = orderType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (city) {
      var cityOptions = city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    return (
    <Form onSubmit={this.handleSearch}>
      {
        currentUser.data.userIdentity==0?
        <Row>
          <Col span={3}>
            {getFieldDecorator('cityCode')(
              <Select placeholder="所在城市" style={{width:'100%'}}>
                {cityOptions}
              </Select>
            )}
          </Col>
          <Col span={3}>
            <Select defaultValue="不限" style={{width:'100%'}} onChange={this.handleSelectChanges}>
                <Option value="keyword">不限</Option>
                <Option value="productName">产品名称</Option>
                <Option value="manageName">机构名称</Option>
                <Option value="orderNo">订单号</Option>
                <Option value="userName">提单人</Option>
                <Option value="loanName">贷款人</Option>
            </Select>
          </Col>
          <Col span={16}>
            <FormItem>
              {getFieldDecorator(this.state.selectValues)(
                <AutoComplete
                style={{width:'100%'}}
                placeholder="请输入产品名称、机构名称、订单号、提单人或贷款人"
              />
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <Button type="primary" icon="search" style={{width:'80%',height:'32px',borderRadius:'0',fontSize:'20px',fontWeight:700,textAlign:'center'}} htmlType="submit"></Button>
          </Col>
        </Row>:
        <Row>
          <Col span={3}>
            {getFieldDecorator('cityCode',{initialValue:currentUser.info.cityCode})(
            <Select disabled style={{width:'100%'}}>
              {cityOptions}
            </Select>
              )}
          </Col>
          <Col span={3}>
            <Select defaultValue="不限" style={{width:'100%'}} onChange={this.handleSelectChanges}>
              <Option value="keyword">不限</Option>
              <Option value="productName">产品名称</Option>
              <Option value="orderNo">订单号</Option>
              <Option value="userName">提单人</Option>
              <Option value="loanName">贷款人</Option>
            </Select>
          </Col>
          <Col span={16}>
            <FormItem>
              {getFieldDecorator(this.state.selectValues)(
                <AutoComplete
                  style={{width:'100%'}}
                  placeholder="请输入产品名称、订单号、提单人或贷款人"
                />
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <Button type="primary" icon="search" style={{width:'80%',height:'32px',borderRadius:'0',fontSize:'20px',fontWeight:700,textAlign:'center'}} htmlType="submit"></Button>
          </Col>
        </Row>
      }
      <Row gutter={{md: 8, lg: 16, xl:48}} className='noborderrow'>
          <Col md={3} sm={24}>
              {getFieldDecorator('orderStatus')(
                <Select placeholder="订单状态" style={{ width: '100%' }}>
                  {orderTypeOptions}
                </Select>
              )}
          </Col>
          <Col md={8} offset={3} sm={24}>
            <FormItem label="更新时间">
                {getFieldDecorator('date')(
                  <RangePicker style={{ width: '100%' }} placeholder={['开始时间', '结束时间']} />
                )}
            </FormItem>
          </Col>
          <Col md={4} offset={6} sm={24}>
            <Button style={{ marginBottom: 4}} onClick={this.handleFormReset}>清空筛选条件</Button>
          </Col>
      </Row>
        <style jsx>{`
        .ant-select-selection__placeholder {
          color:#000;
        }
        .noborderrow .ant-select-selection{
          border:none;
        }
      `}
      </style>
    </Form>
    )
  }
  render() {
    const { order: { data, city }, user:{ currentUser }, loading, dispatch } = this.props;
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
