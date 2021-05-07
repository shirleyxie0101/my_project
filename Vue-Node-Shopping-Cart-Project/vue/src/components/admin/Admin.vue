<template>
    <div class="row p-3">
        <div class="col-3 bg-secondary p-2">
            <router-link class="btn btn-block btn-primary" to="/admin/products"
                >Products</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/pages"
                >Pages</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/orders"
                >Orders</router-link
            >
        </div>
        <div class="col">
            <router-view />
        </div>
    </div>
</template>
