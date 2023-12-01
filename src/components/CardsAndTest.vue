<template>
  <div class="container mt-3">
    <div class="row">
      <!-- Content Cards Column -->
      <div class="col-md-8">
  
  <div class="d-flex justify-content md-2">
    <h1 :style="{ marginRight: '19px' }">Título del tema</h1>
    <!-- color picker -->
    <div class="d-flex">
      <input type="color" id="topicColor" name="topicColor" v-model="selectedColor">
    </div>
  </div>
  <p class="d-flex">Descripción... de mi tema... blah blah blah... blah blah blah... blah blah blah... blah blah blah... blah blah blah...</p>
  <!-- //TODO: poner a masomenos 115 ; 110 caracteres -->
  <!-- <tag-management @dataFromChild="receiveDataFromChild"></tag-management> -->
  <div class="card mt-3">
        <div class="card-body" :style="{ backgroundColor: selectedColor, borderRadius: '7px' }">
          <div class="overflow-auto" style="height: 450px;">
          <!-- Bucle v-for para mostrar las flashcards -->
          <div class="card mb-3 card-style" v-for="(flashcard, index) in flashcards" :key="index">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="d-flex align-items-center">
                  <i v-if="flashcard.ai == 1" class="fas bi bi-lightbulb-fill fa-2x me-2 icon-yellow"></i>
                  <i v-else class="fas bi bi-person-fill fa-2x me-2 icon-blue"></i>
                  <h5 class="card-title">Card {{index+1}}: {{ flashcard.front.substring(0, 45) + '...'  }}</h5>

                </div>
                <div class="dropdown">
                  <button class="btn btn-sm btn-transparent" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical fs-5"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <li><a v-if="flashcard.ai != 1" class="dropdown-item" href="#">Editar</a></li>
                    <li><a class="dropdown-item" href="#">Eliminar</a></li>
                    <li><a class="dropdown-item" href="#">Ver detalles</a></li>
                  </ul>
                </div>
              </div>
              <p class="d-flex card-text">{{ flashcard.back.substring(0, 90) + '...'  }}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
  </div>
  
      <!-- Score Section Column -->
      <div class="col-md-4">
        <!-- <br><br> -->
        <br>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <div>
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" v-model="selectedFilter" value="all" @change="applyFilter">
            <label class="btn btn-outline-purple rounded" for="btnradio1">Modo Estudio</label>
          </div>
          <div v-if="typeTopic !== 'misFavoritos'">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" v-model="selectedFilter" value="favorite" @change="applyFilter">
            <label class="btn btn-outline-purple rounded" for="btnradio2">Modo Test</label>
          </div>
        </div>
        <div style="height: 32px;"> 
          <!-- 32 Ajusta el alto según sea necesario -->
        </div>

        <div class="card text-center">
          <div class="card-header">
            Modo test
          </div>
          <div class="card-body" style="height: 442px;">
            <br>
            <h4 class="card-title">Puntuación:</h4>
            
            <div class="progress-circle">
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path class="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#eee"
            stroke-width="2.8"
            stroke-linecap="round"
          />

          <!-- El atributo 'stroke-dasharray' determina la longitud de la barra de progreso -->
          <path class="circle"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#000"
            stroke-width="2.8"
            stroke-linecap="round"
            stroke-dasharray="70, 100"
          />
          <text x="18" y="20.35" class="score" text-anchor="middle" alignment-baseline="central" font-size="4" fill="#333">70</text>
      
        </svg>
      </div>
      <br>
      <div class="total">11/15</div>  
      <br>
      <h4>Correctas: #</h4>
      <h4>Incorrectas: #</h4>
      <span>Último vez: dd/mm/aaaa</span>
      </div>
      
        </div>
      </div>
    </div>
  </div>  
  
  </template>
<script>
import FlashcardsService from '../service/FlashcardService';
// import TagManagement from './TagManagement.vue';
export default {
  components: {
    // 'tag-management': TagManagement
  },
  props: {
    topicId: Number,
  // shared: Boolean
  // favorite: Boolean
  },
  data() {
    return {
      // Datos de ejemplo para las flashcards
      // flashcards: [
      //   { title: 'Card#: Nombre card 1', description: 'Descripción aquí 1' },
      //   { title: 'Card#: Nombre card 2', description: 'Descripción aquí 2' },
      //   // ... más flashcards
      // ]
      flashcards: [],
      user: null,
      sub: null,
      // topicId: 4,
      selectedColor: '#E8E8E8' 
    };
  },
  created() {
    this.flashcardsService = new FlashcardsService();
    this.user = this.$auth0.user;
    this.sub = this.user.sub;
    console.log("sub en topicCard: "+this.sub);
    this.getFlashcards();
    console.log("topicId en topicCard: "+this.topicId);
  },
  methods: {
    async getFlashcards() {
      try{
        this.user =  this.$auth0.user;
        this.sub =  this.user.sub;
        console.log("sub: "+this.sub);
        const data = await this.flashcardsService.getFlashcards(this.topicId,this.sub);
        //TODO: validar el estado de la respuesta
        console.log("getFlashcards: "+data.responseCode);
        console.log("getFlashcards: "+data.data);
        this.flashcards = data.data;
        console.log("en topicCard"+this.flashcards);
      } catch (error) {
        console.log(error);
      }
    },
    receiveDataFromChild(data) {//TODO: mandar al getTopics
      console.log('Datos recibidos del hijo viewCards:', JSON.stringify(data));
      // this.tagList = data;
      // console.log('tagList: '+this.tagList);
      // console.log("datos al get TT desde tags: "+"sub"+this.sub+"opt: "+this.opt+" fav: "+this.fav);
      // this.getTopics(this.sub, this.opt, this.fav, this.tagList);
    },
  },
};
</script>
<style>
.icon-yellow {
  color: #ffc107; /* Color amarillo de Bootstrap para íconos */
}
.icon-blue{
  color: #4695BD /*#2A5AA3; /* Color azul de Bootstrap para íconos */
}
.circular-chart {
  display: block;
  margin: 10px auto;
  max-width: 35%;
  max-height: 250px;
}

.circle-bg {
  fill: none;
  stroke: #eee;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round; /* para bordes redondeados en el camino */
}

.score {
  font-size: 0.54em;
  color: #000;
}

.total {
  font-size: 1.2em;
  color: #666;
}
.card-style {
  border-radius: 15px; /* o cualquier otro valor que prefieras */
  border: 2px solid #e2e8f0;
}
body {
  background-color: #ffffff; /* Un tono azulado/gris claro */
}
</style>