<template>
  <fragment>
    <div @click.stop="">{{ option.label }}</div>
    <odds
      :id="market?.marketId + home.key"
      :oddsRange="home.oddsRange"
      :locked="isLocked"
      :odds="home.odds"
      :point="point('O', home.point)"
      :matchId="matchId"
      @betting="betting(home)"
    />
    <odds
      :id="market?.marketId + away.key"
      :oddsRange="away.oddsRange"
      :locked="isLocked"
      :odds="away.odds"
      :point="point('U', away.point)"
      :matchId="matchId"
      @betting="betting(away)"
    />
  </fragment>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';
import Odds from './Odds.vue';
import { Market, Order, lockedStatusList } from './types';
import { findMarket, findOddsAndPoint } from './helper';
import store from './store';

const props = defineProps<{
  markets: Market[];
  matchId: string;
  option: { label: string; value: number };
}>();

const emits = defineEmits({
  betting: (order: Order) => true,
});

const market = computed(() => {
  return findMarket(props.markets, props.option.value);
});

const home = computed(() => {
  return findOddsAndPoint(market.value?.selections, 'h', 1);
});

const away = computed(() => {
  return findOddsAndPoint(market.value?.selections, 'a', 1);
});

const isLocked = computed(() => {
  if (!market.value) return true;
  if (lockedStatusList.includes(market.value.marketStatus)) return true;
  return false;
});

const point = (prefix: string, point: number) => {
  if (point <= 0) return;
  if (props.option.value === 3) {
    return `${prefix}${point}`;
  }
  return point;
};
const betting = (oddsAndPoint: ReturnType<typeof findOddsAndPoint>) => {
  const order: Order = {
    ...market.value!,
    id: market.value!.marketId + oddsAndPoint.key,
    odds: oddsAndPoint.odds,
    point: oddsAndPoint.point,
    matchId: props.matchId,
    orderName: '',
  };

  emits('betting', order);
};
</script>
<style></style>
