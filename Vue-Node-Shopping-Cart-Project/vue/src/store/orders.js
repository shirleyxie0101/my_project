import Axios from "axios";

const ordersUrl = `http://localhost:3000/orders`;

export default {
    namespaced: true,

    state: {
        orders: [],
    },
    mutations: {
        setOrders(state, data) {
            state.orders = data;
        },
    },
    actions: {
        async storeOrderAction(context, order) {
            return (await Axios.post(ordersUrl, order)).data.id;
        },
        async setOrdersAction(context) {
            context.commit("setOrders", (await Axios.get(ordersUrl)).data);
        },
    },
};
