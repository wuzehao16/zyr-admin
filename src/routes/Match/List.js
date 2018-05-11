import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, AutoComplete } from 'antd';
import StandardTable from '../../components/MatchTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './List.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const InputGroup = Input.Group;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible, item } = props;
  const { getFieldDecorator,getFieldValue } = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.id = item.id;
      fieldsValue.modelStatus = item.modelStatus==1 ? 0: 1;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title={item.modelStatus==1?"禁用匹配模型":"启用匹配模型"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        style={{ textAlign: 'center',fontSize:'24px' }}
      >
        确认{item.modelStatus==1?"禁用":"启用"}{item.matchName}?
      </FormItem>
    </Modal>
  );
});

@connect(({ user, match, loading }) => ({
  user,
  match,
  loading: loading.models.match,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    item: {},
    selectValues: 'keyword'
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'match/fetch',
    });
    dispatch({
      type: 'match/fetchAdsType',
      payload: {
        type: 'matchType'
      }
    });
  }
  handleResetPassword = (v) => {
    this.setState({
      item: {
        modeName: v.modeName,
        id: v.id,
        modelStatus: v.modeStatus
      },
    });
    this.handleModalVisible(true);
  }
  handleEdit = (item) => {
    this.props.dispatch(routerRedux.push({
        pathname: '/match/edit',
        query:{id: item.id }
      })
    );
    // this.props.dispatch({
    //   type: 'match/fetchEdit',
    //   payload: {
    //     id: item.matchId,
    //   },
    // });
  }
  handleAddAi = (item) => {
    if (item.algorithmId) {
      this.props.dispatch(routerRedux.push(`/match/editai/${item.algorithmId}?${item.modeName}`));
    } else{
      this.props.dispatch(routerRedux.push(`/match/addai/${item.id}?${item.modeName}`));
    }
  }
  handleDetail = (item) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/match/detail',
      query:{id: item.id }
    })
  );
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'match/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'match/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'match/remove',
          payload: {
            matchId: selectedRows.map(row => row.matchId).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        date: [],
        startTime: fieldsValue.date && moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
        endTime: fieldsValue.date && moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
      };

      console.log('values',values)

      this.setState({
        formValues: values,
      });

      console.log('this,state,formValues',this.state);
      dispatch({
        type: 'match/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'match/updateStatus',
      payload: fields,
    });
    this.setState({
      modalVisible: false,
    });
  }

  handleSelectChanges = (val) => {
    console.log('this.state.selectValues1',this.state.selectValues)
    if(val==='模型名称'){
      val='modelName'
    }else if(val==='机构名称'){
      val='manageName'
    }else{
      val='keyword'
    }
    this.setState({
      selectValues: val,
    })
    console.log('this.state.selectValues2',this.state.selectValues)
  }

  renderForm() {
    const { getFieldDecorator,getFieldValue } = this.props.form;
    const { match: { matchType }} = this.props;
    const { match: { data, city }, loading, dispatch,user } = this.props;
    const userIdentity = user.currentUser?user.currentUser.data.userIdentity:0;
    if (matchType) {
      var matchTypeOptions = matchType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        {
          userIdentity ===1?
          // <InputGroup compact style={{marginBottom:20}} >
          <Row>
            <Col span={3}>
              <Select placeholder="模型名称"  disabled style={{width:'100%'}}>
                <Option value="modelName">模型名称</Option>
              </Select>
            </Col>
            <Col span={18}>
              <FormItem>
                {getFieldDecorator('modelName')(
                <AutoComplete
                  style={{width:'100%'}}
                  placeholder="请输入模型名称"
                />
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <Button type="primary" icon="search" style={{width:'50%',height:'32px',borderRadius:'0',fontSize:'20px',fontWeight:700,textAlign:'center'}} htmlType="submit"></Button>
              <button onClick={() => dispatch(routerRedux.push('/match/add'))} style={{verticalAlign:'top',background:'rgb(238,86,72)',width:'50%',border:'none',borderLeft:'1px solid #fff'}} >
                <span style={{fontSize:14,lineHeight:'30px',color:'#fff'}}>新增</span>
              </button>
            </Col>
          </Row>:
          // </InputGroup>:
          // <InputGroup compact style={{marginBottom:20}}>
          <Row>
            <Col span={3}>
              <Select placeholder="不限" style={{width:'100%'}} onChange={this.handleSelectChanges}>
                <Option value="不限">不限</Option>
                <Option value="模型名称">模型名称</Option>
                <Option value="机构名称">机构名称</Option>
              </Select>
            </Col>
            <Col span={19}>
              <FormItem>
                {getFieldDecorator(this.state.selectValues)(
                  <AutoComplete
                    style={{width:'100%'}}
                    placeholder="请输入模型名称或机构名称"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={2}>
              <Button type="primary" icon="search" style={{width:'90%',height:'32px',borderRadius:'0',fontSize:'20px',fontWeight:700,textAlign:'center'}} htmlType="submit"></Button>
            </Col>
          </Row>
                 // </InputGroup>
        }
        <Row gutter={{md: 8, lg: 16, xl:48}} className='noborderrow'>
          <Col md={3} sm={24}>
            {getFieldDecorator('modeStatus')(
              <Select placeholder="启用状态">
                <Option value={1}>启用</Option>
                <Option value={0}>禁用</Option>
              </Select>
            )}
          </Col>
          <Col md={8} offset={4} sm={24}>
            <FormItem label="更新时间">
                {getFieldDecorator('date')(
                  <RangePicker style={{ width: '100%' }} placeholder={['开始时间', '结束时间']} />
                )}
            </FormItem>
          </Col>
          <Col md={9} sm={24} style={{textAlign:'right'}}>
            <Button onClick={this.handleFormReset} style={{border:'none'}}>清空筛选条件</Button>
          </Col>
        </Row>
          <style jsx>{`
          .ant-select-selection__placeholder {
            color:#000;
          }
          .noborderrow .ant-select-selection{
            border:none;
          }
        `}
        </style>
      </Form>
    );
  }

  render() {
    const { match: { data, city }, loading, dispatch,user } = this.props;
    const userIdentity = user.currentUser?user.currentUser.data.userIdentity:0;

    const { selectedRows, modalVisible, addInputValue, item } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
          <div className={styles.tableListForm}>
                {this.renderForm()}
            </div>
              {
                selectedRows.length > 0 && (
                  <span>
                    {/* <Button>批量操作</Button> */}
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              userIdentity={userIdentity}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              handleResetPassword={this.handleResetPassword}
              handleEdit={this.handleEdit}
              handleAddAi={this.handleAddAi}
              handleDetail={this.handleDetail}
              handleReview={this.handleReview}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          item={item}
        />
        <style jsx>{`
          .ant-table-thead {
            font-size:15px;
            font-weight:700;
          }
        `}
        </style>
      </PageHeaderLayout>
    );
  }
}
