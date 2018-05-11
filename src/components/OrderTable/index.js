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
    // const { selectedRowKeys } = this.state;
    const { data: { data, count }, userIdentity,  loading } = this.props;
    console.log('data',data)
    const orderStatus = ['申请中', '已申请','已初审','已终审','已面签','已放款','已拒绝','已取消'];
    const columns = [
      {
        render: (record) => {
          return (
            <div>
              <div>
                <span className={styles.txt}>{record.productName}</span>
              </div>
              <div>
                <span>{record.manageName}</span>
              </div>
              <Fragment>
                <span>提单人：{record.userName}<Divider type="vertical" /></span>
                <span>{record.userPhone}</span>
              </Fragment>
            </div>
          )
        }
      },
      {
        render: (record) => {
          return (
            <div>
              <div>
                <span>订单号：{record.orderNo}</span>
              </div>
              <div>
                <span>贷款人：{record.loanName}</span>
              </div>
              <Fragment>
                <span>申请{`${record.loanMoney}万`}<Divider type="vertical" /></span>
                <span>{`${orderStatus[record.orderStatus]}`?`${orderStatus[record.orderStatus]}`:'--'}<Divider type="vertical" /></span>
                {
                record.realLoanMoney?
                <span>实际放款{`${record.realLoanMoney}万`}<Divider type="vertical" /></span>:
                <span>--<Divider type="vertical" /></span>
                }
                {
                record.loanLimit?
                <span>{`${record.loanLimit}期`}</span>:
                <span>--</span>
                }
              </Fragment>
            </div>
          )
        }
      },
      {
        // align:'center',
        dataIndex: 'updateTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}更新</span>,
      },
      {
        align: 'right',
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

    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.handleRowSelectChange,
    //   getCheckboxProps: record => ({
    //     disabled: record.disabled,
    //   }),
    // };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          // rowKey={record => record.orderId}
          // rowSelection={rowSelection}
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
