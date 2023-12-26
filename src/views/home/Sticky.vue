<template>
  <div
    class="sticky w-full z-10"
    :style="{ [position]: '0px' }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
//@ts-nocheck

export default {
  name: 'Sticky2',
  props: {
    toggleClass: {
      type: String,
    },
    position: {
      type: String,
      default: 'top',
    },
  },
  data() {
    return {
      el2: document.createElement('div'),
      observer: Object.freeze(
        new IntersectionObserver(
          ([e]) => {
            const isSticky = e.intersectionRatio !== 1;
            e.target._target_.classList.toggle(e.target._class_, isSticky);
          },
          { threshold: [1] }
        )
      ),
    };
  },
  mounted() {
    this.el = Object.assign(document.createElement('div'), {
      _class_: this.toggleClass,
      _bottom_: this.position === 'bottom',
      _target_: this.$el,
    });
    const parent = this.$el.parentElement;

    parent.insertBefore(this.el, this.position === 'top' ? parent.firstElementChild : this.$el);

    this.observer.observe(this.el);
  },
  beforeDestroy() {
    this.observer.unobserve(this.el);
    this.el.remove();
  },
};
</script>
