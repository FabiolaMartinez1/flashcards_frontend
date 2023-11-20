<template>
    <div class="modal fade" id="accessFormModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h7 class="modal-title" id="modalLabel">Compartir</h7>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h4 class="modal-title text-start" id="modalLabel">Titulo del tema</h4>
                    <p class="text-start">¿Quién tiene acceso?</p>
                    <!-- aqui empieza la tabla -->
                    <div class="container">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Correo electrónico</th>
                                <th scope="col">Acceso</th>
                                <th scope="col">Desde</th>
                                <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">Correo@gmail.com</th>
                                <td>lectura</td>
                                <td>01/12/2023 20:22</td>
                                <td>
                                    <button type="button" class="btn btn-link" @click="eliminarTema">
                                        <i class="fas fa-trash-alt" style="color: black;"></i>
                                    </button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="position-relative">
                        <p class="text-start">Compartir con:</p>
                        <div class="container">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="correo@ejemplo.com" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="searchText" @input="updateResults">
                            <span class="input-group-text" id="basic-addon2">
                                <button type="button" class="btn btn-link" @click="eliminarTema">
                                    <i class="fas fa-search" style="color: black;" @click="search"></i>
                                </button>
                            </span>
                        </div>

                        <!-- Lista de resultados como dropdown -->
                        <div class="position-absolute top-100 start-0" v-if="showResults">
                            <div class="list-group w-100">
                                <a href="#" class="list-group-item list-group-item-action" v-for="result in searchResults" :key="result.id">{{ result.email }}</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div>
                        <div class="form-group row">
                            <label for="" class="col-4 col-form-label"></label> 
                            <div class="col-8">
                                <select class="form-select" id="validationCustom04" required>
                                    <option selected disabled value="">Tipo de acceso   </option>
                                    <option>solo ver</option>
                                    <option>editar</option>
                                    <option>propietario</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="textarea" class="col-4 col-form-label">Comentario</label> 
                            <div class="col-8">
                            <textarea id="textarea" name="textarea" cols="40" rows="5" class="form-control"></textarea>
                            </div>
                        </div> 
                        <div class="form-group row">
                            <div class="offset-4 col-8">
                            <button name="submit" type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                    <!-- aqui termina la tabla -->
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                        <label for="title" class="form-label d-flex">Nuevo tema:</label>
                        <input type="text" class="form-control" id="title" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
</template>
<script>
export default {
    data() {
        return {
        searchText: '',
        showResults: false,
        searchResults: [
            { id: 1, email: 'maria@gmail.com' },
            { id: 2, email: 'maria2@gmail.com' },
            { id: 3, email: 'maria3@gmail.com' },
        ],
        };
    },
    methods: {
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
    },
};
</script>