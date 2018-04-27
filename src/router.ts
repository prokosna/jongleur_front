import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from './components/Home.vue'
import Doc from './components/Doc.vue'
import AdminHome from './components/admin/Home.vue'
import AdminLogin from './components/admin/Login.vue'
import EndUserHome from './components/enduser/Home.vue'
import EndUserLogin from './components/enduser/Login.vue'
import EndUserRegister from './components/enduser/Register.vue'
import Authorize from './components/oidc/Authorize.vue'
import ClientHome from './components/client/Home.vue'
import ClientLogin from './components/client/Login.vue'
import ClientRegister from './components/client/Register.vue'
import ResourceHome from './components/resource/Home.vue'
import ResourceLogin from './components/resource/Login.vue'
import ResourceRegister from './components/resource/Register.vue'
import Error from './components/Error.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/', component: Home
    },
    {
      path: '/doc', component: Doc
    },
    {
      path: '/sorry', component: Error
    },
    {
      path: '/admin/home', component: AdminHome
    },
    {
      path: '/admin/login', component: AdminLogin
    },
    {
      path: '/enduser/login', component: EndUserLogin
    },
    {
      path: '/enduser/home', component: EndUserHome
    },
    {
      path: '/enduser/register', component: EndUserRegister
    },
    {
      path: '/authorize', component: Authorize
    },
    {
      path: '/client/login', component: ClientLogin
    },
    {
      path: '/client/register', component: ClientRegister
    },
    {
      path: '/client/home', component: ClientHome
    },
    {
      path: '/resource/login', component: ResourceLogin
    },
    {
      path: '/resource/register', component: ResourceRegister
    },
    {
      path: '/resource/home', component: ResourceHome
    } as RouteConfig
  ]
})

export default router
