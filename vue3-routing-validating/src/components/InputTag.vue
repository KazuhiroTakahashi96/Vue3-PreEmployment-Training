<template>
  <div>
    <label :for="props.name">{{ props.labelName }}</label>
    <input v-model="inputValue" :type="props.type" :name="props.name" />
    <p>{{ errorMsg }}</p>
  </div>
</template>

<!-- vee-validateについて
https://reffect.co.jp/vue/veevaliate4
 -->

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const props = defineProps({
  labelName: String,
  type: String,
  name: String,
});

// inputValueを親要素に送る
// const emit = defineEmits(["inputValue"]);
// const value = () => {
//   emit("inputValue", inputValue);
// };

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

const inputValue = props.name === "name" ? name : password;
const errorMsg = props.name === "name" ? nameError : passwordError;
</script>

<style scoped>
div {
  margin: 50px;
  height: 5vh;
  text-align: center;
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
</style>
