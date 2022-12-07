<script setup>
import Modal from './Modal.vue'
import Spinner from './Spinner.vue'
import Btn from './Btn.vue'

const props = defineProps({
  showSpinner: {
    type: Boolean,
    default: false
  },
  showModal: {
    type: Boolean,
    default: false
  },
  modelValue:{
    type: String,
    default: ''
  }
})
defineEmits(['close', 'update', 'update:modelValue'])
</script>

<template>
  <Modal :show="showModal" @close="(showModal = false)">
    <template #header>
      <h2>Update Todo</h2>
    </template>

    <template #content>
      <Spinner v-if="showSpinner" />

      <div v-else>
        <form class="todo-form-update">
          <div class="todo-update">
            <label for="title">Todo Title</label>
            <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" >
          </div>
          <Btn @click.prevent="$emit('update')"> Update </Btn>
        </form>
      </div>
    </template>

    <template #footer>
      <Btn variant="square" color="danger" @click="$emit('close')"> Close </Btn>
    </template>

  </Modal>


</template>

<style scoped>
.todo-form-update {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-update {
  display: flex;
  flex-direction: column;
  width: 70%;
}

.todo-update label {
  font-size: 20px;
  margin-bottom: 5px;
}

.todo-update input {
  font-size: 20px;
  background: none;
  outline: none;
  border: 2px solid var(--accent-color);
  border-radius: 10px;
  padding: 5px 10px;
  color: var(--text-color);
}
</style>