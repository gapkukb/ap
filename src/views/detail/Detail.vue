<template>
  <div>
    <van-tabs
      v-model="tabsActive"
      ref="tabsRef"
      animated
    >
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
            <div v-if="collapseCacheNames.includes(market.betType)"></div>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { useDynamicCollapse, useDynamicTabs } from './hooks';
import data from './mock';
import { useTabs } from './utils';
const [collapseActiveName, collapseCacheNames] = useDynamicCollapse();
const tabs = useTabs(data.markets);
const [tabsActive, tabsCache] = useDynamicTabs();
</script>
