import debounce from 'lodash/debounce'

export const setScrollDirection = (vueComponent) => {
  let lastScrollTop = 0

  document.addEventListener(
    'scroll',
    // 如果這邊用arrow函數的話 this會是undefined
    debounce(function() {
      let st = window.pageYOffset || document.documentElement.scrollTop // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > lastScrollTop) {
        // downscroll code
        vueComponent.direction = 'down'
      } else {
        // upscroll code
        vueComponent.direction = 'up'
      }

      lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
    })
  )

  return null
}
