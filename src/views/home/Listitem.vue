<template>
  <div class="order">
    <div class="marker"></div>
    <div>
      <div class="v-ellipise">Home to Win by 1 Goal</div>
      <div class="v-ellipise">Set X Total Points Over/Under (to 15 Points)</div>
      <div class="v-ellipise">- {{ data.orderName }}</div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 28"
      class="w-[48px] h-[48px]"
    >
      <path
        fill="#31B900"
        d="M10.5 0a1 1 0 0 0-.7.3l-9.5 10a1 1 0 0 0 0 1.4 1 1 0 0 0 1.4 0h18.6c.3.3.6.4 1 .3a1 1 0 0 0 .7-.8 1 1 0 0 0-.3-1L11.2.2a1 1 0 0 0-.7-.2Z"
      />
      <path
        fill="#31B900"
        d="M10.5 16a1 1 0 0 0-.7.3l-9.5 10a1 1 0 0 0 0 1.4 1 1 0 0 0 1.4 0h18.6c.3.3.6.4 1 .3a1 1 0 0 0 .7-.8 1 1 0 0 0-.3-1l-10.5-10a1 1 0 0 0-.7-.2Z"
        opacity=".5"
      />
    </svg>
    <div class="text-[40px] font-bold shrink-0">{{ data.odds }}</div>
    <van-button
      icon="cross"
      type="none"
      @click="store.remove(index)"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListItem',
};
</script>
<script lang="ts" setup>
import { defineProps } from 'vue';
import store from './store';
import { Order } from './types';

const props = defineProps<{
  data: Order;
  index: number;
}>();
</script>
<style lang="scss">
.order {
  @apply flex bg-[#F3F8FB] rounded-2xl py-8 pr-[28px];
}
.marker {
  @apply w-[8px] h-[32px] rounded-full bg-orange-400;
}
.v-ellipise {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
