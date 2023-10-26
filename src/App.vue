<template>
  <nav style="background-color: rgb(2, 112, 146);" class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand me-4">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
        <div class="navbar-nav mr-auto">
          <router-link to="/topic" class="nav-link me-4">Topics</router-link>
          <router-link to="/flashcard" class="nav-link me-4">Flashcards</router-link>
          <router-link to="/about" class="nav-link me-4">About</router-link>
          <router-link to="/contact" class="nav-link me-4">Contact</router-link>
        </div>
        <div class="navbar-nav me-4">
            <div v-if="isAuthenticated">
              <button class="btn btn-outline-light" @click="logout">Log out</button>
            </div>
            <div v-else>
              <button class="btn btn-outline-light" @click="login">Log in</button>
            </div>

            <!-- <button class="btn btn-outline-light" @click="login">Log in</button>
            <button class="btn btn-outline-light" @click="logout">Log out</button> -->
        </div>
      </div>
    </div>
  </nav>
  <div v-if="isLoading">Loading ...</div>
            <div v-else>
              <pre v-if="isAuthenticated">
                  <code>{{ user }}</code>
                  <code>{{ user.name }}</code>
                  
              <button class="btn btn-outline-light"  @click="doSomethingWithToken">Ver token</button>
                </pre>
            </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import LoginService from './service/LoginService.js'
export default {
  data: function (){
      return {
        token: null,
        user: this.$auth0.user,
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
      
    },
    logout() {
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
