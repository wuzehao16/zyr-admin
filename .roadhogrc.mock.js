import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { imgMap } from './mock/utils';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { getContent, postContent } from './mock/content';
import { getSystemUser, postSystemUser } from './mock/systemUser';
import { getInstitution, getSubInstitution } from './mock/register';
import { selectDictionary, deleteDictionary, updateDictionary, saveDictionary} from './mock/dictionary'
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'false';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'GET /api/systemUser': getSystemUser,
  'POST /api/systemUser': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postSystemUser,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /mapi/sysAnno/login': (req, res) => {
    const { loginPassord, loginAccount, type } = req.body;
    if(loginPassord === '888888' && loginAccount === 'admin'){
      res.send({
        code: 0,
        msg: 'ok',
        type,
      });
      return ;
    }
    if(loginPassord === '123456' && loginAccount === 'user'){
      res.send({
        code: 0,
        msg: 'ok',
        type,
      });
      return ;
    }
    res.send({
      code: 1,
      status: 'error',
      type,
    });
  },
  // 'POST /api/mapi/sysAnno/login': 'http://192.168.2.101:8080/mapi/sysAnno/login',
  'POST /api/register': (req, res) => {
    res.send({ msg: 'ok', currentAuthority: 'user' });
  },
  'POST /mapi/sysAnno/sendLoginMessage': (req, res) => {
    res.send({ msg: 'ok', code: 0 });
  },
  'POST /mapi/sysAnno/sendLoginEmail': (req, res) => {
    res.send({ msg: 'ok', code: 0 });
  },
  'POST /mapi/sysAnno/vaLidatacode': (req, res) => {
    res.send({ msg: 'ok', code: 0 });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      "timestamp": 1513932555104,
      "status": 500,
      "error": "error",
      "message": "error",
      "path": "/base/category/list"
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      "timestamp": 1513932643431,
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/base/category/list/2121212"
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      "timestamp": 1513932555104,
      "status": 403,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  'GET /api/content': getContent,
  'POST /api/content': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postContent,
  },
  'POST /mapi/sysAnno/getInstitutionByCityCode': getInstitution,
  'POST /mapi/sysAnno/getSubInstitutionByInstitutionCode': getSubInstitution,
  'POST /mapi/sysAnno/myPwdOrEmail': (req, res) => {
      res.send({ msg: 'ok', code: 0 });
    },
  'POST /mapi/sysAnno/register': (req, res) => {
      res.send({ msg: 'ok', code: 0 });
    },
  'POST /mapi/sysAnno/queryAllInstitution': (req, res) => {
      res.send({
          "code": 0,
          "msg": "ok",
          "data": [
              {
                  "institutionId": "04d54b7a25f0473f9679096cfab7597c",
                  "institutionName": "银行",
                  "createUserId": "admin",
                  "createTime": 1516184455966,
                  "institutionCode": "1"
              },
              {
                  "institutionId": "8a411da788c24402a39a7826aae26b8e",
                  "institutionName": "金融机构",
                  "createUserId": "admin",
                  "createTime": 1516186974926,
                  "institutionCode": "2"
              },
              {
                  "institutionId": "6015ed04cf524ff6a043443a03a87185",
                  "institutionName": "小额贷款",
                  "createUserId": "admin",
                  "createTime": 1516187373343,
                  "institutionCode": "3"
              }
          ]
      });
    },
    'GET /api/sys/selectDictionary': selectDictionary,
    'POST /api/sys/saveDictionary': saveDictionary,
    'DELETE /api/sys/deleteDictionary/*': deleteDictionary,
    'PUT /api/sys/updateDictionary': updateDictionary,
};

export default noProxy ? {} : delay(proxy, 1000);
// export default noProxy ? {} : {
//   ...delay(proxy, 1000),
//   'POST /api/mapi/sysAnno/login': 'http://192.168.2.101:8080/mapi/sysAnno/login',
// };
