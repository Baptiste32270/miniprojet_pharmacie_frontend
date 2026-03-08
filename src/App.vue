<script setup>
  import MedicamentList from "./components/MedicamentList.vue";
</script>

<template>
  <h1>Pharmacie personnelle de Baptiste</h1>
  <h2>Liste des médicaments</h2>
  <p>
    <MedicamentList/>
  </p>
</template>

<style scoped>
h1 {
  font-size: 2.2rem;
  color: #212529; 
  margin-top: 20px;
  margin-bottom: 5px;
  font-weight: 700;
}

h2 {
  font-size: 1.4rem;
  color: #6c757d;
  font-weight: 400;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e9ecef;
}
</style>
