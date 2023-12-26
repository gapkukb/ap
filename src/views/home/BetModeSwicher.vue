<template>
  <button
    class="bg-orange-500 rounded-l-full text-white font-bold h-[56ox] self-center px-2"
    @click="toggle"
  >
    <div v-if="store.ParlayMode">
      <span class="opacity-50">S/</span>
      <span>Parlay</span>
    </div>
    <div v-else>
      <span class="opacity-50">P/</span>
      <span>Single</span>
    </div>
    <van-dialog
      v-model="showModal"
      @confirm="onConfirm"
      get-container="body"
    >
      <div class="">Parlay</div>
      <van-divider>
        <van-icon name="arrow-down" />
      </van-divider>
      <div class="">Choose 2 or more bets and combine them <span>into 1 betslip</span>, and all the odds multiply.</div>

      <van-checkbox
        v-model="disabled"
        shape="rounded"
        checked-color="#ee0a24"
        style="border-radius: 2px"
        >I already know, never show it again</van-checkbox
      >
    </van-dialog>
  </button>
</template>

<script lang="ts">
export default {
  name: 'BetModeSwicher',
};
</script>
<script setup lang="ts">
import { ref, watch } from 'vue';
import store from './store';

const KEY = 'never_show_parlay_modal';

let showable = localStorage.getItem(KEY) !== '1';
const showModal = ref(false);
const disabled = ref(false);

const toggle = () => {
  if (store.ParlayMode) {
    store.ParlayMode = false;
  } else if (showable) {
    showModal.value = true;
  } else {
    store.ParlayMode = true;
  }
};

const onConfirm = () => {
  store.ParlayMode = true;
  if (disabled.value) {
    localStorage.setItem(KEY, '1');
    showable = false;
  }
};

watch(
  () => store.ParlayMode,
  () => {
    store.clear();
  }
);
</script>
<style lang="scss" scoped>
::v-deep .van-checkbox__icon--rounded {
  border-radius: 8px;
  overflow: hidden;
}
</style>
