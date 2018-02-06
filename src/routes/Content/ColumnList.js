import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Modal, message, Upload } from 'antd';
import { routerRedux } from 'dva/router';
import StandardTable from '../../components/ColumnTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const upLoadProps = {
  action: 'http://47.104.27.184:8000/sysAnno/uploadImage',
  listType: 'picture',
  // defaultFileList: [...fileList],
  className: 'uploadlist-inline',
};

@connect(({ content, loading }) => ({
  content,
  loading: loading.models.content,
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
      type: 'content/fetchColumn',
    });
    dispatch({
      type: 'content/fetchColumnType',
      payload: {
        type: 'chaClassify'
      }
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
      type: 'content/fetchColumn',
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
      type: 'content/fetchColumn',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }
  handleEdit = (item) => {
    this.props.dispatch({
      type: 'content/fetchColumnEdit',
      payload: {
        ...item,
      },
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'content/removeColumn',
          payload: {
            id: selectedRows.map(row => row.channelId).join(','),
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
        type: 'content/fetchColumn',
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
    const fileList = info.fileList;
    this.setState({
      fileList: info.fileList,
    });
  }

  renderSimpleForm() {
    const { content: { data, columnType } } = this.props;
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
            <FormItem label="栏目名称">
              {getFieldDecorator('channelName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }



  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { content: { column }, loading, dispatch } = this.props;
    const { selectedRows, modalVisible, parentColumn, columnTitle, sort, columnImg, visible, fileList } = this.state;

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
              <Button icon="plus" type="primary" onClick={() => dispatch(routerRedux.push('/content/column/add'))}>
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
              data={column}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              handleEdit={this.handleEdit}
            />
          </div>
        </Card>
        <Modal
          title="栏目新增"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >


        </Modal>
      </PageHeaderLayout>
    );
  }
}
