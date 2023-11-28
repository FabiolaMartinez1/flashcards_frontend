<template>
  <div>
    <b-button @click="show = !show" variant="primary">
      Etiquetas
    </b-button>
    
    <b-collapse v-model="show" class="mt-2">
      <b-card>
        <div v-for="label in labels" :key="label">
          <b-form-checkbox v-model="selectedLabels" :value="label">
            {{ label }}
          </b-form-checkbox>
        </div>
        <b-button @click="clearLabels" variant="danger">
          Quitar todos los filtros
        </b-button>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      selectedLabels: [],
      labels: ['Sin etiqueta', 'prueba 1', 'prueba 2', 'hahah', 'prueba3', 'etiqueta']
    };
  },
  methods: {
    clearLabels() {
      this.selectedLabels = [];
    }
  }
};
</script>

<style scoped>
</style>
