<script setup>
import axios from 'axios'
import Alert from '@/components/Alert.vue'
import TodoForm from '@/components/TodoForm.vue'
import Spinner from '@/components/Spinner.vue'
import Todo from '@/components/Todo.vue'
import { reactive, ref } from 'vue'
import ModalFormUpdate from '@/components/ModalFormUpdate.vue'
import { useAlert } from '@/composables/alert.js'
import { useFetch } from '@/composables/fetch.js'

const todoTitle = ref('')
const isPosting = ref(false)
const isLoadingUpdate = ref(false)

// Composables
const { alert, showAlert } = useAlert()
const { todos, isLoading } = useFetch('http://localhost:8080/todos', {
  onError: err => showAlert(err.message, 'danger')
})

const modalForm = reactive({
  show: false,
  todo: {
    id: 0,
    title: ''
  }
})

function showModal(todo) {
  modalForm.show = true
  modalForm.todo = { ...todo }
}



// ------------ Send to Server --------------- //

// Post
async function addTodo() {
  try {
    if (todoTitle.value.trim() === '') {
      showAlert('Todo Title is required!', 'danger')
      return
    }
    isLoading.value = true
    isPosting.value = true
    const res = await axios.post('/api/todos', { title: todoTitle.value })
    todos.value.push(res.data) // Temporal
    isPosting.value = false
    isLoading.value = false
    todoTitle.value = ''
  } catch (err) {
    showAlert(err.message, 'danger')
    isLoading.value = false
    isPosting.value = false
  }
}

// Delete
async function removeTodo(todo) {
  try {
    isLoading.value = true
    await axios.delete(`/api/todos/${todo.id}`, {
      title: todo.title
    })
    todos.value = todos.value.filter(t => t !== todo) // Temporal
    isLoading.value = false
  } catch (err) {
    showAlert(err.message, 'danger')
  }
}

// Put
async function updateTodo(todo) {
  try {
    isLoadingUpdate.value = true
    await axios.put(`/api/todos/${todo.id}`, {
      title: todo.title
    })
    const res = await axios.get('/api/todos')
    todos.value = res.data
    isLoadingUpdate.value = false
    modalForm.show = false
  } catch (err) {
    showAlert(err.message, 'danger')
  }
}

</script>

<template>

  <ModalFormUpdate :showSpinner="isLoadingUpdate" :showModal="modalForm.show" @close="(modalForm.show = false)"
    v-model="modalForm.todo.title" @update="updateTodo(modalForm.todo)" />

  <Alert :message="alert.message" :color="alert.variant" v-if="alert.show" @close="alert.show = false" />

  <section class="section">
    <TodoForm @submit="addTodo" :isLoading="isPosting" v-model="todoTitle" />
  </section>

  <section class="section">
    <Spinner v-if="isLoading" />
    <div v-else>
      <Todo v-for="todo in todos" :title="todo.title" :key="todo.id" @remove="removeTodo(todo)"
        @update="showModal(todo)" />
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
