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
    return ele.className = cls;
  }
}

export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
  ele.className = trim(ele.className)
}