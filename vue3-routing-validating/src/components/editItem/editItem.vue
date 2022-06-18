<template>
  <tr>
    <td>{{ props.itemId }}</td>
    <td>{{ props.itemName }}</td>
    <td>{{ props.itemPrice }}</td>
    <td>{{ props.itemDetail }}</td>
    <td>{{ props.itemStock }}</td>
    <td>
      <input type="button" value="削除" class="deleteBtn" @click="deleteItem" />
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps({
  itemId: Number,
  itemName: String,
  itemPrice: Number,
  itemDetail: String,
  itemStock: Number,
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

const deleteItem = () => {
  startExecuteInsertItem();
};
</script>

<style scoped>
.deleteBtn {
  width: 50%;
  border-radius: 10px;
  cursor: pointer;
}
</style>
