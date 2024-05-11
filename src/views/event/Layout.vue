<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: {
    required: true,
  },
})

const event = ref(null)

onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      // Checks if error and 404 then redirect
      if (error.response && error.response.status === 404) {
        //   Here we make a push if an 404 occures for the router
        router.push({
          name: '404Resource',
          // Sends as params the name for the NotFound Text if it shall not be page(default)
          params: { resource: 'event' },
        })
      } else {
        // if not and no connection then push to another view (also done in EventListView.vue)
        router.push({ name: 'NetworkError' })
      }
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="id">
      <!-- does not need anymore the parmas with id, because in router index.js
        they are the children of the event-layout which transfers the id further -->
      <router-link :to="{ name: 'event-details' }">Details</router-link>
      |
      <router-link :to="{ name: 'event-register' }">Register</router-link>
      |
      <router-link :to="{ name: 'event-edit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>
