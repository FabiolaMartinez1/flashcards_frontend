<template>
    <div>
        <AccessForm v-if="showAccessForm===true" :topicId="topicId"/>
    </div>
</template>
    
<script>
import AccessForm from '../components/AccessForm.vue';
export default {
    components: {
        AccessForm
    },
    data() {
        return {
            topicId: null,
            showAccessForm: false,
        }; 
    },
    mounted() {
            // Accede a $route.params para obtener el valor de topicId de la ruta
            console.log("ese es el id de la ruta" + this.$route.params.topicId);
        this.topicId = this.$route.params.topicId;
        console.log('este es el topicID : ' + this.topicId)
        this.showAccessForm = true;
    },
};

</script>