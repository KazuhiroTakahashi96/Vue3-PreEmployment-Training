<template>
  <div>This is a Payment page.</div>
  <div class="container">
    <div>
      <label for="name">お名前</label>
      <input type="text" name="name" v-model="name" />
      <p>{{ nameError }}</p>
    </div>
    <div>
      <label for="address">住所</label>
      <input type="text" name="address" v-model="address" />
      <p>{{ addressError }}</p>
    </div>
    <div>
      <label for="phone">電話番号</label>
      <input type="tel" name="phone" v-model="telephone" />
      <p>{{ telephoneError }}</p>
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" v-model="email" />
      <p>{{ emailError }}</p>
    </div>
    <!-- <div>
      <label for=""></label>
      <input type="text" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

// バリデーション処理
const schema = yup.object({
  name: yup.string().required("必須項目です。"),
  address: yup.string().required("必須項目です。"),
  telephone: yup.number().required("数字を入力してください。"),
  email: yup.string().required().email("必須項目です。"),
});
useForm({
  validationSchema: schema,
});
const { errorMessage: nameError, value: name } = useField("name");
const { errorMessage: addressError, value: address } = useField("address");
const { errorMessage: telephoneError, value: telephone } =
  useField("telephone");
const { errorMessage: emailError, value: email } = useField("email");
</script>

<style scoped>
.container {
  text-align: center;
  height: 100vh;
}
.container > div {
  margin: 30px;
  height: 10vh;
}
p {
  margin: 10px;
  color: red;
  font-size: 15px;
}
</style>
