import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Card, Icon, Input } from 'antd';
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

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }
  handleEdit = (id) => {
    if (this.props.handleEdit) {
      this.props.handleEdit(id);
    }
  }
  onCellChange = (key, dataIndex) => {
   return (value) => {
     const dataSource = [...this.state.dataSource];
     const target = dataSource.find(item => item.key === key);
     if (target) {
       target[dataIndex] = value;
       this.setState({ dataSource });
     }
   };
 }
  render() {
    const { selectedRowKeys } = this.state;
    const { data: { data, count }, loading } = this.props;
    // const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '字典名称',
        dataIndex: 'label',
      },
      {
        title: '字典值',
        dataIndex: 'value',
      },
      {
        title: '字典类型',
        dataIndex: 'type',
      },
      {
        title: '更新人',
        dataIndex: 'updateUser',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
              <a onClick={() => this.handleEdit(record)}>编辑</a>
          );
        },
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: count,
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
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 个用户&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.key}
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
