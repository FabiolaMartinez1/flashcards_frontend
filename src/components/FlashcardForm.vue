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
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="question"></textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label text-start fw-bold">Reverso:</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="answer"></textarea>
                </div>
                
            </div>
            <div class="row">
                    <div class="col-md-6 mb-2">
                        <button type="button"  v-if="propFromParent!='Ver detalles'" class="btn btn-primary btn-block" @click="flashcardPersonal" >Aceptar</button>
                    </div>
                    <div class="col-md-6 mb-2">
                        <button type="button" v-if="propFromParent!='Ver detalles'" class="btn btn-secondary btn-block">Cancelar</button>
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
        this.flashcardService = new FlashcardService();
    },
    mounted() {
        console.log('FlashcardForm.vue mounted')
        
    },
    methods: {
        mostrarModal() {
            console.log("cargooooo")
            this.$refs.flashcardForm.style.display = 'block';
            // También puedes usar jQuery si está disponible en tu proyecto
            // this.$refs.miModal.modal('show');
        },
        closeModal() {
            this.titleModal = "";
            this.$refs.flashcardForm.style.display = 'none';
            // O usando jQuery
            // this.$refs.miModal.modal('hide');
        },
        async flashcardPersonal() {
            if(this.propFromParent=="Crear"){
                await this.createFlashcardPersonal();
            }else if(this.propFromParent=="Editar"){
                await this.editFlashcardPersonal();
                }
        },
        async createFlashcardPersonal() {
            console.log("createFlashcardPersonal");
            if(this.question=="" || this.answer==""){
                alert("Debe llenar todos los campos");
                return;
            }
            this.user = await this.$auth0.user;
            this.sub = await this.user.sub;
            const topicId=21;
            const data = await this.flashcardService.createPersonalFlashcard(this.sub, topicId, this.question, this.answer);
                console.log("post Flashcard "+data.responseCode);
                if(data.responseCode=="F-001"){
                    alert("Flashcard creada");
                    this.closeModal();
                }
        },
        
        }
    }
</script>