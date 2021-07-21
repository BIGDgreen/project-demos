import Vue from 'vue'
import App from './App.vue'
import router from './router'
import to from '@/utils/await-to-js'

Vue.config.productionTip = false

interface Resp<T> {
  code: number
  data: T
  msg: string
}

// to.prototype.register(function(err: string | Resp<any>) {
//   // 处理错误，err 为 reject 的值或方法里自定义的错误信息
//   const msg = (typeof err === 'string' ? err : err.msg) || '系统错误'
//   alert(msg)
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
