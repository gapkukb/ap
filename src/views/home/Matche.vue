<template>
  <div
    class="match"
    @click="goto"
  >
    <div class="flex">
      <span>{{ matchDateTime(match.matchDate, 1, index) + ' ' + match.matchTime }}</span>
      <svg-icon
        name="video"
        class="text-[32px]"
      />
      <div class="flex items-center text-white ml-auto rounded-full pl-2 pr-1 bg-[#FF5800] leading-[1]">
        <span>{{ match.totalBetTypeNumber }}+</span>
        <van-icon
          name="arrow"
          class="text-[28px]"
        />
      </div>
    </div>
    <van-divider
      dashed
      style="margin: 0"
    ></van-divider>
    <div
      id="odds-list"
      class="grid grid-flow-col grid-cols-[1fr_60px_repeat(3,124px)] grid-rows-[24px_80px_80px] gap-2 text-center"
    >
      <!-- 第一列 -->
      <div></div>
      <div class="text-left">{{ match.homeName }}</div>
      <div class="text-left">{{ match.awayName }}</div>
      <!-- 第二列 -->
      <div></div>
      <div>{{ match.liveHomeScore }}</div>
      <div>{{ match.liveAwayScore }}</div>

      <odds-column
        v-for="option in options"
        :match-id="match.matchId"
        :key="option.value"
        :markets="match.markets"
        :option="option"
        @betting="betting"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Matche',
};
</script>
<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router/composables';
import OddsColumn from './OddsColumn.vue';
import { Order, RawMatch } from './types';
import { matchDateTime } from './helper';
import store from './store';

const router = useRouter();
const props = defineProps<{ match: RawMatch; index: number }>();

const options = computed(() => {
  return [props.match.sportTypeId === '1' ? { label: '1x2', value: 5 } : { label: 'Moneyline', value: 20 }, { label: 'Handicap', value: 1 }, { label: 'O/U', value: 3 }];
});

const goto = () => {
  const match = props.match;

  router.push({
    path: '/liveSportGameV3',
    query: { title: match.leagueName, matchId: match.matchId, sportTypeId: match.sportTypeId, leagueId: match.leagueId, activeDate: '1' },
  });
};

const betting = (order: Order) => {
  const { match } = props;
  order.orderName = `${match.homeName} - ${match.awayName}`;
  store.add(order);
};
</script>
<style lang="scss"></style>
