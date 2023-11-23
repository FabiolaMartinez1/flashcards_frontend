<template>
  <div class="modal fade" id="userProfileModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Perfil de Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- <div v-if="profile && Object.keys(profile).length > 0" class="modal-body"> -->
            <div v-if="isLoading" class="loading-indicator">Cargando...</div> <!-- Indicador de carga -->
            <div v-else-if="profile && Object.keys(profile).length > 0" class="modal-body">
      
              <div class="row">
                <!-- Columna para la imagen -->
                <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <br>
                  <img v-if="img" :src="img" alt="Profile Image" class="img-fluid rounded-circle" style="width: 150px;"/>
                  <img v-else src="../assets/profile_img_default.png" alt="Profile Image" class="img-fluid rounded-circle" style="width: 150px;"/>
                </div>
                
                <div class="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                  <hr>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-person-circle me-2 mb-4"></i>
                      <div>
                      <strong class="d-flex">Nombre Completo:</strong>
                      <p class="d-flex">{{ profile.username }}</p>
                      </div>
                  </div>
                  <div class="d-flex align-items-center">
                                          <i class="bi bi-envelope-at-fill me-2 mb-4"></i>
                                          <div>
                                          <strong class="d-flex">Correo Electronico</strong>
                                          <p class="d-flex">{{ profile.email }}</p>
                                          </div>
                                      </div>
          <div class="d-flex align-items-center">
                                          <i class="bi bi-mortarboard-fill me-2 mb-4"></i>
                                          <div>
                                          <strong class="d-flex">Grado Académico:</strong>
                                          <p class="d-flex">{{ profile.academicDegree.name }}</p>
                                          </div>
                                      </div>
          <div class="d-flex align-items-center">
                                          <i class="bi bi-calendar-event-fill me-2 mb-4"></i>
                                          <div>
                                          <strong class="d-flex">Fecha de Nacimiento:</strong>
                                          <p class="d-flex">{{ formatDate(profile.birthdate) }}</p>
                                          </div>
                                      </div>
          <div class="d-flex align-items-center">
                                          <i class="bi bi-card-heading me-2 mb-4"></i>
                                          <div>
                                          <strong class="d-flex">Total de Temas:</strong>
                                          <p class="d-flex">{{ profile.topics }}</p>
                                          </div>
                                      </div>
          <div class="d-flex align-items-center">
                                          <i class="bi bi-clock-fill me-2 mb-4"></i>
                                          <div>
                                          <strong class="d-flex">Se unió:</strong>
                                          <p class="d-flex">{{ formatDate(profile.createdDate) }}</p>
                                          </div>
                                      </div>
                                      <!-- <hr> -->
                </div>
              </div>
            </div>
            </div>
        </div>
  </div>  
</template>

<script>
import UserService from '../service/UserService.js';
// import Vue from 'vue';

export default {
  data() {
    return {
      isLoading: true,
      profile:{},
      img: '',
      email: '',
    };
  },
  // watch: {
  //   getProfile() {
  //     this.getProfile();
  //   }
  // },
  userService: null,
  created() {
    this.userService = new UserService();
    this.img = localStorage.getItem('img') || '../assets/profile_img_default.png';
    this.getProfile();
    // this.email = localStorage.getItem('mail') || 'example@gmail.com';
    // console.log(this.email);
  },
  // async beforeMount(){
  //   this.getProfile();
  // },
  async mounted(){
    if(this.isLoading){
      await this.getProfile();
    }
  },
  methods: {
    async getProfile() {
      this.isLoading = true;
      try {
        const data = await this.userService.getUserProfile(localStorage.getItem('mail'));
        this.profile = data;
        console.log("Datos recibidos:", data);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },  

    formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses empiezan en 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  }
};
</script>

<style>
/* Estilos personalizados para los íconos y texto si es necesario */
.bi {
    font-size: 1.5rem; /* Tamaño de los íconos */
    color: #36205D; /* Color de los íconos */
  }
  .d-flex {
      word-break: break-word;
    }
</style>
