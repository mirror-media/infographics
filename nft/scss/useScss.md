# How to use SCSS in nuxt.js

(in nuxt.config.js)

export default{
modules: ['@nuxtjs/style-resources'],
css: ['~assets/scss/global.style.scss', '~assets/scss/responsiveMixin.scss', '~assets/scss/variable.scss'],styleResources: {
scss: ['./assets/scss/*.scss'],
},
}
