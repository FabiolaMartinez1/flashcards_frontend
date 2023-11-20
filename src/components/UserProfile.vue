<template>
    <!-- Modal Trigger -->
    <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#userProfileModal">
      Ver Perfil
    </button>
  
    <!-- Modal -->
    <div class="modal fade" id="userProfileModal" tabindex="-1" aria-labelledby="userProfileModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userProfileModalLabel">Perfil de Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- <div class="d-flex justify-content-center mb-4 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <img v-if="profile.img" :src="profile.img" alt="Profile Image" class="img-fluid rounded-circle" style="width: 120px;"/>
              <img v-else src="../assets/profile_img_default.png" alt="Profile Image" class="img-fluid rounded-circle" style="width: 120px;"/>
            </div>-->

            <div class="row">
            <!-- Columna para la imagen -->
            <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <br>
              <img v-if="profile.img" :src="profile.img" alt="Profile Image" class="img-fluid rounded-circle" style="width: 150px;"/>
              <img v-else src="../assets/profile_img_default.png" alt="Profile Image" class="img-fluid rounded-circle" style="width: 150px;"/>
            </div>

            <div class="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <hr>
                <div class="d-flex align-items-center">
                                            <i class="bi bi-person-circle me-2 mb-4"></i>
                                            <div>
                                            <strong class="d-flex">Nombre Completo:</strong>
                                            <p class="d-flex">{{ profile.name }}</p>
                                            </div>
                                        </div>
            <div class="d-flex align-items-center">
                                            <i class="bi bi-envelope-at-fill me-2 mb-4"></i>
                                            <div>
                                            <strong class="d-flex">Correo Electronico</strong>
                                            <p class="d-flex">ejemplo@gmail.com</p>
                                            </div>
                                        </div>
            <div class="d-flex align-items-center">
                                            <i class="bi bi-mortarboard-fill me-2 mb-4"></i>
                                            <div>
                                            <strong class="d-flex">Grado Académico:</strong>
                                            <p class="d-flex">Secundario</p>
                                            </div>
                                        </div>
            <div class="d-flex align-items-center">
                                            <i class="bi bi-calendar-event-fill me-2 mb-4"></i>
                                            <div>
                                            <strong class="d-flex">Fecha de Nacimiento:</strong>
                                            <p class="d-flex">17/10/2002</p>
                                            </div>
                                        </div>
            <div class="d-flex align-items-center">
                                            <i class="bi bi-card-heading me-2 mb-4"></i>
                                            <div>
                                            <strong class="d-flex">Total de Temas:</strong>
                                            <p class="d-flex">128</p>
                                            </div>
                                        </div>
            <div class="d-flex align-items-center">
                                            <i class="bi bi-clock-fill me-2 mb-4"></i>
                                            <div>
                                            <strong class="d-flex">Se unió:</strong>
                                            <p class="d-flex">14/08/2023</p>
                                            </div>
                                        </div>
            </div>
            </div>
              
            <!-- Aquí van los demás campos del formulario ... -->
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        profile: {
          name: 'FABIOLA ALEJANDRA MARTINEZ ACARAPI',
          img: '', // La URL de la imagen de perfil
          // ... otros datos del perfil ...
        }
      };
    },
    created() {
      // Aquí puedes cargar la información del perfil, por ejemplo, desde localStorage
      this.profile.img = localStorage.getItem('img') || 'ruta-de-imagen-por-defecto';
    },
    methods: {
      // Tus métodos aquí...
    }
  };
  </script>
  
  <style>
  /* Estilos personalizados para los íconos y texto si es necesario */
  .bi {
    font-size: 1.5rem; /* Tamaño de los íconos */
    color: #36205D; /* Color de los íconos */
  }
  </style>
  