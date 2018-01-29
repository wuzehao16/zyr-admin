import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    id: `${i}`,
    updateUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
    value: Math.ceil(Math.random() * 100),
    label: '平安银行',
    type: 'bank',
    updateTime: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function selectDictionary(req, res, u) {
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

  if (params.type === 'orgType') {
    const result = {
      code: 0,
      data: [{
        label: '银行机构',
        value: '1'
      },
      {
        label: '金融机构',
        value: '2'
      },
      {
        label: '小额贷款',
        value: '3'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'city') {
    const result = {
      code: 0,
      data: [{
        label: '深圳',
        value: '20'
      },
      {
        label: '广州',
        value: '30'
      },
      {
        label: '珠海',
        value: '40'
      },
      {
        label: '东莞',
        value: '50'
      },
      {
        label: '惠州',
        value: '60'
      },
      {
        label: '中山',
        value: '70'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'auditStatus') {
    const result = {
      code: 0,
      data: [{
        label: '未通过',
        value: '0'
      },
      {
        label: '审核中',
        value: '1'
      },
      {
        label: '已通过',
        value: '2'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
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

export function saveDictionary(req, res, u, b) {
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
      key: i,
      id: `${ i}`,
      updateUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
      value: body.value,
      label: body.label,
      type: body.type,
      updateTime: new Date,
      createTime: new Date,
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
export function deleteDictionary(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no } = body;
    /* eslint no-case-declarations:0 */
  const idArray = url.split("/")
  const id = idArray[idArray.length - 1]
    tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
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
export function updateDictionary(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, id } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    tableListDataSource.map((item,index) => {
      if(item.id == id){
      tableListDataSource[index]={
          key: body.id,
          id: `${body.id}`,
          updateUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
          value: body.value,
          label: body.label,
          type: body.type,
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

export default { selectDictionary, deleteDictionary, updateDictionary, saveDictionary};
