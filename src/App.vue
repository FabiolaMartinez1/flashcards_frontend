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
        <div class="navbar-nav">
            <router-link to="/login" class="btn btn-outline-light me-4">Login</router-link>
            <router-link to="/signup" class="btn btn-outline-light me-4">Sign Up</router-link>
        </div>
      </div>
    </div>
  </nav>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
}
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
