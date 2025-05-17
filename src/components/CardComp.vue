<script setup lang="ts">
import { defineProps } from "vue";
import ButtonComp from "./ButtonComp.vue";

type CardEmitType = {
  handleAdd: () => void;
  handleRemove: () => void;
}

type CardPropType = {
  robotNum: number;
  numBought?: number;
}

defineEmits<CardEmitType>();

defineProps<CardPropType>();

</script>

<template>
  <div class="card">
    <div class="img">
      <img :src="'https://robohash.org/' + robotNum" />
    </div>
    <div class="body">
      <h3>Robot Number: {{ robotNum }}</h3>
      <div class="actionButtons">
        <ButtonComp v-if="!numBought" colored @handleClick="$emit('handleAdd');" fullWidth>Add to the cart!</ButtonComp>
        <template v-else>
          <span class="count">
            {{ numBought }}
          </span>
          <ButtonComp colored @handleClick="$emit('handleRemove')">-</ButtonComp>
          <ButtonComp colored @handleClick="$emit('handleAdd')">+</ButtonComp>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 250px;
  background: linear-gradient(to bottom, #2a2a2a, #1e1e1e);
  color: #f1f1f1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  transform: scale(0.8);
  transition: all;
  transition-duration: 200ms;
  overflow: hidden;
  font-family: 'Fira Code', monospace;
}

.card:hover {
  transform: scale(1);
}

.img {
  width: 200px;
  margin: auto
}

img {
  width: 100%;
}

.body {
  text-align: center;
}

.body h3 {
  padding: 5px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #e0e0e0;

}

.actionButtons {
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}


.count {
  flex-grow: 1;
  background-color: #ffffff11;
  font-size: 1.2em;
  padding: 10px;
  border-radius: 5px;
}
</style>