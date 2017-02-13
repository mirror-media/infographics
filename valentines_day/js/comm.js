export function _smoothScroll(eID, yPos) {
  let startY = _currentYPosition();
  let stopY = (yPos) ? yPos : _elmYPosition(eID);
  let distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
      scrollTo(0, stopY); return;
  }
  let speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  let step = Math.round(distance / 25);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
      for ( let i=startY; i<stopY; i+=step ) {
          setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
          leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
  }
  for ( let i=startY; i>stopY; i-=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
  }
}
export function _currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}
export function _elmYPosition(eID) {
  let elm = document.querySelector(eID);
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
  } return y;
}
export function _setShareFB(target, targePos, pjId, dom) {
  if(!target && !dom){return;}
  let _btnFB = (dom) ? dom : document.querySelector(target);
  _btnFB.addEventListener('click', function() {
    ga('send', 'event', 'project', 'click', 'fbShare: ' + targePos);
    window.open(`https://www.facebook.com/share.php?u=https://www.mirrormedia.mg/projects/${pjId}`);
  });
}
// export function _setShareWeibo(target, targePos, url) {
//   if(!target){return;}
//   let _btnWB = document.querySelector(target);
//   let _thisTitle = document.querySelector('meta[property="og:title"]').getAttribute('content');
//   let _thisDesc = document.querySelector('meta[property="og:description"]').getAttribute('content');
//   _btnWB.addEventListener('click', function() {
//     // ga('send', 'event', 'project', 'click', 'weiboShare: ' + targePos);
//     window.open('http://service.weibo.com/share/share.php?appkey=&title=' + encodeURIComponent(_thisTitle) + "%0D%0A" + _thisDesc + '&url=https://statics.mirrormedia.mg/projects/taiwan_diplomatic_relations/index.html')
//   });
// }
// export function _setShareLine(target, targePos, url) {
//   if(!target){return;}
//   let _btnLine = document.querySelector(target);
//   let _thisTitle = document.querySelector('meta[property="og:title"]').getAttribute('content');
//   let _thisDesc = document.querySelector('meta[property="og:description"]').getAttribute('content');
//   _btnLine.addEventListener('click', function() {
//     // ga('send', 'event', 'project', 'click', 'lineShare: ' + targePos);
//     window.open('http://line.naver.jp/R/msg/text/?' + encodeURIComponent(_thisTitle) + "%0D%0A" + encodeURIComponent('https://statics.mirrormedia.mg/projects/taiwan_diplomatic_relations/index.html'));
//   });
// }
