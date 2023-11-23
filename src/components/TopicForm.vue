<template>
    <div class="modal fade" id="topicFormModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalLabel">Agregar tema</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="title" class="form-label d-flex">Nuevo tema:</label>
                    <input type="text" class="form-control" id="title" v-model="topic.title" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label d-flex">Descripción:</label>
                    <textarea class="form-control" id="description" v-model="topic.description" required></textarea>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                    <div>
                        <label for="cantidadTarjetas" class="form-label d-flex">Tarjetas con IA:</label>
                        <input type="number" class="form-control" id="cantidadTarjetas" v-model.number="cantidadTarjetas">
                    </div>
                    <div>
                        <label for="color" class="form-label d-flex">Color:</label>
                        <input type="color" class="form-control form-control-color" id="color" v-model="topic.color">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="etiquetas" class="form-label d-flex">Etiquetas:</label>
                    <select class="form-select" id="etiquetas" v-model="etiquetasSeleccionadas">
                        <option v-for="etiqueta in etiquetasDisponibles" :key="etiqueta" :value="etiqueta">{{ etiqueta }}</option>
                    </select>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal" style="color: white; background-color: #4F2A93; border-color: #4F2A93">Cancelar</button>
                    <button type="submit" class="btn btn-primary ms-2" data-bs-dismiss="modal" style="color: white; background-color: #4F2A93; border-color: #4F2A93">Aceptar</button>
                    <!-- TODO: cerrar cuando de aceptar y el campo esta lleno -->
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </template>
    
    <script>
    
    import TopicService from '../service/TopicService.js';
    import OpenAIService from '../service/OpenAIService.js';
    export default {
        data() {
        return {
            // profile:{},
            topic:{
                title: '',
                description: '',
                color: '#FFFFFF',
            },
            dataAI:{
                title: '',
                description: '',
                academicDegree: '',
                age: '',
            },
            cantidadTarjetas: 0,
            etiquetasSeleccionadas: [],
            etiquetasDisponibles: ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3'], // Ejemplo de etiquetas disponibles
        };
        },
        created(){
            this.topicService = new TopicService();
            this.openAIService = new OpenAIService();
        },
        methods: {
        submitForm() {
            console.log("numero de tarjetas: "+this.cantidadTarjetas);
            // Lógica para procesar el formulario
            // console.log('Formulario datos:', this.nuevoTema, this.descripcion, this.cantidadTarjetas, this.color, this.etiquetasSeleccionadas);
            // console.log('Formulario datos:', this.title, this.description, this.cantidadTarjetas, this.color, this.etiquetasSeleccionadas);

            console.log("Datos en topic: "+this.topic.title + this.topic.description + this.topic.color);
            try {
                this.topicService.createTopic(this.topic).then((data) => {
                    console.log(data);
                    console.log("Tema creado");
                    this.$emit('update-topics-list');
                });
                
                this.createCards(this.cantidadTarjetas, this.topic.title, this.topic.description);
            } catch (error) {
                console.error(error);
            }
            this.$emit('close');
            },

        //funcion con un for para llamar a la funcion de crear tarjetas por cada cantidad de tarjeta
        async createCards(cantTarjetas, title, description){
            console.info("createcards Creando tarjetas...");
            const age=15;
            const grade = "Estudiante de secundaria";
            try {
                // const data = await this.userService.getUserProfile(localStorage.getItem('mail'));
                // this.profile = data;
                // console.log("Datos recibidos para card:", data);
                // console.log("Datos recibidos para card:", this.profile);
            } catch (error) {
                //profile por default
                // this.profile = {
                //     id: 1,
                //     name: 'Nombre de usuario',
                //     topics: 0,
                //     createdDate: '2021-10-10',
                // };
                console.log(error);
            }
        
            for (let i = 0; i < cantTarjetas; i++) {
                console.log("for"+i);
                this.createCard(title, description, grade, age);
            }
        },
        //funcion para crear tarjetas
        createCard(title, description, academicDegree, age){
            console.info("api Creando tarjeta...");
            try {
                this.dataAI.title = title;
                this.dataAI.description = description;
                this.dataAI.academicDegree = academicDegree;
                this.dataAI.age = age;
                // this.openAIService.OpenAIService(this.dataAI).then((data) => {
                //     console.log(data);
                //     console.log("Tarjeta creada");
                // });
                this.openAIService.createdCardWithAI(this.dataAI).then((data) => {
                    alert(JSON.stringify(data)); // Muestra la respuesta en un alert
                });

            } catch (error) {
                console.error(error);
            }
            this.$emit('close');
        },
    }
};
</script>