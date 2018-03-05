import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Alert } from 'antd';
import styles from './index.less';

class ColumnTable extends PureComponent {
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

  handleEdit = (item) => {
    if (this.props.handleEdit) {
      this.props.handleEdit(item);
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

  render() {
    const { selectedRowKeys } = this.state;
    const { data: { data, count }, loading } = this.props;

    const columnStatus = ['国内资讯', '国际资讯', '个人消息', '平台公告'];
    const parentColumnStatus = ['金融资讯', '系统消息', '常识讲堂'];
    const onlineStatus = ['否', '是'];
    const contentLabelStatus = ['推荐', '热点', '最新', '视频'];
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
        title: 'ID',
        dataIndex: 'channelId',
      },
      {
        title: '栏目分类',
        dataIndex: 'channelTypeName',
      },
      {
        title: '栏目名称',
        dataIndex: 'channelName',
      },
      {
        title: '排序',
        dataIndex: 'adsSort',
      },
      {
        title: '是否显示',
        dataIndex: 'channelDisplay',
        render(val) {
          return `${onlineStatus[val]}`;
        },
      },
      {
        title: '操作者',
        dataIndex: 'oper',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <a onClick={() => this.handleEdit(record)}>编辑</a>
          </div>
        ),
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
      <div className={styles.ColumnTable}>
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
          rowKey={record => record.channelId}
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

export default ColumnTable;
