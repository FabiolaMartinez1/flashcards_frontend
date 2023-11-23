<template>
    <div class="my-modal-mask" v-show="show">
      <div class="my-modal-wrapper">
        <div class="my-modal-container">
          <div class="my-modal-header">
            <slot name="my-header">
              <h3>Perfil de Usuario</h3>
              <button class="my-modal-close-button" @click="$emit('close')">&times;</button>
            </slot>
          </div>
          
          <div class="my-modal-body">
            <slot name="my-body">
              <div class="my-profile-image">
                <!-- <img src="my-path-to-profile-picture.jpg" alt="Profile" /> -->
              </div>
              <div class="my-profile-info">
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
            </slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
import UserService from '../service/UserService.js';
    export default {
        props: ['show'],
        data() {
            return {
                isLoading: true,
                profile:{},
                img: '',
                email: '',
                showModal: false,
                profileLoaded: false,
            };
    },
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
        close() {
            this.$emit('close');
        },
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
    }
  </script>
  
  <style scoped>
  .my-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  
  .my-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .my-modal-container {
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Arial, sans-serif;
  }
  
  .my-modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  
  .my-modal-body {
    margin: 20px 0;
  }
  
  .my-modal-close-button {
    background-color: transparent;
    border: none;
    float: right;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .my-modal-close-button:hover {
    cursor: pointer;
  }
  
  .my-profile-image img {
    width: 80px; /* Adjust as needed */
    height: auto;
    border-radius: 50%;
  }
  
  .my-profile-info {
    margin-top: 10px;
  }
  
  .my-profile-info p {
    font-size: 14px; /* Adjust as needed */
    line-height: 1.5;
    color: #333; /* Adjust as needed */
  }
  </style>
  