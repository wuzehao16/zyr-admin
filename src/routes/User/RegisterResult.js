import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import Result from '../../components/Result';
import styles from './RegisterResult.less';



const actions = (
  <div className={styles.actions}>
    {/* <a href=""><Button size="large" type="primary">查看邮箱</Button></a> */}
    {/* <Link to="/"><Button size="large">返回首页</Button></Link> */}
  </div>
);
class RegisterResult extends React.PureComponent {
  componentDidMount() {
    setTimeout(()=>{
      this.props.dispatch(routerRedux.push('/user/login'));
    },10000)
  }
  toLogin = ()=>{
    this.props.dispatch(routerRedux.push('/user/login'));
  }
  render() {
    const { data } = this.props;
    const title = <div className={styles.title}>你的账户：{data.contactEmail} 注册成功</div>;
    return (
      <div style={{textAlign:'center'}}>
        <Result
          className={styles.registerResult}
          type="success"
          title={title}
          description="恭喜！您已提交成功，审核结果将会在3个工作日内以短信和邮件的形式发送给您！"
          actions={actions}
          style={{ marginTop: 56 }}
        />
        <Button  type="primary" onClick={this.toLogin}>返回首页</Button>
      </div>

    );
  }
}
export default connect(({ register }) => ({
  data: register.step,
}))(RegisterResult);
