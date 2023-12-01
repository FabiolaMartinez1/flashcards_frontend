<template>
    <div>
        <h1>Home</h1>
        <!-- Botón Crear -->
  <button @click="createFlashcardPersonal()">Crear</button>
  <!-- Botón Editar -->
<button @click="editFlashcardPersonal()">Editar</button>

<!-- Botón Ver -->
<button @click="getDetailsFlashcard()">Ver</button>
  <FlashcardForm ref="flashcardForm" :propFromParent="propToPass" />


    </div>
</template>

<script>
import FlashcardForm from './FlashcardForm.vue';
export default {
    name: 'HomePage',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            propToPass: null,
            flashcardId: null,
        }
    },
    components: {
        FlashcardForm,
    },
    created() {
        console.log('HomePage.vue created')
        
    },
    methods: {
        sayHello() {
            alert('Hello')
        },
        createFlashcardPersonal() {
            this.propToPass="Crear";
            console.log("propToPass en HomePage: " + this.propToPass);
            this.$refs.flashcardForm.mostrarModal();
        },
        editFlashcardPersonal() {
            this.propToPass="Editar";
            console.log("propToPass en HomePage: " + this.propToPass);
            this.$refs.flashcardForm.mostrarModal();
        },
        getDetailsFlashcard() {
            this.propToPass="Ver detalles";
            this.flashcardId=7;
            console.log("propToPass en HomePage: " + this.propToPass);
            this.$refs.flashcardForm.mostrarModal();
        },
        
        
    }
}
</script>