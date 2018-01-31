import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Icon, Button, Dropdown, Menu, Modal, message, Select } from 'antd';
import StandardTable from '../../components/Dictionary';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './User.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ systemDict, loading }) => ({
  systemDict,
  loading: loading.models.systemDict,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    type: '',
    modalVisible: false,
    selectedRows: [],
    formValues: {},
    isAdd: true,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemDict/fetch',
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
      type: 'systemDict/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { dispatch } = this.props;
    this.setState({
      type: '',
    });
    dispatch({
      type: 'systemDict/fetch',
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
          type: 'systemDict/remove',
          payload: {
            id: selectedRows.map(row => row.id).join(','),
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
    const { dispatch } = this.props;
    const { type } = this.state;
    dispatch({
      type: 'systemDict/fetch',
      payload: {
        type,
      },
    });
  }

  addDict = () => {
    this.props.form.resetFields();
    this.setState({
      isAdd: true,
    });
    this.handleModalVisible(true);
  }

  handleModalVisible = (flag) => {
    const { form } = this.props;
    this.setState({
      modalVisible: !!flag,
      // isAdd: true,
    });
  }

  handleTypeInput = (e) => {
    this.setState({
      type: e.target.value,
    });
  }

  handleAdd = () => {
    const { form, dispatch } = this.props;
    const { isAdd, id } = this.state;
    form.validateFields({
      force: true,
    }, (err, values) => {
      this.setState({ formValues: values });
      if (!err) {
        if (this.state.isAdd) {
          dispatch({
            type: 'systemDict/add',
            payload: {
              ...values,
            },
          });
        } else {
          dispatch({
            type: 'systemDict/update',
            payload: {
              ...values,
              id,
            },
          });
        }
        message.success('添加成功');
        form.resetFields();
        this.handleModalVisible(false);
        this.setState({ formValues: {} });
      }
    });
  }
  handleEdit = (item) => {
    const { setFieldsValue } = this.props.form;
    this.setState({
      isAdd: false,
      id: item.id,
    });
    setFieldsValue({
      label: item.label,
      value: item.value,
      type: item.type,
    });
    this.handleModalVisible(true);
  }
  renderSimpleForm() {
    const { type } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="字典类型">
              <Input placeholder="请输入" onChange={this.handleTypeInput} value={type} />
            </FormItem>
          </Col>
          <Col md={16} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { systemDict: { data }, loading } = this.props;
    const { selectedRows, modalVisible, type, label, value, isAdd } = this.state;
    const { getFieldDecorator } = this.props.form;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSimpleForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.addDict()}>
                新建
              </Button>
              {
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
              }
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              handleEdit={this.handleEdit}
            />
            {/* <TableForm
              value={data.list}
              onChange={this.handleEdit}
            /> */}
          </div>
        </Card>
        <Modal
          title={isAdd ? '新建字典' : '编辑字典'}
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <Form>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="字典名称"
            >
              {getFieldDecorator('label', {
              rules: [
                {
                  required: true,
                  message: '请输入字典名称！',
                },
              ],
            })(
              <Input placeholder="请输入" />
            )}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="字典值"
            >
              {getFieldDecorator('value', {
              rules: [
                {
                  required: true,
                  message: '请输入字典值！',
                },
              ],
            })(
              <Input placeholder="请输入" />
            )}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="字典类型"
              required="true"
            >
              {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请输入字典类型！',
                },
              ],
            })(
              <Input placeholder="请输入" />
            )}
            </FormItem>
          </Form>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
