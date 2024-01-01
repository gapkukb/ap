<template>
  <div class="grid grid-cols-[auto_1fr_auto]">
    <div @click="store.test.changeA()">{{ store.test.a }}</div>
    <van-tabs
      v-model="dateActive"
      animated
      :ellipsis="false"
      class="min-w-0"
    >
      <van-tab
        v-for="date in dateTabs"
        :key="date"
        badge="3"
      >
        <template #title>
          <svg
            v-if="date === 0"
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="26"
            viewBox="0 0 56 26"
            fill="none"
          >
            <path
              d="M0 26H13.0774V22.1328H4.71965V2.6H0V26Z"
              fill="#8286A3"
            />
            <path
              d="M16.0556 26H19.4729L20.7753 7.8C20.7753 7.8 19.1568 8.93865 17.7643 8.93865C16.3717 8.93865 14.7533 7.8 14.7533 7.8L16.0556 26Z"
              fill="#8286A3"
            />
            <ellipse
              cx="17.7767"
              cy="3.9"
              rx="3.90698"
              ry="3.9"
              fill="#8286A3"
            />
            <path
              d="M28.4403 2.6H23.3929L28.7681 26H34.8315L40.2067 2.6H35.3232L31.849 19.9042H31.7507L28.4403 2.6Z"
              fill="#8286A3"
            />
            <path
              d="M55.6722 2.6H42.5948V26H56V22.1328H47.3145V15.8403H55.1806V11.9731H47.3145V6.46723H55.6722V2.6Z"
              fill="#8286A3"
            />
          </svg>
          <svg
            v-if="date === 1"
            xmlns="http://www.w3.org/2000/svg"
            width="157"
            height="36"
            viewBox="0 0 157 36"
            fill="none"
          >
            <path
              d="M0 36H7.18855V0H0V36Z"
              fill="#111111"
            />
            <path
              d="M20.8168 0H12.53V36H19.1195V10.7899H19.2194L28.0054 36H36.1924V0H29.6028V24.6555H29.503L20.8168 0Z"
              fill="#111111"
            />
            <path
              d="M54.9626 18.4538H40.885V24.4034H54.9626V18.4538Z"
              fill="#111111"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M59.655 36V0H72.235C74.0654 0 75.6046 0.310924 76.8526 0.932773C78.1007 1.55462 79.1074 2.36975 79.8728 3.37815C80.6383 4.38655 81.1874 5.53782 81.5202 6.83193C81.853 8.12605 82.0194 9.44538 82.0194 10.7899C82.0194 12.6387 81.7449 14.2521 81.1957 15.6303C80.6466 17.0084 79.8812 18.1345 78.8994 19.0084C77.9176 19.8824 76.7278 20.5378 75.3301 20.9748C73.9323 21.4118 72.3848 21.6303 70.6875 21.6303H66.8436V36H59.655ZM66.8436 5.34454V16.2857H70.0385C71.4696 16.2857 72.626 15.8487 73.508 14.9748C74.3899 14.1008 74.8309 12.7395 74.8309 10.8908C74.8309 9.07563 74.4481 7.69748 73.6827 6.7563C72.9172 5.81513 71.636 5.34454 69.8388 5.34454H66.8436Z"
              fill="#111111"
            />
            <path
              d="M85.5637 36H105.482V30.0504H92.7523V0H85.5637V36Z"
              fill="#111111"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M133.937 36L124.502 0H115.616L106.181 36H113.669L115.316 28.3866H124.801L126.449 36H133.937ZM120.109 6.2521L123.553 22.437H116.564L120.009 6.2521H120.109Z"
              fill="#111111"
            />
            <path
              d="M139.428 0H131.341L140.576 21.8319V36H147.765V21.8319L157 0H149.212L144.22 13.916H144.12L139.428 0Z"
              fill="#111111"
            />
          </svg>
          <span v-else>{{ date }}</span>
        </template>
      </van-tab>
    </van-tabs>
    <bet-mode-swicher />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
};
</script>
<script setup lang="ts">
import { ref } from 'vue';
import Matches from './Matches.vue';
import BetModeSwicher from './BetModeSwicher.vue';
import OrdersEntrance from './OrdersEntrance.vue';
import Orders from './Orders.vue';
import OrdersResult from './OrdersResult.vue';
import store from './store';

console.log(store.test);

const dateTabs = [0, 1, 'aaaaaaaaaaaaa', 'bbbbbbbbbbbbbbb'];
const tabs = [{ label: 'Basketball' }, { label: 'E-Sports' }, { label: 'Volleyball' }, { label: 'Football' }, { label: 'Basketball1' }, { label: 'Basketball3' }, { label: 'Basketball2' }];
const dateActive = ref(0);
const active = ref(0);
</script>
<style lang="scss" scoped>
::v-deep {
  .van-tabs__line {
    height: 16px;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="38" height="12" viewBox="0 0 38 12" fill="none"><path d="M2 2C2 2 9.48091 10 19 10C28.5191 10 36 2 36 2" stroke="url(%23paint0_linear_0_2103)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="paint0_linear_0_2103" x1="10.1692" y1="5.03891" x2="36" y2="5.03891" gradientUnits="userSpaceOnUse"><stop stop-color="%23FF5800"/><stop offset="1" stop-color="white" stop-opacity="0.01"/></linearGradient></defs></svg>')
      no-repeat;

    background-size: contain;
  }
  .van-tab--active {
    color: #ff5800;
  }
}
</style>
