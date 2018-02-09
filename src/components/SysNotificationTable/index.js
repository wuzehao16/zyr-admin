import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error'];
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

  handleEdit = (item) => {
    if (this.props.handleEdit) {
      this.props.handleEdit(item);
    }
  }
  handleUpdateStatus = (item) => {
    if (this.props.handleUpdateStatus) {
      this.props.handleUpdateStatus(item);
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { selectedRowKeys } = this.state;
    const { data: { data, count }, loading } = this.props;

    const status = ['关闭', '运行中', '已上线', '异常'];
    const upStatus = ['','上架','下架']
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
        title: '标题',
        dataIndex: 'paltforMsgTitle',
      },
      {
        title: '内容',
        width:'10%',
        dataIndex: 'paltforMsgContent',
        render: (text) => <span className={styles.txt}>{text}</span>,
      },
      {
        title: '通知类型',
        dataIndex: 'paltforMsgTypeName',
      },
      {
        title: '上下架',
        dataIndex: 'unlockStatus',
        render: val => <span>{upStatus[val]}</span>
      },
      {
        title: '操作者',
        dataIndex: 'oper',
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
              <span>
                <a onClick={() => this.handleUpdateStatus(record)}>{record.unlockStatus==1?'下架':'上架'}</a>
                <Divider type="vertical" />
              </span>
              <a onClick={() => this.handleEdit(record)}>编辑</a>
            </Fragment>
          );
        },
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...count,
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
          rowKey={record => record.paltforMsgId}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.paltforMsgContent}</p>}
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
