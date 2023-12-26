<template>
  <sticky position="bottom">
    <div class="flex p-[24px] gap-3">
      <div class="flex flex-1 bg-orange-100 rounded-full relative">
        <div
          class="absolute left-0 top-0 bottom-0"
          v-show="store.payout > 0"
        >
          <div>Payout</div>
          <div>{{ store.payout }}</div>
        </div>

        <button
          :disabled="store.disabled"
          class="ml-auto bg-orange-700 rounded-full transition-all disabled:bg-black"
          :class="store.payout <= 0 ? 'w-full' : 'w-[320px]'"
        >
          Bet
        </button>
      </div>
      <button
        class="w-[100px] h-[100px] grid place-items-center place-content-center bg-gray-300 rounded-full"
        @click="$router.push('/records')"
      >
        <img
          class="w-[36px]"
          src="https://s3-alpha-sig.figma.com/img/513f/e36d/8eee7504134d55d0796e26bc72febc4e?Expires=1704067200&Signature=nqLpUKF7BqO9GXumtkVbJtqFRipM~M9hWaLaghbc~xNkqLYc8wRjvdieAP2j1Urayv10f0U7arGUx7ufXUscKNyn~2NszYV6D05bCHc1yeH6g6044w4Z3D~g08EG7CqjFeu40q-OjzYPvEuQ80plZx01vZYB3v0WwnTmKX1ZWPIle3Uc1~rEYMUt7dr4pWVUG2CL4OVnvaUU3hE7mk6veMpNhYDQBZf8pkATMNDWPkWKvAPPKcb4uE9cHqGB8xICta~94cYywaweKJDehr8HnL5n~UaaMxd6-0Ralih-pxFHKHeqS7-4OP~cyStXxByjTnveA7UKeviDyfXn~9ZzXQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
        <div class="text-[16px]">My Bets</div>
      </button>
    </div>
  </sticky>
</template>

<script lang="ts">
export default {
  name: 'Counter',
};
</script>
<script setup lang="ts">
import { defineProps } from 'vue';
import store from './store';
import Sticky from './Sticky.vue';

defineProps({
  max: {
    default: Number.POSITIVE_INFINITY,
  },
  min: {
    default: Number.NEGATIVE_INFINITY,
  },
});
</script>
