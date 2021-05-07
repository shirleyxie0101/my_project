<template>
    <div v-if="show" class="text-danger">
        <div v-for="(m, i) in messages" :key="i">
            {{ m }}
        </div>
    </div>
</template>

<script>
export default {
    props: ["validation"],
    computed: {
        show() {
            return this.validation.$dirty && this.validation.$invalid;
        },
        messages() {
            let messages = [];

            if (this.validation.$dirty) {
                if (this.hasValidationError("required")) {
                    messages.push("Please enter a value.");
                } else if (this.hasValidationError("email")) {
                    messages.push("Please enter a valid email.");
                }
            }

            return messages;
        },
    },
    methods: {
        hasValidationError(type) {
            return (
                Object.prototype.hasOwnProperty.call(
                    this.validation.$params,
                    type
                ) && !this.validation[type]
            );
        },
    },
};
</script>
