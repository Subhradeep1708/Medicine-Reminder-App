module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      "@babel/preset-env"
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
      test: {
        presets: ["@babel/preset-env"]
        // do NOT include 'react-native-reanimated/plugin' in test
      }
    },
    plugins: process.env.JEST_WORKER_ID === undefined 
      ? ['react-native-reanimated/plugin'] 
      : []
  };
};
