<template>
  <div class="item">
    <img src="https://picsum.photos/200" alt="" />
    <p>商品名 {{ props.name }}</p>
    <p>値段 {{ props.price }}円</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: String,
  name: String,
  price: String,
});
</script>

<style scoped>
.item {
  margin: 5px;
}
</style>
