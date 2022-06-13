<template>
  <div class="container">
    <p>決済が完了しました。</p>
    <p>またのご利用、お待ちしております。</p>
    <RouterLink to="/">ホームに戻る</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
div {
  margin: 100px;
  text-align: center;
  font-size: 30px;
}
p {
  line-height: 2;
}
</style>
