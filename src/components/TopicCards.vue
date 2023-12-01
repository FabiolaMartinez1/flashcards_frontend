<template @abrirModalCompartir="mostrarModalCompartir">
  <div class="container mt-3" >
      <div class=" ms-auto align-items-center d-flex justify-content-between">
        <!-- Espacio vacío a la izquierda para centrar el título -->
        <div v-if="typeTopic!=='compartidosConmigo'" style="width: 100px;"> <!-- Ajusta el ancho según sea necesario -->
          <!-- Espacio vacío -->
        </div>
        
        <h2 v-if="typeTopic === 'misTemas'" class="flex-grow-1 text-center">Mis Temas</h2>
        <h2 v-else-if="typeTopic === 'misFavoritos'">Mis Favoritos</h2>
        <h2 v-else-if="typeTopic === 'compartidosConmigo'">Compartidos conmigo</h2>
        <h2 v-else>Temas</h2>
        <!-- Grupo de Botones -->
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <div>
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" v-model="selectedFilter" value="all" @change="applyFilter">
            <label class="btn btn-outline-purple rounded" for="btnradio1">Todos</label>
          </div>
          <div v-if="typeTopic !== 'misFavoritos'">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" v-model="selectedFilter" value="favorite" @change="applyFilter">
            <label class="btn btn-outline-purple rounded" for="btnradio2">Mis Favoritos</label>
          </div>
          <div v-if="typeTopic === 'misFavoritos'">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" v-model="selectedFilter" value="topics" @change="applyFilter">
            <label class="btn btn-outline-purple rounded" for="btnradio3">Mis temas</label>
          </div>
          <div v-if="typeTopic === 'misFavoritos'">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" v-model="selectedFilter" value="shared" @change="applyFilter">
            <label class="btn btn-outline-purple rounded" for="btnradio4">Compartidos</label>
          </div>
        </div>
        
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
                    <li><a class="dropdown-item" href="#" @click.prevent="ViewCards(tema.topicId)">Ver detalles</a></li>
                    <li><a class="dropdown-item" href="#" @click.prevent="compartir(tema.topicId, tema.title)" >Compartir</a></li>
                    <li><a class="dropdown-item" href="#" @click.prevent="deleteTopic(tema.topicId)">Eliminar</a></li>
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
                  class="bi fs-5" @click="toggleFavorite(tema.userTopicId,tema.accessLevelId, tema.lastDate, tema.favorite)"></i>
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
import UserTopicService from '../service/UserTopicService.js';
import TagManagement from './TagManagement.vue';
import Swal from 'sweetalert2';
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
      selectedFilter: 'all',
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
      etiquetaSeleccionada: '',
      tags: [],
      user: null,
      sub: null,
      opt: 1,
      fav: 0,
      tagList: [],
    };
  },
  created(){
    this.topicService = new TopicService();
    this.userTopicService = new UserTopicService();
    // this.opt = 1;
    // this.fav = 0;
  },
  async mounted() {
    this.user = this.$auth0.user;
    this.sub = this.user.sub;
    this.applyFilter();
    // await this.getTopics(this.sub,this.op,this.fav,[]);
},
  methods: {
    async getTopics(sub, op, fav, tagList) {
      console.log("sub en topicCard: "+sub+" op: "+op+" fav: "+fav+" tagList: "+tagList);
      try {
        this.user = this.$auth0.user;
        this.sub = this.user.sub;
        console.log("sub en topicCard: "+this.sub);//FIXME
            this.topicService.getTopics(sub,op, fav, tagList).then((data) => {
                  this.temas = data;
                  console.log(this.temas);
                  // this.cerrarModal();
              });
          } catch (error) {
              console.error(error);
          }
    },
    // async getTopics() {
    //   try {
    //     this.user = await this.$auth0.user;
    //     this.sub = await this.user.sub;
    //     console.log("sub en topicCard: "+this.sub);
    //         this.topicService.getTopics(this.sub).then((data) => {
    //               this.temas = data;
    //               console.log(this.temas);
    //               // this.cerrarModal();
    //           });
    //       } catch (error) {
    //           console.error(error);
    //       }
    // },
    async deleteTopic(topicId) {
      console.log(topicId);
      try {
        this.user = await this.$auth0.user;
        this.sub = await this.user.sub;
            this.topicService.deleteTopic(topicId, this.sub).then((data) => {
                  console.log(data);
                  console.log("Tema borrada");
                  this.applyFilter();
              });
              
          } catch (error) {
              console.error(error);
          }
    },
    ViewCards(topicId) {
      // Redirige a la página de detalles
      this.$router.push({ name: 'ViewCards', //aqui
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
    receiveDataFromChild(data) {//TODO: mandar al getTopics
      console.log('Datos recibidos del hijo:', JSON.stringify(data));
      this.tagList = data;
      console.log('tagList: '+this.tagList);
      console.log("datos al get TT desde tags: "+"sub"+this.sub+"opt: "+this.opt+" fav: "+this.fav);
      this.getTopics(this.sub, this.opt, this.fav, this.tagList);
    },
    mostrarPopupEtiquetas(tema){
      console.log("etiquetas del tema: "+tema);
      console.log("etiquetas del tema: "+JSON.stringify(tema));
      this.tags = tema.tags;
      console.log("etiquetas del tema: "+this.etiquetas);
    },
    async toggleFavorite(userTopicId, accessLevelId, lastDate, favorite) {
      // Cambia el estado 'favorite' del tema específico
      this.user = await this.$auth0.user;
      this.sub = await this.user.sub;

      console.log("userTopicId: "+userTopicId+" accessLevelId: "+accessLevelId+" lastDate: "+lastDate+" favorite: "+favorite);
      if(favorite == 0){
        favorite = 1;
      }else{
        favorite = 0;
      }
            try{
                this.userTopicService.updateFavoriteByTopicId(userTopicId, accessLevelId, lastDate, favorite, this.sub).then((data) => {
                    if(data.responseCode == "F-003") {
                        Swal.fire(
                            'Actualizado',
                            'Se ha actualizado el estado de favorito',
                            'success'
                        );
                        this.getTopics(this.sub, this.opt, this.fav, this.tagList);
                    } else {
                        alert(data.responseMessage);
                    }
                    console.log(this.usersTopics);
                });
            } catch (error) {
                console.error(error);
            }
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
    },
    applyFilter() {
      console.log('Filtro seleccionado:', this.selectedFilter);
      // this.etiquetaSeleccionada = etiqueta;
      if(this.typeTopic=='misTemas' && this.selectedFilter==='all'){
        this.opt = 1;
        this.fav = 0;
      }else if(this.typeTopic=='misTemas' && this.selectedFilter==='favorite'){
        this.opt = 1;
        this.fav = 1;
      }else if(this.typeTopic=='misFavoritos' && this.selectedFilter==='all'){
        this.opt = 2;
        this.fav = 0;
      }else if(this.typeTopic=='misFavoritos' && this.selectedFilter==='topics'){
        this.opt = 1;
        this.fav = 1;
      }else if(this.typeTopic=='misFavoritos' && this.selectedFilter==='shared'){
        this.opt = 3;
        this.fav = 1;
      }else if(this.typeTopic=='compartidosConmigo' && this.selectedFilter==='all'){
        this.opt = 3;
        this.fav = 0;
      }else if(this.typeTopic=='compartidosConmigo' && this.selectedFilter==='favorite'){
        this.opt = 3;
        this.fav = 1;
      }

      // if(this.typeTopic==='misTemas'){
      //   this.opt = 1;
      // }else if(this.typeTopic==='misFavoritos'){
      //   this.opt = 2;
      // }else if(this.typeTopic==='compartidosConmigo'){
      //   this.opt = 3;
      // }
      // if(this.selectedFilter==='all'){
      //   this.fav = 0;
      // }else if(this.selectedFilter==='favorite'){
      //   this.fav = 1;
      // }else if(this.selectedFilter==='topics'){
      //   this.opt = 1;
      //   this.fav = 1;
      // }else if(this.selectedFilter==='shared'){
      //   this.opt = 3;
      //   this.fav = 1;
      // }
      console.log("datos al get TT: "+"sub"+this.sub+"opt: "+this.opt+" fav: "+this.fav);
      this.getTopics(this.sub, this.opt, this.fav, this.tagList);
    },
    async getTopicsByFavorite() {
      // Aquí puedes llamar a una función o realizar alguna acción
      // Por ejemplo, podrías emitir un evento o realizar una llamada API
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
  /* .btn-outline-purple {
    color: #6f42c1; Color del texto
    border-color: #6f42c1; Color del borde
  }

  .btn-outline-purple:hover {
    color: #fff; Color del texto al pasar el mouse
    background-color: #6f42c1; Color de fondo al pasar el mouse
    border-color: #6f42c1; Color del borde al pasar el mouse
  } */
  /*  */
  .btn-outline-purple {
    color: #4F2A93; /* Color del texto */
    border-color: #7051AE; /* Color del borde */
  }

  .btn-outline-purple:hover,
  .btn-check:checked + .btn-outline-purple {
    color: #fff; /* Color del texto al pasar el mouse y cuando está seleccionado */
    background-color: #4F2A93; /* Color de fondo al pasar el mouse y cuando está seleccionado */
    border-color: #4F2A93; /* Color del borde al pasar el mouse y cuando está seleccionado */
  }
</style>
