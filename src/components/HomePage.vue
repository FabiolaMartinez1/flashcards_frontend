<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    created() {
        console.log('HomePage.vue created')
    },
    methods: {
        sayHello() {
            alert('Hello')
        }
    }
}
</script>