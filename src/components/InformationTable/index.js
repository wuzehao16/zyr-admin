import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Alert, Divider } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.less';

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

  render() {
    const { selectedRowKeys } = this.state;
    const { data: { list, pagination }, loading } = this.props;

    const columnStatus = ['国内资讯', '国际资讯', '个人消息', '平台公告'];
    const parentColumnStatus = ['金融资讯', '系统消息', '常识讲堂'];
    const onlineStatus = ['是', '否'];
    const contentLabelStatus = ['推荐', '热点', '最新', '视频'];
    const columns = [
      {
        title: '序号',
        dataIndex: 'no',
      },
      {
        title: '内容标题',
        dataIndex: 'description',
      },
      {
        title: '归属栏目',
        dataIndex: 'parentColumn',
        render(val) {
          return `${parentColumnStatus[val]}`;
        },
      },
      {
        title: '栏目名称',
        dataIndex: 'columnStatus',
        render(val) {
          // return <Badge status={statusMap[val]} text={status[val]} />;
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
        title: '固顶级别',
        dataIndex: 'topIndex',
      },
      {
        title: '是否在线',
        dataIndex: 'online',
        filters: [
          {
            text: onlineStatus[0],
            value: 0,
          },
          {
            text: onlineStatus[1],
            value: 1,
          },
        ],
        render(val) {
          return `${onlineStatus[val]}`;
        },
      },
      {
        title: '固顶截止日期',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '创建人',
        dataIndex: 'creator',
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
            <Link to={{
              pathname: '/content/information/detail',
              search: '?sort=name',
              hash: '#the-hash',
            }}
            >
            详情
            </Link>
            <Divider type="vertical" />
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

export default StandardTable;
