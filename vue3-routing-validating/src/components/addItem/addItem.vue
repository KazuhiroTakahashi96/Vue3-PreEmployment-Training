<template>
  <div>
    <form action="">
      <input
        type="text"
        name="itemName"
        class="itemName"
        placeholder="商品名"
      />
      <input type="number" name="price" class="price" placeholder="値段" />
      <input type="text" name="detail" class="detail" placeholder="詳細" />
      <input type="number" name="stock" class="stock" placeholder="在庫数" />
      <input type="button" value="追加" class="addBtn" @click="onSubmit" />
    </form>
  </div>
</template>

<script setup lang="ts">
const onSubmit = () => {
  console.log("hey");
};
</script>

<style scoped>
form {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
input {
  height: 25px;
}
.itemName {
  width: 30%;
}
.price {
  width: 10%;
}
.detail {
  width: 35%;
}
.stock {
  width: 10%;
}
.addBtn {
  width: 5%;
  height: 100%;
}
</style>
