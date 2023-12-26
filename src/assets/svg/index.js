import Vue from 'vue';
import svgIcon from '@/views/home/SVGIcon';
Vue.component('svg-icon', svgIcon);

const req = require.context('./', false, /\.svg$/);

const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

requireAll(req);
