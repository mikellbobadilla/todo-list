import axios from 'axios'
import { ref, watch } from 'vue'

export function useFetch(url, options = { onError: null }) {
  const todos = ref(null)
  const error = ref(null)
  const isLoading = ref(true)
  let handlerWatcher = null

  if(options.onError !== null){
    handlerWatcher = watch(error, (e) => options.onError(e))
  }

  axios
    .get(url)
    .then(res => todos.value = res.data)
    .catch(err => error.value = err)
    .finally(()=> {
      isLoading.value = false
      if(handlerWatcher !== null) handlerWatcher() 
    })

  return {
    todos,
    error,
    isLoading
  }
}