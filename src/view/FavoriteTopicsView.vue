<template>
    <!-- <h1>Mis favoritos</h1> -->
    <div>
        <TopicCards typeTopic="misFavoritos"/>
    </div>
</template>
    
<script>
    import TopicCards from '../components/TopicCards.vue';
        export default {
            components: {
                TopicCards
            }
        };
</script>