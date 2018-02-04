import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    adsId: `${i}`,
    adsType:"11200",
    adsTitle:"Banner1",
    adsMatch:"我是匹配词"	,
    upState: Math.floor(Math.random()*3),
    adsContent:"Banner1的内容",
    adsPic:"https://picsum.photos/200/200"	,
    adsUrl	:"http://www.ibankmatch.com",
    adsSort:"2",
    oper:"dsadadsa11",
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    registrationTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}
let tableListDataSource1 = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource1.push({
    msgId: `${i}`,
    msgTitle:"11200",
    msgContent:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum repellendus, aliquid a delectus quas labore ex consequuntur fuga, provident eos maiores quaerat autem deleniti nemo, cumque! Beatae magnam, sunt molestias alias ducimus voluptas, consequatur repellendus hic aliquam perspiciatis pariatur facere nobis! Possimus ab itaque et. Dolore voluptatum in incidunt commodi, doloribus expedita optio possimus error perspiciatis saepe odio, libero quas tempora modi molestiae odit harum suscipit accusantium temporibus ut voluptatibus, explicabo totam mollitia? Doloremque esse molestias necessitatibus, numquam omnis nemo autem, laudantium maxime iste ut totam ipsam exercitationem id dolores hic eveniet tempore sequi dolorem repellendus nihil tempora, illum cupiditate.",
    msgType:"我是匹配词"	,
    phone: Math.floor(Math.random()*3),
    email:"Banner1的内容",
    object:"https://picsum.photos/200/200"	,
    oper:"http://www.ibankmatch.com",
    status:"2",
    oper:"dsadadsa11",
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    registrationTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function selectPMI(req, res, u) {
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
export function selectAllMI(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource1];

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

export function savePMI(req, res, u, b) {
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
export function getPMIDetail(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.adsId) {
    dataSource = dataSource.filter(data => data.adsId == params.adsId);
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
export function updatePMI(req, res, u, b) {
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
export function deletePMI(req, res, u, b) {
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

export default { selectPMI,selectAllMI, updatePMI, savePMI, getPMIDetail, deletePMI};
