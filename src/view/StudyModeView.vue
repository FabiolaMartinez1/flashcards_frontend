<template>
    <div>
        <StudyMode :topic-id="topicId" />
    </div>
</template>

<script>
import StudyMode from '../components/StudyMode.vue';

export default {
    components: {
        StudyMode
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
