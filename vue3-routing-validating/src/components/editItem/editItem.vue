<template>
  <tr>
    <td>{{ props.itemId }}</td>
    <td>{{ props.itemName }}</td>
    <td>{{ props.itemPrice }}</td>
    <td>{{ props.itemDetail }}</td>
    <td>{{ props.itemStock }}</td>
    <td>
      <input type="button" value="編集" class="editBtn" @click="editItem" />
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
// 子から親コンポーネントへのイベントの通知用
const emit = defineEmits(["deleteProductItem"]);

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
    returning {
      id
      name
      price
    }
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
    emit("deleteProductItem");
  }, 100);
};

// 編集ボタンを押したら発動する処理
const editItem = () => {
  console.log("edit item");
};
</script>

<style scoped>
.deleteBtn,
.editBtn {
  width: 45%;
  border-radius: 10px;
  cursor: pointer;
}
</style>
