import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    productId: `${i}`,
    city: '广州',
    manageName: '平安银行',
    productNo:"no19211",
    productName:"金融房贷",
    city:"上海"	,
    institutionCode: "1",
    monthlyFeeRate:"10"	,
    isEvaluaStatuts: `${Math.floor(Math.random()*2)}`,
    shelfState: `${Math.floor(Math.random()*2)}`,
    approvalStatus: `${Math.floor(Math.random()*3)}`,
    updateTime: "2018-6-15",
    oper:"cc",
    approvalUser: '小李子',
    approvalTime: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    registrationTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function selectProduct(req, res, u) {
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
  if (params.isEvaluaStatuts) {
    dataSource = dataSource.filter(data => params.isEvaluaStatuts.indexOf(data.isEvaluaStatuts) > -1);
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

export function saveProduct(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, id } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    const i = Math.ceil(Math.random() * 10000);
    tableListDataSource.unshift({
      productId: `${i}`,
      city: '广州',
      cityCode: body.cityCode,
      userPhone: body.userPhone,
      userEmail: body.userEmail,
      sort: body.sort,
      startStatus: body.startStatus,
      approvalStatus: body.approvalStatus,
      loginAccount: body.loginAccount,
      approvalUser: '小李子',
      updateUser: "瓜娃子",
      approvalTime: new Date,
      registrationTime: new Date,
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
export function getProductDetail(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.productId) {
    dataSource = dataSource.filter(data => data.productId == params.productId);
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
export function updateProduct(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, productId } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    tableListDataSource.map((item,index) => {
      if(item.productId == productId){
      tableListDataSource[index]={
          key: body.productId,
          productId: `${body.productId}`,
          city: '广州',
          cityCode: body.cityCode,
          userPhone: body.userPhone,
          userEmail: body.userEmail,
          sort: body.sort,
          startStatus: body.startStatus,
          approvalStatus: body.approvalStatus,
          loginAccount: body.loginAccount,
          approvalUser: '小李子',
          updateUser: "瓜娃子",
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

export default { selectProduct, updateProduct, saveProduct, getProductDetail};
