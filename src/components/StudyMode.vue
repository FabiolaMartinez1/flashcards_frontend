<template>
    <div class="container mt-3">
        <div class="d-flex justify-content-between">
            <h1><i class="fas bi bi-box-arrow-left fa-1x me-2 icon-grey" @click="viewStudyMode(topicId)"></i>Study mode</h1>
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <div>
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" v-model="mode" value="study">
                    <label class="btn btn-outline-purple rounded" for="btnradio1">Modo Estudio</label>
                </div>
                <div v-if="typeTopic !== 'misFavoritos'">
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" v-model="mode" value="test" @change="applyFilter">
                    <label class="btn btn-outline-purple rounded" for="btnradio2">Modo Test</label>
                </div>
                </div>
        </div>
        <br>
        <div class="card mt-3">
        <div class="card-body">
        <div class="row">
            <!-- Columna de contenido principal -->
            <div class="col-md-9">
                <div class="card border-right-plomo">
                    <div class="card-body d-flex justify-content-center align-items-center">
                        <div class="card flashcard" onclick="this.querySelector('.card-content').classList.toggle('flip')">
                            <div class="card card-content">
                                <div class="card card-front">
                                <h3>Front</h3>
                                <p>This is the front of the flashcard.</p>
                                </div>
                                <div class="card-back">
                                <h3>Back</h3>
                                <p>This is the back of the flashcard.</p>
                                </div>
                            </div>
                            </div>
                    </div>
                    </div>

            </div>
            <!-- Barra lateral -->
            <div class="col-md-3">
                <div class="card overflow-auto" style="height: 460px;">
                    <ul class="list-group">
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <li class="list-group-item">Item One</li>
                        <li class="list-group-item">Item Two</li>
                        <!-- Más ítems -->
                    </ul>
                </div>
            
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
        mode: 'study',
        isFlipped: false,
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
      flipCard() {
        this.isFlipped = !this.isFlipped;
        },
      receiveDataFromChild(data) {//TODO: mandar al getTopics
        console.log('Datos recibidos del hijo viewCards:', JSON.stringify(data));
        // this.tagList = data;
        // console.log('tagList: '+this.tagList);
        // console.log("datos al get TT desde tags: "+"sub"+this.sub+"opt: "+this.opt+" fav: "+this.fav);
        // this.getTopics(this.sub, this.opt, this.fav, this.tagList);
      },
      viewStudyMode(topicId) {
        // Redirige a la página de studymode
        this.$router.push({ name: 'ViewCards', //aqui
        params: { topicId: topicId } });
      },
    },
  };
</script>
<style>
.icon-grey{
color: #90989b /*#2A5AA3; /* Color azul de Bootstrap para íconos */
}
.flashcard {
    width: 100%;
    height: 70%;
    margin: 5%;
    border: 1px solid #000;
    border-radius: 10px;
    perspective: 1000px;
    cursor: pointer;
  }
  .card-content {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border-color: #d4dcde;
  }
  .card-front {
    background-color: #fff;
  }
  .card-back {
    background-color: #f8f8f8;
    transform: rotateY(180deg);
  }
  .flip {
    transform: rotateY(180deg);
  }
  /*  */
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
  .border-right-plomo {
  border-right: 5px solid #B0BEC5; /* Color plomo */
  border-top: none;
  border-bottom: none;
  border-left: none;
  height: 460px; /* Si quieres que la altura sea parte de la clase */
}

  body {
    background-color: #f8fafc ; /* Un tono azulado/gris claro */
  }
  </style>