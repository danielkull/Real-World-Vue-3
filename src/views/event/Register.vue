<script setup>
import { useRouter } from 'vue-router'
import { defineProps, inject } from 'vue'

const { event } = defineProps(['event'])
const router = useRouter()
const GStore = inject('GStore')

const register = () => {
  // If registration API call is successful

  // Uses the flashMessage, for 3000 ms
  GStore.flashMessage = 'You are successfully registered for ' + event.title
  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000)
  // Push back to the event details
  router.push({
    name: 'event-details',
  })
}
</script>

<template>
  <p>Register for event here</p>
  <button @click="register">Register Me!</button>
</template>
