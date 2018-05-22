import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form, Button, Card, Divider, Steps, Devider
} from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './detail.less'

const { Description } = DescriptionList;
const Step = Steps.Step;

const loanType = ['信用贷款', '抵押贷款'];

const city = ['深圳', '广州', '东莞', '珠海', '惠州', '中山'];

const age = ['18岁以下', '18-24', '25-55', '55岁以上'];

const maritalStatus = ['已婚', '未婚', '离异', '丧偶'];

const location = ['深户', '非深户', '港澳台', '外籍'];

const education = ['本科及以上', '全日制大专', ' 高中以下', '自考/函授'];

const occupation = ['工薪族', '企业主', '工薪/企业主', '自由职业'];

const unitProperty = ['公立教师/医生', '公务员', '事业单位', '高新企业', '主板上市公司', '普通公司', '上市公司', '世界500强'];

const salaryDistribution = ['扣税代发', '固定转账', '现金发放'];

const workTime = ['3个月以下', '3-6个月', '6-12个月', '12-24个月', '24个月以上'];

const monthAvgSalary = ['4千以下', '4-5千', '5-6千', '6-8千', '8千-1万', '1万以上'];

const isInsurance = ['无', '有'];

const insuranceBase = ['4千以下', '4-5千', '5-6千', '6-8千', '8千以上'];

const insurancePaymonth = ['3个月以下', '3-6个月', '6-12个月', '12-24个月', '24个月以上'];

const isProvidentFund = ['无', '有'];

const providentFundBase = ['4千以下', '4-5千', '5-6千', '6-8千', '8千以上'];

const providentFundPaymonth = ['3个月以下', '3-6个月', '6-12个月', '12-24个月', '24个月以上'];

const licenseRegistTime = ['暂未注册', '3个月以下', '3-6个月', '6-12个月', '12-24个月', '24个月以上'];

const invoiceValue = ['2万以下', '2-10万', '10-100万', '100万以上'];

const shareRatio = ['0%', '0%-10%', '10%-20%', '20%以上'];

const recordTime = ['无', '1-3个月', '3-6个月', '6-12个月', '12个月以上'];

const sumPettyLoan = ['无', '1笔', '2笔', '3笔', '3笔以上'];

const sumConsumerFinanceLoan = ['无', '1笔', '2笔', '3笔', '3笔以上'];

const particleLoanLimit = ['3千以下', '3-5千', '5千-1万', '1万以上'];

const isLoanClose = ['无', '有'];

const isLoanLoss = ['无', '有'];

const isOverdue = ['无', '有'];

const overdueCategory = ['信用卡逾期', '贷款逾期', '信用卡/贷款逾期'];

const overdueDays = ['3天以下', '3-7天', '8-15天', '15天以上'];

const creditCardOverdueMoney = ['5百以下', '5百-1千', '1千-2千', '2千以上'];

const loanOverdueMoney = ['5百以下', '5百-1千', '1千-2千', '2千以上'];

const isTwoMonthsOverdue = ['无', '有'];

const isThreeMonthsOverdue = ['无', '有'];

const isSixMonthsOverdue = ['无', '有'];

const isOneYearOverdue = ['无', '有'];

const isTwoYearsOverdue = ['无', '有'];

const isFiveYearsOverdue = ['无', '有'];

const isInsuranceAdjustment = ['无', '半年内有', '一年内有'];

const isProvidentFundAdjustment = ['无', '半年内有', '一年内有'];

const isHouseProperty = ['无', '有'];

const housePropertyDependency = ['深房', '省内房产', '省外房产'];

const ownership = ['本人', '配偶', '子女', '父母', '联名房'];

const propertyType = ['住宅', '公寓', '商铺', '写字楼', '自建房', '厂房', '别墅'];

const propertyStatus = ['红本在手', '银行按揭', '银行抵押'];

const repaymentMethod = ['等额本息', '先息后本', '随借随还'];

const businessPolicy = ['无', '有'];
const isFamilyCar = ['无', '有'];

const policyBrand = ['中国平安', '中国人寿', '新华保险', '泰康人寿', '太平保险', '民生保险', '天安保险', '华夏人寿', '中邮人寿', '友邦保险', '安邦人寿', '招商信诺', '工银安盛', '安联保险', '中英保险', '阳光保险', '太平洋保险', '中国人民人寿', '高德生命人寿', '其他'];

const policyBrandPaymentMethod = ['年缴', '季缴', '月缴', '趸缴'];

const policyPaymentYears = ['1年以下', '1-2年', '2-3年', '3年以上'];

const carRegistStatus = ['绿本在手', '银行按揭', '信用卡按揭', '车贷机构抵押', '汽车金融按揭'];

@connect(({ matchlist }) => ({
  data: matchlist,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount () {
    const id = this.props.match.params.id;
    this.props.dispatch({
      type: 'matchlist/fetchDetail',
      payload: {
        matchNo: id,
      },
    });
  }
  // render() {
  //   const { submitting, data: { item }, dispatch } = this.props
  //   return (
  //     <PageHeaderLayout style={{ marginBottom: 32}} style={{fontWeight:'normal'}}>
  //       <Card bordered={false} style={{padding:'0 146px 0 135px'}}>
  //         <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32,position:'relative'}} col={2}>
  //           <Description term="订单号">{item.orderNo}</Description>
  //           <Description term="更新时间">{moment(item.updateTime).format('llll')}</Description>
  //           <Description term="城市">{item.city}</Description>
  //           <Description term="机构名称">{item.manageName}</Description>
  //           <Description term="产品名称">{item.productName}</Description>
  //           <Description term="推荐语">{item.productRecommend}</Description>
  //           <Description term="提单人">{item.userName}</Description>
  //           <Description term="提单人手机">{item.userPhone}</Description>
  //           <Description term="产品分润比例">{item.productRatio + '%'}</Description>
  //           <div className='banklogo' style={{position:'absolute',top:'0',right:'0',width:'260px',height:'140px'}}>
  //             <img src={item.manageLogoId} />
  //           </div>
  //         </DescriptionList>
  //         <Divider style={{ marginBottom: 32 }} />
  //         <DescriptionList size="large" title="贷款人信息" style={{ marginBottom: 32}} col={2}>
  //           <Description term="姓名">{item.loanName}</Description>
  //           <Description term="年龄">{item.loanAge}</Description>
  //           <Description term="民族">{item.nationality}</Description>
  //           <Description term="身份证">{item.idNumber}</Description>
  //           <Description term="签发机关">{item.issuingOrgan}</Description>
  //           <Description term="有效期至">{moment(item.effectiveDate).format('l')}</Description>
  //           <Description term="住址">{item.address}</Description>
  //         </DescriptionList>
  //         <Divider style={{ marginBottom: 32 }} />
  //         <DescriptionList size="large" title="申请贷款信息" style={{ marginBottom: 32}} col={2}>
  //           <Description term="贷款金额">{item.loanMoney + '万'}</Description>
  //           <Description term="贷款期限">{item.loanLimit + '期'}</Description>
  //           <Description term="还款方式">{item.payTypeName}</Description>
  //           <Description term="申请备注">{item.applicationNotes}</Description>
  //         </DescriptionList>
  //           <Divider style={{ marginBottom: 32 }} />
  //         <DescriptionList size="large" style={{ marginBottom: 32, textAlign: 'center' }} col={1}>
  //           <Button style={{ marginRight: 50 }} onClick={() => dispatch(routerRedux.push('/matchlist'))}>
  //           返回
  //           </Button>
  //         </DescriptionList>
  //       </Card>
  //         <style jsx>{`
  //           .banklogo img{
  //             max-width: 100%;
  //              max-height: 100%;
  //             border:1px solid #c8c8c8;
  //           }
  //           @media screen and (max-width:1400px) {
  //             .banklogo {
  //               display:none;
  //             }
  //           }
  //         `}
  //         </style>
  //     </PageHeaderLayout>
  //   );
  // }
  render() {
  const { submitting, data: { item }, dispatch } = this.props
  const i = item.objectUserJson;
  //贷款需求
  const loanDemand = i.loanDemand || {};
  //基本信息
  const basicInformation = i.basicInformation|| {};
  //征信信息
  const creditInformation = i.creditInformation|| {};
  // 工作收入
  const income = i.income|| {};
  // 资产状况
  const assets = i.assets|| {};
  //资产负债
  const capitalDebtSituation = i.capitalDebtSituation|| {};
  // const house = assets.housePropertyDependency.length;
  var h  = assets.housePropertyDependency || []
  const House = h.map((k,index) => {
    return (
      <div key={index}>
        <div className={styles.SubTitle}>房产{index+1}:</div>
        <div className={styles.Li}><div className={styles.L}>名下房产属地：</div><div className={styles.R}>{housePropertyDependency[assets.housePropertyDependency[index]]}</div></div>
        <div className={styles.Li}><div className={styles.L}>产权归属：</div><div className={styles.R}>{ownership[assets.ownership[index]]}</div></div>
        <div className={styles.Li}><div className={styles.L}>产权占比（%）：</div><div className={styles.R}>{assets.propertyRightRatio[index]}</div></div>
        <div className={styles.Li}><div className={styles.L}>房产类型：</div><div className={styles.R}>{propertyType[assets.propertyType[index]]}</div></div>
        <div className={styles.Li}><div className={styles.L}>房产状态：</div><div className={styles.R}>{propertyStatus[assets.propertyStatus[index]]}</div></div>
        {
          assets.propertyStatus[index] !=0
          ? <div>
            <div className={styles.Li}><div className={styles.L}>还款方式：</div><div className={styles.R}>{assets.repaymentMethod?repaymentMethod[assets.repaymentMethod[index]]:''}</div></div>
            <div className={styles.Li}><div className={styles.L}>本笔抵押贷款余额（元）：</div><div className={styles.R}>{assets.mortgageBalance?assets.mortgageBalance[index]:''}</div></div>
            <div className={styles.Li}><div className={styles.L}>每月还款金额（元）</div><div className={styles.R}>{assets.mortgageMonthRepayment?assets.mortgageMonthRepayment[index]:''}</div></div>
            <div className={styles.Li}><div className={styles.L}>本笔抵押贷款期限（月）：</div><div className={styles.R}>{assets.mortgageMonthRepayment?assets.mortgageMonthRepayment[index]:''}</div></div>
            <div className={styles.Li}><div className={styles.L}>已还月份数（月）：</div><div className={styles.R}>{assets.returnedMonths?assets.returnedMonths[index]:''}</div></div>
            </div>:null
        }

        <div className={styles.Li}><div className={styles.L}>本房产总面积（平）：</div><div className={styles.R}>{assets.propertyTotalArea[index]}</div></div>
        <div className={styles.Li}><div className={styles.L}>本房产总市值（万元）：</div><div className={styles.R}>{assets.propertyTotalMarketValue[index]}</div></div>
      </div>
    )
  })
  var c = assets.carRegistStatus || []
  const Car = c.map((k,index) => {
    return (
      <div key={index}>
        <div className={styles.SubTitle}>辆车{index+1}:</div>
        <div className={styles.Li}><div className={styles.L}>车辆登记状态：</div><div className={styles.R}>{carRegistStatus[assets.carRegistStatus[index]]}</div></div>
        <div className={styles.Li}><div className={styles.L}>车辆残值评估价格（元）：</div><div className={styles.R}>{assets.carPotentialPrice?assets.carPotentialPrice[index]:''}</div></div>
        {
          assets.carRegistStatus[index] != 0
          ? <div>
            <div className={styles.Li}><div className={styles.L}>车辆贷款余额：</div><div className={styles.R}>{assets.carLoanBalance?assets.carLoanBalance[index]:''}</div></div>
            <div className={styles.Li}><div className={styles.L}>车贷月还款金额（元）：</div><div className={styles.R}>{assets.carRepayment?assets.carRepayment[index]:''}</div></div>
            <div className={styles.Li}><div className={styles.L}>车贷已还款月份（月）：</div><div className={styles.R}>{assets.carrRepaymentMonths?assets.carrRepaymentMonths[index]:''}</div></div>
          </div> :null
        }
      </div>
    )
  })
  var p = assets.policyBrand || []
  const policy = p.map((k,index) => {
    return (
      <div key={index}>
        <div className={styles.SubTitle}>保单{index+1}:</div>
        <div className={styles.Li}><div className={styles.L}>保单品牌：</div><div className={styles.R}>{policyBrand[assets.policyBrand[index]]}</div></div>
        <div className={styles.Li}><div className={styles.L}>其他保单品牌：</div><div className={styles.R}>{assets.otherPolicyBrand?assets.otherPolicyBrand[index]:''}</div></div>
        <div className={styles.Li}><div className={styles.L}>保单缴纳方式：</div><div className={styles.R}>{policyBrandPaymentMethod[assets.policyBrandPaymentMethod[index]]}</div></div>
        <div className={styles.Li}><div className={styles.L}>保单缴费时长：</div><div className={styles.R}>{policyPaymentYears[assets.policyPaymentYears[index]]}</div></div>
        <div className={styles.Li}><div className={styles.L}>保单缴费金额（元）：</div><div className={styles.R}>{assets.policyPayment?assets.policyPayment[index]:''}</div></div>
      </div>
    )
  })
  return (
    // <PageHeaderLayout title="匹配详情">
    <PageHeaderLayout>
      <div className={styles.Wrapper}>

         <span style={{fontSize:16,fontWeight:700,color:'rgba(0, 0, 0, 0.65)'}}>{loanDemand.name}</span>
        <div className={styles.More}>
          <div><span>{location[basicInformation.location]}</span></div>
          <div><span>{age[basicInformation.age]}</span></div>
          <div><span>{education[basicInformation.education]}</span></div>
          <div><span>{maritalStatus[basicInformation.maritalStatus]}</span></div>
        </div>
        <div>
          <div  className={styles.Li}><span className={styles.L}>期望贷款：{loanDemand.exLoanAmount}元</span></div>
          <div className={styles.Li}><span className={styles.L}>贷款类型：{loanType[loanDemand.loanType]}</span></div>
        </div>
      </div>
      <div className={styles.Wrapper}>
        <div className={styles.Title}>基本信息</div>
        <div className={styles.Li}><div className={styles.L}>职业类别：</div><div className={styles.R}>{occupation[basicInformation.occupation]}</div></div>
        {
          (basicInformation.occupation == 0 || basicInformation.occupation ==2)
            ? <div>
              <div className={styles.Li}><div className={styles.L}>单位性质：</div><div className={styles.R}>{unitProperty[basicInformation.unitProperty]}</div></div>
              <div className={styles.Li}><div className={styles.L}>工资发放方式：</div><div className={styles.R}>{salaryDistribution[basicInformation.salaryDistribution]}</div></div>
              <div className={styles.Li}><div className={styles.L}>现单位上班时长：</div><div className={styles.R}>{workTime[basicInformation.workTime]}</div></div>
              <div className={styles.Li}><div className={styles.L}>现单位月均工资：</div><div className={styles.R}>{monthAvgSalary[basicInformation.monthAvgSalary]}</div></div>
              <div className={styles.Li}><div className={styles.L}>社保有无缴纳：</div><div className={styles.R}>{basicInformation.isInsurance==1?'是':'否'}</div></div>
              {
                basicInformation.isInsurance==1
                  ? <div>
                      <div className={styles.Li}><div className={styles.L}>现单位社保缴纳基数: </div><div className={styles.R}>{insuranceBase[basicInformation.insuranceBase]}</div></div>
                      <div className={styles.Li}><div className={styles.L}>现单位社保连续缴纳时长：</div><div className={styles.R}>{insuranceBase[basicInformation.insuranceBase]}</div></div>
                    </div> :null
              }
              <div className={styles.Li}><div className={styles.L}>公积金有无缴纳：</div><div className={styles.R}>{basicInformation.isProvidentFund==1?'是':'否'}</div></div>
              {
                basicInformation.isProvidentFund==1
                  ? <div>
                      <div className={styles.Li}><div className={styles.L}>现单位公积金缴纳基数: </div><div className={styles.R}>{providentFundBase[basicInformation.providentFundBase]}</div></div>
                      <div className={styles.Li}><div className={styles.L}>现单位公积金连续缴纳时长：</div><div className={styles.R}>{providentFundPaymonth[basicInformation.providentFundPaymonth]}</div></div>
                    </div> :null
              }
            </div>:null
        }
        {
          (basicInformation.occupation == 1 || basicInformation.occupation ==2)
            ? <div>
              <div className={styles.Li}><div className={styles.L}>企业一年开票金额：</div><div className={styles.R}>{licenseRegistTime[basicInformation.licenseRegistTime]}</div></div>
              <div className={styles.Li}><div className={styles.L}>股份占比：</div><div className={styles.R}>{shareRatio[basicInformation.shareRatio]}</div></div>
              <div className={styles.Li}><div className={styles.L}>是否法人：</div><div className={styles.R}>{basicInformation.isLegalPerson==1?'是':'否'}</div></div>
              <div className={styles.Li}><div className={styles.L}>单位座机是否能正常接听：</div><div className={styles.R}>{basicInformation.isPhoneCall==1?'是':'否'}</div></div>
              <div className={styles.Li}><div className={styles.L}>公司是否方便实地考察：</div><div className={styles.R}>{basicInformation.isInvestigate==1?'是':'否'}</div></div>
            </div>:null
        }

      </div>
      <div className={styles.Wrapper}>
        <div className={styles.Title}>征信情况</div>
        <div className={styles.Li}><div className={styles.L}>征信记录时长：</div><div className={styles.R}>{recordTime[creditInformation.recordTime]}</div></div>
        <div className={styles.Li}><div className={styles.L}>名下上征信小额贷款笔数：</div><div className={styles.R}>{sumPettyLoan[creditInformation.sumPettyLoan]}</div></div>
        <div className={styles.Li}><div className={styles.L}>名下上征信消费金融类贷款笔数：</div><div className={styles.R}>{sumConsumerFinanceLoan[creditInformation.sumConsumerFinanceLoan]}</div></div>
        <div className={styles.Li}><div className={styles.L}>是否使用过微粒贷：</div><div className={styles.R}>{creditInformation.isParticleLoan==1?'是':(creditInformation.isParticleLoan==0?'否':'')}</div></div>

        {
          creditInformation.isParticleLoan == 1
           ? <div className={styles.Li}><div className={styles.L}>使用微粒额度：</div><div className={styles.R}>{particleLoanLimit[creditInformation.particleLoanLimit]}</div></div> : null
        }

        <div className={styles.Li}><div className={styles.L}>名下贷款/信用卡账户状态是否有冻结/呆账/止付/挂失/收卡/作废：</div><div className={styles.R}>{isLoanClose[creditInformation.isLoanClose]}</div></div>
        <div className={styles.Li}><div className={styles.L}>名下贷款/信用卡五级分类是否有关注/次级/可疑/损失：</div><div className={styles.R}>{isLoanLoss[creditInformation.isLoanLoss]}</div></div>
        <div className={styles.Divide}></div>
        <div className={styles.Li}><div className={styles.L}>当前是否有逾期：</div><div className={styles.R}>{isOverdue[creditInformation.isOverdue]}</div></div>
        {
          creditInformation.isOverdue == 1
            ? <div>
              <div className={styles.Li}><div className={styles.L}>当前逾期类别：</div><div className={styles.R}>{overdueCategory[creditInformation.overdueCategory]}</div></div>
              <div className={styles.Li}><div className={styles.L}>当前逾期天数：</div><div className={styles.R}>{overdueDays[creditInformation.overdueDays]}</div></div>
              <div className={styles.Li}><div className={styles.L}>当前信用卡逾期金额：</div><div className={styles.R}>{creditCardOverdueMoney[creditInformation.creditCardOverdueMoney]}</div></div>
              <div className={styles.Li}><div className={styles.L}>当前贷款逾期金额：</div><div className={styles.R}>{loanOverdueMoney[creditInformation.loanOverdueMoney]}</div></div>
              <div className={styles.Li}><div className={styles.L}>当前逾期是否已经结算：</div><div className={styles.R}>{creditInformation.isOverdueBalance == 1?'是':'否'}</div></div>
              <div className={styles.Li}><div className={styles.L}>近2个月内逾期的情况：</div><div className={styles.R}>{isTwoMonthsOverdue[creditInformation.isTwoMonthsOverdue]}</div></div>
              <div className={styles.Li}><div className={styles.L}>近3个月内逾期的情况：</div><div className={styles.R}>{isThreeMonthsOverdue[creditInformation.isThreeMonthsOverdue]}</div></div>
              <div className={styles.Li}><div className={styles.L}>近6个月内是否有逾期30天以上的情况：</div><div className={styles.R}>{isSixMonthsOverdue[creditInformation.isSixMonthsOverdue]}</div></div>
              <div className={styles.Li}><div className={styles.L}>近1年内是否有逾期60天以上的情况：</div><div className={styles.R}>{isOneYearOverdue[creditInformation.isOneYearOverdue]}</div></div>
              <div className={styles.Li}><div className={styles.L}>近2年内是否有逾期90天以上的情况：</div><div className={styles.R}>{isTwoYearsOverdue[creditInformation.isTwoYearsOverdue]}</div></div>
              <div className={styles.Li}><div className={styles.L}>近5年内是否有逾期120天以上的情况：</div><div className={styles.R}>{isFiveYearsOverdue[creditInformation.isFiveYearsOverdue]}</div></div>
            </div> :null
        }
        <div className={styles.Divide}></div>
        <div className={styles.Li}><div className={styles.L}>近1个月查询次数：</div><div className={styles.R}>{creditInformation.sumOneMonthQueries}</div></div>
        <div className={styles.Li}><div className={styles.L}>近2个月查询次数：</div><div className={styles.R}>{creditInformation.sumTwoMonthsQueries}</div></div>
        <div className={styles.Li}><div className={styles.L}>近3个月查询次数：</div><div className={styles.R}>{creditInformation.sumThreeMonthsQueries}</div></div>
        <div className={styles.Li}><div className={styles.L}>近6个月查询次数：</div><div className={styles.R}>{creditInformation.sumSixMonthsQueries}</div></div>
        <div className={styles.Li}><div className={styles.L}>近12个月查询次数：</div><div className={styles.R}>{creditInformation.sumOneYearQueries}</div></div>
      </div>
      {
        (basicInformation.occupation == 0 || basicInformation.occupation ==2)
          ?         <div className={styles.Wrapper}>
                    <div className={styles.Title}>工作收入</div>
                    <div className={styles.Li}><div className={styles.L}>单位名称：</div><div className={styles.R}>{income.unitName}</div></div>
                    <div className={styles.Li}><div className={styles.L}>本单位连续上班时间（月）：</div><div className={styles.R}>{income.specificWorkTime}</div></div>
                    <div className={styles.Li}><div className={styles.L}>近3个月税前月均收入（元）：</div><div className={styles.R}>{income.threeMonthsAvgSalary}</div></div>
                    <div className={styles.Li}><div className={styles.L}>近6个月税前月均收入（元）：</div><div className={styles.R}>{income.SixMonthsAvgSalary}</div></div>
                    <div className={styles.Li}><div className={styles.L}>近12个月税前月均收入（元）：</div><div className={styles.R}>{income.thisYearMonthsAvgSalary}</div></div>
                    <div className={styles.Li}><div className={styles.L}>上一年度税前月均收入（元）：</div><div className={styles.R}>{income.lastYearMonthsAvgSalary}</div></div>
                    <div className={styles.Divide}></div>
                    <div className={styles.Li}><div className={styles.L}>社保缴纳基数（元）：</div><div className={styles.R}>{income.specificInsuranceBase}</div></div>
                    <div className={styles.Li}><div className={styles.L}>本单位连续缴纳月（月）：</div><div className={styles.R}>{income.specificInsurancePaymonth}</div></div>
                    <div className={styles.Li}><div className={styles.L}>是否有养老保险：</div><div className={styles.R}>{income.isEndowmentInsurance==1?'有':'无'}</div></div>
                    <div className={styles.Li}><div className={styles.L}>本单位社保基数调整：</div><div className={styles.R}>{isInsuranceAdjustment[income.isInsuranceAdjustment]}</div></div>
                    <div className={styles.Li}><div className={styles.L}>调整前社保缴纳基数（元）：</div><div className={styles.R}>{income.exInsuranceBase}</div></div>
                    <div className={styles.Li}><div className={styles.L}>公积金缴纳基数（元）：</div><div className={styles.R}>{income.specificProvidentFundBase}</div></div>
                    <div className={styles.Li}><div className={styles.L}>本单位连续缴纳月（月）：</div><div className={styles.R}>{income.specificProvidentFundPaymonth}</div></div>
                    <div className={styles.Li}><div className={styles.L}>本单位公积金基数调整：</div><div className={styles.R}>{isProvidentFundAdjustment[income.isProvidentFundAdjustment]}</div></div>
                    <div className={styles.Li}><div className={styles.L}>调整前公积金缴纳基数（元）：</div><div className={styles.R}>{income.exProvidentFundBase}</div></div>
                  </div> : null
      }
      <div className={styles.Wrapper}>
        <div className={styles.Title}>资产状况</div>
        <div className={styles.Li}><div className={styles.L}>名下有无房产：</div><div className={styles.R}>{isHouseProperty[assets.isHouseProperty]}</div></div>
        {
          assets.isHouseProperty == 1
            ?<div>
              <div className={styles.Li}><div className={styles.L}>名下房产数量（套）：</div><div className={styles.R}>{assets.sumHouseProperty}</div></div>
              {/* 循环 */}

              {House}
              <div className={styles.Divide}></div>
            </div> :null
        }

        <div className={styles.Li}><div className={styles.L}>名下商业保单：</div><div className={styles.R}>{businessPolicy[assets.businessPolicy]}</div></div>
        {
          assets.businessPolicy == 1
            ?<div>
              <div className={styles.Li}><div className={styles.L}>保单份数（份）：</div><div className={styles.R}>{assets.sumBusinessPolicy}</div></div>
              {/* 循环 */}
              {policy}
              <div className={styles.Divide}></div>
            </div> :null
        }
        <div className={styles.Li}><div className={styles.L}>名下是否有家用汽车：</div><div className={styles.R}>{isFamilyCar[assets.isFamilyCar]}</div></div>
        {
          assets.isHouseProperty == 1
            ?<div>
              <div className={styles.Li}><div className={styles.L}>名下车辆数（辆）：</div><div className={styles.R}>{assets.sumFamilyCar}</div></div>
              {/* 循环 */}
              {Car}
            </div> :null
        }
      </div>
      <div className={styles.Wrapper}>
        <div className={styles.Title}>资产负债</div>
        <div className={styles.Li}><div className={styles.L}>信用类贷款（笔）：</div><div className={styles.R}>{capitalDebtSituation.sumCreditLoan}</div></div>
        {
          capitalDebtSituation.sumPettyLoan >0
          ? <div>
            <div className={styles.Li}><div className={styles.L}>等额本息类（笔）：</div><div className={styles.R}>{capitalDebtSituation.sumEqualInterest}</div></div>
            {
              capitalDebtSituation.sumEqualInterest > 0
                ? <div>
                  <div className={styles.Li}><div className={styles.L}>等额本息类贷款总余额（元）：</div><div className={styles.R}>{capitalDebtSituation.equalInterestTotalBalance}</div></div>
                  <div className={styles.Li}><div className={styles.L}>等额本息每月还款总额（元）：</div><div className={styles.R}>{capitalDebtSituation.equalInteresMonthPayment}</div></div>
                </div>:null
            }
            <div className={styles.Li}><div className={styles.L}>先息后本类（笔）：</div><div className={styles.R}>{capitalDebtSituation.sumFirstInterest}</div></div>
            {
              capitalDebtSituation.sumEqualInterest > 0
                ? <div>
                  <div className={styles.Li}><div className={styles.L}>先息后本类贷款总余额（元）：</div><div className={styles.R}>{capitalDebtSituation.firstInterestTotalBalance}</div></div>
                  <div className={styles.Li}><div className={styles.L}>先息后本每月还利息（元）：</div><div className={styles.R}>{capitalDebtSituation.firstInterestMonthPayment}</div></div>
                </div>:null
            }
            <div className={styles.Li}><div className={styles.L}>随借随还类（笔）：</div><div className={styles.R}>{capitalDebtSituation.sumAlongLoan}</div></div>
            {
              capitalDebtSituation.sumAlongLoan > 0
                ? <div>
                  <div className={styles.Li}><div className={styles.L}>随借随还类贷款总余额（元）：</div><div className={styles.R}>{capitalDebtSituation.alongLoanTotalBalance}</div></div>
                  <div className={styles.Li}><div className={styles.L}>随借随还每月还利息（元）:</div><div className={styles.R}>{capitalDebtSituation.alongLoanMonthPayment}</div></div>
                </div>:null
            }
          </div>:null
        }

        <div className={styles.Li}><div className={styles.L}>信用卡（笔）：</div><div className={styles.R}>{capitalDebtSituation.sumCreditCard}</div></div>
        {
          capitalDebtSituation.sumCreditCard > 0
            ? <div>
              <div className={styles.Li}><div className={styles.L}>信用卡总额度（元）：</div><div className={styles.R}>{capitalDebtSituation.creditCardTotalLimit}</div></div>
              <div className={styles.Li}><div className={styles.L}>信用卡当月已使用额度（元）:</div><div className={styles.R}>{capitalDebtSituation.creditCardUsedLimit}</div></div>
              <div className={styles.Li}><div className={styles.L}>信用卡近6个月平均使用额度（元）:</div><div className={styles.R}>{capitalDebtSituation.creditCardSixMonthsAvgUsedLimit}</div></div>
              <div className={styles.Li}><div className={styles.L}>信用卡办理了分期还款数（张）:</div><div className={styles.R}>{capitalDebtSituation.sumStagesCreditCard}</div></div>
            </div>:null
        }

      </div>
      <style jsx>{`
        span{
          margin-left:4px;
        }
        i{
          height:12px;
          width:12px;
          display:inline-block;
          background-size:100% 100%;
        }
        .hj{
          width:12px;
          background-image:url(/static/huji.png);
        }
        .shijian{
          width:12px;
          background-image:url(/static/shijian.png);
        }
        .xueli{
          background-image:url(/static/xueli.png);
        }
        .hunyin{
          background-image:url(/static/hunyin.png);
        }
        .daikuan{
          background-image:url(/static/daikuan.png);
        }
        .leixing{
          background-image:url(/static/leixing.png);
        }

      `}
      </style>
    </PageHeaderLayout>
  )
  }
}
