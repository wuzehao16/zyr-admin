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
    const { data: { data, count },userIdentity , loading } = this.props
    const approvalStatus = ['未通过', '审核中', '已通过'];
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
        title: '产品编号',
        dataIndex: 'productNo',
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        render: (text) => <span className={styles.txt}>{text}</span>,
      },
      {
        title: '城市',
        dataIndex: 'city',
      },
      {
        title: '机构类型',
        dataIndex: 'institutionCode',
        render(val) {
          return <span>{institutionType[val]}</span>;
        },
      },
      {
        title: '机构名称',
        dataIndex: 'manageName',
        render: (text) => <span className={styles.txt}>{text}</span>,
      },
      {
        title: '月费率',
        dataIndex: 'monthlyFeeRate',
        render: val => `${val} %`,
      },
      {
        title: '纳入评测',
        dataIndex: 'isEvaluating',
        render(val) {
          return <span>{isEvaluaStatuts[val]||'--'}</span>;
        },
      },
      {
        title: '审核状态',
        dataIndex: 'approvalStatuts',
        render(val) {
          return <Badge status={approvalStatusMap[val]} text={approvalStatus[val]} />;
        },
      },
      {
        title: '操作者',
        dataIndex: 'oper',
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
              { record.approvalStatuts == 2
                ? <span>
                    <a onClick={() => this.handleResetPassword(record)}>{record.shelfState==1?'下架':'上架'}</a>
                    <Divider type="vertical" />
                  </span>
                : null
              }
              { record.approvalStatuts == 1 && userIdentity===0
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
          rowKey={record => record.productId}
          // rowSelection={rowSelection}
          scroll={{ x: 1700}}
          dataSource={data}
          userIdentity={userIdentity}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
