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
                    <button type="submit" class="btn btn-primary ms-2" style="color: white; background-color: #4F2A93; border-color: #4F2A93">Aceptar</button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </template>
    
    <script>
    
    import TopicService from '../service/TopicService.js';
    export default {
        data() {
        return {
            topic:{
                title: '',
                description: '',
                color: '#FFFFFF',
            },
            cantidadTarjetas: 0,
            etiquetasSeleccionadas: [],
            etiquetasDisponibles: ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3'], // Ejemplo de etiquetas disponibles
        };
        },
        created(){
            this.topicService = new TopicService();
        },
        methods: {
        submitForm() {
            // Lógica para procesar el formulario
            // console.log('Formulario datos:', this.nuevoTema, this.descripcion, this.cantidadTarjetas, this.color, this.etiquetasSeleccionadas);
            console.log('Formulario datos:', this.title, this.description, this.cantidadTarjetas, this.color, this.etiquetasSeleccionadas);

            console.log("Datos en topic: "+this.topic.title + this.topic.description + this.topic.color);
            try {
                this.topicService.createTopic(this.topic).then((data) => {
                    console.log(data);
                    console.log("Tema creado");
                    this.$emit('update-topics-list');
                });
            } catch (error) {
                console.error(error);
            }

            this.$emit('close');
            },

        }
    };
    </script>
    