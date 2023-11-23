<template>
    <div class="container">
      <div class="row mb-3">
        <div class="col">
          <h1>Título del tema</h1>
          <p>Descripción... de mi tema.............</p>
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-8">
          <!-- List of Cards -->
          <div class="card mb-3" v-for="card in cards" :key="card.id">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">{{ card.description }}</p>
              <!-- Buttons for Edit/Delete/Details -->
            </div>
          </div>
        </div>
  
        <div class="col-md-4">
          <!-- Test Mode Section -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Modo test</h5>
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{ width: testProgress + '%' }" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">{{ testProgress }}%</div>
              </div>
              <p class="card-text">Puntuación: 70</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // name: 'StudyModeComponent',
    props: {
        topicId: {
            type: Number,
            required: true,
        },
    },
    data() {
      return {
        cards: [
            {
                id: 1,
                title: 'Título de la tarjeta 1',
                description: 'Descripción de la tarjeta 1',
            },
            {
                id: 2,
                title: 'Título de la tarjeta 2',
                description: 'Descripción de la tarjeta 2',
            },
            {
                id: 3,
                title: 'Título de la tarjeta 3',
                description: 'Descripción de la tarjeta 3',
            },
        ],
        testProgress: 70
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  