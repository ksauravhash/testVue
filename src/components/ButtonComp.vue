<script lang="ts" setup>

type ButtonEmits = {
  handleClick: () => void
}


type ButtonPropType = {
  fullWidth?: boolean;
  rounded?: boolean;
  colored?: boolean;
}

defineEmits<ButtonEmits>();
const props = defineProps<ButtonPropType>();

const buttonStyle = {
  width: props.fullWidth ? '100%' : 'auto',
  borderRadius: props.rounded ? '50%' : 'auto',
  background: props.colored? 'linear-gradient(to right, #7f5af0, #2cb67d)': '#333',
  color: 'white'
}

</script>

<template>
  <button :style="buttonStyle" @click="$emit('handleClick')">
    <slot />
  </button>
</template>


<style scoped>
button {
  border: none;
  padding: 10px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
}

button:hover {
  transform: scale(1.05);
  background: linear-gradient(to right, #a78bfa, #3de18c);

}
</style>