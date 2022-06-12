<template>
  <h2 class="title">Validation using Vee-Validate</h2>
  <form action="" @click.prevent="handleSubmit()">
    <InputTag labelName="ユーザー名" type="text" name="name" />
    <InputTag labelName="パスワード" type="password" name="password" />

    <div class="btn">
      <button type="submit">ログイン</button>
    </div>
  </form>
</template>

<!-- vee-validateについて
https://reffect.co.jp/vue/veevaliate4
 -->
<!-- <script setup>について -->
<!-- https://zenn.dev/azukiazusa/articles/676d88675e4e74 -->
<!-- https://tekrog.com/vue3-script-setup/ -->

<script setup lang="ts">
import InputTag from "../components/InputTag.vue";

const handleSubmit = () => {
  console.log("Vue3");
};
</script>

<style scoped>
h2 {
  text-align: center;
  color: aliceblue;
}
form {
  margin: 50px 0;
  font-size: 20px;
  text-align: center;
}
button {
  width: 70px;
  height: 25px;
  margin-top: 50px;
  font-size: 60%;
}
</style>
