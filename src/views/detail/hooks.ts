import { ref, watch } from 'vue';

// 动态加载van-collapse内容
export function useDynamicCollapse(options: { duration?: number } = {}) {
  const active = ref<(string | number)[]>([]);
  const caches = ref<(string | number)[]>([]);
  let timer = 0;

  watch(active, (newVal, oldVal) => {
    clearTimeout(timer);
    if (newVal.length > oldVal.length) {
      console.log('展开');
      caches.value = Array.from(active.value);
    } else {
      console.log('收起');
      timer = setTimeout(() => {
        caches.value = Array.from(active.value);
      }, options.duration ?? 300);
    }
  });

  return [active, caches] as const;
}

export function useDynamicTabs(options: { duration?: number; activeIndex?: number } = {}) {
  const _default = options.activeIndex || 0;
  const active = ref(_default);
  const caches = ref([_default]);
  let timer = 0;
  watch(active, (value) => {
    clearTimeout(timer);
    caches.value.push(value);
    timer = setTimeout(() => {
      caches.value = [value];
    }, options.duration ?? 300);
  });

  return [active, caches] as const;
}
