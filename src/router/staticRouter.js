import entry from '@/pages/Entry'
import login from '@/pages/Entry/pages/login'
import register from '@/pages/Entry/pages/register'
import register2 from '@/pages/Entry/pages/register2'
import forget from '@/pages/Entry/pages/forget'
import reset from '@/pages/Entry/pages/reset'
import contact from '@/pages/Entry/pages/contact'

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
      path: '/register2',
      name: 'register2',
      component: register2,
    }, {
      path: '/forget',
      name: 'forget',
      component: forget,
    }, {
      path: '/reset',
      name: 'reset',
      component: reset,
    }, {
      path: '/contact',
      name: 'contact',
      component: contact,
    }]
  }
];

export default staticRouter;