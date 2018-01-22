import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    userId: `${i}`,
    loginAccount: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
    userName: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
    createUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    islock: Math.floor(Math.random() * 2),
  });
}

export function selectUsers(req, res, u) {
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

  if (params.islock) {
    const islock = params.islock.split(',');
    let filterDataSource = [];
    islock.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.islock, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  // if (params.islock) {
  //   dataSource = dataSource.filter(data => data.islock.indexOf(params.islock) > -1);
  // }

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

export function saveUser(req, res, u, b) {
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
      updatedAt: new Date,
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
export function deleteUser(req, res, u, b) {
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
export function updateUser(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, id } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    tableListDataSource.map((item,index) => {
      var idSting = id;
      idSting = idSting.toString();
      if(idSting.indexOf(item.id) !== -1){
      tableListDataSource[index]={
          key: body.id,
          id: `${body.id}`,
          updateUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
          value: body.value,
          label: body.label,
          type: body.type,
          updatedAt: new Date,
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

export default { selectUsers, deleteUser, updateUser, saveUser};
