<template>
  <div class="d-flex dropdown ms-auto">

    <button class="btn btn-outline-secondary" type="button" id="dropdownMenuButton"
      data-bs-toggle="dropdown" aria-expanded="false"
      style="color: white; background-color: #4F2A93; border-color: #4F2A93">
      <i class="bi bi-filter"></i> Etiquetas
    </button>
    <ul class="dropdown-menu p-2" style="width: auto; padding: 1rem" @click.stop>
      <h5>Etiquetas <i class="bi bi-pencil-square fs-5"></i></h5>
      <hr>
      <div class="d-flex flex-wrap">
        <!-- <li v-for="(etiqueta, index) in etiquetas" :key="index" class="me-2 mb-2">
          <input type="checkbox" :id="etiqueta" v-model="selectedTags" :value="etiqueta" />
          <label :for="etiqueta">{{ etiqueta }}</label>
        </li> -->
        <li v-for="(etiqueta, index) in etiquetas" :key="index" class="me-2 mb-2">
          <input type="checkbox" :id="`tag-${index}`" v-model="selectedTags" :value="etiqueta.name" @change="sendData"/>
          <label :for="`tag-${index}`">{{ etiqueta.name }}</label>
        </li>
      </div>
      <hr>
      <div class="d-flex justify-content-center">
        <button class="btn btn-outline-secondary me-4" @click="cerrarDropdown" style="color: white; background-color: #4F2A93; border-color: #4F2A93">Cancelar</button>
        <button class="btn btn-outline-secondary ms-4" @click="cerrarDropdown" style="color: white; background-color: #4F2A93; border-color: #4F2A93">Aceptar</button>
      </div>
    </ul>
  </div>
</template>

<script>
import TagService from '../service/TagService';

export default{
  data: function (){
    return {
      etiquetas: [],
      // etiquetas: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8'],
      selectedTags: [],
      token: null,
      sub: null,
      user: null,
    }
  },
  created() {
    this.tagService = new TagService();
    this.getTags();
    
  },
  methods: {
    sendData() {
      this.$emit('dataFromChild', this.selectedTags);
    },

    async getTags() {
      try{
        this.user = await this.$auth0.user;
        this.sub = await this.user.sub;
        console.log("sub: "+this.sub);

        this.token = await this.$auth0.getAccessTokenSilently();
        console.log(this.token);

        this.tagService.getTags(this.token).then((data) => {
          this.etiquetas = data;
          console.log("en management"+this.etiquetas);
        });
      } catch (error) {
        console.log(error);
      }

    },
    cerrarDropdown(event) {
      event.stopPropagation();
      let dropdown = document.getElementById('dropdownMenuButton');
      dropdown.click();
    }
  }
}
</script>

<style>
.dropdown-menu {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: auto; /* Se ajusta al contenido */
}

/* Estilos para organizar los elementos en dos columnas */
.d-flex.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-startt;
}

.d-flex.flex-wrap li {
  width: calc(50% - 0.5rem); /* Ajusta el ancho para dos columnas */
}

/* Estilo para los botones de cerrar y cancelar */
.dropdown-menu .btn {
  margin-top: 0.5rem;
}

/* El resto de tus estilos */
.dropdown-menu input[type="checkbox"] {
  margin-right: 10px; 
  /* Espaciado entre el checkbox y la etiqueta */
}
</style>