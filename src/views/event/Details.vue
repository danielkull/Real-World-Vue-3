<script setup>
const props = defineProps(['event'])
</script>

<template>
  <p>{{ event.time }} on {{ event.data }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
