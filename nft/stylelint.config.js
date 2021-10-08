module.exports = {
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: [/font/]
      }
    ]
  },
  ignoreFiles: ['css/base.css', 'coverage/**/*.{css,scss,sass}']
}
