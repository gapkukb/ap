const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const svgPath = path.resolve(__dirname, 'src/assets/svg');
const AutoImport = require('unplugin-auto-import/webpack').default;
const Components = require('unplugin-vue-components/webpack').default;
const { VantResolver } = require('unplugin-vue-components/resolvers');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://laroplus.c66uat.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '/_front_api_' },
        onProxyRes: function (proxyRes, req, res) {
          let target = 'https://laroplus.c66uat.com';
          let realUrl = target + req.url;
          proxyRes.headers['x-real-url'] = realUrl;
        },
      },
    },
  },
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
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex', 'vue-router/composables'],
        resolvers: [VantResolver()],
      }),
      Components({
        // 要搜索组件的目录的相对路径
        dirs: ['src/components', 'src/views'],
        // 搜索子目录
        deep: true,
        extensions: ['vue', 'js', 'jsx', 'ts', 'tsx'],
        include: [/\.vue$/, /\.vue\?vue/, /\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
      }),
    ],
  },
});
