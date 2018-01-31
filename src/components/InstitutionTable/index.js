import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';

const statusMap = [ 'error', 'success'];
const approvalStatusMap = [ 'error', 'default', 'success'];
class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }
  handleResetPassword = (item) => {
    if (this.props.handleResetPassword) {
      this.props.handleResetPassword(item);
    }
  }
  handleEdit = (item) => {
    if (this.props.handleEdit) {
      this.props.handleEdit(item);
    }
  }
  handleReview = (item) => {
    if (this.props.handleReview) {
      this.props.handleReview(item);
    }
  }
  handleDetail = (item) => {
    if (this.props.handleDetail) {
      this.props.handleDetail(item);
    }
  }
  render() {
    const { selectedRowKeys } = this.state;
    const { data: { data, pagination }, loading } = this.props
    const approvalStatus = ['未通过', '审核中', '已通过'];
    const lockStatus = ['禁用', '启用'];
    const columns = [
      {
        title: '序号',
        dataIndex: 'no',
        render: (text, record, index) => {
          return (
              <span>{index+1}</span>
          );
        },
      },
      {
        title: '城市',
        dataIndex: 'city',
      },
      {
        title: '机构名称',
        dataIndex: 'manageName',
      },
      {
        title: '手机号',
        dataIndex: 'userPhone',
      },
      {
        title: '邮箱',
        dataIndex: 'userEmail',
      },
      {
        title: '排序',
        dataIndex: 'sort',
      },
      {
        title: '启用状态',
        dataIndex: 'startStatus',
        filters: [
          {
            text: lockStatus[0],
            value: 0,
          },
          {
            text: lockStatus[1],
            value: 1,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={lockStatus[val]} />;
        },
      },
      {
        title: '审核状态',
        dataIndex: 'approvalStatus',
        filters: [
          {
            text: approvalStatus[0],
            value: 0,
          },
          {
            text: approvalStatus[1],
            value: 1,
          },
          {
            text: approvalStatus[1],
            value: 2,
          },
        ],
        render(val) {
          return <Badge status={approvalStatusMap[val]} text={approvalStatus[val]} />;
        },
      },
      {
        title: '审核时间',
        dataIndex: 'approvalTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '注册时间',
        dataIndex: 'registrationTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          return (
            <Fragment>
              { record.approvalStatus == 2
                ? <span>
                    <a onClick={() => this.handleResetPassword(record)}>重置密码</a>
                    <Divider type="vertical" />
                  </span>
                : null
              }
              { record.approvalStatus == 1
                ? <span>
                    <a onClick={() => this.handleReview(record)}>审核</a>
                    <Divider type="vertical" />
                  </span>
                : null
              }
              <a onClick={() => this.handleEdit(record)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDetail(record)}>详情</a>
            </Fragment>
          );
        },
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
      showTotal:total => `总共 ${total} 条`,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.manageId}
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
