export function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
  ele.className = trim(ele.className)
}

export function hasClass(ele, cls) {
  if (ele.className) {
    // console.log(cls, ele.className)
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  } else {
    ele.className = cls;
    return true
  }
}

export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
  ele.className = trim(ele.className)
}

function preventDefault (e) { 
  e = e || window.event 
  if (e.preventDefault) { 
    e.preventDefault() 
  } 
  e.returnValue = false 
}

function preventDefaultForScrollKeys (e) { 
  // doesn't work 
  if (keys[e.keyCode]) { 
    preventDefault(e) 
    return false 
  } 
}

function keys () { 
  return { 37: 1, 38: 1, 39: 1, 40: 1 } 
}

export function enableScroll () {
    if (window.removeEventListener) { 
    window.removeEventListener('DOMMouseScroll', preventDefault, false) 
  } 
  window.onmousewheel = document.onmousewheel = null 
  window.onwheel = null 
  window.ontouchmove = null 
  document.onkeydown = null 
}

export function disableScroll () {
  if (window.addEventListener) { // older FF 
    window.addEventListener('DOMMouseScroll', preventDefault, false) 
  } 
  window.onwheel = preventDefault // modern standard 
  window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE 
  window.ontouchmove = preventDefault // mobile 
  document.onkeydown = preventDefaultForScrollKeys   
}
