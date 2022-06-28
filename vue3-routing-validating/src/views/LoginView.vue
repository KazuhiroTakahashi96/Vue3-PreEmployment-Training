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
      <button type="submit" @click.prevent="onClick()">ログイン</button>
      <br />
      <br />
      <br />
      <span v-if="isAdmin">{{ name }} 様は管理者です。</span>
      <RouterLink to="/admin" v-if="isAdmin"> 管理者画面へ→ </RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import { ref } from "vue";

const isAdmin = ref(false);

async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: object
) {
  const result = await fetch("http://localhost:8080/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  // const res = await axios({
  //   url: "http://localhost:8080/v1/graphql",
  //   method: "post",
  //   data: JSON.stringify({
  //     query: operationsDoc,
  //     variables: variables,
  //     operationName: operationName,
  //   }),
  // });
  // console.log(res.data.data);

  return await result.json();
}

const operationsDoc = `
  query MyQuery ($name: String) {
    users(where: {name: {_eq: $name}}) {
      is_admin
      password
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {
    name: name.value,
  });
}

async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);

  const { users } = data;
  console.log(users[0]);
  if (password.value === users[0].password && users[0].is_admin) {
    isAdmin.value = true;
  }

  return await users[0];
}

// ログインボタンを押したら
const onClick = () => {
  console.log(name.value, password.value);
  startFetchMyQuery();
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
