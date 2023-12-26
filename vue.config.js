const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const VueMacros = require('unplugin-vue-macros/webpack');

const svgPath = path.resolve(__dirname, 'src/assets/svg');
module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module.rules.delete('svg');

    config.module
      .rule('svg')
      .test(/\.svg$/)
      .include.add(svgPath)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
});
