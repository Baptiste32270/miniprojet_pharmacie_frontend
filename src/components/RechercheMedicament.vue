<script setup>
import { ref } from "vue";

const emit = defineEmits(["eventSubmit"]);
const texte = ref("");
</script>

<template>
  <div style="margin-bottom: 20px;">
    <form @submit.prevent="
        $emit('eventSubmit', texte);
        texte = '';
      ">
      <input
        v-model="texte"
        type="text"
        placeholder="Rechercher par nom"
        required
      />
      <button type="submit">Rechercher</button>
      
      <button type="button" @click="$emit('eventSubmit', '')">Voir tout</button>
    </form>
  </div>
</template>
<style scoped>
form {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

input {
  padding: 10px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  width: 300px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4dabf7;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.2);
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #343a40;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

button[type="submit"]:hover { background-color: #212529; }

button[type="button"] {
  padding: 10px 20px;
  background-color: #f8f9fa;
  color: #343a40;
  border: 1px solid #ced4da;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

button[type="button"]:hover { background-color: #e2e6ea; }
</style>