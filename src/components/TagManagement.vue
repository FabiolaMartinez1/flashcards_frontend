<template>
  <div class="d-flex dropdown ms-auto">

    <button class="btn btn-outline-secondary" type="button" id="dropdownMenuButton"
      data-bs-toggle="dropdown" aria-expanded="false"
      style="color: white; background-color: #4F2A93; border-color: #4F2A93">
      <i class="bi bi-filter"></i> Ver Etiquetas
    </button>
    <ul class="dropdown-menu p-2 common-ul" @click.stop>
      <h5>Etiquetas 
        <i v-if="!flagEditableMode" class="tag bi bi-pencil-square fs-4" @click="editableMode">
        </i>
        <i v-else class="tag bi bi-check2-square fs-4" @click="editableMode"></i>
      </h5>
      <hr>
      <div v-if="!flagEditableMode" class="d-flex flex-wrap" style="width: auto; padding: 1rem" >
        <li v-for="(etiqueta, index) in etiquetas" :key="index" class="me-2 mb-2 d-flex">
          <input type="checkbox" :id="`tag-${index}`" v-model="selectedTags" :value="etiqueta.tagId" @change="sendData"/>
          <label :for="`tag-${index}`">{{ etiqueta.name }}</label>
        </li>
      </div>

      <div v-if="flagEditableMode" class="d-flex flex-wrap" style="width: auto; padding: 1rem" >
        <li v-for="(etiqueta, index) in etiquetas" :key="index" class="d-flex align-items-center">
          <input class="form-control form-control editable" :value="etiqueta.name" @keyup.enter="updateTag(index,etiqueta.tagId, $event.target.value)" @input="updateTag(index, etiqueta.tagId, $event.target.value)"/>
          <i class="fas fa-pen icon edit-icon" @click="enableEditing(index)"></i>
          <i class="fas fa-trash icon delete-icon" @click="deleteTag(index,etiqueta.tagId)"></i>
        </li>
        <li class="d-flex align-items-center">
          <input class="form-control form-control editable" 
            v-model="newTagName" @keyup.enter="addTag" 
          />
          <!-- @blur="isAddingTag = false" -->
          <!-- icono add -->
          <i class="fas fa-plus-circle  icon" @click="addTag"></i>
          
        </li>
      </div>

      <hr>
      <div class="d-flex justify-content-center">
        <button v-if="!flagEditableMode" class="btn btn-outline-secondary me-4" @click="cerrarDropdown" style="color: white; background-color: #4F2A93; border-color: #4F2A93">Cancelar</button>
        <button v-if="flagEditableMode" class="btn btn-outline-secondary ms-4" @click="cerrarDropdown" style="color: white; background-color: #4F2A93; border-color: #4F2A93">Aceptar</button>
      </div>
    </ul>
  </div>
</template>

<script>
import TagService from '../service/TagService';
import Swal from 'sweetalert2';

export default{
  data: function (){
    return {
      etiquetas: [],
      selectedTags: [],
      token: null,
      sub: null,
      user: null,
      flagEditableMode: false,
      newTagName: '',
    }
  },
  created() {
    this.tagService = new TagService();
    this.getTags();
    // this.user = this.$auth0.user;
    // this.sub = this.user.sub;
    // console.log("sub en topicCard: "+this.sub);
  },
  methods: {
    sendData() {
      console.log("selectedTags: "+this.selectedTags);
      this.$emit('dataFromChild', this.selectedTags);
    },

    async getTags() {
      try{
        this.user =  this.$auth0.user;
        this.sub =  this.user.sub;
        console.log("sub: "+this.sub);
        const data = await this.tagService.getTags(this.sub);
        //TODO: validar el estado de la respuesta
        console.log("getTag: "+data.responseCode);
        this.etiquetas = data.data;
        console.log("en management"+this.etiquetas);
      } catch (error) {
        console.log(error);
      }

    },
    async addTag() {
      if (this.newTagName.trim()) {
        console.log("nueva etiqueta: "+this.newTagName);
        const newtag = this.newTagName;
        this.newTagName = '';
        const data = await this.tagService.createTag(newtag, this.sub);
        console.log("postTag"+data.responseCode);
        //TODO: validar el estado de la respuesta
        console.log("en addTag"+data.data);
        this.getTags();
        // this.isAddingTag = false;
        // Aquí puedes incluir lógica adicional, como enviar la nueva etiqueta al servidor
      }
    },
    deleteTag(index, id) {
      console.log("etiqueta a eliminar: "+id+index);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4F2A93",
        cancelButtonColor: "#4F2A93",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => { // Utiliza una función async anónima aquí
        if (result.isConfirmed) {
          try {
            const data = await this.tagService.deleteTag(id, this.sub);
            console.log("deleteTag" + data.responseCode);
            //TODO: validar el estado de la respuesta
            console.log("en deleteTag" + data.data);
            this.getTags();
            // Aquí puedes incluir la lógica para mostrar el SweetAlert de éxito
          } catch (error) {
            console.error("Error al eliminar la etiqueta:", error);
            // Aquí puedes incluir la lógica para mostrar un mensaje de error
          }
        }
      }).finally(() => {
        // Volver a enfocar el combo aquí TT no da //FIXME
        // let dropdown = document.getElementById('dropdownMenuButton').focus();
        // dropdown.click();
        // this.flagEditableMode = true;
        // document.getElementById("dropdownMenuButton").focus();
      });
      // this.etiquetas.splice(index, 1);

      // Aquí puedes incluir lógica adicional, como eliminar la etiqueta del servidor
    },
    enableEditing(index) {
      this.$nextTick(() => {
        let input = document.getElementsByClassName('editable')[index];
        input.focus();
      });
    },
    updateTag(index, id, value) {
      this.etiquetas[index].name = value;
      console.log("etiqueta a actualizar: "+id+" "+value+" "+this.sub);
      const data = this.tagService.updateTag(id, value, this.sub);
      console.log("updateTag"+data.responseCode);
      //TODO: validar el estado de la respuesta
      console.log("en updateTag"+data.data);
      // this.getTags();
      // Aquí puedes incluir lógica adicional, como actualizar la etiqueta en el servidor
    },
    cerrarDropdown(event) {
      event.stopPropagation();
      let dropdown = document.getElementById('dropdownMenuButton');
      dropdown.click();
      this.flagEditableMode = false;
    },
    editableMode() {
      this.flagEditableMode = !this.flagEditableMode;
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
  justify-content: flex-start;
}

.d-flex.flex-wrap li {
  width: calc(50% - 0.5rem); /* Ajusta el ancho para dos columnas */
  max-width: 50%; /* Ancho máximo */
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
.tag {
    font-size: 1.5rem; /* Tamaño de los íconos */
    color: #36205D; /* Color de los íconos */
    font-weight: bold; /* icono grueso? */
  }
/*  */
.editable {
  width: calc(50% - 0.5rem);
  /* flex-grow: 0.5rem!important; Hace que el input ocupe el espacio restante */
  /* margin-right: 0.5rem; Espacio a la derecha del input */
  /* margin-right: 0.5rem!important; */
  border: none;
  border-bottom: 1px solid #ced4da; /* Línea inferior para el input */
  border-radius: 0; /* Sin bordes redondeados */
  box-shadow: none; /* Sin sombra */
  padding-left: 0; /* Sin padding izquierdo */
  padding-right: 0; /* Sin padding derecho */
  outline: none; /* Remueve el borde de foco por defecto */
  height: calc(1.5em + 0.75rem + 2px); /* Altura alineada con botones y etiquetas */
}

.editable:focus {
  border-bottom: 2px solid #4F2A93; /* Línea inferior más gruesa al enfocar */
}

/* Estilo para los íconos de editar y eliminar */
.icon {
  font-size: 1rem; /* Tamaño de los íconos */
  color: #4F2A93; /* Color de los íconos */
  cursor: pointer;
  margin-left: 0.5rem; /* Espaciado a la izquierda de los íconos */
}

/* Ajuste del tamaño de los botones */
.btn {
  padding: 0.375rem 0.75rem;
}

.li-d-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.li-d{
  width: calc(50% - 0.5rem); /* Ajusta el ancho para dos columnas */
  max-width: 50%; /* Ancho máximo */
}

.common-ul {
  width: calc(50% - 0.5rem); /* Ajusta el ancho descontando el padding */
  padding: 1rem;
}
.label{
  word-break: break-word;
}
.swal2-confirm {
  background-color: #4F2A93; /* Color de fondo del botón de confirmación */
}

.swal2-cancel {
  background-color: #4F2A93; /* Color de fondo del botón de cancelación */
}

</style>