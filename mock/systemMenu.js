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

export function selectMenuAll(req, res, u) {

  const result = {
    "code": 0,
    "msg": "ok",
    "data": {
        "meunId": "0",
        "name": "一级菜单",
        "children": [
            {
                "meunId": "5637063507364874b2dbcdb79dd13790",
                "parentId": "0",
                "name": "系统管理",
                "type": "0",
                "icon": "icon",
                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                "createTime": 1516613819000,
                "orderNum": 1,
                "createUser": "小宇宙",
                "children": [
                    {
                        "meunId": "49691f84eae649ae971d7889e6fe7550",
                        "parentId": "5637063507364874b2dbcdb79dd13790",
                        "name": "字典管理",
                        "path": "http:////",
                        "authority": "sys:distionary",
                        "type": "1",
                        "icon": "icon",
                        "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                        "createTime": 1516614273000,
                        "orderNum": 3,
                        "createUser": "小宇宙",
                        "children": [
                            {
                                "meunId": "000514f1bc29499cb8650c4bb4fc94f6",
                                "parentId": "49691f84eae649ae971d7889e6fe7550",
                                "name": "删除",
                                "authority": "sys:distionary:delete",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614745000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "688b5f232d0848f0b9e89e420a061dfd",
                                "parentId": "49691f84eae649ae971d7889e6fe7550",
                                "name": "查询",
                                "authority": "sys:distionary:select",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614779000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "a639e4c35da44920815db89330d51188",
                                "parentId": "49691f84eae649ae971d7889e6fe7550",
                                "name": "修改",
                                "authority": "sys:distionary:update",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614759000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "ceb97830bb7c4842aec7634c9daea89d",
                                "parentId": "49691f84eae649ae971d7889e6fe7550",
                                "name": "添加",
                                "authority": "sys:distionary:insert",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614732000,
                                "createUser": "小宇宙",
                                "children": []
                            }
                        ]
                    },
                    {
                        "meunId": "afdf594362eb468083d648011f85d47a",
                        "parentId": "5637063507364874b2dbcdb79dd13790",
                        "name": "角色管理",
                        "path": "http:////",
                        "authority": "sys:role",
                        "type": "1",
                        "icon": "icon",
                        "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                        "createTime": 1516614170000,
                        "orderNum": 1,
                        "createUser": "小宇宙",
                        "children": [
                            {
                                "meunId": "0ead70f1dd4945b29f5eb9bef411ee9a",
                                "parentId": "afdf594362eb468083d648011f85d47a",
                                "name": "修改",
                                "authority": "sys:role:update",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614390000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "507a6d4148cc43eba70f3247b4ee75de",
                                "parentId": "afdf594362eb468083d648011f85d47a",
                                "name": "查询",
                                "authority": "sys:role:select",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614408000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "554b6999bb8d47d1bff05c466186d04e",
                                "parentId": "afdf594362eb468083d648011f85d47a",
                                "name": "新増",
                                "authority": "sys:role:insert",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614350000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "c36777b4b42245cdb94828cbd5259614",
                                "parentId": "afdf594362eb468083d648011f85d47a",
                                "name": "删除",
                                "authority": "sys:role:delete",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614370000,
                                "createUser": "小宇宙",
                                "children": []
                            }
                        ]
                    },
                    {
                        "meunId": "e3790dc63a4d4ff8b829eff95b49015b",
                        "parentId": "5637063507364874b2dbcdb79dd13790",
                        "name": "管理员（全站）",
                        "path": "http:////",
                        "authority": "sys:user",
                        "type": "1",
                        "icon": "icon",
                        "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                        "createTime": 1516614243000,
                        "orderNum": 2,
                        "createUser": "小宇宙",
                        "children": [
                            {
                                "meunId": "44e3e42ad57141f09e72561cacfd9f18",
                                "parentId": "e3790dc63a4d4ff8b829eff95b49015b",
                                "name": "增加",
                                "authority": "sys:user:insert",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516680360000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "81dc591a82ea4dbc914806aec8f24ea9",
                                "parentId": "e3790dc63a4d4ff8b829eff95b49015b",
                                "name": "修改",
                                "authority": "sys:user:update",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516680399000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "bfdf71018779499385f7ed2c1210358b",
                                "parentId": "e3790dc63a4d4ff8b829eff95b49015b",
                                "name": "删除",
                                "authority": "sys:user:delete",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516680383000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "cd78415c87ac4b888e49e0c95361ab25",
                                "parentId": "e3790dc63a4d4ff8b829eff95b49015b",
                                "name": "查询",
                                "authority": "sys:user:select",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516680412000,
                                "createUser": "小宇宙",
                                "children": []
                            }
                        ]
                    },
                    {
                        "meunId": "eb9bad323fa34ce3bb6312c09d77afac",
                        "parentId": "5637063507364874b2dbcdb79dd13790",
                        "name": "菜单管理",
                        "path": "http:////",
                        "authority": "sys:meun",
                        "type": "1",
                        "icon": "icon",
                        "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                        "createTime": 1516614298000,
                        "orderNum": 4,
                        "createUser": "小宇宙",
                        "children": [
                            {
                                "meunId": "82bf1a04dde5416c8043ca75824ede14",
                                "parentId": "eb9bad323fa34ce3bb6312c09d77afac",
                                "name": "添加",
                                "authority": "sys:meun:insert",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614698000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "ac696010e47d4d05919eda3686138e64",
                                "parentId": "eb9bad323fa34ce3bb6312c09d77afac",
                                "name": "查询",
                                "authority": "sys:meun:select",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614507000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "aebf0b1d2b2840969984f6dab828d3cb",
                                "parentId": "eb9bad323fa34ce3bb6312c09d77afac",
                                "name": "删除",
                                "authority": "sys:meun:delete",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614520000,
                                "createUser": "小宇宙",
                                "children": []
                            },
                            {
                                "meunId": "bc70b4dbaac14408855d4bdba78bb7ff",
                                "parentId": "eb9bad323fa34ce3bb6312c09d77afac",
                                "name": "修改",
                                "authority": "sys:meun:update",
                                "type": "2",
                                "createUserId": "0c2b89b987d34bffa7ace51addc211f0",
                                "createTime": 1516614494000,
                                "createUser": "小宇宙",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
  };

  res.send(result)
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
export function deleteMenu(req, res, u) {

  const result = {
    "code": 0,
    "msg": "ok",
  }

  res.send(result)
}
export function updateMenu(req, res, u) {

  const result = {
    "code": 0,
    "msg": "ok",
  }

  res.send(result)
}
export function saveMenu(req, res, u) {

  const result = {
    "code": 0,
    "msg": "ok",
  }

  res.send(result)
}
export default { selectMenuAll, deleteMenu, updateMenu, saveMenu  };
