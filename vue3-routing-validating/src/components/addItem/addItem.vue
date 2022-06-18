<template>
  <div>
    <form action="">
      <input
        type="number"
        name="itemId"
        class="itemId"
        placeholder="商品ID"
        v-model="addingItem.id"
      />
      <input
        type="text"
        name="itemName"
        class="itemName"
        placeholder="商品名"
        v-model="addingItem.itemName"
      />
      <input
        type="number"
        name="price"
        class="price"
        placeholder="値段"
        v-model="addingItem.price"
      />
      <input
        type="text"
        name="detail"
        class="detail"
        placeholder="詳細"
        v-model="addingItem.detail"
      />
      <input
        type="number"
        name="stock"
        class="stock"
        placeholder="在庫数"
        v-model="addingItem.stock"
      />
      <input type="button" value="追加" class="addBtn" @click="onSubmit" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

// 初期値（全て空）
const addingItem = reactive({
  id: "",
  itemName: "",
  price: "",
  detail: "",
  stock: "",
});

// 入力した値をHasuraに送信、DBに追加してもらう処理
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

  return await result.json();
}

const operationsDoc = `
  mutation insertItem($objects: [productitem_insert_input!] = [objects]) {
    insert_productitem(objects: $objects) {
      affected_rows
    }
  }
`;
// const operationsDoc = `
//   mutation insertItem {
//     insert_productitem(objects: [{
//     id: $addingItem.id,
//     name: $addingItem.itemName,
//     price: $addingItem.price,
//     stock: $addingItem.stock,
//     detail: $addingItem.detail
//     }]) {
//       affected_rows
//     }
//   }
// `;

// const queryVariables = {
//   objects: {
//     id: addingItem.id,
//     name: addingItem.itemName,
//     price: addingItem.price,
//     stock: addingItem.stock,
//     detail: addingItem.detail,
//   },
// };

function executeInsertItem() {
  return fetchGraphQL(operationsDoc, "insertItem", {
    objects: {
      id: addingItem.id,
      name: addingItem.itemName,
      price: addingItem.price,
      stock: addingItem.stock,
      detail: addingItem.detail,
    },
  });
}

async function startExecuteInsertItem() {
  const { errors, data } = await executeInsertItem();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

// 追加ボタンをクリックしたら発動
const onSubmit = () => {
  startExecuteInsertItem();
  addingItem.id = "";
  addingItem.itemName = "";
  addingItem.price = "";
  addingItem.detail = "";
  addingItem.stock = "";
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
.addBtn {
  width: 10%;
  height: 100%;
}
</style>
