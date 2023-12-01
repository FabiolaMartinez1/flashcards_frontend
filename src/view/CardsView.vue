<template>
    <div>
        <CardsAndTest :topic-id="topicId" />
    </div>
</template>

<script>
import CardsAndTest from '../components/CardsAndTest.vue';

export default {
    components: {
        CardsAndTest
    },
    data() {
        return {
            topicId: null // Inicializa topicId
        };
    },
    created() {
        this.topicId = this.$route.params.topicId; // Obtiene el topicId de los parámetros de la ruta
    }
};
</script>
