import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  message,
  Input,
  Select,
  Popover,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '../../components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from './TableForm';
import styles from './style.less';

const { Option } = Select;



class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
    const id = this.props.match.params.id;
    this.props.form.getFieldDecorator('id',{initialValue:id})
    this.props.dispatch({
      type:'match/fetchAI',
      payload:{ id:id}
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  };
  render() {
    var tableData = []
    if (this.props.AI.algorithmFormula) {
       tableData = JSON.parse(this.props.AI.algorithmFormula)
    }
    const modelName = this.props.location.search.slice(1)
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          //格式化数据
          if (values.algorithmFormula.length >=1) {
             var a ={}
            values.algorithmFormula.map(item=>{
            	console.log(item['name'])
            	a[item['name']] = item['expression']
            })
            values.algorithmStepsJson = {}
            Object.assign(values.algorithmStepsJson,a)
            values.algorithmFormula = JSON.stringify(values.algorithmFormula)
            values.algorithmStepsJson = JSON.stringify(values.algorithmStepsJson)
            console.log(values)
          } else{
            message.error('请填写计公式');
            return
          }
          // submit the values
          dispatch({
            type: 'match/editAi',
            payload: values,
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    const gridStyle = {
      width: '100%',
      textAlign: 'center',
      height:50
    };
    return (
      <PageHeaderLayout
        title={modelName}
        wrapperClassName={styles.advancedForm}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Card  bordered={false}>
              <div>收入指标</div>
              <li>S3：近三个月税前月均收入</li>
              <li>S6：近六个月税前月均收入</li>
              <li>S12：近十二个月税前月均收入</li>
              <li>S24：上一年度税前月均收入</li>
              <li>B1：社保缴纳基数</li>
              <li>B2：调整前社保基数</li>
              <li>J1：公积金缴纳基数</li>
              <li>J2：调整前公积金缴纳基数</li>
            </Card>
            <Card >
              <div>财产指标</div>
              <li>FM：房产总面积</li>
              <li>FS：房产总市值</li>
              <li>FY：房产抵押贷款余额</li>
              <li>FH：房产抵押每月还款金额</li>
              <li>BJ：保单年缴费金额</li>
              <li>CC：车辆残值评估价</li>
              <li>CH：车贷月还款金额</li>
              <li>CY：车辆贷款余额</li>
            </Card>
            <Card  bordered={false}>
              <div>负债指标</div>
              <li>XS：信用卡当月已使用额度</li>
              <li>XE：信用卡总额度</li>
              <li>DH：等额本息月还款总额（信用类）</li>
              <li>DY：等额本息类贷款总余额（信用类）</li>
              <li>XH：先息后本每月还款利息（信用类）</li>
              <li>XY：先息后本类贷款总余额（信用类）</li>
              <li>SH：随借随还每月还款利息（信用类）</li>
              <li>SY：随借随还类贷款总余额（信用类）</li>
            </Card>
          </Col>
          <Col span={16}>
            <Card title="额度计算公式" bordered={false}>
              {getFieldDecorator('algorithmFormula', {
                initialValue: tableData,
              })(<TableForm />)}
            </Card>
          </Col>
        </Row>

        <FooterToolbar style={{ width: this.state.width }}>
          {/* {getErrorInfo()} */}
          <Button type="primary" style={{margin:'0 auto'}} onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ global, loading, match }) => ({
  collapsed: global.collapsed,
  AI: match.AI,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(AdvancedForm));