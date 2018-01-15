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
    const { data: { list, pagination }, loading } = this.props;

    const columnStatus = ['国内资讯', '国际资讯', '个人消息', '平台公告'];
    const parentColumnStatus = ['金融资讯', '系统消息', '常识讲堂'];
    const onlineStatus = ['是', '否'];
    const contentLabelStatus = ['推荐', '热点', '最新', '视频'];
    const columns = [
      {
        title: 'ID',
        dataIndex: 'no',
      },
      {
        title: '上级栏目',
        dataIndex: 'parentColumn',
        render(val) {
          return `${parentColumnStatus[val]}`;
        },
      },
      {
        title: '栏目名称',
        dataIndex: 'columnStatus',
        render(val) {
          // return <Badge columnStatus={statusMap[val]} text={columnStatus[val]} />;
          return `${columnStatus[val]}`;
        },
      },
      {
        title: '内容标签',
        dataIndex: 'contentLabel',
        render(val) {
          return `${contentLabelStatus[val]}`;
        },
      },
      {
        title: '排列顺序',
        dataIndex: 'topIndex',
      },
      {
        title: '是否显示',
        dataIndex: 'online',
        render(val) {
          return `${onlineStatus[val]}`;
        },
      },
      {
        title: '栏目图片',
        dataIndex: 'columnImg',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <div>
            <a href="">编辑</a>
          </div>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
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
          rowKey={record => record.key}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default ColumnTable;
