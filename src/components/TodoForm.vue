<script setup>
import Btn from './Btn.vue'
import Spinner from './Spinner.vue'

defineEmits(['submit', 'update:modelValue'])
defineProps({
  isLoading: {
    default: false,
    type: Boolean,
  },
  modelValue: {
    type: String
  }
})

</script>

<template>
  <form class="form">
    <div class="todo-title">
      <input type="text" id="title" :value="modelValue" placeholder="Todo Title"
        @input="$emit('update:modelValue', $event.target.value)">
    </div>
    <Btn :disabled="isLoading" @click.prevent="$emit('submit')" variant="square" color="success">
      <Spinner v-if="isLoading" />
      <span v-else>Add todo</span>
    </Btn>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.todo-title {
  display: flex;
  flex-direction: column;
}

.todo-title label {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.todo-title input {
  width: 100%;
  outline: none;
  border: solid 2px var(--accent-color);
  background: none;
  border-radius: 10px;
  width: 500px;
  height: 30px;
  color: var(--text-color);
  font-size: 20px;
  padding: 5px;
}
</style>