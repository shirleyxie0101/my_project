export default {
    namespaced: true,

    state: {
        cart: [],
    },
    getters: {
        itemCount: (state) =>
            state.cart.reduce(
                (total, cartItem) => total + cartItem.quantity,
                0
            ),
        totalPrice: (state) =>
            state.cart.reduce(
                (total, cartItem) =>
                    total + cartItem.quantity * cartItem.product.price,
                0
            ),
    },
    mutations: {
        addProduct(state, product) {
            const cartItem = state.cart.find(
                (cartItem) => cartItem.product._id == product._id
            );
            if (cartItem != null) {
                cartItem.quantity++;
            } else {
                state.cart.push({ product: product, quantity: 1 });
            }
        },

        subtractProduct(state, id) {
            const cartItem = state.cart.find(
                (cartItem) => cartItem.product._id == id
            );
            if (cartItem.quantity == 1) {
                const index = state.cart.findIndex(
                    (cartItem) => cartItem.product._id == id
                );
                if (index != -1) {
                    state.cart.splice(index, 1);
                }
            } else {
                cartItem.quantity--;
            }
        },

        removeProduct(state, id) {
            const index = state.cart.findIndex(
                (cartItem) => cartItem.product._id == id
            );
            if (index != -1) {
                state.cart.splice(index, 1);
            }
        },

        setCartData(state, data) {
            state.cart = data;
        },
    },
    actions: {
        loadCartData(context) {
            const data = localStorage.getItem("cart");
            if (data != null) {
                context.commit("setCartData", JSON.parse(data));
            }
        },
        storeCartData(context) {
            localStorage.setItem("cart", JSON.stringify(context.state.cart));
        },
        initializeCart(context, store) {
            context.dispatch("loadCartData");
            store.watch(
                (state) => state.cart.cart,
                () => context.dispatch("storeCartData"),
                { deep: true }
            );
        },
        clearCartData(context) {
            context.commit("setCartData", []);
        }
    },
};
