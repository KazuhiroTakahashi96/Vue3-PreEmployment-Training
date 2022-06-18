<template>
  <tr>
    <td>{{ props.itemId }}</td>
    <td>{{ props.itemName }}</td>
    <td>{{ props.itemPrice }}</td>
    <td>{{ props.itemDetail }}</td>
    <td>{{ props.itemStock }}</td>
    <td><input type="button" value="削除" class="deleteBtn" /></td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps({
  itemId: Number,
  itemName: String,
  itemPrice: Number,
  itemDetail: String,
  itemStock: Number,
});
</script>

<style scoped>
.deleteBtn {
  width: 50%;
  border-radius: 10px;
}
</style>
