import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import EditTodo from './views/EditTodo.vue'
import AddTodo from './views/AddTodo.vue'

const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/about',
    component: About
  }, {
    path: '/todos/:id/edit',
    component: EditTodo,
    props: true
  },{
    path: '/todo/add',
    component: AddTodo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { router }