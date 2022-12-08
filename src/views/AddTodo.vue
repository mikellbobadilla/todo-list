<script setup>
import { ref, reactive } from 'vue'
import Btn from '../components/Btn.vue'
import Spinner from '../components/Spinner.vue'
import axios from 'axios'
import Alert from '../components/Alert.vue'
import { useAlert } from '../composables/alert.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const { alert, showAlert } = useAlert()
const isLoading = ref(false)
const todo = reactive({
  title: '',
  description: '',
  date: ''
})


async function submit() {
  try {
    isLoading.value = true
    const res = await axios.post('/api/todos', {...todo})
    if(res.status === 201){
      isLoading.value = false
      router.push('/')
    }
  } catch (err) {
    showAlert(err.message, 'danger')
  }
}

</script>

<template>
  <Alert color="danger" v-if="alert.show" :message="alert.message" />

  <Spinner v-if="isLoading" />

  <div v-else class="form">
    <h1>Add Todo</h1>
    <form class="add-todo">
      <div class="input-group">
        <label for="title">Title</label>
        <input type="text" placeholder="Todo Title" v-model="todo.title">
      </div>
      <div class="input-group">
        <label for="description">Description</label>
        <input type="text" placeholder="Description" v-model="todo.description">
      </div>
      <div class="input-group">
        <label for="time">Date</label>
        <input type="date" v-model="todo.date">
      </div>

      <Btn @click.prevent="submit">Add Todo</Btn>
    </form>
  </div>
</template>

<style scoped>
.form {
  margin: auto;
  width: 60%;
  padding: 20px;
  background-color: var(--navbar-color);
  border-radius: 10px;
}

h1 {
  text-align: center;
  font-size: 40px;
  margin: 0;
  padding: 10px;
}

.add-todo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-group input {
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