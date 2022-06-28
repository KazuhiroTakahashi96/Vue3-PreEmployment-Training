<template>
  <div>
    <div>ようこそ、HogeHogeさん</div>
    <br />
    <br />
    <RouterLink to="/admin/edit">商品を編集する</RouterLink>
  </div>
  <br />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped></style>
