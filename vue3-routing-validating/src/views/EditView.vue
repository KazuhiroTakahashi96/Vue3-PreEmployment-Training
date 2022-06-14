<template>
  <addItem></addItem>
  <br />
  <br />
  <table>
    <tr>
      <th class="itemId">商品ID</th>
      <th class="itemName">商品名</th>
      <th class="price">値段</th>
      <th class="detail">詳細</th>
      <th class="delete">削除</th>
    </tr>
    <editItem></editItem>
    <editItem></editItem>
    <editItem></editItem>
    <editItem></editItem>
    <editItem></editItem>
  </table>
</template>

<script setup lang="ts">
import editItem from "@/components/editItem/editItem.vue";
import addItem from "@/components/addItem/addItem.vue";
</script>

<style>
table {
  width: 100%;
  text-align: center;
  border: 1px solid;
  border-collapse: collapse;
}
tr,
th,
td {
  border: 1px solid;
}
.itemId {
  width: 10%;
}
.itemName {
  width: 30%;
}
.price {
  width: 10%;
}
.detail {
  width: 40%;
}
.delete {
  width: 10%;
}
</style>
