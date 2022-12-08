<script setup>
import Btn from './Btn.vue'
import Close from './icons/Close.vue'
import Pencil from './icons/Pencil.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['remove', 'update'])

</script>

<template>
  <div class="todo">
    <div class="content">
      <p> {{ title }} </p>
      <p> {{ description }} </p>
      <p> {{ date }} </p>
    </div>

    <div class="actions">
      <Btn @click.prenver="emit('update')" color="warning" variant="circle">
        <Pencil class="icon" />
      </Btn>

      <Btn @click.prevent="emit('remove')" variant="circle" color="danger">
        <Close class="icon"></Close>
      </Btn>
    </div>

  </div>
</template>

<style scoped>
.todo {
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: transparent;
  border-radius: 10px;
}

.content{
  width: 70%;
  display: flex;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 20px;
}
</style>