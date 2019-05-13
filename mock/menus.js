const menuData = [{
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '分析页',
    path: 'analysis',
  }, {
    name: '监控页',
    path: 'monitor',
  }, {
    name: '工作台',
    path: 'workplace',
    // hideInMenu: true,
  }],
},  {
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
},{
  name:'消息管理',
  path: 'info',
  children:[{
    name: '系统通知',
    path: 'notification',
  },{
    name: '系统消息',
    path: 'sysinfo',
  }],
}, {
 name: '广告管理',
 icon: 'user',
 path: 'ads',
}, {
 name: '订单订单',
 icon: 'user',
 path: 'order',
},{
  name: '产品管理',
  icon: 'product',
  path: 'product',
}, {
  name: '机构管理',
  icon: 'user',
  path: 'institution',
},{
  name: '内容设置', // 页面名称，会展示在菜单栏中
  path: 'content', // 匹配的路由
  icon: 'book', // 页面图标，会展示在菜单栏中
  children: [
    {
      name: '栏目管理',
      path: 'column',
    },
    {
      name: '信息管理',
      path: 'information',
      // children:[
      //   {
      //     name:'新增',
      //     path:'add',
      //     // hideInMenu: true,
      //   }
      // ]
    },
  ],
}, {
 name: '模型匹配',
 icon: 'user',
 path: 'match',
},{
  name: '用户管理',
  icon: 'user',
  path: 'member',
  authority: 'admin',
},{
  name: '会员等级',
  icon: 'user',
  path: 'membership',
  authority: 'admin',
},{
  name: '系统管理',
  icon: 'user',
  path: 'system',
  authority: 'admin',
  children: [{
    name: '用户管理',
    path: 'user',
  },
  {
    name: '菜单管理',
    path: 'menu',
  },
  {
    name: '角色管理',
    path: 'role',
  },
  {
    name: '字典管理',
    path: 'dict',
  }],
}, {
  name: '使用文档',
  icon: 'book',
  path: 'http://pro.ant.design/docs/getting-started',
  target: '_blank',
}];

export function getMenuData(req, res, u, b) {
  const result = {
    code: 0,
    data: {
      meunId: "0",
      name: "一级菜单",
      children: menuData
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export default {
  getMenuData,
};
