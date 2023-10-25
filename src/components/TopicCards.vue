<template>
    
    <h1>Topics</h1>
    <!-- Temas Section -->
    <div class="row">
            <div class="col-md-3 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Title</h5>
                        <p class="card-text">Description</p>
                        <p class="card-text">cards</p>
                        <a href="#" class="card-link"><i class="fa fa-star"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <button class="btn btn-primary btn-block" @click="addTema">Add New TEMA</button>
            </div>


            <!-- <div class="col-md-3 mb-4" v-for="tema in temas">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ tema.title }}</h5>
                        <p class="card-text">{{ tema.description }}</p>
                        <p class="card-text">{{ tema.cardCount }} cards</p>
                        <a href="#" class="card-link"><i class="fa fa-star"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <button class="btn btn-primary btn-block" @click="addTema">Add New TEMA</button>
            </div> -->
        </div > 
</template>

<script>
export default{
    name: 'TopicCards',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    created() {
        console.log('TopicCards.vue created')
    },
    methods: {
        sayHello() {
            alert('Hello')
        }
    }
}
</script>