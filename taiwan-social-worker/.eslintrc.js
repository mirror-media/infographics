module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended'
  ],
  plugins: [
    'svelte3',
    'html'
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    semi: ['error', 'never']
  },
  settings: {
    /**
     * If you're using some sort of preprocessor on the component styles, then it's likely that when this plugin calls the Svelte compiler on your component, it will throw an exception.
     * This setting can be given a function that accepts an object of attributes on a <style> tag and returns whether to ignore the style block for the purposes of linting.
     * see https://github.com/sveltejs/eslint-plugin-svelte3#svelte3ignore-styles
     */
    'svelte3/ignore-styles': (attributes) => attributes.lang
  }
}
