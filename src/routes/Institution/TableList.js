import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
import StandardTable from '../../components/InstitutionTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

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
      fieldsValue.loginAccount = item.loginAccount;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="重置密码"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="用户名"
      >
        {item.loginAccount}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="手机"
      >
        {getFieldDecorator('userPhone', {
          rules: [
            { required: true, message: '请输入用户新手机号...' },
            {
              pattern: /^1[3|4|5|8]\d{9}$/,
              message: '手机号格式错误！',
            },
            ],
        })(
          <Input type="mobile" placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="邮箱"
      >
        {getFieldDecorator('userEmail', {
          rules: [
            { required: true, message: '请输入用户邮箱' },
            {
              // pattern: /^1[3|4|5|8]\d{9}$/,
              message: '手机号格式错误！',
            },
            ],
        })(
          <Input type="mobile" placeholder="请输入" />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ user, institution, loading }) => ({
  user,
  institution,
  loading: loading.models.institution,
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
      type: 'institution/fetch',
    });
    dispatch({
      type: 'institution/fetchCity',
      payload: {
        type: 'city'
      }
    });
    dispatch({
      type: 'institution/fetchAudit',
      payload: {
        type: 'auditStatus'
      }
    });
    dispatch({
      type: 'institution/fetchInstitutionType',
      payload: {
        type: 'orgType'
      }
    });
  }
  handleResetPassword = (v) => {
    console.log(v)
    this.setState({
      item: {
        loginAccount: v.loginAccount,
        userPhone: v.userPhone,
        userEmail: v.userEmail,
      },
    });
    this.handleModalVisible(true);
  }
  handleEdit = (item) => {
    this.props.dispatch({
      type: 'institution/fetchEdit',
      payload: {
        manageId: item.manageId,
      },
    });
  }
  handleDetail = (item) => {
    this.props.dispatch({
      type: 'institution/fetchDetail',
      payload: {
        manageId: item.manageId,
      },
    });
  }
  handleReview = (item) => {
    this.props.dispatch({
      type: 'institution/fetchReview',
      payload: {
        manageId: item.manageId,
      },
    });
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
      type: 'institution/fetch',
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
      type: 'institution/fetch',
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
          type: 'institution/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
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
        type: 'institution/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'institution/updatePassword',
      payload: fields,
    });
    this.setState({
      modalVisible: false,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    const { institution: { city }  } = this.props;
    if (city) {
      var cityOptions = city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
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
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    const { institution: { city, audit, institutionType }  } = this.props;
    if (city) {
      var cityOptions = city.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (audit) {
      var auditOptions = audit.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    if (institutionType) {
      var institutionTypeOptions = institutionType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="机构类型">
              {getFieldDecorator('institutionCode')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                { institutionTypeOptions }
                </Select>
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
            <FormItem label="审核状态">
              {getFieldDecorator('approvalStatus')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  { auditOptions }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="启用状态">
              {getFieldDecorator('startStatus')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">禁用</Option>
                  <Option value="1">启用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="审核时间">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }} placeholder={['开始时间', '结束时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="机构名称">
              {getFieldDecorator('manageName')(
                  <Input placeholder="请输入"/>
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
    const { institution: { data, city }, loading, dispatch } = this.props;
    const { selectedRows, modalVisible, addInputValue, item } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
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
              <Button icon="plus" type="primary" onClick={() => dispatch(routerRedux.push('/institution/add'))}>
                新建
              </Button>
              {/* {
                selectedRows.length > 0 && (
                  <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              } */}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
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
