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


const tableData = [
  // {
  //   key: '1',
  //   expression: 'm',
  //   name: 'John Brown',
  // },
  // {
  //   key: '2',
  //   expression: 'H',
  //   name: 'Jim Green',
  // },
  // {
  //   key: '3',
  //   expression: 'a',
  //   name: 'Joe Black',
  // },
];

class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
    console.log(this.props)
    const id = this.props.match.params.id;
    this.props.form.getFieldDecorator('modelId',{initialValue:id})
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
            type: 'match/addAi',
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
        title="额度算法"
        wrapperClassName={styles.advancedForm}
      >
        <Row gutter={16}>
          <Col span={8} style={{height:1000,overflowY:'auto'}}>
            <Card title="收入指标" bordered={false}>
              <Card.Grid style={gridStyle}>S3：近三个月税前月均收入</Card.Grid>
              <Card.Grid style={gridStyle}>S6：近六个月税前月均收入</Card.Grid>
              <Card.Grid style={gridStyle}>S12：近十二个月税前月均收入</Card.Grid>
              <Card.Grid style={gridStyle}>S24：上一年度税前月均收入</Card.Grid>
              <Card.Grid style={gridStyle}>B1：社保缴纳基数</Card.Grid>
              <Card.Grid style={gridStyle}>B2：调整前社保基数</Card.Grid>
              <Card.Grid style={gridStyle}>J1：公积金缴纳基数</Card.Grid>
              <Card.Grid style={gridStyle}>J2：调整前公积金缴纳基数</Card.Grid>
            </Card>
            <Card title="财产指标">
              <Card.Grid style={gridStyle}>FM：房产总面积</Card.Grid>
              <Card.Grid style={gridStyle}>FS：房产总市值</Card.Grid>
              <Card.Grid style={gridStyle}>FY：房产抵押贷款余额</Card.Grid>
              <Card.Grid style={gridStyle}>FH：房产抵押每月还款金额</Card.Grid>
              <Card.Grid style={gridStyle}>BJ：保单年缴费金额</Card.Grid>
              <Card.Grid style={gridStyle}>CC：车辆残值评估价</Card.Grid>
              <Card.Grid style={gridStyle}>CH：车贷月还款金额</Card.Grid>
              <Card.Grid style={gridStyle}>CY：车辆贷款余额</Card.Grid>
            </Card>
            <Card title="负债指标" bordered={false}>
              <Card.Grid style={gridStyle}>XS：信用卡当月已使用额度</Card.Grid>
              <Card.Grid style={gridStyle}>XE：信用卡总额度</Card.Grid>
              <Card.Grid style={gridStyle}>DH：等额本息月还款总额（信用类）</Card.Grid>
              <Card.Grid style={gridStyle}>DY：等额本息类贷款总余额（信用类）</Card.Grid>
              <Card.Grid style={gridStyle}>XH：先息后本每月还款利息（信用类）</Card.Grid>
              <Card.Grid style={gridStyle}>XY：先息后本类贷款总余额（信用类）</Card.Grid>
              <Card.Grid style={gridStyle}>SH：随借随还每月还款利息（信用类）</Card.Grid>
              <Card.Grid style={gridStyle}>SY：随借随还类贷款总余额（信用类）</Card.Grid>
            </Card>
          </Col>
          <Col span={16}>
            <Card>
              <ul style={{listStyleType:'none'}}>
                <div>提示：</div>
                <li>1、计算时请用代号表示所求值，比如所求值为认定收入，用R表示认定收入，则在输入框输入"R=认定收入"，并在该代号右侧输入计算公式；</li>
                <li>2、若所求值R必须大于10000才能选择该产品，请新增一个代号，并在该代号对应的等号右侧输入“R > 10000”；</li>
                <li>3、公式请按先后顺序增加，最后一步为最终预估额度；</li>
                <li>4、代号为大小写字母、数字，代号首位必须为英文字母；</li>
                <li>5、同一匹配模型内所填代号建议控制在5位以内，不可重复，也不可与左侧指标代号相同；</li>
                <li><span>6、运算符合可填 " + "," - "," * "," / "," && "," || "," 	&gt; "," &lt; "," 	&gt;= "," 	&lt;= "," Min() "," Max()"," sum() "," ( "," ) ";</span></li>
                <li>7、不需要填写计算公式时，请输入代号并在右边直接填写具体额度，单位为元。</li>
              </ul>
            </Card>
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

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(AdvancedForm));
