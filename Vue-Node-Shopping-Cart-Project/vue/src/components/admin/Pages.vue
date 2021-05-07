<template>
    <div>
        <h2>Pages</h2>

        <router-link class="btn btn-primary mb-4" to="/admin/pages/add"
            >Add Page</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in pages" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">{{ p.slug }}</td>
                    <td class="align-middle">
                        <button
                            class="btn btn-sm btn-secondary mx-2"
                            @click="handleEdit(p)"
                        >
                            Edit
                        </button>
                        <button
                            class="btn btn-sm btn-danger mx-2"
                            @click="deletePage(p)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState(["pages"]),
    },
    methods: {
        ...mapActions(["deletePage"]),
        handleEdit(page) {
            this.$router.push(`/admin/pages/edit/${page._id}`);
        },
    },
};
</script>
