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
    const { data: { data, count }, userIdentity,  loading } = this.props;
    const orderStatus = ['申请中', '已申请','已初审','已终审','已面签','已放款','已拒绝','已取消'];
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
        title: '订单号',
        dataIndex: 'orderNo',
      },
      {
        title: '机构名称',
        dataIndex: 'manageName',
        render: (text) => <span className={styles.txt}>{text}</span>,
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        render: (text) => <span className={styles.txt}>{text}</span>,
      },
      {
        title: '申请贷款金额',
        dataIndex: 'loanMoney',
        render: val => `${val}万`,
      },
      {
        title: '实际贷款金额',
        dataIndex: 'realLoanMoney',
        render: val => `${val}万`,
      },
      {
        title: '贷款期限',
        dataIndex: 'loanLimit',
        render: val => `${val}期`,
      },
      {
        title: '贷款人',
        dataIndex: 'loanName',
      },
      {
        title: '提单人',
        dataIndex: 'userName',
      },
      {
        title: '提单人电话',
        dataIndex: 'userPhone',
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        render: val => `${orderStatus[val]}`,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        align: 'center',
        fixed: 'right',
        render: (text, record) => {
          return (
            <Fragment>
              {
                userIdentity===1 && (record.orderStatus == 1 || record.orderStatus == 2 || record.orderStatus == 3 || record.orderStatus == 4 )
                  ? <span>
                      <a onClick={() => this.handleReview(record)}>审批</a>
                      <Divider type="vertical" />
                    </span>
                  : null
              }

              <a onClick={() => this.handleDetail(record)}>详情</a>
            </Fragment>
          );
        },
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: count,
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
        <Table
          loading={loading}
          rowKey={record => record.orderId}
          rowSelection={rowSelection}
          scroll={{ x: 1700}}
          userIdentity={userIdentity}
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
