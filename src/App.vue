<template>
  <!-- morado: #36205D azul: rgb(2, 112, 146) -->
  <nav :style="{ backgroundColor: isAuthenticated ? '#36205D' : 'rgb(2, 112, 146)' }" class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <!-- Inicio siempre visible -->
      <router-link to="/" class="navbar-brand me-4">Inicio</router-link>
      <!-- navbar responsive boton -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Visible solo cuando el usuario está autenticado -->
      <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
        <div v-if="isAuthenticated" class="navbar-nav mr-auto">
          <router-link to="/topics" class="nav-link me-4">Mis Temas</router-link>
          <router-link to="/topics/favorite" class="nav-link me-4">Favoritos</router-link>
          <router-link to="/topics/shared" class="nav-link me-4">Compartido conmigo</router-link>
        </div>
        <!-- Perfil y botón de autenticación -->
        <div class="navbar-nav ms-auto d-flex align-items-center">
          <!-- Enlace al perfil del usuario -->
          <!-- <router-link v-if="isAuthenticated" to="/profile" class="nav-link d-flex align-items-center me-2" @click="saveImg">
            <img :src="user.picture" alt="Perfil" class="me-2 img-fluid rounded-circle" style="height: 35px; width: 35px; object-fit: cover;"/>
            {{ user.name }}
          </router-link> -->
          <!-- <div v-if="isAuthenticated" class="nav-link d-flex align-items-center me-2" @click="viewProfileModal">
            <img :src="user.picture" alt="Perfil" class="me-2 img-fluid rounded-circle" style="height: 35px; width: 35px; object-fit: cover;"/>
            {{ user.name }}
          </div> -->
          <button class="btn-info" @click="saveImg">aqui para guardar email</button>
          <user-profile v-if="isAuthenticated"  ref="userProfileModal" ></user-profile>
          <!-- Botón de cerrar sesión o iniciar sesión -->
          <button v-if="isAuthenticated" class="btn btn-outline-light" @click="logout">Log out</button>
          <button v-else class="btn btn-outline-light" @click="login">Log in</button>
        </div>
      </div>
    </div>
  </nav>
  <div v-if="isLoading">Loading ...</div>
            <div v-else>
              <!-- No borrar -->
              <!-- <pre v-if="isAuthenticated">
                  <code>{{ user }}</code>
                  <code>{{ user.name }}</code>
              <button class="btn btn-outline-light"  @click="doSomethingWithToken">Ver token</button>
                </pre> -->
            </div>
  <div>
    
    <router-view v-if="!isLoading" ></router-view>
  </div>
</template>

<script>
import LoginService from './service/LoginService.js'
import UserProfile from './view/UserView.vue';
export default {
  components: {
    'user-profile': UserProfile
  },
  data: function (){
      return {
        token: null,
        user: this.$auth0.user,
        // username: this.user.name,
        isAuthenticated: this.$auth0.isAuthenticated,
        isLoading: this.$auth0.isLoading,
      };
    },
    created(){
      this.loginService = new LoginService();
    },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
      //imprimir token
      console.log(this.$auth0.getTokenSilently());

      if(localStorage.getItem('img') == null){
          localStorage.setItem('img', this.user.picture);
        }
        if(localStorage.getItem('mail') == null){
          localStorage.setItem('mail', this.user.email);//TODO: cambiar por id del ususario
        }
      
    },
    logout() {
      localStorage.removeItem('img');
      localStorage.removeItem('mail');
        this.$auth0.logout({ 
          logoutParams: { 
            returnTo: window.location.origin 
          } 
        });
      },
      async doSomethingWithToken() {
        this.token = await this.$auth0.getAccessTokenSilently();
        console.log(this.token);
        await this.loginService.doSomethingWithToken(this.token);
      },
      saveImg(){
        //TODO: cambiar por imagen de la base
        // si en el local storage no hay una imagen guardada, se guarda la imagen del usuario
        if(localStorage.getItem('img') == null){
          localStorage.setItem('img', this.user.picture);
        }
        if(localStorage.getItem('mail') == null){
          localStorage.setItem('mail', this.user.email);//TODO: cambiar por id del ususario
        }
        console.log("img"+this.user.picture);

        
      },
      viewProfileModal(){
        this.saveImg();

      // eslint-disable-next-line no-undef
      let modal = new bootstrap.Modal(this.$refs.userProfileModal.$el);
        modal.show();
      },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

</style>
