<template>
  <h2 class="title">Validation using Vee-Validate</h2>
  <form action="">
    <div class="input">
      <label for="name">ユーザー名</label>
      <input type="text" name="name" v-model="name" />
      <p>{{ nameError }}</p>
    </div>

    <div class="input">
      <label for="password">パスワード</label>
      <input type="password" name="password" v-model="password" />
      <p>{{ passwordError }}</p>
    </div>

    <div class="btn">
      <RouterLink to="/admin">
        <button type="submit" @click="onClick">ログイン</button>
      </RouterLink>
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
import { RouterLink } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const onClick = () => {
  console.log(name.value, password.value);
};

// バリデーション処理
const schema = yup.object({
  name: yup.string().required("必須項目です。"),
  password: yup.string().required().min(6, "パスワードは6文字以上です。"),
});
useForm({
  validationSchema: schema,
});
const { errorMessage: nameError, value: name } = useField("name");
const { errorMessage: passwordError, value: password } = useField("password");
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
.input {
  margin: 60px;
  height: 5vh;
}
label {
  margin-right: 20px;
  color: #fff;
}
input {
  width: 200px;
  height: 30px;
  font-size: 20px;
}
p {
  margin: 15px;
  color: red;
  font-size: 15px;
}
button {
  width: 70px;
  height: 25px;
  margin-top: 50px;
  font-size: 60%;
}
</style>
