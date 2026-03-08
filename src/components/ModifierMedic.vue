<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['medicament']);
const emit = defineEmits(['valider', 'annuler']);

const nom = ref(props.medicament.nom);
const quantiteParUnite = ref(props.medicament.quantiteParUnite);
const prixUnitaire = ref(props.medicament.prixUnitaire);
const imageURL = ref(props.medicament.imageURL || '');

watch(() => props.medicament, (nouveauMedicament) => {
    nom.value = nouveauMedicament.nom;
    quantiteParUnite.value = nouveauMedicament.quantiteParUnite;
    prixUnitaire.value = nouveauMedicament.prixUnitaire;
    imageURL.value = nouveauMedicament.imageURL || '';
});

const soumettreModification = () => {
    const medicamentModifie = {
        reference: props.medicament.reference, 
        nom: nom.value,
        quantiteParUnite: quantiteParUnite.value,
        prixUnitaire: prixUnitaire.value,
        imageURL: imageURL.value
    };
    
    emit('valider', medicamentModifie);
};
</script>

<template>
    <div class="formulaire-modification">
        <h3>Modifier : {{ medicament.nom }}</h3>
        
        <form @submit.prevent="soumettreModification">
            <input v-model="nom" type="text" placeholder="Nom" required />
            <input v-model="quantiteParUnite" type="text" placeholder="Quantité par unité" required />
            <input v-model="prixUnitaire" type="number" step="0.01" placeholder="Prix unitaire" required />  
            <input v-model="imageURL" type="text" placeholder="Lien de l'image (URL)" />
            
            <button type="submit">Enregistrer les modifications</button>
            <button type="button" @click="$emit('annuler')">Annuler</button>
        </form>
    </div>
</template>
<style scoped>
.formulaire-modification {
  background-color: #fff3cd;
  border: 1px solid #ffe69c;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

h3 {
  margin-top: 0;
  color: #664d03;
  margin-bottom: 15px;
}

form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

input {
  padding: 10px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  flex: 1;
  min-width: 150px;
}

button[type="submit"] {
  background-color: #ffc107;
  color: #000;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

button[type="submit"]:hover { background-color: #ffca2c; }

button[type="button"] {
  background-color: white;
  border: 1px solid #ced4da;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}
</style>