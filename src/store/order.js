import {reqOrderList} from "@/api"

const state = {
    orderList: [],
}

const mutations = {
    GETORDERLIST(state, orderList) {
        state.orderList = orderList
    },
}

const actions = {
    async getOrderList({commit}) {
        let result = await reqOrderList()
        if (200 == result.code) {
            commit('GETORDERLIST', result.data)
        }
    },
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}
