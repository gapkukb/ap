<template>
  <div>
    <button @click="toggle">collapse</button>
    <van-collapse
      class="matches"
      v-model="activeNames"
    >
      <van-collapse-item
        v-for="match in store.matches"
        :key="match.leagueName"
        :name="match.leagueName"
        title-class="flex items-center"
      >
        <template #title>
          <span class="mr-2 w-[8px] h-[32px] rounded-lg bg-orange-300"></span>
          <span>{{ match.leagueName }}</span>
        </template>
        <div
          v-for="(item, index) in match.children"
          :key="item.matchId"
        >
          <Matche
            v-if="marks.includes(match.leagueName)"
            :match="item"
            :index="index"
          />
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Matches',
};
</script>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Matche from './Matche.vue';
import store from './store';
const activeNames = ref<string[]>([]);
// 标记当前展开的折叠面板，如果没有展开则销毁组件，节约内存
const marks = ref<string[]>([]);
let timer = 0;
const toggle = () => {
  activeNames.value = activeNames.value.length ? [] : store.matches.map((match) => match.leagueName);
};

onMounted(() => {
  toggle();
  marks.value = Array.from(activeNames.value);
});

watch(activeNames, (newVal, oldVal) => {
  clearTimeout(timer);
  if (newVal.length > oldVal.length) {
    console.log('展开');
    marks.value = Array.from(activeNames.value);
  } else {
    console.log('收起');
    timer = setTimeout(() => {
      marks.value = Array.from(activeNames.value);
    }, 300);
  }
});
</script>
