import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    adsId: `${i}`,
    adsType:"11200",
    adsTitle:"标题标题标题标题标题标题标题标题标题标题",
    adsMatch:"我是匹配词",
    adsTypeName:'typename1',
    upState: Math.floor(Math.random()*3),
    adsContent:"Banner1的内容Banner1的内容Banner1的内容Banner1的内容Banner1的内容Banner1的内容Banner1的内容Banner1的内容Banner1的内容",
    adsPic:"http://cloudbank.oss-cn-shenzhen.aliyuncs.com/image/8733682321693967.jpeg?Expires=1519552208&OSSAccessKeyId=LTAIKLBKZVJPb6ig&Signature=up6UxpnjnQ097ZWxdUcQ2WgIcrM%3D",
    // adsPic:"https://picsum.photos/200/200"	,
    adsUrl	:"http://www.ibankmatch.com",
    adsSort:"2",
    autoDownTime:1518149822000,
    autoUpTime:1518063666000,
    oper:"dsadadsa11",
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    registrationTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function selectAds(req, res, u) {
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

export function saveAds(req, res, u, b) {
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
      adsId: `${i}`,
      oper: '二花',
      createTime: new Date,
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
export function getAdsDetail(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.id) {
    dataSource = dataSource.filter(data => data.adsId == params.id);
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
export function updateAds(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, adsId } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    tableListDataSource.map((item,index) => {
      if(item.adsId == adsId){
      tableListDataSource[index]= Object.assign(item,body)
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
export function deleteAds(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no } = body;
    /* eslint no-case-declarations:0 */
  const idArray = url.split("/")
  const id = idArray[idArray.length - 1]
    tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.adsId) === -1);
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

export default { selectAds, updateAds, saveAds, getAdsDetail, deleteAds};
