// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import VueResource from 'vue-resource';
import VueSocketio from 'vue-socket.io';
import './common/stylus/icon.styl';
// Vue.use(VueSocketio, 'http://localhost:3000/');
// 172.19.5.4
// Vue.use(VueSocketio, 'http://172.26.16.181:3000');
Vue.use(VueSocketio, 'http://172.19.5.4:3000');
// prod-env
// Vue.use(VueSocketio, 'http://52.77.197.38:3000');

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  /* sockets: {
    connect: function() {
      console.log('socket connected');
    },
    customEmit: function(val) {
      console.log('this method fired by socket server. eg: io.emit("customEmit", data)');
    },
    user: function(v) {
      console.log('user');
      console.log(v);
    }
  }, */
  components: { App }
});

/* eslint-disable no-unused-vars */
var bus = new Vue();
