<template>
  <div>
    <label :for="props.name">{{ props.labelName }}</label>
    <input v-model="inputValue" :type="props.type" :name="props.name" />
    <p>{{ errorMessage }}</p>
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

const schema = yup.object({
  name: yup.string().required("必須項目です。"),
  password: yup.string().required().min(6),
});

useForm({
  validationSchema: schema,
});

const { errorMessage: nameError, value: name } = useField("name");
const { errorMessage: passwordError, value: password } = useField("password");

const inputValue = props.name === "name" ? name : password;
const errorMessage = props.name === "name" ? nameError : passwordError;
</script>

<style scoped>
div {
  margin-top: 50px;
  height: 10vh;
  text-align: center;
}
label {
  margin-right: 20px;
  color: #fff;
}
input {
  width: 200px;
  height: 30px;
}
p {
  margin-top: 10px;
  color: red;
  font-size: 20px;
}
</style>
