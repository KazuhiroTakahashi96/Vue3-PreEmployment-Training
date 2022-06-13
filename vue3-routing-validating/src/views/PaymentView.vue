<template>
  <div class="container">
    <h2>決済</h2>
    <div>
      <div>
        <label for="name">お名前</label>
      </div>
      <input type="text" name="name" v-model="name" />
      <p>{{ nameError }}</p>
    </div>
    <div>
      <div><label for="zipcode">郵便番号</label></div>
      <input
        type="number"
        name="zipcode"
        v-model="zipcode"
        @change="getAddress"
        @keydown.enter="getAddress"
      />
      <p>{{ zipcodeError }}</p>
    </div>
    <div>
      <div>
        <label for="address">住所</label>
      </div>
      <input type="text" name="address" v-model="address" />
      <p>{{ addressError }}</p>
    </div>
    <div>
      <div>
        <label for="telephone">電話番号</label>
      </div>
      <input type="tel" name="telephone" v-model="telephone" />
      <p>{{ telephoneError }}</p>
    </div>
    <div>
      <div>
        <label for="email">メールアドレス</label>
      </div>
      <input type="email" name="email" v-model="email" />
      <p>{{ emailError }}</p>
    </div>
    <div>
      <div>
        <label for="card">クレジットカード</label>
      </div>
      <input type="text" name="card" placeholder="カード番号" />
      <input type="month" name="card" placeholder="有効期限" />
      <input type="text" name="card" placeholder="名義人" />
      <input type="text" name="card" placeholder="裏面の3桁の番号" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

// バリデーション処理
const schema = yup.object({
  name: yup.string().required("必須項目です。"),
  zipcode: yup.number(),
  address: yup.string().required("必須項目です。"),
  telephone: yup.number().required(),
  email: yup.string().email().required("必須項目です。"),
});
useForm({
  validationSchema: schema,
});
const { errorMessage: nameError, value: name } = useField("name");
const { errorMessage: zipcodeError, value: zipcode } = useField("zipcode");
const { errorMessage: addressError, value: address } = useField("address");
const { errorMessage: telephoneError, value: telephone } =
  useField("telephone");
const { errorMessage: emailError, value: email } = useField("email");

async function getAddress() {
  const res = fetch(
    `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode.value}`
  );
  const data = await (await res).json();
  const { address1, address2, address3 } = data.results[0];
  address.value = address1 + address2 + address3;
}
</script>

<style scoped>
h2 {
  text-align: center;
}
.container {
  text-align: center;
  height: 90vh;
  width: 90vw;
}
.container > div {
  /* margin: 30px; */
  height: 10vh;
}
label {
  margin: 0 10px;
  color: #fff;
}
input {
  margin: 10px;
  width: 60%;
  height: 25px;
}
p {
  margin: 5px;
  color: red;
  font-size: 15px;
}
</style>
