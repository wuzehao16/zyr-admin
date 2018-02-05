import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, Radio, Icon, Upload,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AddInformation.less';

const FormItem = Form.Item;
const { Option } = Select;
// const { RangePicker } = DatePicker;
const { TextArea } = Input;

const upLoadProps = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  // defaultFileList: [...fileList],
  // className: 'uploadlist-inline',
};
@connect(({ content, loading }) => ({
  content,
  submitting: loading.effects['content/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    fileList : [],
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'content/fetchColumn',
    });
    dispatch({
      type: 'content/fetchColumnType',
      payload: {
        type: 'chaClassify'
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
        this.props.dispatch({
          type: 'content/add',
          payload: {
            values,
          },
        });
      }
    });
  }

  render() {
    const { content: { columnType, column }, submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fileList } = this.state
    const columnNameOptions = column.data.map(item => <Option key={item.channelId} value={item.channelId}>{item.channelName}</Option>);
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

    return (
      <PageHeaderLayout title="基础表单" >
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
                <Select placeholder="请选择">
                  {columnTypeOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="内容名称"
            >
              {getFieldDecorator('channelId', {
                rules: [{
                  required: true, message: '请选择内容名称',
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
              {getFieldDecorator('informationTitle',{
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
              {getFieldDecorator('sourceSitel')(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否启用"
            >
              {getFieldDecorator('isDisplay')(
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
              {getFieldDecorator('contentTag')(
                <Select placeholder="请选择">
                  <Option value="0">图文</Option>
                  <Option value="1">视频</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator('contentSort', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="排序" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="内容简介"
            >
              {getFieldDecorator('goal', {
                rules: [{
                  required: true, message: '请输入内容简介',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入内容简介" rows={4} />
              )}
            </FormItem>
            <FormItem
              label="栏目图片"
              {...formItemLayout}
            >
              <Upload {...upLoadProps} onChange={this.onFileChange}>
                {fileList.length >= 1 ? null :
                (
                  <Button>
                    <Icon type="upload" /> upload
                  </Button>
                )
                }
              </Upload>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="标签选择"
              style={{
                display: getFieldValue('contentTag') === '0' ? 'block' : 'none',
              }}
            >
              <div>
                {getFieldDecorator('type', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="0">荐</Radio>
                    <Radio value="1">热</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
