module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: 'defaults, ie 11, Edge >= 17, Chrome >= 66, Firefox >= 60, Safari >= 10.1, iOS >= 10.2, Android >= 67, ChromeAndroid >= 67, Samsung >= 6.2'
        },
        ignoreBrowserslistConfig: true,
        // debug: true,
        bugfixes: true,
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
      }
    ]
  ]
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime'
  ]

  return {
    presets,
    plugins
  }
}
