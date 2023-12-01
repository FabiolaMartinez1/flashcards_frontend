<template>
  <div class="container mt-3">
    <div class="row">
      <!-- Content Cards Column -->
      <div class="col-md-8">
  
  <div class="d-flex justify-content-between">
    <h1>Título del tema</h1>
    <!-- color picker -->
    <div>
      <i class="bi bi-palette-fill">aaaa</i>
      <input type="color" id="favcolor" name="favcolor" value="#ff0000">
    </div>
  </div>
  
  <p class="d-flex">Descripción... de mi tema...</p>
      <div class="card">
        <div class="card-body">
          <!-- Contenedor para título y botón de menú -->
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title">vamoh</h5>
            <div class="dropdown">
              <button class="btn btn-sm btn-transparent" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-three-dots-vertical fs-5"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#" @click.prevent="deleteTopic(tema.topicId)">Eliminar</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="ViewCards(tema.topicId)">Ver detalles</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="compartir(tema.topicId, tema.title)" >Compartir</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  
      <!-- Score Section Column -->
      <div class="col-md-4">
        <div style="height: 100px;"> <!-- Ajusta el ancho según sea necesario -->
          <!-- Espacio vacío -->
        </div>
        <div class="card text-center">
          <div class="card-header">
            Modo test
          </div>
          <div class="card-body">
            <h5 class="card-title">Puntuación:</h5>
            <p class="card-text">
              <!-- Use Bootstrap Progress bar or custom circle progress bar here -->
              <!-- <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 70%;" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70</div>
              </div> -->
              11/15
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>  
  
  </template>
  <script>
  
  </script>