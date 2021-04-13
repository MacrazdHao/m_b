import i18n from './language';
/*
{
  '远程路由': {
    path: "本地路由",
    name: "路由名称",
    component: "页面路径",
    meta: {附加信息}
  }
}
*/

// 路由映射表(一级结构，单元化，预留可自定义菜单功能——即可编辑子菜单的父级关系)
export default {
  // 顶级
  '/index': {
    path: '/index',
    name: 'index',
    component: 'index',
    redirect: 'dashboard',
  },
  // 子级
  '/dashboard': {
    path: "dashboard",
    name: "dashboard",
    component: "Dashboard",
    meta: {
      title: '工作台',
      enTitle: 'Workbench',
      icon: "icon_workbench"
    }
  },
  // 子级
  '/counseling': {
    path: "counseling",
    name: "counseling",
    component: "Counseling",
    meta: {
      title: '生涯辅导',
      enTitle: 'Life Coach',
      icon: "icon_counseling"
    }
  },
  // 子级
  '/testing': {
    path: "testing",
    name: "testing",
    component: "Testing",
    redirect: 'testing1',
    meta: {
      title: "测试主页",
      enTitle: 'Test Index',
      icon: "icon_workbench",
    }
  },
  // 子子级
  '/testing1': {
    path: "testing1",
    name: "testing1",
    component: "pages/testing1",
    meta: {
      title: "测试子页1",
      enTitle: "Test Page1",
    }
  },
  // 子子级
  '/testing2': {
    path: "testing2",
    name: "testing2",
    component: "pages/testing2",
    meta: {
      title: "测试子页2",
      enTitle: "Test Page2",
    }
  },
  // 顶级
  '/error': {
    path: "*",
    name: "error",
    component: "Error",
  },
  // 子级
  '/404': {
    path: "/Error404",
    name: "Error404",
    component: "Error404",
  }
}