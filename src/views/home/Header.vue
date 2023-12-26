<template>
  <Sticky
    class="pt-[36px] pb-[24px] px-[24px]"
    toggle-class="shadow-lg"
  >
    <div class="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-[40px] h-[40px]"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 20C0.0130246 31.0403 8.9597 39.987 20 40C31.0407 39.988 39.988 31.0407 40 20C39.988 8.95929 31.0407 0.0120247 20 0C8.9597 0.0130246 0.0130246 8.9597 0 20ZM18.8182 6C19.0449 5.55543 19.501 5.27477 20 5.27273C20.4928 5.28029 20.9409 5.56032 21.1636 6L24.94 13.6527L33.3873 14.8855C33.887 14.959 34.3005 15.3123 34.4509 15.7945C34.6098 16.2704 34.4811 16.7953 34.12 17.1436L28.0055 23.0927L29.46 31.5091C29.5426 32.0074 29.3372 32.5096 28.9291 32.8073C28.7052 32.9752 28.4326 33.0652 28.1527 33.0636C27.9399 33.0635 27.7303 33.0117 27.5418 32.9127L19.9873 28.9382L12.4345 32.9127C12.2444 33.0144 12.032 33.0675 11.8164 33.0673C11.5373 33.0677 11.2653 32.9792 11.04 32.8145C10.6284 32.5197 10.4221 32.0151 10.5091 31.5164L11.9636 23.1L5.84909 17.1491C5.48412 16.8008 5.35245 16.2735 5.51091 15.7945C5.66276 15.3125 6.07647 14.9596 6.57636 14.8855L15.04 13.6527L18.8182 6Z"
          fill="#F66600"
        />
      </svg>
      <span>{{ store.ParlayMode ? 'Parlay' : 'Single' }}</span>
      <span
        v-if="store.ParlayMode"
        class="text-[#FF5800] text-[32px] font-bold align-top italic"
        >{{ store.orders.length }}</span
      >
      <button class="ml-auto h=[48px] bg-[#FFF6F0] rounded-full px-6">
        ₱ 5,027.0
        <van-icon name="arrow" />
      </button>
    </div>
    <div class="flex justify-between items-center van-hairline--surround h-[80px] px-6">
      <van-checkbox
        v-model="store.acceptedAnyOdds"
        checked-color="#FF5800"
      >
        Auto accept any odds
      </van-checkbox>
      <div @click="store.clear()">Clear All</div>
    </div>
  </Sticky>
</template>

<script lang="ts">
export default {
  name: 'Header',
};
</script>
<script setup lang="ts">
import Sticky from './Sticky.vue';
import store from './store';
</script>
