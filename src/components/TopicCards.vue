<template>
    <div class="container mt-3">
        <div class="d-flex mb-4 ms-auto align-items-center">
          <h2 class="">Mis Temas</h2>
          <!-- Dropdown de Bootstrap para las etiquetas -->
          <div class="d-flex dropdown ms-auto">
          <!-- <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"> -->
            <button class="btn btn-outline-secondary" type="button" id="dropdownMenuButton"
              data-bs-toggle="dropdown" aria-expanded="false"
              style="color: white; background-color: #4F2A93; border-color: #4F2A93">
            <i class="bi bi-filter"></i> Etiquetas
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li v-for="etiqueta in etiquetas" :key="etiqueta">
              <a class="dropdown-item" href="#" @click="seleccionarEtiqueta(etiqueta)">{{ etiqueta }}</a>
              </li>
          </ul>
          </div>
        </div>
        
        <!-- Tarjetas que se alinearán en tres columnas en pantallas medianas en adelante -->
        <div class="row">
          <div class="col-md-4 mb-3" v-for="(tema, index) in temas" :key="index">
            <div class="card" :style="{ backgroundColor: tema.color || 'white', borderWidth: '2px' }">
              <div class="card-body">
                <!-- Contenedor para título y botón de menú -->
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="card-title">{{ tema.title }}</h5>
                  <div class="dropdown">
                    <button class="btn btn-sm btn-transparent" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-three-dots-vertical fs-5"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" href="#" @click.prevent="deleteTopic(tema.topicId)">Eliminar</a></li>
                      <li><a class="dropdown-item" href="#" @click.prevent="verDetalles(tema.topicId)">Ver detalles</a></li>
                      <li><a class="dropdown-item" href="#" @click.prevent="compartir(tema.topicId)">Compartir</a></li>
                    </ul>
                  </div>
                </div>
                <!-- Descripción -->
                <!-- <p class="d-flex card-text">{{ tema.description }}</p> -->
                <p class="d-flex card-text">{{ tema.description.substring(0, 35) + '...' }}</p>

                <!-- Contenedor para cantidad de tarjetas e íconos -->
                <div class="d-flex justify-content-between align-items-center">
                  <!-- <small class="text-muted">{{ tema.cantidad }} cards</small> -->
                  <small class="text-muted">15 cards</small>
                  <div class="d-flex">
                    <i class="bi bi-tags-fill me-2 fs-5" v-b-tooltip.hover title="Etiquetas" @click="mostrarPopupEtiquetas(tema)"></i>

                    <i :class="{'bi-star-fill text-danger': tema.favorite, 'bi-star': !tema.favorite}" 
                    class="bi fs-5" @click="toggleFavorite(index)"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Botón flotante para agregar temas -->
        <button class="floating-button" @click="mostrarFormularioTema">+</button>

        <!-- Componente modal de formulario de tema -->
        <!-- <topic-form ref="topicFormModal"></topic-form> -->
        <topic-form ref="topicFormModal" @update-topics-list="getTopics"></topic-form>

    </div>
  </template>
  
  <script>
  import TopicForm from './TopicForm.vue';
  import TopicService from '../service/TopicService.js';

  export default {
    components: {
      'topic-form': TopicForm
    },
    data() {
      return {
        temas: [
        // // Supongamos que tienes un array de objetos para cada tarjeta
        // { topicId: 1, titulo: 'Tema 1', descripcion: 'Descripción del Tema 1', cantidad: 15, color:'#FFD1DC' },
        // { topicId: 1, titulo: 'Tema 2', descripcion: 'Descripción del Tema 2', cantidad: 15, color:'#A8E6CF' },
        // { topicId: 1, titulo: 'Tema 3', descripcion: 'Descripción del Tema 3', cantidad: 15, color:'#A7C7E7' },
        // { topicId: 1, titulo: 'Tema 1', descripcion: 'Descripción del Tema 1', cantidad: 15, color:'#FFF0AC' },
        // { topicId: 1, titulo: 'Tema 2', descripcion: 'Descripción del Tema 2', cantidad: 15, color:'#92E6E6' },
        // { topicId: 1, titulo: 'Tema 3', descripcion: 'Descripción del Tema 3', cantidad: 15, color:'#B5AED4' },
        // { topicId: 1, titulo: 'Tema 1', descripcion: 'Descripción del Tema 1', cantidad: 15, color:'#FFD1DC' },
        // { topicId: 1, titulo: 'Tema 2', descripcion: 'Descripción del Tema 2', cantidad: 15, color:'#FFAD88' },
        // { topicId: 1, titulo: 'Tema 3', descripcion: 'Descripción del Tema 3', cantidad: 15, color:'#E4FFD0' },
        // { topicId: 1, titulo: 'Tema 1', descripcion: 'Descripción del Tema 1', cantidad: 15, color:'#FF9190' },
        // { topicId: 1, titulo: 'Tema 2', descripcion: 'Descripción del Tema 2', cantidad: 15, color:'#CFCFC4' },
        // { topicId: 1, titulo: 'Tema 3', descripcion: 'Descripción del Tema 3', cantidad: 15, color:'#FFFFFF' },
        
        // { topicId: 1, titulo: 'Tema 3', descripcion: 'Descripción del Tema 3', cantidad: 15, color:'#A7C7E7' },
        // { topicId: 1, titulo: 'Tema 1', descripcion: 'Descripción del Tema 1', cantidad: 15, color:'#FFF0AC' },
        // { topicId: 1, titulo: 'Tema 2', descripcion: 'Descripción del Tema 2', cantidad: 15, color:'#92E6E6' },
        // { topicId: 1, titulo: 'Tema 3', descripcion: 'Descripción del Tema 3', cantidad: 15, color:'#B5AED4' },
        // { topicId: 1, titulo: 'Tema 1', descripcion: 'Descripción del Tema 1', cantidad: 15, color:'#FFD1DC' },
        // { topicId: 1, titulo: 'Tema 2', descripcion: 'Descripción del Tema 2', cantidad: 15, color:'#FFAD88' },
        // { topicId: 1, titulo: 'Tema 3', descripcion: 'Descripción del Tema 3', cantidad: 15, color:'#E4FFD0' },
        // { topicId: 1, titulo: 'Tema 1', descripcion: 'Descripción del Tema 1', cantidad: 15, color:'#FF9190' },
        // { topicId: 1, titulo: 'Tema 2', descripcion: 'Descripción del Tema 2', cantidad: 15, color:'#CFCFC4' },
        // ... más tarjetas
      ],
        etiquetas: ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3'], // Añade aquí tus etiquetas
        etiquetaSeleccionada: ''
      };
    },
    created(){
        this.topicService = new TopicService();
    },
    async mounted(){
      this.getTopics();
    },
    methods: {
      getTopics() {
        try {
              this.topicService.getTopics().then((data) => {
                    this.temas = data;
                    console.log(this.temas);
                });
            } catch (error) {
                console.error(error);
            }
      },
      deleteTopic(topicId) {
        console.log(topicId);
        try {
              this.topicService.deleteTopic(topicId).then((data) => {
                    console.log(data);
                    console.log("Tema borrada");
                    this.getTopics();
                });
                
            } catch (error) {
                console.error(error);
            }
      },
      verDetalles(id) {
        // Redirige a la página de detalles
        this.$router.push({ name: 'Detalles', params: { id: id } });
      },
      compartir(id) {
        // Emite un evento para abrir un popup desde otro componente
        this.$emit('abrirPopupCompartir', id);
      },
      mostrarPopupEtiquetas(tema){
        console.log("etiquetas del tema: "+tema);
      },
      toggleFavorite(index) {
        // Cambia el estado 'favorite' del tema específico
        this.temas[index].favorite = !this.temas[index].favorite;
      },
      mostrarFormularioTema() {
        // Aquí abrimos el modal utilizando una referencia al componente TopicForm
        // eslint-disable-next-line no-undef
        let modal = new bootstrap.Modal(this.$refs.topicFormModal.$el);
        // let modal = new bootstrap.Modal(this.$refs.topicFormModal.$el);
        modal.show();
      },
      seleccionarEtiqueta(etiqueta) {
        this.etiquetaSeleccionada = etiqueta;
        // Aquí puedes agregar la lógica adicional que ocurra después de seleccionar una etiqueta
      }
    }
  };
  </script>
  
  <style>
  .btn-flotante {
    position: fixed;
    right: 30px;
    bottom: 30px;
    font-size: 24px;
  }
    .floating-button {
        width: 60px; /* Ancho del botón */
        height: 60px; /* Altura del botón */
        border-radius: 50%; /* Hace que el botón sea redondo */
        background-color: #4F2A93; /* Color de fondo del botón */
        color: #FFF; /* Color del símbolo o texto del botón */
        text-align: center; /* Centra el símbolo o texto del botón */
        font-size: 30px; /* Tamaño del símbolo o texto del botón */
        position: fixed; /* Posición fija */
        bottom: 20px; /* Distancia desde el borde inferior */
        right: 20px; /* Distancia desde el borde derecho */
        border: none; /* Sin borde */
        outline: none; /* Sin outline al hacer foco */
        cursor: pointer; /* Cambia el cursor al pasar por encima */
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26); /* Sombra sutil */
    }

    .floating-button:hover {
        background-color: #7051AE; /* Color de fondo al pasar el ratón por encima */
    }

    /* Si necesitas estilos adicionales para el icono de estrella */
    .bi-star-fill.text-danger {
      color: red; /* O cualquier otro color que prefieras */
    }

    .bg-custom-color {
      background-color: rgb(208, 170, 244); /* Reemplaza con tu color personalizado */
    }
  </style>
  