import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, Radio, Icon, Upload, Modal,
} from 'antd';
import ReactQuill from '../../components/QuillMore';
import UploadPicture from '../../components/UploadPicture';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UploadVideo from '../../components/UploadVideo';
import styles from './AddInformation.less';

const FormItem = Form.Item;
const { Option } = Select;
// const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ content, loading }) => ({
  content,
  submitting: loading.effects['content/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'content/fetchColumnType',
      payload: {
        type: 'chaClassify'
      }
    });
  }
  onChange = (value) =>{
    this.props.dispatch({
      type: 'content/fetchColumn',
      payload: {
        channelType: value
      }
    });
  }
  changeUiType = (v) =>{
    const { content: { columnType, column }  } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    var columnName = (column.data.filter(item => item.channelId ==v))[0];
    getFieldDecorator('contentType', {
      initialValue:columnName.uiType
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'content/add',
          payload: {
            ...values,
            // content: this.state.productIntroduction,
            contentPic: values.contentPic,
          },
        });
      }
    });
  }

  render() {
    const { content: { columnType, column }, submitting, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if (column.data) {
      var columnNameOptions = column.data.map(item => <Option key={item.channelId} value={item.channelId}>{item.channelName}</Option>);
    }
    const columnTypeOptions = columnType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 10 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <PageHeaderLayout title="新增内容" >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="栏目分类"
            >
              {getFieldDecorator('channelType', {
                rules: [{
                  required: true, message: '请选择内容名称',
                }],
              })(
                <Select placeholder="请选择" onChange={this.onChange}>
                  {columnTypeOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="栏目名称"
            >
              {getFieldDecorator('channelId', {
                rules: [{
                  required: true, message: '请选择栏目名称',
                }],
              })(
                <Select placeholder="请选择" onChange={this.changeUiType}>
                  {columnNameOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('contentTitle',{
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input type="text" maxLength="20" placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="简介"
            >
              {getFieldDecorator('contentBrief')(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="来源"
            >
              {getFieldDecorator('source')(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="来源网址"
            >
              {getFieldDecorator('sourceSite')(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否显示"
            >
              {getFieldDecorator('isDisplay',{
                rules:[{
                  required: true,
                  message: "请选择是否显示"
                }]
              })(
                <Select placeholder="请选择">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              )}
            </FormItem>
            {/* <FormItem
              {...formItemLayout}
              label="内容类型"
            >
              {getFieldDecorator('contentType', {
                rules: [{
                  required: true, message: '请输入内容类型',
                }],
              })(
                <Select placeholder="请选择">
                  <Option value="60000">图文</Option>
                  <Option value="61000">视频</Option>
                </Select>
              )}
            </FormItem> */}
            <FormItem
              {...formItemLayout}
              label="标签选择"
              style={{
                display: getFieldValue('contentType') === '0' ? 'block' : 'none',
              }}
            >
              <div>
                {getFieldDecorator('contentTag', {
                })(
                  <Select allowClear placeholder="请选择">
                    <Option value="0">荐</Option>
                    <Option value="1">热</Option>
                  </Select>
                )}
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator('contentSort')(
                <Input min={1} max={10000} type="number" placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              label="封面图片"
              {...formItemLayout}
            >
              {getFieldDecorator('contentPic', {
                rules:[{
                  required:true,
                  message:'请选择图片'
                },
               ],
              })(
                 <UploadPicture />
              )}

            </FormItem>
            {
              getFieldValue('contentType') == 1
                ?             <FormItem
                              label="视频"
                              {...formItemLayout}
                            >
                              {getFieldDecorator('content', {
                                rules:[{
                                  required:true,
                                  message:'请选择视频'
                                },
                               ],
                              })(
                                 <UploadVideo />
                              )}

                            </FormItem>:<Form.Item
                                          labelCol= {{
                                            xs: { span: 24 },
                                            sm: { span: 7 },
                                          }}
                                          wrapperCol={{
                                            xs: { span: 24, offset: 0 },
                                            sm: { span: 24, offset: 7 },
                                          }}
                                          style={{width:'60%'}}
                                           >
                                             {getFieldDecorator('content', {
                                               rules:[{
                                                 required:true,
                                                 message:'请输入内容'
                                               },
                                              ],
                                             })(
                                               <ReactQuill
                                                 placeholder='请输入...'
                                               />
                                             )}

                                        </Form.Item>
            }



            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={() => dispatch(routerRedux.push('/content/information'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
