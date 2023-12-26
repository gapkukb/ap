<template>
  <van-popup
    v-model="store.displayOrderView"
    position="bottom"
    class="h-[80vh] flex flex-col"
    round
  >
    <Header />
    <div class="orders grid gap-2">
      <list-item
        v-for="(item, index) in store.orders"
        :key="item.marketId"
        :index="index"
        :data="item"
      />
    </div>
    <div
      v-if="store.ordersErrorMessage"
      class="error-view flex-1 flex flex-col justify-center items-center"
    >
      <svg-icon
        name="error"
        size="166"
      />
      <div class="mt-[36px] text-[28px] text-[#aaa]">{{ store.ordersErrorMessage }}</div>
    </div>
    <div
      v-else
      style="flex: 1"
    ></div>
    <keyboard v-model="store.stake" />
    <counter />
  </van-popup>
</template>

<script lang="ts">
export default {
  name: 'Orders',
  mounted() {
    (this as any).$el.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      behavior: 'smooth',
    });
  },
};
</script>
<script setup lang="ts">
import store from './store';
import Header from './Header.vue';
import Counter from './Counter.vue';
import ListItem from './Listitem.vue';
import Keyboard from './Keyboard.vue';
</script>
