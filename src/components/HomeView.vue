<script setup lang="ts">
import { inject } from "vue";
import Card from "./CardComp.vue";
import CartComp from './CartComp.vue';
import { type CartType, type CartFunctionType, CART_KEY, ADD_TO_CART_KEY, REMOVE_FROM_CART_KEY } from "@/keys";

const cart = inject<CartType>(CART_KEY);
const addToCart = inject<CartFunctionType>(ADD_TO_CART_KEY);
const removeFromCart = inject<CartFunctionType>(REMOVE_FROM_CART_KEY);

if (!addToCart || !removeFromCart || !cart) throw new Error("Something is not provided.");

</script>

<template>
  <div class="card-container">
    <Card v-for="num in 26" :robotNum="num" :key="num" :numBought="cart[num]" @handleAdd="addToCart(num)"
      @handleRemove="removeFromCart(num)" />
  </div>
  <CartComp :cart="cart" />
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