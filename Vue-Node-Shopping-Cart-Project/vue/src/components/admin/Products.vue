<template>
    <div>
        <h2>Products</h2>

        <router-link class="btn btn-primary mb-4" to="/admin/products/add"
            >Add Product</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in products" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">
                        <img :src="productImages + p.image" width="100" />
                    </td>
                    <td class="align-middle">{{ p.price | currency }}</td>
                    <td class="align-middle">{{ p.category }}</td>
                    <td class="align-middle">
                        <button
                            class="btn btn-sm btn-secondary mx-2"
                            @click="handleEdit(p)"
                        >
                            Edit
                        </button>
                        <button
                            class="btn btn-sm btn-danger mx-2"
                            @click="deleteProduct(p)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <ProductPagination />
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import ProductPagination from "../ProductPagination";

export default {
    components: { ProductPagination },
    computed: {
        ...mapState(["products", "productImages"]),
    },
    methods: {
        ...mapMutations(["setCurrentCategory"]),
        ...mapActions(["setProductsByCategoryAction", "deleteProduct"]),
        handleEdit(product) {
            this.$router.push(`/admin/products/edit/${product._id}`);
        },
    },
    created() {
        this.setCurrentCategory("all");
        this.setProductsByCategoryAction("all");
    },
};
</script>
