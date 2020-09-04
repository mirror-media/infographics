module.exports = {
  // chainWebpack: config => {
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .tap((args) => {
  //       args.compilerOptions.whitespace = 'preserve'
  //     })
  // },
  publicPath: process.env.NODE_ENV === 'production' ? '/projects/2019-hong-kong-protests/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    profile1: {
      entry: 'src/main.js',
      template: 'public/profile1/index.html',
      filename: 'profile1/index.html'
    },
    profile2: {
      entry: 'src/main.js',
      template: 'public/profile2/index.html',
      filename: 'profile2/index.html'
    },
    profile3: {
      entry: 'src/main.js',
      template: 'public/profile3/index.html',
      filename: 'profile3/index.html'
    },
    profile4: {
      entry: 'src/main.js',
      template: 'public/profile4/index.html',
      filename: 'profile4/index.html'
    },
    profile5: {
      entry: 'src/main.js',
      template: 'public/profile5/index.html',
      filename: 'profile5/index.html'
    },
    profile6: {
      entry: 'src/main.js',
      template: 'public/profile6/index.html',
      filename: 'profile6/index.html'
    },
    profile7: {
      entry: 'src/main.js',
      template: 'public/profile7/index.html',
      filename: 'profile7/index.html'
    },
    profile8: {
      entry: 'src/main.js',
      template: 'public/profile8/index.html',
      filename: 'profile8/index.html'
    },
    profile9: {
      entry: 'src/main.js',
      template: 'public/profile9/index.html',
      filename: 'profile9/index.html'
    }
  }
}