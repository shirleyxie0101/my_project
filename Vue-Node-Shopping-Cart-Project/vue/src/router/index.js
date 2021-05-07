import Vue from "vue";
import VueRouter from "vue-router";

import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";
import Checkout from "../components/Checkout";
import Thanks from "../components/Thanks";
import Login from "../components/admin/Login";

import Admin from "../components/admin/Admin";
import AdminPages from "../components/admin/Pages";
import PageEditor from "../components/admin/PageEditor";
import Products from "../components/admin/Products";
import ProductEditor from "../components/admin/ProductEditor";
import Orders from "../components/admin/Orders";

import dataStore from "../store";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",

    routes: [
        { path: "/cart", component: ShoppingCart },
        { path: "/thanks", component: Thanks },
        { path: "/checkout", component: Checkout },
        { path: "/categories/:category", component: ProductList },
        { path: "/login", component: Login },
        {
            path: "/admin",
            component: Admin,
            beforeEnter(to, from, next) {
                if (dataStore.state.auth.authenticated) {
                    next();
                } else {
                    next("/login");
                }
            },
            children: [
                { path: "pages", component: AdminPages },
                { path: "pages/:op(add|edit)/:id?", component: PageEditor },
                { path: "products", component: Products },
                { path: "products/:op(add|edit)/:id?", component: ProductEditor },
                { path: "orders", component: Orders },
                { path: "*", redirect: "/admin/products" },
            ],
        },

        { path: "/:slug?", component: Pages },
        { path: "*", redirect: "/" },
    ],
});
