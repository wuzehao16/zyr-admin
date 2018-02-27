import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col, Upload, Modal,
} from 'antd';
import moment from 'moment'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
  },
};

@connect(({ ads, loading }) => ({
  ads,
  submitting: loading.effects['ads/update'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  componentDidMount() {
    const { setFieldsValue, getFieldDecorator } = this.props.form;
    if (this.props.ads.item) {
      const { item } = this.props.ads;
      getFieldDecorator('adsPic');
      getFieldDecorator('adsId', {
        initialValue: item.adsId,
      })
      if (item.adsPic) {
        this.setState({
          fileList:[{
            uid:-1,
            url: item.adsPic
          }]
        })
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue.adsPic)
        const values = {
          ...fieldsValue,
          autoUpTime: fieldsValue.time && moment(fieldsValue.time[0]).local(),
          autoDownTime: fieldsValue.time && moment(fieldsValue.time[1]).local(),
          adsPic: fieldsValue.adsPic && fieldsValue.adsPic.file
                                          ? fieldsValue.adsPic.file.response.data.match(/ima[^\n]*Ex/)[0].slice(0,-3)
                                          : fieldsValue.adsPic && fieldsValue.adsPic.match(/ima[^\n]*Ex/)[0].slice(0,-3)
        };
        this.props.dispatch({
          type: 'ads/update',
          payload: values,
        });
      }
    });
  }
  renderForm() {
    switch (this.props.form.getFieldValue('adsType')) {
      case '11100':
        return this.renderProduct();
        break;
      case '11200':
        return this.renderBanner();
        break;
      case '11300':
        return this.renderTrumpet();
        break;
      case '11400':
        return this.renderBanner();
        break;
      default:
    }
  }
  renderProduct = ()=> {
    const { ads: { item } } = this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <FormItem
          {...formItemLayout}
          label="匹配词"
        >
          {getFieldDecorator('adsMatch', {
            initialValue: item.adsMatch,
            rules: [{
              required: true,
              message: '请选择匹配词',
            }],
          })(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
      </div>
    );
  }
  renderBanner = ()=> {
    const { ads: { item } } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { fileList, previewVisible,previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return(
      <div>
        <FormItem
          {...formItemLayout}
          label="内容"
        >
          {getFieldDecorator('adsContent', {
            initialValue: item.adsContent,
          })(
            <Input.TextArea rows={4} maxLength="50" placeholder="请输入"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="跳转链接"
        >
          {getFieldDecorator('adsUrl', {
            initialValue: item.adsUrl,
          })(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
           label="图片">
           {getFieldDecorator('adsPic',{
             initialValue: item.adsPic,
               rules:[{
                 required:true,
                 message:'请选择图片'
               }]
           })(
             <Upload
               action="http://47.104.27.184:8000/sysAnno/uploadImage"
               listType="picture-card"
               onPreview={this.handlePreview}
               onChange={this.handleChange}
               fileList={fileList}
             >
               {fileList.length >= 1 ? null : uploadButton}
             </Upload>
           )}

           <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
             <img alt="example" style={{ width: '100%' }} src={previewImage} />
           </Modal>
        </FormItem>
      </div>
    );
  }
  renderTrumpet = ()=> {
    const { ads: { item } } = this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <FormItem
          {...formItemLayout}
          label="内容"
        >
          {getFieldDecorator('adsContent', {
            initialValue: item.adsContent,
            rules: [{
              required: true,
              message: '请选择内容',
            }],
          })(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="跳转链接"
        >
          {getFieldDecorator('adsUrl', {
            initialValue: item.adsUrl,
            rules: [{
              required: true,
              message: '请输入跳转链接',
            }],
          })(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
      </div>
    );
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }
  render() {
    const { ads: { data, adsType, item }, submitting, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if (adsType) {
      var adsTypeOptions = adsType.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>);
    }
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="编辑广告">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="广告类型"
            >
              {getFieldDecorator('adsType', {
                initialValue: item.adsType,
                rules: [{
                  required: true,
                  message: '请选择广告类型',
                }],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {adsTypeOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('adsTitle', {
                initialValue: item.adsTitle,
                rules: [{
                  required: true,
                  message: '请选择标题',
                }],
              })(
                <Input type="text" maxLength='20' placeholder="请输入"/>
              )}
            </FormItem>
            {this.renderForm()}
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator('adsSort',{
                initialValue: item.adsSort,
              })(
                <Input min={1} max={10000} type="number" placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上架状态"
            >
                {getFieldDecorator('upState', {
                  initialValue: item.upState,
                })(
                  <Radio.Group>
                    <Radio value={0}>待上架</Radio>
                    <Radio value={1}>上架</Radio>
                    <Radio value={2}>下架</Radio>
                  </Radio.Group>
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="自动上架时间"
              style={{
                display: getFieldValue('upState') === 0 ? 'block' : 'none',
              }}
              >
              {getFieldDecorator('time',{
                initialValue: [moment(item.autoUpTime), moment(item.autoDownTime)],
              })(
                <RangePicker
                 showTime={{
                   hideDisabledOptions: true,
                   defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                 }}
                 format="YYYY-MM-DD HH:mm:ss"
               />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={() => dispatch(routerRedux.push('/ads'))}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
