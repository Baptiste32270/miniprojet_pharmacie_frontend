<script setup>
import { Medicament } from "../Medicament.js";
defineProps(["medicament"]);

</script>
<template>
  <tr>
    <td>
      <img v-if="medicament.imageURL" :src="medicament.imageURL" alt="Affiche" class="mini-image" />
      <span v-else>img medic</span>
    </td>
    <td>{{ medicament.reference }}</td>
    <td>{{ medicament.nom }}</td>
    <td>{{ medicament.quantiteParUnite }}</td>
    <td>{{ medicament.prixUnitaire }} €</td>
    
    <td class="cellule-stock">
      <button @click="$emit('moins', medicament)" class="btn-rond">-</button>
      <span class="chiffre-stock">{{ medicament.unitesEnStock }}</span>
      <button @click="$emit('plus', medicament)" class="btn-rond">+</button>
    </td>

    <td class="cellule-actions">
      <button @click="$emit('modif', medicament)" class="btn-action">Modifier</button>
      <button @click="$emit('suppr', medicament)" class="btn-action">Supprimer</button>
    </td>
  </tr>
</template>

<style scoped>
.mini-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}


.chiffre-stock {
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

.btn-rond {
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-rond:hover {
  background-color: #f0f0f0;
}

.btn-action {
  background: none;
  border: 2px solid #ccc;
  cursor: pointer;
  margin-right: 5px;
  opacity: 0.7;
}

.btn-action:hover {
  opacity: 1;
}

.cellule-stock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-action {
  background-color: white;
  border: 1px solid #ced4da;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 5px;
  transition: 0.2s;
}

.btn-action:hover { background-color: #f8f9fa; }
</style>