import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:() => import('@/views/login')
  },
  {
    path:'/',
    name :'layout',
    redirect:'/shouye',
    component:() => import('@/views/layout'),
    children:[
       {
        path:'shouye',
        name:'shouye',
        component:() => import('@/views/shouye'),
       },
       {
        path:'wenda',
        name:'wenda',
        component:() => import('@/views/wenda'),
       },
       {
        path:'shipin',
        name:'shipin',
        component:() => import('@/views/shipin'),
       },
       {
        path:'wode',
        name:'wode',
        component:() => import('@/views/wode'),
       },
    ] 
  },
  {
    path:'/search',
    name:'search',
    component:() => import('@/views/search')
  },
  {
    path:'/article/:articIe',
    name:'article',
    component:() => import('@/views/article'),
    props:true
  },
]

const router = new VueRouter({
  routes
})

export default router
