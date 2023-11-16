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
                    <label for="nuevoTema" class="form-label d-flex">Nuevo tema:</label>
                    <input type="text" class="form-control" id="nuevoTema" v-model="nuevoTema">
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label d-flex">Descripción:</label>
                    <textarea class="form-control" id="descripcion" v-model="descripcion"></textarea>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                    <div>
                        <label for="cantidadTarjetas" class="form-label d-flex">Tarjetas con IA:</label>
                        <input type="number" class="form-control" id="cantidadTarjetas" v-model.number="cantidadTarjetas">
                    </div>
                    <div>
                        <label for="color" class="form-label d-flex">Color:         </label>
                        <input type="color" class="form-control form-control-color" id="color" v-model="color">
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
    export default {
        data() {
        return {
            nuevoTema: '',
            descripcion: '',
            cantidadTarjetas: 3,
            color: '#000000',
            etiquetasSeleccionadas: [],
            etiquetasDisponibles: ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3'], // Ejemplo de etiquetas disponibles
        };
        },
        methods: {
        submitForm() {
            // Lógica para procesar el formulario
            console.log('Formulario enviado:', this.nuevoTema, this.descripcion, this.cantidadTarjetas, this.color, this.etiquetasSeleccionadas);
            // Cerrar el modal después de enviar
            this.$emit('close');
        }
        }
    };
    </script>
    