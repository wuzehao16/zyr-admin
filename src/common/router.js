import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/RegisterStep')),
    },
    '/user/register/step1': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/RegisterStep/Step1')),
    },
    '/user/register/step2': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/RegisterStep/Step2')),
    },
    '/user/register/step3': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/RegisterStep/Step3')),
    },
    '/user/register/step4': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/RegisterStep/Step4')),
    },
    '/user/register1': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    '/user/reset-password': {
      component: dynamicWrapper(app, ['resetPassword'], () => import('../routes/User/ResetPassword')),
    },
    '/institution': {
      component: dynamicWrapper(app, ['institution'], () => import('../routes/Institution')),
      name: '机构管理',
    },
    '/institution/list': {
      component: dynamicWrapper(app, ['institution'], () => import('../routes/Institution/TableList')),
    },
    '/institution/detail': {
      component: dynamicWrapper(app, ['institution'], () => import('../routes/Institution/Detail')),
      name: '机构详情',
    },
    '/institution/Review': {
      component: dynamicWrapper(app, ['institution'], () => import('../routes/Institution/Review')),
      name: '机构审核',
    },
    '/institution/edit': {
      component: dynamicWrapper(app, ['institution'], () => import('../routes/Institution/Edit')),
      name: '编辑机构',
    },
    '/institution/add': {
      component: dynamicWrapper(app, ['institution'], () => import('../routes/Institution/AddInstitution')),
      name: '新增机构',
    },
    '/content/information': {
      component: dynamicWrapper(app, ['content'], () => import('../routes/Content/Information')),
    },
    '/content/information/list': {
      component: dynamicWrapper(app, ['content'], () => import('../routes/Content/InformationList')),
    },
    '/content/information/add': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Content/AddInformation')),
    },
    '/content/information/edit': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Content/EditInformation')),
    },
    '/content/information/detail': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Content/Detail')),
    },
    '/content/column': {
      component: dynamicWrapper(app, ['content'], () => import('../routes/Content/Column')),
    },
    '/content/column/list': {
      component: dynamicWrapper(app, ['content'], () => import('../routes/Content/ColumnList')),
    },
    '/content/column/add': {
      component: dynamicWrapper(app, ['content'], () => import('../routes/Content/AddColumn')),
    },
    '/content/column/edit': {
      component: dynamicWrapper(app, ['content'], () => import('../routes/Content/EditColumn')),
    },
    '/system/user': {
      component: dynamicWrapper(app, ['systemUser'], () => import('../routes/System/User')),
    },
    '/system/user/list': {
      component: dynamicWrapper(app, ['systemUser'], () => import('../routes/System/UserList')),
    },
    '/system/user/add': {
      component: dynamicWrapper(app, ['systemUser'], () => import('../routes/System/AddUser')),
    },
    '/system/user/edit': {
      component: dynamicWrapper(app, ['systemUser'], () => import('../routes/System/EditUser')),
    },
    '/system/dict': {
      component: dynamicWrapper(app, ['systemDict'], () => import('../routes/System/Dict')),
    },
    '/system/menu': {
      component: dynamicWrapper(app, ['systemMenu'], () => import('../routes/System/Menu')),
    },
    '/system/menu/list': {
      component: dynamicWrapper(app, ['systemMenu'], () => import('../routes/System/MenuList')),
    },
    '/system/menu/add': {
      component: dynamicWrapper(app, ['systemMenu'], () => import('../routes/System/AddMenu')),
    },
    '/system/menu/edit': {
      component: dynamicWrapper(app, ['systemMenu'], () => import('../routes/System/EditMenu')),
    },
    '/system/role': {
      component: dynamicWrapper(app, ['systemRole'], () => import('../routes/System/Role')),
    },
    '/system/role/list': {
      component: dynamicWrapper(app, ['systemRole'], () => import('../routes/System/RoleList')),
    },
    '/system/role/add': {
      component: dynamicWrapper(app, ['systemRole'], () => import('../routes/System/AddRole')),
      name: '新增角色',
    },
    '/system/role/edit': {
      component: dynamicWrapper(app, ['systemRole'], () => import('../routes/System/EditRole')),
      name: '编辑角色',
    },
    '/membership': {
      component: dynamicWrapper(app, ['membership'], () => import('../routes/Membership')),
      name: '会员等级',
    },
    '/membership/list': {
      component: dynamicWrapper(app, ['membership'], () => import('../routes/Membership/List')),
    },
    '/membership/add': {
      component: dynamicWrapper(app, ['membership'], () => import('../routes/Membership/Add')),
      name: '新增会员等级',
    },
    '/membership/edit': {
      component: dynamicWrapper(app, ['membership'], () => import('../routes/Membership/Edit')),
      name: '编辑会员等级',
    },
    '/member': {
      component: dynamicWrapper(app, ['member'], () => import('../routes/Member')),
      name: '用户管理',
    },
    '/member/list': {
      component: dynamicWrapper(app, ['member'], () => import('../routes/Member/List')),
    },
    '/member/edit': {
      component: dynamicWrapper(app, ['member'], () => import('../routes/Member/Edit')),
      name: '编辑用户',
    },
    '/member/detail': {
      component: dynamicWrapper(app, ['member'], () => import('../routes/Member/Detail')),
      name: '查看用户详情',
    },
    '/product': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product')),
      name: '产品管理',
    },
    '/product/list': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/List')),
    },
    '/product/detail': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/Detail')),
      name: '产品详情',
    },
    '/product/Review': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/Review')),
      name: '产品审核',
    },
    '/product/edit': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/EditStep')),
      name: '编辑产品',
    },
    '/product/edit/step1': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/EditStep/Step1')),
    },
    '/product/edit/step2': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/EditStep/Step2')),
    },
    '/product/edit/step3': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/EditStep/Step3')),
    },
    '/product/add': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/AddStep')),
      name: '新增产品',
    },
    '/product/add/step1': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/AddStep/Step1')),
    },
    '/product/add/step2': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/AddStep/Step2')),
    },
    '/product/add/step3': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/AddStep/Step3')),
    },
    '/ads': {
      component: dynamicWrapper(app, ['ads'], () => import('../routes/Ads')),
      name: '广告管理',
    },
    '/ads/list': {
      component: dynamicWrapper(app, ['ads'], () => import('../routes/Ads/List')),
    },
    '/ads/detail': {
      component: dynamicWrapper(app, ['ads'], () => import('../routes/Ads/Detail')),
      name: '广告详情',
    },
    '/ads/edit': {
      component: dynamicWrapper(app, ['ads'], () => import('../routes/Ads/Edit')),
      name: '编辑广告',
    },
    '/ads/add': {
      component: dynamicWrapper(app, ['ads'], () => import('../routes/Ads/Add')),
      name: '新增广告',
    },
    '/info/sysinfo': {
      component: dynamicWrapper(app, ['info'], () => import('../routes/Info/SysinfoList')),
      name: '系统消息',
    },
    '/info/notification': {
      component: dynamicWrapper(app, ['info'], () => import('../routes/Info')),
      name: '系统通知',
    },
    '/info/notification/list': {
      component: dynamicWrapper(app, ['info'], () => import('../routes/Info/SysNotificationList')),
      name: '系统通知',
    },
    '/info/notification/edit': {
      component: dynamicWrapper(app, ['info'], () => import('../routes/Info/Edit')),
      name: '编辑系统通知',
    },
    '/info/notification/add': {
      component: dynamicWrapper(app, ['info'], () => import('../routes/Info/Add')),
      name: '新增系统通知',
    },
    '/setting': {
      component: dynamicWrapper(app, ['setting'], () => import('../routes/Setting')),
      name: '设置',
    },
    '/order': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order')),
      name: '订单管理',
    },
    '/order/list': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/List')),
    },
    '/order/detail': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/Detail')),
      name: '订单详情',
    },
    '/order/review': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/Review')),
      name: '订单详情',
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());
  const routerData = {};
  Object.keys(routerConfig).forEach((item) => {
    const menuItem = menuData[item.replace(/^\//, '')] || {};
    routerData[item] = {
      ...routerConfig[item],
      name: routerConfig[item].name || menuItem.name,
      authority: routerConfig[item].authority || menuItem.authority,
    };
  });
  return routerData;
};
