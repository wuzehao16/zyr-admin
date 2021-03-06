import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';

const statusMap = [ 'error', 'success'];
const approvalStatusMap = [ 'default', 'success', 'error'];
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
  handleAddAi = (item) => {
    if (this.props.handleAddAi) {
      this.props.handleAddAi(item);
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
    const { data: { data, count }, loading,userIdentity } = this.props
    const columns = [
      {
        // title: '模型名称',
        align: 'left',
        dataIndex: 'modeName',
        render: (text, record, index) => {
          return (
            <div className={styles.model_name}>
              <div className={styles.model_title}>{text}</div>
            </div>
          );
        },
      },
      {
        // title: '机构名称',
        // align: 'center',
        dataIndex: 'manageName',
        render:val => <span className={styles.manageName}>{val}</span>
      },
      {
        // title: '更新时间',
        align: 'center',
        dataIndex: 'updateTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        // title: '启用状态',
        align: 'right',
        render: (text, record, index) => {
          return (
              <div className={record.modeStatus==1?styles.act:styles.disabled}>{record.modeStatus==1?'启用':'禁用'}</div>
          );
        },
      },
      {
        // title: '操作',
        align: 'right',
        render: (text, record) => {
          return (
            <Fragment>
              <a onClick={() => this.handleAddAi(record)}>额度算法</a>
              <Divider type="vertical" />
              {
                userIdentity ===0
                ?              <span>
                                <a onClick={() => this.handleResetPassword(record)}>{record.modeStatus==1?'禁止':'启用'}</a>
                                <Divider type="vertical" />
                              </span>:null
              }
              {
                userIdentity===1
                 ?<span>
                   <a onClick={() => this.handleEdit(record)}>编辑</a>
                   <Divider type="vertical" />
                 </span> :null
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
        {/* <div className={styles.tableAlert}>
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
        </div> */}
        <Table
          loading={loading}
          rowKey={record => record.id}
          // rowSelection={rowSelection}
          dataSource={data}
          // scroll={{ x: 1800}}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
