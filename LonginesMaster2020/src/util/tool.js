export function raf (fn) {
  let isTicking = false

  return function () {
    if (isTicking) { return }

    isTicking = true

    requestAnimationFrame(function () {
      fn()
      isTicking = false
    })
  }
}

export function isEl (el) {
  return el instanceof Element || el instanceof HTMLDocument
}
