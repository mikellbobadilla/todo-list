<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const modal = ref(null)
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close'])

const clickListener = (e) => {
  if (e.target === modal.value) {
    emit('close')
  }
}

const escapeListener = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('click', clickListener)
  window.addEventListener('keydown', escapeListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', clickListener)
  window.removeEventListener('keydown', escapeListener)
})

</script>

<template>
  <div ref="modal" class="modal" v-show="show" >
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header" />
      </div>

      <div class="modal-body">
        <slot name="content" />
      </div>

      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The Modal (background) */
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: var(--background-color);
  margin: auto;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 10px;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
}

.modal-header {
  padding: 2px 16px;
  background-color: var(--accent-color);
  color: white;
  min-height: 50px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

.modal-body {
  padding: 20px 16px;

  height: 100px;
}

.modal-footer {
  padding: 2px 16px;
  background-color: var(--background-color);
  color: white;
  min-height: 50px;
  border-top: 2px solid var(--accent-color);

  padding: 20px;

  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
}
</style>