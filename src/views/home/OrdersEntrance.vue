<template>
  <div
    class="fixed right-[24px] bottom-[200px]"
    @click="store.displayOrderView = true"
  >
    <svg-icon
      name="record"
      size="120"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'OrdersEntrance',
};
</script>
<script setup lang="ts">
import store from './store';
</script>
