<script setup lang="ts">
import { CART_KEY, type CartFunctionType, type CartType, REMOVE_COMPLETELY_FROM_CART_KEY } from '@/keys';
import { computed, inject } from 'vue';
import ButtonComp from './ButtonComp.vue';
import router from '@/router';


const cart = inject<CartType>(CART_KEY, {});
const removeCompletelyFromCart = inject<CartFunctionType>(REMOVE_COMPLETELY_FROM_CART_KEY);
if (!removeCompletelyFromCart) throw new Error("Didn't provide the function");

const isCartEmpty = computed(() => {
  return Object.keys(cart).length === 0;
})


function order() {
  alert("You have successfully ordered your robots.\nThanks for visiting us!");
  router.push('/');
}
</script>

<template>
  <div class="cartContainer">
    <div class="cartTitle">Your Cart</div>
    <template v-if="isCartEmpty">
      <p>Your cart is empty!</p>
      <RouterLink to="/">
        <ButtonComp>Go back home</ButtonComp>
      </RouterLink>
    </template>
    <template v-else>
      <div v-for="(value, key) in cart" :key="key" class="cartItem">
        <div class="itemDetails">
          <div class="itemName">Robot: {{ key }}</div>
          <div class="itemQuantity">Quantity: {{ value }}</div>
        </div>
        <ButtonComp @handleClick="removeCompletelyFromCart(Number(key))" class="removeBtn">Remove</ButtonComp>
      </div>


      <!-- Confirm Button -->
      <ButtonComp @handleClick="order">Confirm Order</ButtonComp>
    </template>
  </div>
</template>

<style scoped>
.cartContainer {
  max-width: 500px;
  margin: 50px auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.cartTitle {
  font-size: 1.5em;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.cartItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.itemDetails {
  flex: 1;
}

.itemName {
  font-weight: bold;
}

.itemQuantity {
  font-size: 0.9em;
  color: #666;
}

.removeBtn {
  background: none !important;
  border: none;
  color: #d00 !important;
  cursor: pointer;
  font-size: 0.9em;
  text-decoration: underline;
}
</style>