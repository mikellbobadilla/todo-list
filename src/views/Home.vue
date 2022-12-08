<script setup>
import axios from 'axios'
import Alert from '@/components/Alert.vue'
import Spinner from '@/components/Spinner.vue'
import Todo from '@/components/Todo.vue'
import { useAlert } from '@/composables/alert.js'
import { useFetch } from '@/composables/fetch.js'


// Composables
const { alert, showAlert } = useAlert()
const { todos, isLoading } = useFetch('/api/todos', {
  onError: err => showAlert(err.message, 'danger')
})

// ------------ Send to Server --------------- //

// Delete
async function removeTodo(todo) {
  try {
    isLoading.value = true
    await axios.delete(`/api/todos/${todo.id}`, {...todo.value})
    todos.value = todos.value.filter(t => t !== todo) // Temporal
    isLoading.value = false
  } catch (err) {
    showAlert(err.message, 'danger')
  }
}
</script>

<template>

  <Alert :message="alert.message" :color="alert.variant" v-if="alert.show" @close="alert.show = false" />

  <section class="section">
    <Spinner v-if="isLoading" />
    <div v-else>
      <Todo v-for="todo in todos" :title="todo.title" :description="todo.description" :date="todo.date" :key="todo.id"
        @remove="removeTodo(todo)" @update="$router.push(`/todos/${todo.id}/edit`)" />
    </div>
  </section>
</template>

<style scoped>
/* todo form */
.section {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}
</style>
