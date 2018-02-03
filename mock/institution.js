import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    manageId: `${i}`,
    city: '广州',
    manageName: '平安银行',
    updateUser: "瓜娃子",
    oper: "瓜娃子",
    cityCode:"20",
    institutionCode:"1",
    userPhone: "13812341234",
    institutionId:"5e553724754f4d47b57c45ff6afd53d6",
    institutionCode: `${Math.floor(Math.random()*2) + 1}`,
    loginAccount: "jaccc",
    manageLogoId: "https://picsum.photos/200/200",
    userEmail: "laonianren@gmail.com",
    sort: Math.floor(Math.random()*100),
    startStatus: `${Math.floor(Math.random()*2)}`,
    approvalStatus: Math.floor(Math.random()*3),
    approvalUser: '小李子',
    approvalTime: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    registrationTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function selectInstitution(req, res, u) {
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

  if (params.startStatus) {
    dataSource = dataSource.filter(data => params.startStatus.indexOf(data.startStatus) > -1);
  }

  if (params.approvalStatus) {
    dataSource = dataSource.filter(data => params.approvalStatus.indexOf(data.approvalStatus) > -1);
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

export function saveInstitution(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, id } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    const i = Math.ceil(Math.random() * 10000);
    tableListDataSource.unshift(Object.assign({
      manageId: `${i}`,
      oper: '二花',
      city: '广州',
      approvalUser: '小李子',
      updateUser: "瓜娃子",
      createTime: new Date,
      approvalTime: new Date,
      registrationTime: new Date,
    },body));
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
export function getInstitutionDetail(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.manageId) {
    dataSource = dataSource.filter(data => data.manageId == params.manageId);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    code: 0,
    data: [dataSource[0]],
    count: dataSource.length,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function deleteInstitution(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no } = body;
    /* eslint no-case-declarations:0 */
  const idArray = url.split("/")
  const id = idArray[idArray.length - 1]
    tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.manageId) === -1);
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
export function updateInstitution(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, manageId } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    tableListDataSource.map((item,index) => {
      if(item.manageId == manageId){
      tableListDataSource[index]= Object.assign(item,body);
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

export default { selectInstitution, deleteInstitution, updateInstitution, saveInstitution};
