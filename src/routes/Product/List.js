import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, AutoComplete } from 'antd';
import StandardTable from '../../components/ProductTable';
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
    selectedRows: [],
    formValues: {},
    item: {},
    selectValues: 'keyword'
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
      console.log(fieldsValue)
      if (err) return;
      const values = {
        ...fieldsValue,
        date: [],
        startTime: fieldsValue.date && fieldsValue.date[0] && moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
        endTime: fieldsValue.date && fieldsValue.date[1] &&  moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
      };
      this.setState({
        formValues: values,
      });
      console.log(values)
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
  toAdd = () => {
    this.props.dispatch({
      type: 'product/removeStepFormDate',
    });
    this.props.dispatch(routerRedux.push('/product/add'))
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

  handleSelectChanges = (val) => {
    this.setState({
      selectValues: val,
    })
  }

    renderForm() {
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
              </Select>
            </Col>
            <Col span={15}>
              <FormItem>
                {getFieldDecorator(this.state.selectValues)(
                  <AutoComplete
                    style={{width:'100%'}}
                    placeholder="请输入产品名称、机构名称"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <Button type="primary" icon="search" style={{width:'45%',height:'32px',borderRadius:'0',fontSize:'20px',fontWeight:700,textAlign:'center'}} htmlType="submit"></Button>
              <button onClick={this.toAdd} style={{background:'rgb(238,86,72)',verticalAlign:'top',width:'50%',border:'none',borderLeft:'1px solid #fff'}} >
                <span style={{fontSize:14,lineHeight:'30px',color:'#fff'}}>新增</span>
              </button>
            </Col>
          </Row>:
          <Row>
            <Col span={3}>
              {getFieldDecorator('cityCode',{
                initialValue:currentUser.info.cityCode,
              })(
                <Select  disabled style={{width:'100%'}}>
                  {cityOptions}
                </Select>
              )}
            </Col>
            <Col span={3}>
              <Select defaultValue="产品名称" disabled style={{width:'100%'}}>
                <Option value="productName">产品名称</Option>
              </Select>
            </Col>
            <Col span={15}>
              <FormItem>
                {getFieldDecorator('productName')(
                  <AutoComplete
                    style={{width:'100%'}}
                    placeholder="请输入产品名称"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <Button type="primary" icon="search" style={{width:'45%',height:'32px',borderRadius:'0',fontSize:'20px',fontWeight:700,textAlign:'center'}} htmlType="submit"></Button>
              <button onClick={this.toAdd} style={{background:'rgb(238,86,72)',verticalAlign:'top',width:'50%',border:'none',borderLeft:'1px solid #fff'}} >
                <span style={{fontSize:14,lineHeight:'30px',color:'#fff'}}>新增</span>
              </button>
            </Col>
          </Row>
        }
        <Row gutter={{md: 8, lg: 8, xl: 16}} className='noborderrow'>
          <Col md={3} sm={24}>
              <FormItem>
                {getFieldDecorator('monthlyFeeRate')(
                  <Select placeholder="利息区间" style={{ width: '100%',border:'0' }}>
                    { intRangeOptions }
                  </Select>
                )}
              </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <FormItem>
              {getFieldDecorator('approvalStatuts')(
                <Select placeholder="审核状态" style={{ width: '100%',border:'0' }}>
                  { auditOptions }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <FormItem>
              {getFieldDecorator('isEvaluating')(
                <Select placeholder="是否纳入评测" style={{ width: '100%',border:'0' }}>
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <FormItem>
              {getFieldDecorator('shelfState')(
                <Select placeholder="上架状态" style={{ width: '100%',border:'0' }}>
                  <Option value="1">已上架</Option>
                  <Option value="0">已下架</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            {
              currentUser.data.userIdentity==0?
              <FormItem>
                {getFieldDecorator('institutionCode')(
                  <Select placeholder="机构类型" style={{ width: '100%',border:'0'}}>
                  { institutionTypeOptions }
                  </Select>
                )}
              </FormItem>:
              <FormItem>
                {getFieldDecorator('institutionCode',{initialValue:currentUser.info.institutionCode})(
                  <Select disabled style={{ width: '100%',border:'0'}}>
                  { institutionTypeOptions }
                  </Select>
                )}
              </FormItem>
            }
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="更新时间">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }} placeholder={['开始时间', '结束时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={3}  sm={24} style={{ textAlign:'right'}}>
            <Button style={{ marginBottom: 4, border:'none'}} onClick={this.handleFormReset}>清空筛选条件</Button>
          </Col>
        </Row>
        <style jsx>{`
          .ant-select-selection__placeholder {
            color:#000;
          }
          .noborderrow .ant-select-selection{
            border:none;
          }
          // .noborderrow.ant-select-open,.noborderrow .ant-select-focused {
          //   border:none;
          //   color:rgb(238，86，72)
          // }
          input::-webkit-input-placeholder{
            color:red;
          }
          input:-moz-placeholder{
            color:red;
          }
          input::-moz-placeholder{
            color:red;
          }
          input::-moz-placeholder{
            color:red;
          }
        `}
        </style>
      </Form>
    );
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
            {/* <div className={styles.tableListOperator}>
              {
                selectedRows.length > 0 && (
                  <span> */}
                    {/* <Button>批量操作</Button> */}
                    {/* <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div> */}
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
