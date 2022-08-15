const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  poweredByHeader: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
});
