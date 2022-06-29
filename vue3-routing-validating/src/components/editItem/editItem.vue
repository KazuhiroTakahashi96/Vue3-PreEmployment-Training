<template>
  <tr>
    <td>{{ props.itemId }}</td>
    <td>
      <input
        type="text"
        :placeholder="props.itemName"
        v-model="changeItem.itemName"
        v-if="!toggleItem"
      />
      <span v-if="toggleItem">
        {{ props.itemName }}
      </span>
    </td>
    <td>
      <input
        type="text"
        :placeholder="props.itemPrice"
        v-model="changeItem.itemPrice"
        v-if="!toggleItem"
      />
      <span v-if="toggleItem">
        {{ props.itemPrice }}
      </span>
    </td>
    <td>
      <input
        type="text"
        :placeholder="props.itemDetail"
        v-model="changeItem.itemDetail"
        v-if="!toggleItem"
      />
      <span v-if="toggleItem">
        {{ props.itemDetail }}
      </span>
    </td>
    <td>
      <input
        type="text"
        :placeholder="props.itemStock"
        v-model="changeItem.itemStock"
        v-if="!toggleItem"
      />
      <span v-if="toggleItem">
        {{ props.itemStock }}
      </span>
    </td>
    <td>
      <input
        type="button"
        value="編集"
        class="editBtn"
        @click="editItem()"
        v-if="toggleItem"
      />
      <input
        type="button"
        value="完了"
        class="editBtn"
        @click="updateItem()"
        v-if="!toggleItem"
      />
      <input
        type="button"
        value="削除"
        class="deleteBtn"
        @click="deleteItem()"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

// 子から親コンポーネントへのイベントの通知用
const emit = defineEmits(["updateProductItem"]);

// 商品IDを除いた各項目の表示非表示用の真偽値
const toggleItem = ref(true);

// 各項目の、編集時の初期値
const changeItem = reactive({
  itemName: "",
  itemPrice: "",
  itemDetail: "",
  itemStock: "",
});

const props = defineProps({
  itemId: Number,
  itemName: String,
  itemPrice: Number,
  itemDetail: String,
  itemStock: Number,
});

// Hasuraにリクエストする非同期処理（選択した項目を削除する処理）
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
  mutation insertItem($id: Int) {
  delete_productitem(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
`;

function executeInsertItem() {
  return fetchGraphQL(operationsDoc, "insertItem", {
    id: props.itemId,
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

// 削除ボタンを押すと発動する処理
const deleteItem = () => {
  startExecuteInsertItem();

  setTimeout(() => {
    // 親コンポーネントへの通知
    emit("updateProductItem");
  }, 100);
};

// 編集ボタンを押したら発動する処理
const editItem = () => {
  // inputタグが出現する
  toggleItem.value = !toggleItem.value;
};

//
//
// CRUDのUpdate処理
async function updateProductItem(
  updateDoc: string,
  operationName: string,
  variables: object
) {
  const result = await fetch("undefined", {
    method: "POST",
    body: JSON.stringify({
      query: updateDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

const updateDoc = `
  mutation update_item ($id: Int, $name: String, $price: Int, $detail: String, $stock: Int) {
    update_productitem(where: {id: {_eq: $id}}, _set: {name: $name, price: $price, detail: $detail, stock: $stock}) {
      affected_rows
    }
  }
`;

function executeUpdate_item() {
  return updateProductItem(updateDoc, "update_item", {
    id: props.itemId,
    name: changeItem.itemName,
    price: changeItem.itemPrice,
    detail: changeItem.itemDetail,
    stock: changeItem.itemStock,
  });
}

async function startExecuteUpdate_item() {
  const { errors, data } = await executeUpdate_item();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

// 完了ボタンを押したら発動する処理
const updateItem = () => {
  startExecuteUpdate_item();
  toggleItem.value = !toggleItem.value;

  setTimeout(() => {
    // 親コンポーネントへの通知
    emit("updateProductItem");
  }, 100);
};
</script>

<style scoped>
.deleteBtn,
.editBtn {
  width: 45%;
  border-radius: 10px;
  cursor: pointer;
}

input {
  width: 90%;
}
</style>
