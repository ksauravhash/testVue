<script setup lang="ts">
import { provide, reactive, readonly } from 'vue';
import { ADD_TO_CART_KEY, CART_KEY, REMOVE_COMPLETELY_FROM_CART_KEY, REMOVE_FROM_CART_KEY, type CartType } from './keys';


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

function removeCompletelyFromCart(n:number) {
  const num = n.toString();
  delete cart[num];
}

provide(CART_KEY, readonly(cart));
provide(ADD_TO_CART_KEY, addToCart);
provide(REMOVE_FROM_CART_KEY, removeFromCart);
provide(REMOVE_COMPLETELY_FROM_CART_KEY, removeCompletelyFromCart);

</script>

<template>
  <RouterView></RouterView>
</template>