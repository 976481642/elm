import App from '../App'
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import login from '../components/page/login'
// const DianJia = resolve => require(['../page/elm/DianJia'],resolve);
const login = resolve => require(['../components/page/login'],resolve);
const info = resolve => require(['../components/page/info'],resolve);
const Home = resolve => require(['../components/page/Home'],resolve);
const Userlist = resolve => require(['../components/list/Userlist'],resolve);
const Restlist = resolve => require(['../components/list/Restlist'],resolve);
const Foodlist = resolve => require(['../components/list/Foodlist'],resolve);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/info',
      name: 'info',
      component: info,
      redirect:"info/Home",
      children:[
        {
          path: 'Home',
          name: 'Home',
          component: Home
        },
        {
          path: 'Userlist',
          name: 'Userlist',
          component: Userlist
        },
        {
          path: 'Restlist',
          name: 'Restlist',
          component: Restlist
        },
        {
          path: 'Foodlist',
          name: 'Foodlist',
          component: Foodlist
        }
      ]
    },



  ]
})
