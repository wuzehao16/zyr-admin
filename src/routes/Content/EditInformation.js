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
  submitting: loading.effects['content/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    productIntroduction: '',
  }

  componentDidMount() {
    const { content: { item }, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    const id = this.props.match.params.id;
    dispatch({
      type: 'content/fetchDetail',
      payload: {
        contentId: id,
      },
    });
    dispatch({
      type: 'content/fetchColumnType',
      payload: {
        type: 'chaClassify'
      }
    });
    // if (item.contentPic) {
    //   this.setState({
    //     fileList:[{
    //       uid:-1,
    //       name:"xxx.png",
    //       url: item.contentPic
    //     }]
    //   })
    // }
  }
  onChange = (value) =>{
    this.props.dispatch({
      type: 'content/fetchColumn',
      payload: {
        channelType: value
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'content/update',
          payload: {
            ...values,
            // content: this.state.productIntroduction,
            contentPic: values.contentPic,
            contentId:this.props.content.item.contentId
          },
        });
      }
    });
  }

  render() {
    const { content: { columnType, column, item }, submitting, dispatch } = this.props;
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
        sm: { span: 10, offset: 7 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <PageHeaderLayout title="编辑内容" >
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
                initialValue: item.channelType,
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
                initialValue: item.channelId,
                rules: [{
                  required: true, message: '请选择栏目名称',
                }],
              })(
                <Select placeholder="请选择">
                  {columnNameOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('contentTitle',{
                initialValue: item.contentTitle,
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="简介"
            >
              {getFieldDecorator('contentBrief',{
                initialValue: item.contentBrief,
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="来源"
            >
              {getFieldDecorator('source',{
                initialValue: item.source,
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="来源网址"
            >
              {getFieldDecorator('sourceSite',{
                initialValue: item.sourceSite,
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否显示"
            >
              {getFieldDecorator('isDisplay',{
                initialValue: item.isDisplay,
              })(
                <Select placeholder="请选择">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="内容类型"
            >
              {getFieldDecorator('contentType', {
                initialValue: item.contentType,
                rules: [{
                  required: true, message: '请输入内容类型',
                }],
              })(
                <Select placeholder="请选择">
                  <Option value="60000">图文</Option>
                  <Option value="61000">视频</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="标签选择"
              style={{
                display: getFieldValue('contentType') === '60000' ? 'block' : 'none',
              }}
            >
              <div>
                {getFieldDecorator('contentTag', {
                  initialValue: item.contentTag,
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
              {getFieldDecorator('contentSort',{
                initialValue: item.contentSort,
              })(
                <Input min={1} max={10000} type="number" placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              label="封面图片"
              {...formItemLayout}
            >
              {getFieldDecorator('contentPic', {
                initialValue: item.contentPic,
                valuePropName: "fileList",
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
              getFieldValue('contentType') == 61000
                ?             <FormItem
                              label="视频"
                              {...formItemLayout}
                            >
                              {getFieldDecorator('content', {
                                initialValue: item.content,
                                valuePropName: "fileList",
                                rules:[{
                                  required:true,
                                  message:'请选择视频'
                                },
                               ],
                              })(
                                 <UploadVideo />
                              )}

                            </FormItem>: null
            }
            {
              getFieldValue('contentType') == 60000
                ?        <Form.Item
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
                               initialValue: item.content,
                               valuePropName: "defaultValue",
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
                        </Form.Item>: null
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
