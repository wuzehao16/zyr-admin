import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Upload} from 'antd';
import StandardTable from '../../components/ColumnTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const upLoadProps = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  // defaultFileList: [...fileList],
  className: 'uploadlist-inline',
};


@connect(state => ({
  content: state.content,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    parentColumn: '',
    columnTitle: '',
    sort: '',
    visible: '',
    columnImg: '',
    modalVisible: false,
    fileList: [],
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'content/fetch',
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
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
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
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  parentColumnInput = (e) => {
    this.setState({
      parentColumn: e.target.value,
    });
  }

  columnTitleInput = (e) => {
    this.setState({
      columnTitle: e.target.value,
    });
  }

  sortInput = (e) => {
    this.setState({
      sort: e.target.value,
    });
  }

  columnImgInput = (e) => {
    this.setState({
      columnImg: e.target.value,
    });
  }
  visibleInput = (value) => {
    this.setState({
      visible: value,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'content/add',
      payload: {
        parentColumn: this.state.parentColumn,
        columnTitle: this.state.columnTitle,
        sort: this.state.sort,
        columnImg: this.state.columnImg,
        visible: this.state.visible,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  onFileChange = (info) => {
    let fileList = info.fileList;
    this.setState({
      fileList: info.fileList,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="栏目名称">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="0">金融资讯/国内资讯</Option>
                  <Option value="1">金融资讯/国际资讯</Option>
                  <Option value="2">系统消息/平台公告</Option>
                  <Option value="3">系统消息/个人消息</Option>
                  <Option value="4">常识讲堂/基础课程</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="内容标题">
              {getFieldDecorator('status')(
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="栏目名称">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="0">金融资讯/国内资讯</Option>
                  <Option value="1">金融资讯/国际资讯</Option>
                  <Option value="2">系统消息/平台公告</Option>
                  <Option value="3">系统消息/个人消息</Option>
                  <Option value="4">常识讲堂/基础课程</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="内容标题">
              {getFieldDecorator('status')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="内容标签">
              {getFieldDecorator('content2')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="是否在线">
              {getFieldDecorator('status1')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="创建人">
              {getFieldDecorator('creator')(
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
    const { selectedRows, modalVisible, parentColumn, columnTitle, sort, columnImg, visible, fileList} = this.state;

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
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
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
              loading={ruleLoading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="栏目新增"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="父级栏目"
          >
            <Input placeholder="请输入" onChange={this.parentColumnInput} value={parentColumn} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="栏目名称"
          >
            <Input placeholder="请输入" onChange={this.columnTitleInput} value={columnTitle} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="排列顺序"
          >
            <Input placeholder="请输入" onChange={this.sortInput} value={sort} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="是否显示"
          >
              <Select placeholder="请选择" style={{ width: '100%' }} onChange={this.visibleInput} >
                <Option value="0">是</Option>
                <Option value="1">否</Option>
              </Select>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="栏目图片"
          >
              <Upload {...upLoadProps} onChange={this.onFileChange}>
                {fileList.length >= 1 ? null :
              <Button>
                <Icon type="upload" /> upload
              </Button>
              }
            </Upload>
          </FormItem>

        </Modal>
      </PageHeaderLayout>
    );
  }
}
