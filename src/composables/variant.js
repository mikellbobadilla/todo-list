import { computed } from 'vue'

export const useVariant = (props) => {
  return computed(() => {
    const optios = {
      circle: 'circle',
      square: 'square'
    }
    return optios[props.variant]
  })
}

export const variant = {
  variant: {
    type: String,
    default: 'square',
    validator(value) {
      return ['circle', 'square'].includes(value)
    }
  }
}