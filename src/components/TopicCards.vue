<template @abrirModalCompartir="mostrarModalCompartir">
  <div class="container mt-3" >
      <div class=" ms-auto align-items-center">
        <h2 v-if="typeTopic === 'misTemas'">Mis Temas</h2>
        <h2 v-else-if="typeTopic === 'misFavoritos'">Mis Favoritos</h2>
        <h2 v-else-if="typeTopic === 'compartidosConmigo'">Compartidos conmigo</h2>
        <h2 v-else>Temas</h2>
        
      </div>
      <!-- Dropdown de Bootstrap para las etiquetas -->
      <div class="mb-4 ms-auto align-items-center">
        <tag-management v-if="typeTopic !== 'compartidosConmigo'" @dataFromChild="receiveDataFromChild"></tag-management>
      
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
                    <li><a class="dropdown-item" href="#" @click.prevent="ViewCards(tema.topicId)">Ver detalles</a></li>
                    <li><a class="dropdown-item" href="#" @click.prevent="compartir(tema.topicId, tema.title)" >Compartir</a></li>
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
                <!-- <button type="button" class="btn btn-secondary"
                        data-bs-toggle="tooltip" data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="This top tooltip is themed via CSS variables.">
                  Custom tooltip
                </button> -->
              </div>
              
            </div>
            <!-- aqui es -->
            <!-- <access-form  ref="accessFormModal"/> -->
          </div>
        </div>
      </div>
      
      <!-- Botón flotante para agregar temas -->
      <button v-if="typeTopic === 'misTemas'" class="floating-button" @click="mostrarFormularioTema">+</button>

      <!-- Componente modal de formulario de tema -->
      <!-- <topic-form ref="topicFormModal"></topic-form> -->
      <topic-form v-if="typeTopic === 'misTemas'" ref="topicFormModal" @update-topics-list="getTopics"></topic-form>

      

  </div>
</template>

<script>
import TopicForm from './TopicForm.vue';
import TopicService from '../service/TopicService.js';
import TagManagement from './TagManagement.vue';
// import AccessForm from './AccessForm.vue';

export default {
  components: {
    'topic-form': TopicForm,
    'tag-management': TagManagement
    // 'access-form': AccessForm
  },
  props: {
    typeTopic: String
  // shared: Boolean
  // favorite: Boolean
  },
  data() {
    return {
      mostrarModalCompartir: false,
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
    // this.$refs.TopicForm.$on('close-modal', this.cerrarModal);
  },
  methods: {
    getTopics() {
      try {
            this.topicService.getTopics().then((data) => {
                  this.temas = data;
                  console.log(this.temas);
                  // this.cerrarModal();
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
    ViewCards(topicId) {
      // Redirige a la página de detalles
      this.$router.push({ name: 'ViewCards', 
      params: { topicId: topicId } });
    },
    async compartir(topicId, topicTitle) {
      // Emite un evento para abrir un popup desde otro componente
      console.log("Compartir tema: "+topicId);
    // await this.showAccessForm(topicId);
      this.$router.push({
        name: 'AccessUserTopic',
        params: { topicId: topicId, topicTitle: topicTitle  },
      });
        
    },
    receiveDataFromChild(data) {
      console.log('Datos recibidos del hijo:', data);
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
    // cerrarModal() {
    //   // Cerrar el modal
      
    //   // eslint-disable-next-line no-undef
    //   let modal = new bootstrap.Modal(this.$refs.topicFormModal.$el);
    //   modal.hide();
    // },
    async showAccessForm(topicId) {
      // Crear una instancia del modal AccessForm utilizando su referencia
      this.$nextTick(() => {
      // eslint-disable-next-line no-undef
      let modalAccess = new bootstrap.Modal(this.$refs.accessFormModal, {});
      // Pasar el topicId al componente AccessForm
      this.$refs.accessFormModal.topicId = topicId;
      // Mostrar el modal AccessForm
      if (modalAccess && modalAccess._backdrop) {
        // Mostrar el modal AccessForm
        modalAccess.show();
      }
      });
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
