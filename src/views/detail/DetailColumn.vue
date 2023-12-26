<template>
  <div
    class="detail-col"
    :class="{
      'detail-col--increase': changed === 1,
      'detail-col--decrease': changed === -1,
    }"
  >
    <div class="">{{ label }}</div>
    <div class="">{{ odds }}</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, watch, ref, onBeforeUnmount } from 'vue';
const changed = ref(0);
const props = defineProps({
  label: { type: String },
  odds: { type: Number, default: 0 },
});
let timer = 0;
watch(
  () => props.odds,
  (newVal, oldVal) => {
    clearTimeout(timer);
    if (!oldVal) return;
    changed.value = newVal > oldVal ? 1 : -1;
    timer = setTimeout(() => {
      changed.value = 0;
    }, 1000);
  }
);

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.detail-col {
  @apply flex justify-between items-center bg-[#F3F8FB] px-3 relative;
  &:after {
    content: '';
    @apply absolute right-[4px] w-[24px] h-[24px] rounded-sm;
  }
  &--decrease {
    @apply bg-[#FFECEA];
    animation: odds-change 500ms;
    &:after {
      content: '';
      @apply bottom-[4px];
      background-image: linear-gradient(135deg, transparent 50%, #ec3525 0, #ff7064);
    }
  }
  &--increase {
    animation: odds-change 500ms;
    @apply bg-[#EDF7EA];
    &:after {
      content: '';
      @apply top-[4px];
      background-image: linear-gradient(45deg, transparent 50%, #31b900 0, #5fdd00);
    }
  }
}

@keyframes odds-change {
  $len: 3;
  @for $i from 0 through $len {
    $value: $i * 2 - 1;
    $percent: percentage($i/$len);
    #{$percent} {
      opacity: if($i %2==0, 0.3, 1);
    }
  }
}
</style>
