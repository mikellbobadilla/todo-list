<script setup>
import Close from './icons/Close.vue'
import Btn from './Btn.vue'
import { color, useColor } from '../composables/color.js'

const props = defineProps({
  ...color,
  message: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const setColor = useColor(props)

</script>

<template>
  <div class="alert" :class="setColor">
    <p> {{ message }} </p>
    <Btn :color="setColor" variant="circle" @click="emit('close')">
      <Close />
    </Btn>
  </div>
</template>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 5px 20px;
  border-radius: 10px;
  border: solid 2px transparent;
  width: 100%;
  max-width: 800px;
}

.alert p {
  margin: 0;
  padding: 0;
  font-size: 20px;
  color: inherit;
}
</style>