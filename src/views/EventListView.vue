<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['page'])

const events = ref(null)
const totalEvents = ref(0)

const viewsPerPage = 2

const page = computed(() => props.page)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / viewsPerPage)
  return page.value < totalPages
})

// Todo: build arr reactive to totalPages amount
const totalPagesArr = [1, 2, 3]

onMounted(() => {
  // watchEffect cheches if reactive objects inside change and if so will run it again
  // Thus this function works if updates of the page occure,
  // even if this function is only called onMounted
  watchEffect(() => {
    // Set to null, if slow connection, user sees that something is changing,
    // rather then seeing no change
    events.value = null
    EventService.getEvents(viewsPerPage, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        // if not and no connection then push to another view (also done in Layout.vue)
        router.push({ name: 'NetworkError' })
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >
      <router-link
        :to="{ name: 'event-list', query: { page: pageNumber } }"
        v-for="pageNumber in totalPagesArr"
        :key="pageNumber"
      >
        {{ pageNumber }}</router-link
      >
      <router-link
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
