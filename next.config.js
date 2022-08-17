/* eslint-disable operator-linebreak */
const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  poweredByHeader: false,
  future: {
    webpack5: false,
  },
  cleanDistDir: false,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.experiments = { asyncWebAssembly: true };
    if (isServer) {
      config.output.webassemblyModuleFilename =
        './../server/static/wasm/[modulehash].wasm';
    } else {
      config.output.webassemblyModuleFilename =
        'static/wasm/[modulehash].wasm';
    }
    return config;
  },
});
