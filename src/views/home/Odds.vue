<template>
  <div
    class="odds"
    :class="className"
    @click.stop="locked ? undefined : $emit('betting')"
  >
    <van-icon
      v-if="locked || odds === -1"
      name="lock"
    />
    <slot v-else>
      <div
        v-if="point"
        class=""
      >
        {{ point }}
      </div>
      <div class="">{{ odds }}</div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import store from './store';

const props = defineProps<{
  id: string;
  matchId: string;
  odds: number;
  oddsRange: number;
  point?: number | string;
  locked: boolean;
}>();

const className = computed(() => {
  const { oddsRange, id } = props;
  let ret = oddsRange === 0 ? 'normal' : oddsRange > 0 ? 'increase' : 'decrease';
  ret = `odds--${ret}`;
  if (store.orders.some((i) => i.id === id)) {
    ret += ' odds--active';
  }
  return ret;
});
</script>
<style lang="scss">
.odds {
  display: grid;
  align-items: center;
  align-content: space-evenly;
  justify-content: center;
  background-color: bisque;
  border-radius: 8px;
  line-height: 1;
  font-size: 28px;

  &--active {
    background-color: red;
  }
}
</style>
