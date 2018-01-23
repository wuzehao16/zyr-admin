import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    userId: `${i}`,
    loginAccount: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
    userName: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
    loginpassord: '123',
    createUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    islock: '1',
    sysRoles: [{
      roleId: "575eb9a313794afaac82265afe9ab49a",
      roleName: "运维人员"
    }]
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
      userId: `${ i}`,
      updateUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
      loginpassord: body.loginpassord,
      loginAccount: body.loginAccount,
      userName: body.userName,
      islock: body.islock,
      sysRoles: body.sysRoles,
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
  const userId = idArray[idArray.length - 1]
    tableListDataSource = tableListDataSource.filter(item => userId.indexOf(item.userId) === -1);
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
  const { method, userId } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    tableListDataSource.map((item,index) => {
      if(userId == item.userId){
      tableListDataSource[index]={
          key: body.userId,
          userId: `${body.userId}`,
          updateUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
          loginpassord: body.loginpassord,
          loginAccount: body.loginAccount,
          userName: body.userName,
          sysRoles: body.sysRoles,
          islock: body.islock,
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

export function selectAllRole(req, res, u, b) {
  const result = {
      "code": 0,
      "msg": "ok",
      "data": [
          {
              "roleId": "575eb9a313794afaac82265afe9ab49a",
              "roleName": "运维人员",
              "remark": "运维管理",
              "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
              "createTime": 1516681548000,
              "loginAccount": "小宇宙",
              "sysMenus": [
                  {
                      "meunId": "a639e4c35da44920815db89330d51188"
                  },
                  {
                      "meunId": "ceb97830bb7c4842aec7634c9daea89d"
                  },
                  {
                      "meunId": "688b5f232d0848f0b9e89e420a061dfd"
                  },
                  {
                      "meunId": "000514f1bc29499cb8650c4bb4fc94f6"
                  },
                  {
                      "meunId": "49691f84eae649ae971d7889e6fe7550"
                  }
              ]
          },
          {
              "roleId": "b05d712afa504acb9edeb5e0384490a6",
              "roleName": "超级管理员",
              "remark": "管理全站",
              "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
              "createTime": 1516680607000,
              "loginAccount": "小宇宙",
              "sysMenus": [
                  {
                      "meunId": "000514f1bc29499cb8650c4bb4fc94f6"
                  },
                  {
                      "meunId": "c36777b4b42245cdb94828cbd5259614"
                  },
                  {
                      "meunId": "688b5f232d0848f0b9e89e420a061dfd"
                  },
                  {
                      "meunId": "5637063507364874b2dbcdb79dd13790"
                  },
                  {
                      "meunId": "ceb97830bb7c4842aec7634c9daea89d"
                  },
                  {
                      "meunId": "0ead70f1dd4945b29f5eb9bef411ee9a"
                  },
                  {
                      "meunId": "bc70b4dbaac14408855d4bdba78bb7ff"
                  },
                  {
                      "meunId": "44e3e42ad57141f09e72561cacfd9f18"
                  },
                  {
                      "meunId": "bfdf71018779499385f7ed2c1210358b"
                  },
                  {
                      "meunId": "ac696010e47d4d05919eda3686138e64"
                  },
                  {
                      "meunId": "81dc591a82ea4dbc914806aec8f24ea9"
                  },
                  {
                      "meunId": "554b6999bb8d47d1bff05c466186d04e"
                  },
                  {
                      "meunId": "a639e4c35da44920815db89330d51188"
                  },
                  {
                      "meunId": "e3790dc63a4d4ff8b829eff95b49015b"
                  },
                  {
                      "meunId": "aebf0b1d2b2840969984f6dab828d3cb"
                  },
                  {
                      "meunId": "49691f84eae649ae971d7889e6fe7550"
                  },
                  {
                      "meunId": "afdf594362eb468083d648011f85d47a"
                  },
                  {
                      "meunId": "82bf1a04dde5416c8043ca75824ede14"
                  },
                  {
                      "meunId": "507a6d4148cc43eba70f3247b4ee75de"
                  },
                  {
                      "meunId": "cd78415c87ac4b888e49e0c95361ab25"
                  },
                  {
                      "meunId": "eb9bad323fa34ce3bb6312c09d77afac"
                  }
              ]
          }
      ],
      "count": 2
  }

  res.send(result);
}
export default { selectAllRole, selectUsers,  deleteUser, updateUser, saveUser};
