import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment  from 'moment'
import StandardTable from '../../components/InformationTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  content: state.content,
}))
@Form.create()
export default class TableList extends PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  }
  // constructor(props, context) {
  //   super(props, context);
  // }
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'content/fetch',
    });
    dispatch({
      type: 'content/fetchColumn',
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
      type: 'content/fetch',
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
      type: 'content/fetch',
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
          type: 'content/remove',
          payload: {
            id: selectedRows.map(row => row.contentId).join(','),
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
  handleEdit = (item) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'content/fetchDetail',
      payload: {
        contentId: item.contentId,
      },
    });
    dispatch(routerRedux.push('/content/information/edit'))
  }
  handleDetail = (item) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'content/fetchDetail',
      payload: {
        contentId: item.contentId,
      },
    });
    dispatch(routerRedux.push('/content/information/detail'))
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
        type: 'content/fetch',
        payload: values,
      });
    });
  }
  toAdd = () => {
    this.context.router.history.push('/content/information/add');
  }

  renderSimpleForm() {
    const { content: { columnType } } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columnTypeOptions = columnType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="栏目分类">
              {getFieldDecorator('channelType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {columnTypeOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="标题">
              {getFieldDecorator('contentTitle')(
                <Input placeholder="请输入" />
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
    const { content: { columnType, column } } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columnNameOptions = column.data.map(item => <Option key={item.channelId} value={item.channelId}>{item.channelName}</Option>);
    const columnTypeOptions = columnType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="栏目分类">
              {getFieldDecorator('channelType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {columnTypeOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="栏目名称">
              {getFieldDecorator('channelId')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {columnNameOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新时间">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }} placeholder={['开始时间', '结束时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="标题">
              {getFieldDecorator('contentTitle')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="发布者">
              {getFieldDecorator('operName')(
                <Input placeholder="请输入" />
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
    const { content: { loading: ruleLoading, data } } = this.props;
    const { selectedRows } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderLayout title="内容管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.toAdd()}>
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
              loading={ruleLoading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              handleEdit={this.handleEdit}
              handleDetail={this.handleDetail}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
