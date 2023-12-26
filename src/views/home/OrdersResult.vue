<template>
  <van-popup
    v-model="store.displayResultView"
    position="bottom"
    style="height: 80vh; overflow: hidden"
    class="p-6"
    round
  >
    <div class="bg-[#F5E1D4] rounded-xl">
      <div>Bets</div>
      <div class="bg-[#FFF0E6] p-2 rounded-xl">
        <div class="van-hairline--surround">
          <div v-if="status === 2">
            <svg-icon
              class="text-[300px]"
              name="rejected"
            />

            <div>Odds changed</div>
            <div>Betting Unsuccessful</div>
          </div>
          <div v-if="status === 1">
            <svg-icon
              class="text-[300px]"
              name="resolved"
            />
            <div>Betting Successful</div>
          </div>
          <div v-else>
            <svg-icon
              class="text-[300px]"
              name="pending"
            />
            <div>Betting Processing…</div>
          </div>
          <div class="mx-[-48px] relative z-10">
            <div class="bg-[#FF5800] rounded-t-xl rounded-b-md h-[138px] px-[80px]">
              <div class="flex justify-between">
                <div>Stake</div>
                <div>800</div>
              </div>
              <div class="flex justify-between">
                <div>Payout</div>
                <div>960.00</div>
              </div>
            </div>
            <div class="box-shadow"></div>
          </div>
          <div
            class="listview grid gap-[36px] text-[#97725E] text-[24px] overflow-y-auto relative z-10"
            style="height: 24vh"
          >
            <div
              class=""
              v-for="i in 6"
              :key="i"
            >
              <div class="flex justify-between items-center">
                <div class="">Home to Win by 1 Goal</div>
                <div class="text-[30px] font-bold">1.96</div>
              </div>
              <div class="">Set X Total Points Over/Under (to 15 Points)</div>
              <div class="">- Boston Celtics VS Houston Rocket</div>
            </div>
          </div>
          <div class="overlay"></div>
        </div>
      </div>
    </div>
    <div class="h-[64px]"></div>
    <van-button
      type="primary"
      block
      size="large"
      round
    >
      CLOSE
    </van-button>
  </van-popup>
</template>
<script lang="ts">
export default {
  name: 'OrderResult',
};
</script>
<script lang="ts" setup>
import { ref } from 'vue';
import store from './store';
import Sticky from './Sticky.vue';
const status = ref(0);
</script>

<style>
.box-shadow {
  width: 100%;
  height: 72px;
  background-image: linear-gradient(0, rgba(255, 162, 101, 0.08) 19.12%, #ff5800 100%);
  /* transform: translateY(-16px) rotateX(-45deg) scale(0.96); */
  position: absolute;
  /* z-index: -2; */
  bottom: -66px;
  opacity: 0.5;
  clip-path: polygon(0 0, 100% 0, calc(100% - 36px) 100%, 36px 100%);
}
.overlay {
  position: absolute;
  height: 60px;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(255, 240, 230, 0) 0%, #fff0e6 50%);
}
</style>
