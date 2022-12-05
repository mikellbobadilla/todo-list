<script setup>
import { useVariant, variant } from '@/composables/variant.js'
import { useColor, color } from '@/composables/color.js'

const props = defineProps({
  ...variant,
  ...color
})

const setColor = useColor(props)

const setVariant = useVariant(props)

</script>

<template>
  <button class="btn" :class="setVariant, setColor">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;

  color: var(--text-color);
  border: solid 2px transparent;
  cursor: pointer;
  font-size: 20px;
  padding: 8px 10px;
  transition: ease .5s all;
}

.btn:disabled{
  opacity: 50%;
}

.btn:hover {
  background: none;
}
</style>