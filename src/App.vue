<script setup>
import axios from 'axios'
import Navbar from './components/Navbar.vue'
import Alert from './components/Alert.vue'
import TodoForm from './components/TodoForm.vue'
import Spinner from './components/Spinner.vue'
import Todo from './components/Todo.vue'
import { reactive, ref } from 'vue'
import Modal from './components/Modal.vue'
import Btn from './components/Btn.vue'

const todos = ref([])
const todoTitle = ref('')
const isLoading = ref(false)
const isPosting = ref(false)
const isLoadingUpdate = ref(false)

const alert = reactive({
  show: false,
  message: '',
  variant: 'danger'
})

const modalForm = reactive({
  show: false,
  todo: {
    id: 0,
    title: ''
  }
})

function showAlert(message, variant) {
  alert.show = true,
    alert.message = message,
    alert.variant = variant
}

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
    await axios.post('http://localhost:8080/todos', { title: todoTitle.value })
    isPosting.value = false
    isLoading.value = false
    fetchTodo()
    todoTitle.value = ''
  } catch (err) {
    showAlert(err.message, 'danger')
    isLoading.value = false
    isPosting.value = false
  }
}

// Get
async function fetchTodo() {
  try {
    isLoading.value = true
    const res = await axios.get('http://localhost:8080/todos')
    todos.value = res.data
    isLoading.value = false
  } catch (err) {
    showAlert(err.message, 'danger')
    isLoading.value = false
  }
}
// Delete
async function removeTodo(todo) {
  try {
    isLoading.value = true
    await axios.delete(`http://localhost:8080/todos/${todo.id}`, {
      title: todo.title
    })
    isLoading.value = false
    fetchTodo()
  } catch (err) {
    showAlert(err.message, 'danger')
  }
}

// Put
async function updateTodo(todo) {
  try {
    isLoadingUpdate.value = true
    await axios.put(`http://localhost:8080/todos/${todo.id}`, {
      title: todo.title
    })
    fetchTodo()
    isLoadingUpdate.value = false
    modalForm.show = false
    showAlert('Todo Updated!', 'info')
    setTimeout(() => alert.show = false, 5000)
  } catch (err) {
    showAlert(err.message, 'danger')
  }
}

fetchTodo()

</script>

<template>

  <header class="header">
    <Navbar />
  </header>
  <main class="container">
    <Modal :show="modalForm.show" @close="modalForm.show = false">
      <template #header>
        <h2>Update Todo</h2>
      </template>


      <template #content>
        <Spinner v-if="isLoadingUpdate" />
        <div v-else>
          <form class="todo-form-update">
            <div class="todo-update">
              <label for="title">Todo Title</label>
              <input type="text" v-model="modalForm.todo.title">
            </div>
            <Btn @click.prevent="updateTodo(modalForm.todo)"> Update </Btn>
          </form>
        </div>
      </template>

      <template #footer>
        <Btn color="danger" @click="modalForm.show = false"> Close </Btn>
      </template>

    </Modal>

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
  </main>
</template>

<style scoped>
.header {
  width: 100%;
}

/* todo form */
.section {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

/* form */

.todo-form-update {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-update {
  display: flex;
  flex-direction: column;
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
