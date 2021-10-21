import Vue from 'vue'

import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_plugin_9d4a2182 from 'nuxt_plugin_plugin_9d4a2182' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_googleanalytics_0d299f9e from 'nuxt_plugin_googleanalytics_0d299f9e' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_webcomponent_4a1af129 from 'nuxt_plugin_webcomponent_4a1af129' // Source: ../plugins/web-component.js (mode: 'client')
import nuxt_plugin_VueSmoothScroll_0808546b from 'nuxt_plugin_VueSmoothScroll_0808546b' // Source: ../plugins/VueSmoothScroll (mode: 'client')
import nuxt_plugin_VueLazyRenderer_366deab2 from 'nuxt_plugin_VueLazyRenderer_366deab2' // Source: ../plugins/VueLazyRenderer (mode: 'client')
import nuxt_plugin_VueLazyload_b8bca6ac from 'nuxt_plugin_VueLazyload_b8bca6ac' // Source: ../plugins/VueLazyload (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"不只是暴富　NFT 新世界拓荒記","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""},{"hid":"og:title","property":"og:title","content":"不只是暴富　NFT 新世界拓荒記"},{"hid":"og:description","property":"og:description","content":"一張迷因圖讓人從此脫貧、一群無聊猿猴的頭像交易突破五億美金——今年以來，NFT（非同質化代幣）的暴利神話從國際新聞到社群一波一波傳散開來，在大家還沒搞清楚 NFT 之前，NFT 已經像一場「有錢人」的金錢遊戲。"},{"hid":"og:image","property":"og:image","content":"https:\u002F\u002Fwww.mirrormedia.mg\u002Fprojects\u002Fnft\u002Fimages\u002Fog.png"},{"hid":"og:url","property":"og:url","content":"https:\u002F\u002Fwww.mirrormedia.mg\u002Fprojects\u002Fnft"},{"hid":"og:type","property":"og:type","content":"article"},{"hid":"fb:app_id","property":"fb:app_id","content":""}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"hid":"gf-prefetch","rel":"dns-prefetch","href":"https:\u002F\u002Ffonts.gstatic.com\u002F"},{"hid":"gf-preconnect","rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com\u002F","crossorigin":""},{"hid":"gf-preload","rel":"preload","as":"style","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Noto+Serif+TC:wght@300;400;500"}],"script":[{"hid":"mouse-hover","data-scatter":"0.7","data-initscatter":"12","data-elemsize":"22","data-countelems":"25","data-fallingspeed":"12","data-lifespan":"1.9","data-initopac":"0.3","data-shapetype":"custom","data-rotation":"19","data-startrotated":"0","data-colortype":"single","data-glow":"0","data-glitter":"3","data-elementsobj-i1":"*","data-color":"rgb(255, 248, 51)","data-charsorder":"0","body":true,"src":"js\u002Fmouse-hover.js"},{"hid":"gf-script","innerHTML":"(function (){var l=document.createElement('link');l.rel=\"stylesheet\";l.href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Noto+Serif+TC:wght@300;400;500\";document.querySelector(\"head\").appendChild(l);})();"}],"style":[],"noscript":[{"hid":"gf-noscript","innerHTML":"\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Noto+Serif+TC:wght@300;400;500\"\u003E"}],"__dangerouslyDisableSanitizersByTagID":{"gf-script":["innerHTML"],"gf-noscript":["innerHTML"]}},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_9d4a2182 === 'function') {
    await nuxt_plugin_plugin_9d4a2182(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_0d299f9e === 'function') {
    await nuxt_plugin_googleanalytics_0d299f9e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_webcomponent_4a1af129 === 'function') {
    await nuxt_plugin_webcomponent_4a1af129(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_VueSmoothScroll_0808546b === 'function') {
    await nuxt_plugin_VueSmoothScroll_0808546b(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_VueLazyRenderer_366deab2 === 'function') {
    await nuxt_plugin_VueLazyRenderer_366deab2(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_VueLazyload_b8bca6ac === 'function') {
    await nuxt_plugin_VueLazyload_b8bca6ac(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
