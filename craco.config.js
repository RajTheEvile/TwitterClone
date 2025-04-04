// craco.config.js

module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        // Find and remove postcss-loader
        webpackConfig.module.rules.forEach((rule) => {
          if (rule.use) {
            rule.use = rule.use.filter((loader) => {
              // Remove postcss-loader from the loaders array
              return !loader.loader || loader.loader !== 'postcss-loader';
            });
          }
        });
  
        return webpackConfig;
      }
    }
  };
  