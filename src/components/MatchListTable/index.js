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

  handleDetail = (item) => {
    if (this.props.handleDetail) {
      this.props.handleDetail(item);
    }
  }
  handleToProductDetail = (item) => {
    if (this.props.handleToProductDetail) {
      this.props.handleToProductDetail(item);
    }
  }

  render() {
    const { selectedRowKeys } = this.state;
    const { data: { data, count },  loading } = this.props;
    const orderStatus = ['申请中', '已申请','已初审','已终审','已面签','已放款','已拒绝','已取消'];
    const expandedRowRender = (item) => {
      const columns = [
        { title: '产品名称', dataIndex: 'productName',key:'productName'},
        { title: '是否新品', dataIndex: 'isNew',render:val => val==1?'是':'否',key:'isNew'},
        { title: '是否为火', dataIndex: 'isFire',render:val => val==1?'是':'否',key:'isFire'},
        { title: '月费率', dataIndex: 'monthlyFeeRate',key:'monthlyFeeRate'},
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text, record) => (
            <span className="table-operation">
              <a onClick={() => this.handleToProductDetail(record)}>详情</a>
            </span>
          ),
        },
      ];

     var data = JSON.parse(item.modeJson).productList
      return (
        <Table
          rowKey={record => record.productId}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      );
    };
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
        title:'客户名称',
        dataIndex:'customer'
      },
      {
        title:'提单人',
        dataIndex:'userName'
      },
      {
        title:'产品数量',
        dataIndex:'productNum'
      },
      {
        title:'综合得分',
        dataIndex:'matchScore'
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
        render: (text, record) => {
          return (
            <Fragment>

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
          rowKey={record => record.id}
          // rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          expandedRowRender={expandedRowRender}
        />
      </div>
    );
  }
}

export default StandardTable;
