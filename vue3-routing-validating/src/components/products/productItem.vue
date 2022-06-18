<template>
  <div class="item">
    <p>商品名 {{ props.name }}</p>
    <p>値段 {{ props.price }}円</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  price: Number,
});
</script>

<style scoped>
.item {
  margin: 10px;
}
</style>
