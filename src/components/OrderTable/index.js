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
    const { data: { data, count }, loading } = this.props
    const approvalStatus = ['待上架', '已上架', '已下架'];
    const institutionType = ['无','银行机构','金融机构','小额贷款'];
    const isEvaluaStatuts = ['否', '是'];
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
        title: '产品名称',
        dataIndex: 'productName',
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
        dataIndex: 'upState',
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
            text: approvalStatus[2],
            value: 2,
          },
        ],
        render(val) {
          return <Badge status={approvalStatusMap[val]} text={approvalStatus[val]} />;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'createTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          return (
            <Fragment>
              <a onClick={() => this.handleReview(record)}>审批</a>
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
          rowKey={record => record.orderId}
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
