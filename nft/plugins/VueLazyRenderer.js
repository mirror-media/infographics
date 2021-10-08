import Vue from 'vue'
import VueLazyRenderer from 'vue-lazy-renderer'

Vue.use(VueLazyRenderer, {
  preload: 2,
})
