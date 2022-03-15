import Vue from 'vue'
import App from './App.vue'
import VueLazyload from "vue-lazyload"
import router from "@/router"
import loading from '@/assets/loading.gif'
import store from "@/store"
import '@/mock/mockServe'
import * as API from '@/api'
import 'swiper/dist/css/swiper.min.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueLazyload, {loading})
Vue.use(Mint)

Vue.config.productionTip = false


new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    router,
    store,
}).$mount('#app')
