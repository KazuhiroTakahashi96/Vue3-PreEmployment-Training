<template>
  <div class="container">
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
    <ProductItem image="image" name="name" price="price" />
  </div>
</template>

<script setup lang="ts">
import ProductItem from "../components/products/productItem.vue";
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
}
</style>
