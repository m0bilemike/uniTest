module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        'babel-preset-expo', // for Expo
        '@babel/preset-typescript',
        '@babel/preset-react'
      ],
    };
  };