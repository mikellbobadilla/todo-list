<script setup>
import { useRouter } from 'vue-router'
import Btn from '@/components/Btn.vue'
import SpinnerVue from '@/components/Spinner.vue'
import { useFetch } from '../composables/fetch.js'
import Alert from '../components/Alert.vue'
import { useAlert } from '../composables/alert.js'
import axios from 'axios'
const props = defineProps(['id'])
const { todos: todo, isLoading } = useFetch(`/api/todos/${props.id}`)

const router = useRouter()

const { alert, showAlert } = useAlert()

async function submit() {
  try {
    isLoading.value = true
    await axios.put(`/api/todos/${props.id}`, { ...todo.value })
    router.push('/')
  } catch (err) {
    showAlert(err.message, 'danger')
  }
}

</script>

<template>
  <Alert v-if="alert.show" class="alert" :message="alert.message" color="danger" />

  <SpinnerVue v-if="isLoading" />
  <div v-else class="form">
    <h1>Edit Todo</h1>
    <form class="todo-form-update">
      <div class="todo-update">
        <label for="title">Title</label>
        <input type="text" v-model="todo.title">
      </div>

      <div class="todo-update">
        <label for="title">Description</label>
        <input type="text" v-model="todo.description">
      </div>

      <div class="todo-update">
        <label for="title">Date</label>
        <input type="date" v-model="todo.date">
      </div>

      <div class="block-btn">
        <Btn class="btn" color="success" @click.prevent="submit"> Update </Btn>
      </div>
    </form>
  </div>
</template>

<style scoped>
.alert {
  margin-bottom: 40px;
}

.form {
  background-color: var(--navbar-color);
  padding: 20px;
  border-radius: 10px;
}

.todo-form-update {
  display: block;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
}

.todo-update {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
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

.block-btn {
  display: flex;
  justify-content: flex-end;
}
</style>