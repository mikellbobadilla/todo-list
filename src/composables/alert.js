import { reactive } from 'vue'

export function useAlert(){
  const alert = reactive({
    show: false,
    message: '',
    variant: 'danger'
  })

  function showAlert(message, variant = 'danger'){
    alert.show = true
    alert.message = message
    alert.variant = variant
  }


  return {
    alert,
    showAlert
  }
}