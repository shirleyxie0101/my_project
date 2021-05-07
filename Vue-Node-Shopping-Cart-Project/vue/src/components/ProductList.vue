<template>
    <div class="row mt-3">
        <CategoryList />

        <div class="col-9">
            <div class="row">
                <div class="col-4 mt-3" v-for="(p, i) in products" :key="i">
                    <p>
                        <img :src="productImages + p.image" class="img-fluid" />
                    </p>
                    <h3>
                        {{ p.name }}
                    </h3>
                    <p>
                        {{ p.description }}
                    </p>
                    <p>
                        {{ p.price | currency }}
                    </p>
                    <p>
                        <button
                            class="btn btn-primary"
                            @click="handleAddProduct(p)"
                        >
                            Add to cart
                        </button>
                    </p>
                </div>
            </div>
            <ProductPagination />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import CategoryList from "./CategoryList";
import ProductPagination from "./ProductPagination";

export default {
    components: { CategoryList, ProductPagination },
    computed: {
        ...mapState(["products", "productImages"]),
    },
    methods: {
        ...mapActions(["setProductsByCategoryAction"]),
        ...mapMutations(["setCurrentCategory", "setCurrentPage"]),
        ...mapMutations({
            addProduct: "cart/addProduct",
        }),
        handleAddProduct(product) {
            this.addProduct(product);
        },
    },
    created() {
        this.setCurrentPage(1);
        const category = this.$route.params.category;
        this.setProductsByCategoryAction(category);
        this.setCurrentCategory(category);
    },
    beforeRouteUpdate(to, from, next) {
        this.setCurrentPage(1);
        const category = to.params.category;
        this.setProductsByCategoryAction(category);
        this.setCurrentCategory(category);
        next();
    },
};
</script>
