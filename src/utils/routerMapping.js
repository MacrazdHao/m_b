// 路由映射表(一级结构，单元化，预留可自定义菜单功能——即可编辑子菜单的父级关系)
export default {
  // 顶级
  '/index': {
    path: '/index',
    name: 'index',
    component: 'index'
  },
  // 子级
  '/dashboard': {
    path: "/",
    name: "Dashboard",
    component: "Dashboard",
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