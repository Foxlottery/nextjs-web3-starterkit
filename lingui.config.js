module.exports = {
  catalogs: [
    {
      path: '<rootDir>/locale/{locale}',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  // compileNamespace: 'cjs',
  // extractBabelOptions: {},
  fallbackLocales: {},
  format: 'minimal',
  formatOptions: { origins: false, lineNumbers: false },
  sourceLocale: 'en',
  locales: [
    'bg',
    'cs',
    'da',
    'de',
    'el',
    'en_gb',
    'en',
    'es',
    'et',
    'fi',
    'fr',
    'hu',
    'it',
    'ja',
    'lt',
    'lv',
    'nl',
    'pl',
    'pt_pt',
    'pt_br',
    'pt',
    'ro',
    'ru',
    'sk',
    'sl',
    'sv',
    'zh',
  ],
  orderBy: 'messageId',
  pseudoLocale: '',
  rootDir: '.',
  runtimeConfigModule: {
    i18n: ['@lingui/core', 'i18n'],
    Trans: ['@lingui/react', 'Trans'],
  },
}

// For reference

// var defaultConfig = {
//   catalogs: [{
//     path: pathJoinPosix("<rootDir>", "locale", "{locale}", "messages"),
//     include: ["<rootDir>"],
//     exclude: ["*/node_modules/*"]
//   }],
//   catalogsMergePath: "",
//   compileNamespace: "cjs",
//   compilerBabelOptions: {
//     minified: true,
//     jsescOption: {
//       minimal: true
//     }
//   },
//   extractBabelOptions: {
//     plugins: [],
//     presets: []
//   },
//   fallbackLocales: {},
//   format: "po",
//   formatOptions: {
//     origins: true,
//     lineNumbers: true
//   },
//   locales: [],
//   orderBy: "messageId",
//   pseudoLocale: "",
//   rootDir: ".",
//   runtimeConfigModule: ["@lingui/core", "i18n"],
//   sourceLocale: ""
// };

// var exampleConfig = _objectSpread(_objectSpread({}, defaultConfig), {}, {
//   runtimeConfigModule: (0, _jestValidate.multipleValidOptions)({
//     i18n: ["@lingui/core", "i18n"],
//     Trans: ["@lingui/react", "Trans"]
//   }, ["@lingui/core", "i18n"]),
//   fallbackLocales: (0, _jestValidate.multipleValidOptions)({}, {
//     "en-US": "en"
//   }, {
//     "en-US": ["en"]
//   }, {
//     default: "en"
//   }, false),
//   extractBabelOptions: {
//     extends: "babelconfig.js",
//     rootMode: "rootmode",
//     plugins: ["plugin"],
//     presets: ["preset"]
//   }
// });
