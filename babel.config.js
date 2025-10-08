module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
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
    plugins: [
      ["@babel/plugin-transform-class-properties", { "loose": true }],
      ["@babel/plugin-transform-private-methods", { "loose": true }],
      ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
      ...(process.env.JEST_WORKER_ID === undefined 
        ? ['react-native-reanimated/plugin'] 
        : [])
    ]
  };
};
