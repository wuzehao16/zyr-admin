import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';

const statusMap = ['error', 'success'];
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

  handleEdit = (id) => {
    if (this.props.handleEdit) {
      this.props.handleEdit(id);
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
    var data1 = [];
    if(data) {
      data1 = [data];
    }
    const status = ['目录', '菜单', '按钮'];

    const columns = [
      // {
      //   title: '序号',
      //   dataIndex: 'meunId',
      // },
      {
        title: '菜单名',
        dataIndex: 'name',
      },
      {
        title: 'icon',
        dataIndex: 'icon',
      },
      {
        title: '排序号',
        dataIndex: 'orderNum',
      },
      {
        title: '授权标识',
        dataIndex: 'authority',
      },
      // {
      //   title: '创建人',
      //   dataIndex: 'createUser',
      // },
      {
        title: '类型',
        dataIndex: 'type',
        render(val) {
          return status[val];
        },
      },
      // {
      //   title: '创建时间',
      //   dataIndex: 'createTime',
      //   
      //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      // },
      // {
      //   title: '登录时间',
      //   dataIndex: 'updatedAt',
      //   
      //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      // },
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
      count,
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
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 条记录&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.meunId}
          rowSelection={rowSelection}
          dataSource={data1}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
