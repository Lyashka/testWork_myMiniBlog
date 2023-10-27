<template>
  <header class="header_container">MyMiniBlog</header>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
.header_container {
  position: relative;
  width: 100%;
  background-color: rgba(50, 144, 185, 0.591);
  font-size: 3vh;
  padding-left: 1%;
}
</style>
