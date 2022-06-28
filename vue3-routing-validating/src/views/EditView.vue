<template>
  <addItem @addItem="startFetchMyQuery()" />
  <br />
  <br />
  <table>
    <tr>
      <th class="itemId">商品ID</th>
      <th class="itemName">商品名</th>
      <th class="price">値段</th>
      <th class="detail">詳細</th>
      <th class="stock">在庫数</th>
      <th class="delete">編集/削除</th>
    </tr>
    <editItem
      v-for="item in productInfo.info"
      :key="item.id"
      :itemId="item.id"
      :itemName="item.name"
      :itemPrice="item.price"
      :itemDetail="item.detail"
      :itemStock="item.stock"
      @deleteProductItem="startFetchMyQuery()"
    />
  </table>
</template>

<script setup lang="ts">
import editItem from "@/components/editItem/editItem.vue";
import addItem from "@/components/addItem/addItem.vue";
import { reactive } from "vue";
import axios from "axios";

const productInfo = reactive({
  info: [],
});

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

  const res = await axios({
    url: "http://localhost:8080/v1/graphql",
    method: "post",
    data: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
  const { productitem } = res.data.data;
  productInfo.info = productitem;

  return await result.json();
}

const operationsDoc = `
  query MyQuery {
    productitem {
      name
      price
      detail
      stock
      id
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
  productInfo.info = data.productitem;
}
startFetchMyQuery();
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
  width: 7%;
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
  width: 8%;
}
.delete {
  width: 10%;
}
</style>
