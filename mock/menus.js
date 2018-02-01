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
}, {
  name: '表单页',
  icon: 'form',
  path: 'form',
  children: [{
    name: '基础表单',
    path: 'basic-form',
  }, {
    name: '分步表单',
    path: 'step-form',
  }, {
    name: '高级表单',
    authority: 'admin',
    path: 'advanced-form',
  }],
}, {
  name: '列表页',
  icon: 'table',
  path: 'list',
  children: [{
    name: '查询表格',
    path: 'table-list',
  }, {
    name: '标准列表',
    path: 'basic-list',
  }, {
    name: '卡片列表',
    path: 'card-list',
  }, {
    name: '搜索列表',
    path: 'search',
    children: [{
      name: '搜索列表（文章）',
      path: 'articles',
    }, {
      name: '搜索列表（项目）',
      path: 'projects',
    }, {
      name: '搜索列表（应用）',
      path: 'applications',
    }],
  }],
}, {
  name: '详情页',
  icon: 'profile',
  path: 'profile',
  children: [{
    name: '基础详情页',
    path: 'basic',
  }, {
    name: '高级详情页',
    path: 'advanced',
    authority: 'admin',
  }],
}, {
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  children: [{
    name: '成功',
    path: 'success',
  }, {
    name: '失败',
    path: 'fail',
  }],
}, {
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
},{
  name: '产品管理',
  icon: 'product',
  path: 'product',
}, {
  name: '机构管理',
  icon: 'user',
  path: 'institution',
},{
  name: '内容管理', // 页面名称，会展示在菜单栏中
  path: 'content', // 匹配的路由
  icon: 'book', // 页面图标，会展示在菜单栏中
  children: [
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
    {
      name: '栏目管理',
      path: 'column',
    },
  ],
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
