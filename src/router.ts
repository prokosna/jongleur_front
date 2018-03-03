import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from './components/Home.vue'
import Doc from './components/Doc.vue'
import EndUserHome from './components/enduser/Home.vue'
import EndUserLogin from './components/enduser/Login.vue'
import EndUserRegister from './components/enduser/Register.vue'
import Authorize from './components/oidc/Authorize.vue'
import ClientUpdate from './components/client/Update.vue'
import ClientLogin from './components/client/Login.vue'
import ClientRegister from './components/client/Register.vue'
import ResourceUpdate from './components/resource/Update.vue'
import ResourceLogin from './components/resource/Login.vue'
import ResourceRegister from './components/resource/Register.vue'

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
      path: '/end_user/login', component: EndUserLogin
    },
    {
      path: '/end_user/home', component: EndUserHome
    },
    {
      path: '/end_user/register', component: EndUserRegister
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
      path: '/client/update', component: ClientUpdate
    },
    {
      path: '/resource/login', component: ResourceLogin
    },
    {
      path: '/resource/register', component: ResourceRegister
    },
    {
      path: '/resource/update', component: ResourceUpdate
    } as RouteConfig
  ]
})

export default router