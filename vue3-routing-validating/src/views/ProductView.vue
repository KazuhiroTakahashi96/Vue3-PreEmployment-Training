<template>
  <div class="container">
    <ProductItem
      v-for="item in productInfo.info"
      :key="item.id"
      :name="item.name"
      :price="item.price"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { reactive } from "vue";
import ProductItem from "../components/products/productItem.vue";
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
  console.log(productInfo.info);

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
}
startFetchMyQuery();
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
}
</style>
