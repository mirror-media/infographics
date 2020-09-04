const wEl = window

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

export function sendGa ({ action, category = 'projects', label, value = 1 }) {
  wEl.gtag('event', action, {
    event_category: category,
    event_label: label,
    value
  })
}
