<!-- En tu componente Vue -->
<template>
    <div class="modal" ref="flashcardForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{propFromParent}} flashcard</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label text-start fw-bold">Anverso:</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="question" :readonly="propFromParent === 'Ver detalles'"></textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label text-start fw-bold">Reverso:</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="answer" :readonly="propFromParent === 'Ver detalles'"></textarea>
                </div>
                
            </div>
            <div class="row">
                    <div class="col-md-6 mb-2">
                        <button type="button"  v-if="propFromParent!='Ver detalles'" class="btn btn-primary btn-block" @click="flashcardPersonal" >Aceptar</button>
                    </div>
                    <div class="col-md-6 mb-2">
                        <button type="button" v-if="propFromParent!='Ver detalles'" class="btn btn-secondary btn-block" @click="closeModal">Cancelar</button>
                    </div>
                </div>
            <!-- <div class="modal-footer">
                
            
            </div> -->
        </div>
        </div>
    </div>

</template>

<script>
import FlashcardService from '../service/FlashcardService.js';
export default {
    props: {
        propFromParent: {
            type: String,
            default: "",
        },
        cardId: {
            type: Number,
            default: 0,
        },
        topicId: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            titleModal: "",
            user: null,
            sub: null,
            question: "",
            answer: "",
        }
    },
    created() {
        console.log('FlashcardForm.vue created')
        this.titleModal = "Crear Flashcard";
        console.log('propFromParent: ' + this.propFromParent)
        console.log('cardId: ' + this.cardId)
        this.flashcardService = new FlashcardService();
    },
    mounted() {
        console.log('FlashcardForm.vue mounted')
        
    },
    methods: {
        async mostrarModal() {
            console.log("cargooooo")
            this.question='';
            this.answer='';
            this.$refs.flashcardForm.style.display = 'block';
            if(this.propFromParent!="Crear"){
                await this.getFlashcardByCardId();
            }
            // También puedes usar jQuery si está disponible en tu proyecto
            // this.$refs.miModal.modal('show');
        },
        closeModal() {
            this.titleModal = "";
            this.$refs.flashcardForm.style.display = 'none';
            // O usando jQuery
            // this.$refs.miModal.modal('hide');
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
        async flashcardPersonal() {
            console.log("el propFromParent en flashcardPersonal es: "+this.propFromParent)
            if(this.propFromParent==="Crear"){
                await this.createFlashcardPersonal();
            }else if(this.propFromParent=="Editar"){
                await this.editFlashcardPersonal();
                }
        },
        async createFlashcardPersonal() {
            try{
                console.log("createFlashcardPersonal");
                if(this.question=="" || this.answer==""){
                    alert("Debe llenar todos los campos");
                    return;
                }
                this.user = await this.$auth0.user;
                this.sub = await this.user.sub;
                
                const data = await this.flashcardService.createPersonalFlashcard(this.sub, this.topicId, this.question, this.answer);
                    console.log("post Flashcard "+data.responseCode);
                    if(data.responseCode=="F-001"){
                        alert("Flashcard creada");
                        this.closeModal();
                        await this.getFlashcards(this.topicId, this.sub);

                        
                    }
            }catch(error){
                console.log(error);
            }
            
        },
        async editFlashcardPersonal() {
            try{
            console.log("editFlashcardPersonal");
            if(this.question=="" || this.answer==""){
                alert("Debe llenar todos los campos");
                return;
            }
            this.user = await this.$auth0.user;
            this.sub = await this.user.sub;
            const data = await this.flashcardService.editPersonalFlashcard(this.sub, this.cardId, this.question, this.answer);
                console.log("post Flashcard "+data.responseCode);
                if(data.responseCode=="F-003"){
                    alert("Flashcard editada");
                    await this.getFlashcards(this.topicId, this.sub);
                }this.closeModal();
            }catch(error){
                console.log(error);
            }
        },
        async getFlashcardByCardId() {
            try{    
                console.log("getFlashcardByCardId");
                this.user = await this.$auth0.user;
                this.sub = await this.user.sub;
                const data = await this.flashcardService.getFlashcardByCardId(this.cardId, this.sub);
                    console.log("get Flashcard "+data.responseCode);
                    if(data.responseCode==="F-002"){
                        console.log("Flashcard obtenida");
                        this.question=data.data.front;
                        this.answer=data.data.back;
                    }
            }catch(error){
                console.log(error);
            }
            
        },
        
        
        }
    }
</script>