<script setup>
import MedicamentItem from "./MedicamentItem.vue";
import RechercheMedicament from "./RechercheMedicament.vue";
import AjouterMedic from "./AjouterMedic.vue";
import ModifierMedic from "./ModifierMedic.vue";

import { Medicament } from "../Medicament.js";

import {reactive, onMounted, ref, watch} from 'vue';

const listeMedic = reactive([]);

let url = `https://shiny-norrie-baptistefaugeres-6b31ac71.koyeb.app/api/medicaments?page=0&size=1000&sort=reference,asc`;

const fetchOptions = {method:"GET"};

const medicamentAModifier = ref(null);

const motcle = ref("");


function getMedics(urlToFetch = url) {
  fetch (urlToFetch, fetchOptions)
  .then(response => response.json())
  .then( (dataJSON) =>{
    console.log(dataJSON)
    listeMedic.splice(0, listeMedic.length);
    for (let medic of dataJSON._embedded.medicaments) {
      if (!motcle.value || medic.nom.toLowerCase().includes(motcle.value.toLowerCase())) {
        listeMedic.push(new Medicament(medic.nom, medic.reference, medic.quantiteParUnite, medic.unitesEnStock, medic.prixUnitaire, medic.imageURL));
      }
    }
  })
  .catch( (error) =>{ 
    console.log(error)
  })

}

onMounted(() => {
  getMedics();
});

function ajoutMedic(nouveauMedicament) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
const urlPost = 'https://shiny-norrie-baptistefaugeres-6b31ac71.koyeb.app/api/medicaments';  
  const fetchOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      nom: nouveauMedicament.nom,
      quantiteParUnite: nouveauMedicament.quantiteParUnite,
      prixUnitaire: nouveauMedicament.prixUnitaire,
      unitesEnStock: 0,
      categorie: "/api/categories/" + nouveauMedicament.categorieId
    })
  }
  
  fetch(urlPost, fetchOptions)
    .then(response => response.json())
    .then(data => {
      console.log('Médicament ajouté :', data);
      getMedics();
    })
    .catch(error => {
      console.log(error);
    });
}


function supprMedic(medicamentASupprimer) {
  if (!confirm(`Voulez-vous vraiment supprimer le médicament : ${medicamentASupprimer.nom} ?`)) {
    return;
  }

  const urlDelete = `https://shiny-norrie-baptistefaugeres-6b31ac71.koyeb.app/api/medicaments/${medicamentASupprimer.reference}`;

  fetch(urlDelete, {method: 'DELETE'})
  .then(response => {
    if (response.ok) {
        console.log('Médicament supprimé');
        getMedics();
    }
  })
  .then(data => {
    console.log('Médicament supprimé');
    getMedics();
  })
  .catch(error => {
    console.log(error);
  });
}

function plusUn(medicament) {
  modifierStock(medicament, medicament.unitesEnStock + 1);
}

function moinsUn(medicament) {
  if (medicament.unitesEnStock > 0) {
    modifierStock(medicament, medicament.unitesEnStock - 1);
  } 
  else {
    alert("Le stock est déjà à 0");
  }
}

function modifierStock(medicament, nouvelleQuantite) {
  const urlPatch = `https://shiny-norrie-baptistefaugeres-6b31ac71.koyeb.app/api/medicaments/${medicament.reference}`;

  const fetchOptions = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({unitesEnStock: nouvelleQuantite})
  };

  const stockBaisse = nouvelleQuantite < medicament.unitesEnStock;

  fetch(urlPatch, fetchOptions)
  .then(response => {
    medicament.unitesEnStock = nouvelleQuantite;
    console.log("Stock mis à jour");

    if (stockBaisse) {
        declencherVerificationMails();
    }
  })
  .catch(error => {
    console.log(error);
  });
}

function declencherVerificationMails() {
    fetch("https://shiny-norrie-baptistefaugeres-6b31ac71.koyeb.app/api/reapprovisionnement/declencher", {
        method: 'POST'
    })
    .then (response => console.log("Envoie de mails pour réapprovisionnement"))
    .catch(error => console.log(error));
}

function modifMedic(medicament) {
  medicamentAModifier.value = medicament;
  window.scrollTo(0, 0);
}

function validerModification(medicamentModifie) {
  const urlPatch = `https://shiny-norrie-baptistefaugeres-6b31ac71.koyeb.app/api/medicaments/${medicamentModifie.reference}`;

  fetch(urlPatch, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nom: medicamentModifie.nom,
      quantiteParUnite: medicamentModifie.quantiteParUnite,
      prixUnitaire: medicamentModifie.prixUnitaire,
      imageurl: medicamentModifie.imageURL
    })
  })
  .then(response => {
    if (!response.ok) throw new Error("Erreur serveur lors de la modification");
    
    console.log("Médicament modifié");
    medicamentAModifier.value = null;
    getMedics();
  })
  .catch(error => {
    console.log(error);
    alert("Impossible de modifier le médicament.");
  });
}

function handlerSubmit(nouveauMotCle) {
  motcle.value = nouveauMotCle;
}

watch(
  () => motcle.value,
  (newCritere) => {
    getMedics();
  }
);



</script>
<template>
  <RechercheMedicament @eventSubmit="handlerSubmit" />

  <AjouterMedic @ajoutMedic="ajoutMedic" />

  <ModifierMedic 
    v-if="medicamentAModifier" 
    :medicament="medicamentAModifier" 
    @valider="validerModification" 
    @annuler="medicamentAModifier = null" 
  />

  <div class="conteneur-tableau">
    <table class="tableau-medic">
      <thead>
        <tr>
          <th>Image</th>
          <th>Réf</th>
          <th>Nom du médicament</th>
          <th>Conditionnement</th>
          <th>Prix</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      
      <tbody>
        <MedicamentItem v-for="medicament in listeMedic" 
          :key="medicament.reference" 
          :medicament="medicament"
          @modif="modifMedic"
          @plus="plusUn"
          @moins="moinsUn"
          @suppr="supprMedic" 
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.conteneur-tableau {
  margin-top: 20px;
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border-radius: 8px;
}

.tableau-medic {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  text-align: left;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.tableau-medic th {
  background-color: #f8f9fa;
  color: #495057;
  padding: 15px;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
}

.tableau-medic :deep(td) {
  padding: 12px 15px;
  border-bottom: 1px solid #f1f3f5;
  vertical-align: middle;
  color: #343a40;
}

.tableau-medic :deep(tr:hover) {
  background-color: #f8f9fa;
}

.tableau-medic th:nth-child(6),
.tableau-medic th:nth-child(7) {
  text-align: center;
}
</style>