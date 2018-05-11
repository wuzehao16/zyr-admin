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
    const isEvaluaStatuts = ['未纳入评测', '已纳入评测'];
    {console.log('data',data)}
    // {console.log('text-record',text,record)}
    const columns = [
      {
        // title: '产品信息',
        // align:'center',
        render(record) {
          return (
            <div>
              <div><span className={styles.txt}>{record.productName}</span></div>
              <Fragment>
                  <span>{approvalStatus[record.approvalStatuts]}<Divider type="vertical" /></span>
                  <span>{isEvaluaStatuts[record.isEvaluating]||'--'}<Divider type="vertical" /></span>
                  { record.approvalStatuts == 2
                  ? <span>{record.shelfState==1?'已上架':'已下架'}
                      <Divider type="vertical" />
                    </span>
                  : null
                  }
                  <span style={{color:'rgb(238,86,72)'}}>{`${record.monthlyFeeRate} %`}</span>
              </Fragment>
            </div>
            )
        },
      },
      {
        // title:'机构信息',
        // align:'center',
        render(record){
          return (
            <div>
              <div>
                <span className={styles.txt}>{record.manageName}</span>
              </div>
              <Fragment>
                <span>{record.city}<Divider type="vertical" /></span>
                <span>{institutionType[record.institutionCode]}</span>
              </Fragment>
            </div>
          )
        }
      },
      {
        // title:'操作人信息',
        align:'center',
        render (record) {
          return (
            <Fragment>
              <span>{record.oper}<Divider type="vertical" /></span>
              <span>{`${moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss')}更新`}</span>
            </Fragment>
          )
        }
      },
      {
        // title: '操作',
        align:'right',
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
