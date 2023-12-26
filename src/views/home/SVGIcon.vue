<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    v-on="$listeners"
    v-bind="$attrs"
    style="
       {
        '--size':size ;
      }
    "
  >
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
<script>
export default {
  name: 'SVGIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 24,
    },
  },
  computed: {
    _size() {
      return this.size / 30 + 'rem';
    },
  },
};
</script>
<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: v-bind(_size);
}
</style>
