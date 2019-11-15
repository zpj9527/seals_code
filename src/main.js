// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import api from '../config/api'
Vue.prototype.api = api;
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import {Loading}from 'element-ui'     // ****在这里引入Loading组件****

//为了支持jsonp
import VueResource from 'vue-resource'
Vue.use(VueResource)
//暂未开放的组件
import Not_opened from '@/components/Not-opened'
Vue.component('Not-opened',Not_opened);
//底部提示信息的组件
import Bottom_prompt from '@/components/common/bottom_prompt'
Vue.component('Bottom_prompt',Bottom_prompt);
//内控店控右侧的登陆和设置的公共组件
import logonRight from './components/common/ini'
Vue.component("logon-view",logonRight);
//全局的头部公共组件
import personMessage from "./components/common/message"
Vue.component("person-message",personMessage )

import store from './store.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import '@/assets/css/style.css'
//钱管家--任务体系的公共组件
import money_ini from './components/common/money_ini'
import router from './router'
Vue.component("money-task",money_ini)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
import ElementUI from 'element-ui'
Vue.use(ElementUI);

Vue.filter('formatDateTime', function (value) {
  if (!value) return '';
  let date = new Date(value);
  let y = date.getFullYear() + '/';
  let mon = (date.getMonth() + 1) + '/';
  let d = date.getDate();
  return y + mon + d;
});
/**
 * @interceptors.request
 * @ 添加公共的请求头文件 做授权使用  这里是将所有的请求信息拦截掉，之后将最新的授权信息加到请求头里面
 */
axios.interceptors.request.use((request)=>{
      /**
       * undefined null '' === false
       * @type {{authorization: string}}
       */
      request.headers.common = {
        'authorization' : localStorage.getItem('authorization') ? localStorage.getItem('authorization') : router.push({path:'/initial-login'}),
      };
      return request;
});
/**
 * @interceptors.response
 * @ 统一处理请求返回数据，根据返回的数据判断用户是不是已授权，如果是已授权的话，那就直接可以拿到授权信息，将最新的授权信息给到本地存储里面。
 */
axios.interceptors.response.use((response)=>{
      /**
       * message === success
       * @response.data.new_authorization 如果存在授权信息的话，直接将授权信息拿到
       * @response.data.message === 'authorization invalid' 如果授权失效了，那么直接返回到登陆的页面，重新登陆那最新的授权信息
       * @response ；do not get it from the back end 如果后端有接口没有返回授权信息的时候，直接给控制台打印出来提示语
       * @type {{authorization: string}}
       */
      if(response.data.new_authorization){
         localStorage.setItem('authorization',response.data.new_authorization);
         // console.info(localStorage.getItem('authorization'));
         return response;
      }else if(response.data.message === 'authorization invalid'){
         router.push({path:'/initial-login'});
      }else{
         console.error('do not get it from the back end');
         return response;
      }
});
// ...
import { showLoading, hideLoading } from './loading';

/* 请求拦截器（请求之前的操作） */
// axios.interceptors.request.use((req) => {
//   showLoading();
//   return req;
// }, err => Promise.reject(err));

/* 请求之后的操作 */
axios.interceptors.response.use((res) => {

  hideLoading();
  return res;
  return Promise.reject(res);
}, (err) => {
  hideLoading();
  return Promise.reject(err);
});

    new Vue({
      router,
      store,
      el: '#app',
      render: h => h(App)
    })
