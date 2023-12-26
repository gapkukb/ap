<template>
  <div>
    <div class="border-4 border-orange-50 h-[108px] flex items-center px-6 rounded-sm">
      <div
        v-if="props.value"
        class="text-black"
      >
        {{ props.value }}
      </div>
      <div
        v-else
        :class="props.value ? 'text-black' : 'text-gray-200'"
      >
        Limit {{ props.min }} - {{ props.max }}
      </div>
      <div class="ml-auto">PHP</div>
    </div>
    <div>{{ store.errorMessage }}</div>
    <div class="home rounded-2xl bg-[#F4F4F4] p-2 grid grid-cols-4 gap-2 grid-rows-[repeat(auto-fill,80px)] select-none">
      <div
        v-for="item in keyboardOptions"
        :key="item.value"
        class="leading-[80px] text-center bg-white rounded-lg active:bg-orange-500"
        :class="[item.classname, item.value === 0 ? 'col-span-2' : '']"
        @click="handle(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Keyboard',
};
</script>
<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import store from './store';
const props = defineProps({
  value: {
    default: '',
    required: true,
  },
  max: {
    default: Number.POSITIVE_INFINITY,
  },
  min: {
    default: Number.NEGATIVE_INFINITY,
  },
});
const emit = defineEmits(['input']);

const o = {
  '+50': { label: '+50', value: 50, classname: 'text-orange-500' },
  '+100': { label: '+100', value: 100, classname: '' },
  '+500': { label: '+500', value: 500, classname: '' },
  del: { label: 'Del', value: -1 },
  max: { label: 'Max', value: -2 },
};
const keyboardOptions = [1, 2, 3, '+50', 4, 5, 6, '+100', 7, 8, 9, '+500', 0, 'del', 'max'].map((item) =>
  item in o
    ? o[item as keyof typeof o]
    : {
        label: item,
        value: item,
      }
);

const handle = (key: number) => {
  let v = props.value;

  if (key === -1) v = v.slice(0, -1);
  else if (key === -2) v = '99999';
  else if (key > 9) v = (Number(v) + key).toString();
  else if (key === 0 && v.length === 0) v = '';
  else v += key;

  emit('input', v);
};

const message = computed<string | undefined>(() => {
  if (props.value === '') return;
  if (Number(props.value) > props.max) {
    return 'overmax';
  }
  if (Number(props.value) > props.max) {
    return 'overmin';
  }

  return undefined;
});
</script>
