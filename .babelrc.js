const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
  "transform-decorators-legacy",
  ["transform-runtime"],
  ["import", {libraryName: "antd-mobile", style: true}],
  ["babel-plugin-styled-components", {"displayName": isDev, "fileName": isDev}],
];

// 生产
if (!isDev) {
  plugins.push(["transform-remove-console", { "exclude": ["error", "warn"] }]);
}

module.exports = {
  presets: [
    [
      "env", {
      modules: false,
      targets: {
        "browsers": [
          "last 2 versions",
          "safari >= 7"
        ]
      }
    }],
    "react",
    "stage-2"
  ],
  env: {
    production: {},
    development: {
      "plugins": [
        ["react-transform", {
          transforms: [{
            transform: "react-transform-hmr",
            imports: ["react"],
            locals: ["module"]
          }]
        }]
      ]
    }
  },
  plugins,
};
