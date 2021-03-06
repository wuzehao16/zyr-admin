import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Form, Icon, Button, Dropdown, Menu } from 'antd';
import StandardTable from '../../components/SystemRoleTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './User.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ systemRole, loading }) => ({
  systemRole,
  loading: loading.models.systemRole,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/fetch',
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
      type: 'systemRole/fetch',
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
      type: 'systemRole/fetch',
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
          type: 'systemRole/remove',
          payload: {
            roleId: selectedRows.map(row => row.roleId).join(','),
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
        type: 'systemRole/fetch',
        payload: values,
      });
    });
  }

  handleEdit = (item) => {
    this.props.dispatch({
      type: 'systemRole/saveRole',
      payload: item,
    });
  }

  render() {
    const { systemRole: { data }, loading, dispatch } = this.props;
    const { selectedRows } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderLayout title="角色列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm} />
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => dispatch(routerRedux.push('/system/role/add'))}>
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
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              handleEdit={this.handleEdit}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
