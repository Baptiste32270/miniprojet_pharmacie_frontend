<script setup>
import { ref } from 'vue';

const emit = defineEmits(['ajoutMedic']);

const nom = ref('');
const quantiteParUnite = ref('');
const prixUnitaire = ref('');
const categorieId = ref('');

const soumettreFormulaire = () => {
    const nouveauMedicament = {
        nom: nom.value,
        quantiteParUnite: quantiteParUnite.value,
        prixUnitaire: prixUnitaire.value,
        categorieId: categorieId.value
    };

    emit('ajoutMedic', nouveauMedicament);
    
    nom.value = '';
    quantiteParUnite.value = '';
    prixUnitaire.value = '';
    categorieId.value = '';
};
</script>

<template>
    <form @submit.prevent="soumettreFormulaire">
        <input v-model="nom" type="text" placeholder="Nouveau médicament" required />
        <input v-model="quantiteParUnite" type="text" placeholder="Quantité par unité" required />
        <input v-model="prixUnitaire" type="number" step="0.01" placeholder="Prix unitaire" required />
        <input v-model="categorieId" type="text" placeholder="ID de la catégorie" required />
        <button type="submit">Ajouter</button>
    </form>
</template>
<style scoped>
form {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

input {
  padding: 10px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  flex: 1;
  min-width: 150px;
  outline: none;
}

input:focus { border-color: #4dabf7; }

button {
  padding: 10px 20px;
  background-color: #20c997;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:hover { background-color: #1aa179; }
</style>