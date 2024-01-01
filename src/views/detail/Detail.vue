<template>
  <div>
    <van-tabs
      v-model="tabsActive"
      :ellipsis="false"
      animated
      sticky
    >
      <template #nav-right>
        <div style="flex: 1"></div>
        <van-button
          type="none"
          icon="arrow-down"
          class="sticky right-0 top-0"
          @click="toggleAll(all)"
        />
      </template>
      <van-tab
        v-for="(tab, index) in tabs"
        :key="tab[1]"
        :title="tab[0]"
      >
        <van-collapse
          v-if="tabsCache.includes(index)"
          v-model="collapseActiveName"
        >
          <van-collapse-item
            v-for="market in data.markets"
            :key="market.betType"
            :title="market.betTypeName"
            :name="market.betType"
          >
            <div
              v-if="collapseCacheNames.includes(market.betType)"
              class="detail-row"
            >
              <column
                label="Home"
                :odds="odds"
              />
              <column
                label="Away"
                :odds="odds"
              />
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
    <dragger>
      <button style="position: fixed; right: 10px; bottom: 40px">213</button>
    </dragger>
  </div>
</template>
<script lang="ts" setup>
import { useDynamicCollapse, useDynamicTabs } from './hooks';
import Column from './DetailColumn.vue';
import data from './mock';
import { useTabs } from './utils';
import { ref } from 'vue';
import Dragger from '../Dragger.vue';
const [collapseActiveName, collapseCacheNames, toggleAll] = useDynamicCollapse();
const tabs = useTabs(data.markets);
// const tabs = Array.from({ length: 20 }).map((_, i) => [i.toString(), i]);
const [tabsActive, tabsCache] = useDynamicTabs();

const all = data.markets.map((i) => i.betType);
toggleAll(all);

const odds = ref(1.58);

setTimeout(() => {
  odds.value = 2.58;
}, 2000);
</script>

<style lang="scss" scoped>
.detail-row {
  @apply grid grid-cols-[1fr_1fr] gap-2 h-[92px];
}

::v-deep {
  .van-tab {
    flex: none !important;
  }
}
</style>
