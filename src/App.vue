<script setup lang="ts">
import { reactive } from 'vue';
import Card from "./components/CardComp.vue";
import CartComp from './components/CartComp.vue';

export type CartType = Record<string, number>;

const cart = reactive<CartType>({});

function addToCart(n: number) {
  const num = n.toString();
  if (!cart[num])
    cart[num] = 1;
  else
    cart[num]++;
}

function removeFromCart(n: number) {
  const num = n.toString();
  if (!cart[num])
    cart[num] = 0;
  else if (cart[num] >= 1)
    cart[num]--;

}



</script>

<template>
  <div class="card-container">
    <Card v-for="num in 26" :imageTag="num" :key="num" :numBought="cart[num]" @handleAdd="addToCart(num)"
      @handleRemove="removeFromCart(num)" />
  </div>
  <CartComp :cart="cart"/>
</template>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1000px;
  margin: auto;
  margin-top: 40px;
}
</style>