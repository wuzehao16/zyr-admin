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
@connect(state => ({
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    fileList : [],
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
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { fileList } = this.state
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
              label="选择栏目"
            >
              {getFieldDecorator('column')(
                <Select defaultValue="lucy">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="内容标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="给内容起个名字" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="内容标签"
            >
              {getFieldDecorator('informationTitle')(
                <Select defaultValue="lucy" >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否启用"
            >
              {getFieldDecorator('enable')(
                <Select defaultValue="lucy">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="固顶级别"
            >
              {getFieldDecorator('topLevel', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="请输入固顶级别" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="起止日期"
            >
              {getFieldDecorator('date', {
                rules: [{
                  required: true, message: '请选择起止日期',
                }],
              })(
                <DatePicker style={{ width: '100%' }} />
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
              label="附件类型"
            >
              <div>
                {getFieldDecorator('type', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">普通</Radio>
                    <Radio value="2">视屏</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem
              label="代表图片"
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
              label="查看权限"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">所有客户</Radio>
                    <Radio value="2">仅限会员</Radio>
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
