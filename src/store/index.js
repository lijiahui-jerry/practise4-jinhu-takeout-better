import Vue from "vue"
import Vuex from "vuex"
import home from "@/store/home"
import me from '@/store/me'
import shop from "@/store/shop"
import helpEachOther from "@/store/helpEachOther"
import educationSupermarket from "@/store/educationSupermarket"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{home,me,shop,helpEachOther,educationSupermarket},
})
