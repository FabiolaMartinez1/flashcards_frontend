<template>
    <div class="fullscreen-form">
        <div class="container">
        <div class="row">
            <div class="col-md-10 offset-md-1">
            <!-- Tu contenido del formulario aquí -->
            <div>
                <div class="d-flex justify-content-between align-items-center p-3">
                    <h7 class="modal-title" id="modalLabel">Compartir</h7>
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeCurrentWindow()"></button>-->
                    <button type="button" class="btn btn-close" aria-label="Close" @click="closeCurrentWindow()"></button>
                </div>
                <h4 class="modal-title text-start" id="modalLabel"  >{{ this.titleTopic }}</h4>
                    <p class="text-start">¿Quién tiene acceso?</p>
                    <!-- aqui empieza la tabla -->
                    <div class="container">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Correo </th>
                                <th scope="col">Nivel de Acceso</th>
                                <th scope="col">Desde</th>
                                <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in usersTopics" :key="index">
                                    <!-- <th scope="row">Correijdejdfjdkdfkdfjkfdkjdfskljfdsjkfdskjldfsjklfdsljkdfkjfdkkjeo@gmail.com</th> -->
                                    <th scope="row">
                                        <input type="text" class="transparent-input" readonly :value="row.user.email">
                                    </th>
                                    <td>
                                        <select class="form-select" id="validationCustom04" v-model="row.accessLevel.accessLevelId" required @change="updateAccessLevel(row.userTopicId, row.accessLevel.accessLevelId, row.lastDate, row.favorite)">
                                            <!-- :selected="option.accessLevelId === row.accessLevel.accessLevelId" -->
                                            <option v-for="option in accessLevels" :key="option.accessLevelId" :value="option.accessLevelId" >{{ option.level }}</option>
                                        </select>
                                    </td>
                                    <td>{{ formatDateTime(row.user.lastDate) }}</td>
                                    <!-- row.user.lastDate es la fecha de actualización de los datos del usuario -->
                                    <!-- FIXME arreglar el dato este, en el endpoint aun no se obtiene la fecha desde la que el usuario tiene acceso al tema -->
                                    <td>
                                        <button type="button" class="btn btn-link" @click="confirmDelete(row.userTopicId)">
                                            <i class="fas fa-trash-alt" style="color: black;"></i>
                                        </button>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <!-- aqui termina la tabla -->
                    <div class="container mt-2" style="margin: 8px;">
                        <div class="position-relative">
                            <p class="text-start">Compartir con:</p>
                            <div class="container">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="correo@ejemplo.com" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="searchText" @input="updateResults">
                                <span class="input-group-text" id="basic-addon2">
                                    <button type="button" class="btn btn-link" @click="eliminarTema">
                                        <i class="fas fa-search" style="color: black;" @click="findByEmail()"></i>
                                    </button>
                                </span>
                            </div>
                            <!-- Lista de resultados como dropdown -->
                            <div class="position-absolute top-100 start-0" v-if="showResults">
                                <div class="list-group w-100">
                                    <a href="#" class="list-group-item list-group-item-action" v-for="result in searchResults" :key="result.userId" @click="selectSearchResult(result)">{{ result.email }}</a>
                                </div>
                            </div>
                            </div>
                        </div>
                    
                    <!-- tipo de acceso  -->
                    <div class="container">
                        <div class="form-group row">
                                <select class="form-select" id="validationCustom04" v-model="selectedAccessLevelId" required>
                                    <option value="" disabled selected>Tipo de acceso</option>
                                    <option v-for="option in accessLevels" :key="option.accessLevelId" :value="option.accessLevelId">{{ option.level }}</option>
                                </select>
                        </div>
                        <label for="textarea" class="col-4 col-form-label">Comentario</label> 
                        <div class="form-group row">
                            <textarea id="textarea" name="textarea" cols="40" rows="5" class="form-control"></textarea>
                            
                        </div> 
                        <br/>
                        <div class="form-group row">
                            <div class="">
                            <button name="submit" type="submit" class="btn btn-primary" @click="createAccessToTopic()" >Compartir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>


   
</template>
<script>
//  import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
//  import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa el JS de Bootstrap

import UserTopicService from '../service/UserTopicService.js';
import UserService from '../service/UserService.js';
import AccessLevelService from '../service/AccessLevelService.js';
import moment from 'moment';
import Swal from 'sweetalert2';

export default {
    props: {
        topicId: {
            type: Number,
            required: true,
        },
        topicTitle: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
        searchText: '',
        showResults: false,
        searchResults: [
            // { id: 1, email: 'maria@gmail.com' },
            // { id: 2, email: 'maria2@gmail.com' },
            // { id: 3, email: 'maria3@gmail.com' },
        ],
        accessLevels: [],
        selectedAccessLevelId: "",
        updatedAccessLevel: null,
        usersTopics: [],
        userId: null,
        titleTopic: null,
        user: null,
        sub: null,
        };
    },
    created(){
        this.userTopicService = new UserTopicService();
        this.accessLevelService = new AccessLevelService();
        this.userService = new UserService();
        console.log('------------------------este el es ID del tema: '+this.topicId);
    },
    async mounted(){
        // this.$nextTick(() => {
            
        //     // eslint-disable-next-line no-undef
        //     const myModal = new bootstrap.Modal(document.getElementById('accessFormModal'));
        //     myModal.show();
        // });
        this.getAllAccessLevels();
        this.getAllByTopicId(this.topicId);

        console.log('------------------------este el es ID del tema: '+this.topicId);
        
    },
    methods: {
        getAllAccessLevels(){
            try {
                this.accessLevelService.getAllAccessLevels().then((data) => {
                    
                    this.accessLevels = data;
                    console.log("niveles de acceso obtenidooooss :D "+this.accessLevels);
                });
            } catch (error) {
                console.error(error);
            }
        },
        async getAllByTopicId(topicId){
            try {
                this.user = await this.$auth0.user;
                this.sub = await this.user.sub;
                this.userTopicService.getAllByTopicId(topicId, this.sub).then((data) => {
                    this.usersTopics = data;
                    console.log(this.usersTopics);
                    try{
                        this.titleTopic = this.usersTopics.length > 0 ? this.usersTopics[0].topic.title : '';
                    console.log("titulo : " + this.titleTopic);
                    }catch(error){
                        console.log(error);
                    }
                    
                });
            } catch (error) {
                console.error(error);
            }
        },
        findByEmail(){//FIXME arreglar el authorization de este endpoint
            try {
                this.userService.findByEmailContainingIgnoreCase(this.searchText).then((data) => {
                    this.searchResults = data;
                    console.log(this.searchResults);
                    this.showResults = true;
                });
            } catch (error) {
                console.error(error);
            }
        },
        selectSearchResult(result){
            // Asigna el valor al navegador
            this.searchText = result.email;
            this.userId = result.userId;

            // Oculta las opciones
            this.showResults = false;
        },
        async createAccessToTopic(){
            console.log("este es el id del usuario: "+this.userId);
            console.log("este es el id del nivel de acceso: "+this.selectedAccessLevelId);
            console.log("este es el id del tema: "+this.topicId);
            this.user = await this.$auth0.user;
                this.sub = await this.user.sub;
            try {
                this.userTopicService.createAccessToTopic(this.topicId, this.selectedAccessLevelId, this.userId, this.sub).then((data) => { 
                    console.log(data);    
                    Swal.fire(
                            'Compartido',
                            'Tu registro ha sido guardado.',
                            'success'
                        );
                        this.getAllByTopicId(this.topicId);
                        //borrando los campos
                        this.selectedAccessLevelId = null;
                        this.userId = null;
                        this.searchText = null;
                        this.showResults = false;
                    
                    console.log(this.usersTopics);
                });
            } catch (error) {
                console.error(error);
            }
        },
        confirmDelete(userTopicId) {
            Swal.fire({
            title: '¿Estás segur@?',
            text: 'Se eliminará el acceso al tema para este usuario',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
            }).then((result) => {
            if (result.isConfirmed) {
                this.deleteLogicAccess(userTopicId);
            }
            });
        },
        async deleteLogicAccess(userTopicId){
            this.user = await this.$auth0.user;
                this.sub = await this.user.sub;
            try {
                this.userTopicService.deleteLogicAccess(userTopicId, this.sub).then((data) => {
                    if(data.responseCode == "F-004") {
                        Swal.fire(
                            'Eliminado',
                            'Tu registro ha sido eliminado.',
                            'success'
                        );
                        this.getAllByTopicId(this.topicId);
                    } else {
                        alert(data.responseMessage);
                    }
                    console.log(this.usersTopics);
                });
            } catch (error) {
                console.error(error);
            }
        },
        async updateAccessLevel(userTopicId, newAccessLevelId, lastDate, favorite){
            this.user = await this.$auth0.user;
            this.sub = await this.user.sub;
            try{
                this.userTopicService.updateByUserTopicId(userTopicId, newAccessLevelId, lastDate, favorite, this.sub).then((data) => {
                    if(data.responseCode == "F-003") {
                        Swal.fire(
                            'Actualizado',
                            'Tu registro ha sido actualizado.',
                            'success'
                        );
                        this.getAllByTopicId(this.topicId);
                    } else {
                        alert(data.responseMessage);
                    }
                    console.log(this.usersTopics);
                });
            } catch (error) {
                console.error(error);
            }
        },
        formatDateTime(dateTime) {
            return moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
        search() {
        // Aquí podrías realizar una búsqueda y actualizar this.searchResults
        // Puedes usar this.searchText para realizar la búsqueda
        // Por ejemplo, podrías hacer una llamada a la API aquí y actualizar searchResults
        this.showResults = true; // Muestra la lista de resultados
        },
        updateResults() {
        // Aquí podrías actualizar this.searchResults mientras se escribe en el campo de búsqueda
        // Puedes ajustar la lógica según tus necesidades
        },
        closeCurrentWindow() {
            this.$router.push({ name: 'MyTopics'});
        }

    },
};
</script>
<style scoped>
.transparent-input {
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0;
}
</style>
<style>
.fullscreen-form {
  height: 100vh; /* Utiliza el 100% de la altura de la ventana */
  background-color: #f8f9fa; /* Cambia el color de fondo según tus preferencias */
  padding: 20px; /* Añade relleno según tus necesidades */
}
</style>