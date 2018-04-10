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
    return (
      <PageHeaderLayout
        title="额度算法"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="额度计算公式" bordered={false}>
          {getFieldDecorator('algorithmFormula', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>
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
