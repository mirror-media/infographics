import Vue from 'vue'
import {
  applyPolyfills,
  defineCustomElements,
} from '@readr-media/web-components/loader'

// Tell Vue to ignore all components defined in the test-components
// package, we could provide regex here
Vue.config.ignoredElements = ['readr-header']

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements()
})
