<template>
    <div class="row mt-3">
        <CategoryList />

        <div class="col-9">
            <h2 class="display-4">Your cart</h2>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="itemCount == 0">
                        <td colspan="5" class="text-center">
                            Your cart is empty.
                        </td>
                    </tr>
                    <tr v-else v-for="(c, i) in cart" :key="i">
                        <td>{{ c.product.name }}</td>
                        <td>{{ c.quantity }}</td>
                        <td>
                            <button
                                class="btn small btn-primary mx-1"
                                @click="handleAddProduct(c.product)"
                            >
                                +
                            </button>
                            <button
                                class="btn small btn-warning mx-1"
                                @click="handleSubtractProduct(c.product._id)"
                            >
                                -
                            </button>
                            <button
                                class="btn small btn-danger mx-1"
                                @click="handleRemoveProduct(c.product._id)"
                            >
                                remove
                            </button>
                        </td>
                        <td>{{ c.product.price | currency }}</td>
                        <td>{{ (c.product.price * c.quantity) | currency }}</td>
                    </tr>
                </tbody>
                <tfoot v-if="itemCount > 0">
                    <tr>
                        <td colspan="5" class="text-right">
                            <h4>Total: {{ totalPrice | currency }}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <button
                                class="btn btn-danger float-left"
                                @click="handleClearCart"
                            >
                                Clear Cart
                            </button>
                            <router-link
                                to="/checkout"
                                class="btn btn-primary float-right"
                                >Checkout</router-link
                            >
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

import CategoryList from "./CategoryList";

export default {
    components: { CategoryList },
    computed: {
        ...mapState({ cart: (state) => state.cart.cart }),
        ...mapGetters({
            itemCount: "cart/itemCount",
            totalPrice: "cart/totalPrice",
        }),
    },
    methods: {
        ...mapMutations({
            addProduct: "cart/addProduct",
            subtractProduct: "cart/subtractProduct",
            removeProduct: "cart/removeProduct",
        }),
        ...mapActions({
            clearCartData: "cart/clearCartData",
        }),
        handleAddProduct(product) {
            this.addProduct(product);
        },
        handleSubtractProduct(id) {
            this.subtractProduct(id);
        },
        handleRemoveProduct(id) {
            this.removeProduct(id);
        },
        handleClearCart() {
            this.clearCartData();
        },
    },
};
</script>
