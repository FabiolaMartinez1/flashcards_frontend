<template>
  
  <div class="container mt-3" ref="cardsAndTestComponent">
    <div class="row">
      <!-- Content Cards Column -->
      <div class="col-md-8">
  
  <div class="d-flex justify-content md-2">
    <h1 :style="{ marginRight: '19px' }">{{topic.title}}</h1>
    <!-- color picker -->
    <div class="d-flex">
      <input type="color" id="topicColor" name="topicColor" v-model="selectedColor" @change="updateColor">
    </div>
  </div>
  <p class="d-flex">{{ topic.description }}</p>
  <!-- //TODO: poner a masomenos 115 ; 110 caracteres -->
  <!-- <tag-management @dataFromChild="receiveDataFromChild"></tag-management> -->
  <div class="card mt-3" @update-flashcards-list="getFlashcards">
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
                    <!-- <li><a class="dropdown-item" href="#">Ver detalles</a></li> -->
                    <!-- <li><a v-if="flashcard.ai != 1" class="dropdown-item" href="#">Editar</a></li> -->
                    <li>
                        <button class="btn btn-link dropdown-item" @click="getDetailsFlashcard(flashcard.cardId)">
                            Ver detalles
                        </button>
                    </li>
                    <li>
                        <button v-if="flashcard.ai != 1" class="btn btn-link dropdown-item" @click="editPersonalFlashcard(flashcard.cardId)">
                            Editar
                        </button>
                    </li>
                    <li>
                        <button class="btn btn-link dropdown-item" @click="deleteFlashcard(flashcard.cardId)">
                            Eliminar
                        </button>
                    </li>
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
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" @click="viewStudyMode(topicId)">
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
  <div class="btn-group dropup">
  <button type="button" class="floating-button" data-bs-toggle="dropdown" aria-expanded="false" @click="toggleDropdown">+</button>
  <ul class="dropdown-menu">
    <li><button class="btn btn-link dropdown-item" @click="createFlashcardIA()">Con IA</button></li>
    <li><hr class="dropdown-divider"></li>
    <li><button class="btn btn-link dropdown-item" @click="createPersonalFlashcard()">Mi propia card</button></li>
  </ul>
</div>

  <FlashcardForm ref="flashcardForm" :propFromParent="propToPass" :cardId="cardId" :topicId="topicRootId"/>
  </template>
<script>
import FlashcardsService from '../service/FlashcardService';
import TopicService from '../service/TopicService';
import FlashcardForm from './FlashcardForm.vue';
// import TagManagement from './TagManagement.vue';
export default {
  components: {
    // 'tag-management': TagManagement
    FlashcardForm,
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
      selectedColor: '#E8E8E8',
      propToPass: null,
      cardId: null,
      showDropdown: true,
      topicRootId: null,
      topic: [],
    };
  },
  created() {
    this.flashcardsService = new FlashcardsService();
    this.topicService = new TopicService();
    this.user = this.$auth0.user;
    this.sub = this.user.sub;
    console.log("sub en topicCard: "+this.sub);
    this.getFlashcards();
    console.log("topicId en topicCard: "+this.topicId);
  },
  mounted() {
    console.log('TopicCard.vue mounted');
    this.getTopicById();
    // this.$on('update-flashcards-list', this.getFlashcards);
  },
  methods: {
    async getTopicById() {
      try {
        console.log("getTopicById");
        this.user = await this.$auth0.user;
        this.sub = await this.user.sub;
        const data = await this.topicService.getTopicById(this.topicId, this.sub);
        console.log("getFlashcardByCardId Flashcard "+data.responseCode);
        if(data.responseCode==="F-002"){
            console.log("TEMA encontrada");
            this.topic=data.data;
            this.selectedColor=this.topic.color;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateColor() {
      try {
        console.log("updateColor");
        this.user = await this.$auth0.user;
        this.sub = await this.user.sub;
        const data = await this.topicService.updateTopic(this.topicId, this.selectedColor, this.sub);
        console.log("getFlashcardByCardId Flashcard "+data.responseCode);
        if(data.responseCode==="F-003"){
            alert("actualizado");
            await this.getTopicById();
        }
      } catch (error) {
        console.log(error);
      }
    },
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
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    getDetailsFlashcard(cardId) {
            this.propToPass="Ver detalles";
            this.cardId=cardId;
            console.log("propToPass en HomePage: " + this.propToPass);
            this.$refs.flashcardForm.mostrarModal();
            
        },
    editPersonalFlashcard(cardId) {
            this.propToPass="Editar";
            this.cardId=cardId;
            this.topicRootId=this.topicId;
            console.log("propToPass en HomePage: " + this.propToPass);
            this.$refs.flashcardForm.mostrarModal();
        },
    async   createPersonalFlashcard() {
            this.propToPass="Crear";
            this.topicRootId=this.topicId;
            console.log("propToPass en HomePage: " + this.propToPass);
            this.$refs.flashcardForm.mostrarModal();
            await this.getFlashcards();
        },
    viewStudyMode(topicId) {
      // Redirige a la página de studymode
      this.$router.push({ name: 'ViewStudyMode', //aqui
      params: { topicId: topicId } });
    },
    async deleteFlashcard(cardId){
            try{
            console.log("deleteFlashcard");
            this.user = await this.$auth0.user;
            this.sub = await this.user.sub;
            const data = await this.flashcardsService.deleteFlashcard(cardId, this.sub);
                console.log("deleteFlashcard Flashcard "+data.responseCode);
                if(data.responseCode==="F-004"){
                    console.log("Flashcard eliminada");
                    this.question='';
                    this.answer='';
                    await this.getFlashcards();
                }
            }catch(error){
                console.log(error);
            }
        },
        async createFlashcardIA(){
            try{
                console.log("createFlashcardIA");
                this.user = await this.$auth0.user;
                this.sub = await this.user.sub;
                const data = await this.flashcardsService.createFlashcardIA(this.topicId, this.sub);
                    console.log("post Flashcard "+data.responseCode);
                    if(data.responseCode=="F-001"){
                        alert("Flashcard creada");
                        this.closeModal();
                        await this.getFlashcards();
                    }
                  
            }catch(error){
                console.log(error);
            }
          
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
  background-color: #f8fafc ; /* Un tono azulado/gris claro */
}
</style>