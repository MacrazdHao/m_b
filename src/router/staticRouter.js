import entry from '@/pages/Entry'
import login from '@/pages/Entry/pages/login'
import register from '@/pages/Entry/pages/register'
import forget from '@/pages/Entry/pages/forget'

const staticRouter = [
  {
    path: '/',
    name: 'entry',
    component: entry,
    children: [{
      path: '/',
      name: 'login',
      component: login,
    }, {
      path: '/register',
      name: 'register',
      component: register,
    }, {
      path: '/forget',
      name: 'forget',
      component: forget,
    }]
  }
];

export default staticRouter;