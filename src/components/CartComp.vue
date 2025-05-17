<script setup lang="ts">
import { computed, ref } from 'vue';
import ButtonComp from './ButtonComp.vue';
import type { CartType } from '@/App.vue';
const showPopUp = ref(false);

type CartPropType = {
  cart: CartType
}

function togglePopUp() {
  showPopUp.value = !showPopUp.value;
}

const props = defineProps<CartPropType>();

const cartCount = computed(() => {
  return Object.keys(props.cart).length;
})

</script>

<template>
  <div class="popUpBtn">
    <ButtonComp rounded @handleClick="togglePopUp">🛒</ButtonComp>
  </div>
  <div class="popUp" v-show="showPopUp">
    <div class="popUpWin">
      <h3>Items in the cart</h3>
      <p v-if="!cartCount">No items added to cart.</p>
      <template v-else>
        <div v-for="(value, key) in cart" :key="key" class="cartItem">
          Robot {{ key }} -
          <span>
            {{ value }}
          </span>
        </div>
      </template>
      <ButtonComp @handleClick="togglePopUp" class="cartBtn">Close</ButtonComp>
    </div>
  </div>

</template>

<style scoped>
.popUpBtn {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 50;
}

.popUp {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff99;
}

.popUpWin {
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 5px 5px #00000050;
  padding: 10px;
}

@media screen and (max-width: 900px) {
  .popUpWin {
    max-height: 100%;
    max-width: 100%;
  }
}

.cartItem {
  font-size: 1.2em;
  background-color: #333;
  color: #eee;
  padding: 10px;
  border-radius: 2px;
  margin: 5px auto 10px auto;
}

.cartItem>span {
  background-color: #444;
  padding: 5px;
}

.cartBtn {
  margin: 'auto';
  display: 'block'
}
</style>