import { onBeforeUnmount, ref, watch } from 'vue';

// 动态加载van-collapse内容
export function useDynamicCollapse(options: { duration?: number } = {}) {
  const actives = ref<(string | number)[]>([]);
  const caches = ref<(string | number)[]>([]);
  let timer = 0;

  watch(actives, (newVal, oldVal) => {
    clearTimeout(timer);
    if (newVal.length > oldVal.length) {
      console.log('展开');
      caches.value = Array.from(actives.value);
    } else {
      console.log('收起');
      timer = setTimeout(() => {
        caches.value = Array.from(actives.value);
      }, options.duration ?? 300);
    }
  });

  const toggleAll = (names: (string | number)[]) => {
    if (actives.value.length === 0) {
      actives.value = [...names];
    } else {
      actives.value = [];
    }
  };

  return [actives, caches, toggleAll] as const;
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

export function useOddsWatch(prop: any) {
  let timer = 0;
  const changed = ref<0 | 1 | -1>(0);
  watch(prop, (newVal, oldVal) => {
    clearTimeout(timer);
    if (!oldVal) return;
    changed.value = newVal > oldVal ? 1 : -1;
    timer = setTimeout(() => {
      changed.value = 0;
    }, 1000);
  });

  onBeforeUnmount(() => {
    clearTimeout(timer);
  });

  return changed;
}
