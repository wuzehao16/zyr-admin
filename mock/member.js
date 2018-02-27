import { getUrlParams } from './utils';
// 用户管理
// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    userId: `${i}`,
    leveName: "钻石",
    manageId: "2e418e56cf444f6c97747eda151bbaed",
    loginAccount: 18312320204,
    userHead: "http://xxx/xxx",
    userSex: 2,
    registerTime: 1516866894000,
    userName: "jack",
    userIdentity: Math.floor(Math.random() * 2) + 1,
    islock: Math.floor(Math.random() * 2),
    wachatNo: 56984521358,
    idNumber: 445221199854668459,
    isCustom: Math.floor(Math.random() * 2),
    backPictureId: "http;//xxx/xxx",
    upperPictureId: "http;//xxx/xxx",
    isMember: Math.floor(Math.random() * 2),
    realName: "杰克",
    manageName: "平安-平安南山分行",
    sublInstitution: "2a8d5bf6958942fba5c67d6b04100f46",
    appMemberInfo: {
      buyTime: 1509610590000,
      expirdTime: 1541146590000,
      longTime: 12,
      memberPrice: 12000,
    },
    updateTime: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function getUser(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }
  if (params.isCustom) {
    dataSource = dataSource.filter(data => params.isCustom.indexOf(data.isCustom) > -1);
  }
  if (params.islock) {
    dataSource = dataSource.filter(data => params.islock.indexOf(data.islock) > -1);
  }
  if (params.isMember) {
    dataSource = dataSource.filter(data => params.isMember.indexOf(data.isMember) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    code: 0,
    data: dataSource,
    count: dataSource.length,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getUserDetail(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.userId) {
    dataSource = dataSource.filter(data => data.userId == params.userId);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    code: 0,
    data: dataSource[0],
    count: dataSource.length,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function updateUser(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, leveId } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    tableListDataSource.map((item,index) => {
      if(item.leveId == leveId){
      tableListDataSource[index]={
          userId: `${body.leveId}`,
          isCustom: body.isCustom,
          islock: body.islock,
          loginAccount: body.loginAccount,
          userIdentity:2,
          leveName: "钻石",
          manageId: "2e418e56cf444f6c97747eda151bbaed",
          loginAccount: 18312320204,
          userHead: "http://xxx/xxx",
          userSex: 2,
          registerTime: 1516866894000,
          userName: "jack",
          userIdentity: Math.floor(Math.random() * 2) + 1,
          islock: Math.floor(Math.random() * 2),
          wachatNo: 56984521358,
          idNumber: 445221199854668459,
          isCustom: Math.floor(Math.random() * 2),
          backPictureId: "http;//xxx/xxx",
          upperPictureId: "http;//xxx/xxx",
          isMember: Math.floor(Math.random() * 2),
          realName: "杰克",
          manageName: "平安-平安南山分行",
          sublInstitution: "2a8d5bf6958942fba5c67d6b04100f46",
          buyTime: 1509610590000,
          expirdTime: 1541146590000,
          longTime: 12,
          memberPrice: 12000,
          updateTime: new Date,
          createTime: new Date,
        }
      }
    });
  const result = {
    code: 0,
    data: tableListDataSource,
    count: tableListDataSource.length,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function updatePassword(req, res) {
  const result = {
    code: 0,
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default { getUser, updateUser, updatePassword, getUserDetail };
