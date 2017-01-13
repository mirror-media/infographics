import './index.scss';
import flagsList from './flags-list.json';
import truncate from 'truncate'

class DiplomaticRelations {
  constructor(){
    this._nextPageBtn = document.querySelector('.btn-open-qa');
    this._flags = document.querySelector('.flags');
    this._flagsAside = document.querySelector('.page-qa aside .flags-container');
    this._share1 = document.querySelector('header .menu.mobile-hide');
    this._share2 = document.querySelector('.page-qa .menu.mobile-hide .btn-container');
    this._sec1 = document.querySelector('.page-1');
  }
  _setPage1Behaivior() {
    this._nextPageBtn.addEventListener('click', (e) => {
      this._smoothScroll('.page-qa');
    });
  }
  _setOnscrollBehavior() {
    window.onresize = (e) => {
      const _nowY = this._currentYPosition();
      const _flagsAsideFlagContainerY = this._elmYPosition('.page-qa aside .flags-container');
      const _flagsAsideFlagContainerBottom = _flagsAsideFlagContainerY + this._flagsAside.offsetHeight;
      const tHtml = document.documentElement;
      const _windowBottom = _nowY + tHtml.clientHeight;


      if(_flagsAsideFlagContainerY >= _nowY || _flagsAsideFlagContainerY < 0) {
        this._share2.removeAttribute('style');
      }
      if(_flagsAsideFlagContainerBottom < _windowBottom && _flagsAsideFlagContainerY < _nowY) {
        this._flagsAside.removeAttribute('style');
        this._flagsAside.setAttribute('style', 'position: fixed; bottom: 0; width: ' + this._flagsAside.offsetWidth + 'px; left: ' + this._flagsAside.offsetLeft + 'px;');
      }
      if(_flagsAsideFlagContainerY < _nowY && _flagsAsideFlagContainerY > 0) {
        this._share2.removeAttribute('style');
        this._share2.setAttribute('style', 'position: fixed; top: 0; width: ' + this._share2.offsetWidth + 'px; left: ' + this._share2.offsetLeft + 'px;');
      }

    }
    window.onscroll = (e) => {

      const lastScrollTop = window.lastScrollTop || 0;
      const _nowY = this._currentYPosition();
      const _pageQAY = this._elmYPosition('.page-qa');
      const _page1Y = this._elmYPosition('.page-1');
      const _page1Bottom = _page1Y + this._sec1.offsetHeight;
      const _flagsAsideY = this._elmYPosition('.page-qa aside');
      const _flagsAsideFlagContainerY = this._elmYPosition('.page-qa aside .flags-container');
      const _flagsAsideFlagContainerBottom = _flagsAsideFlagContainerY + this._flagsAside.offsetHeight;

      const tBody = document.body;
      const tHtml = document.documentElement;
      const tHeight = Math.max( tBody.scrollHeight, tBody.offsetHeight, tHtml.clientHeight, tHtml.scrollHeight, tHtml.offsetHeight );
      const tPerIntervalHeight = (tHeight - tHtml.clientHeight * 2)/flagsList.length;
      let tCurrFlag = Math.floor((_nowY - tHtml.clientHeight)/tPerIntervalHeight);
      tCurrFlag = (tCurrFlag < 0) ? 0 : tCurrFlag;
      const _windowBottom = _nowY + tHtml.clientHeight;

      const tHeightAsideFlags = this._flagsAside.offsetHeight;
      const tPerIntervalHeightAsideFlags = tHeightAsideFlags/flagsList.length;
      let tCurrFlagAsideFlags = Math.floor((_nowY - tHtml.offsetHeight/2)/tPerIntervalHeightAsideFlags);
      tCurrFlagAsideFlags = (tCurrFlagAsideFlags > (flagsList.length - 1)) ? (flagsList.length - 1) : tCurrFlagAsideFlags;

      const tHeightShare2 = this._share2.offsetHeight;

      if(_nowY > lastScrollTop) {
        if(_nowY < _pageQAY && !window.smoothScrollBlock) {
          this._smoothScroll('.page-qa');
          window.smoothScrollBlock = true;
          // window.lastScrollTop = _pageQAY;
          // window.lastScrollTop = _nowY;

        } else {
          // window.lastScrollTop = _nowY;
        }
        if(_nowY > tHtml.clientHeight && tCurrFlag < flagsList.length) {
          this._flags.innerHTML = '<img src="img/flags/' + flagsList[ tCurrFlag ][ 'file' ] + '" title="' + flagsList[ tCurrFlag ][ 'country' ] + '"/>';
        }

        if(_flagsAsideFlagContainerBottom < _windowBottom && _flagsAsideFlagContainerY < _nowY) {
          this._flagsAside.setAttribute('style', 'position: fixed; bottom: 0; width: ' + this._flagsAside.offsetWidth + 'px; left: ' + this._flagsAside.offsetLeft + 'px;');
        }
        if(_flagsAsideFlagContainerY < _nowY) {
          this._share2.setAttribute('style', 'position: fixed; top: 0; width: ' + this._share2.offsetWidth + 'px; left: ' + this._share2.offsetLeft + 'px;');
        }
      } else if(_nowY < lastScrollTop) {

        // window.lastScrollTop = _nowY;
        if(_nowY > tHtml.clientHeight && tCurrFlag > -1) {
          this._flags.innerHTML = '<img src="img/flags/' + flagsList[ tCurrFlag ][ 'file' ] + '" title="' + flagsList[ tCurrFlag ][ 'country' ] + '"/>';
        }

        if(_flagsAsideY > (_windowBottom - this._flagsAside.offsetHeight)){
          this._flagsAside.removeAttribute('style');
        }
        if(_flagsAsideFlagContainerY >= _nowY) {
          this._share2.removeAttribute('style');
        }

        if(_nowY < (_pageQAY - tHtml.clientHeight*2/3)  && !window.smoothScrollBlock) {
          this._smoothScroll('.page-1');
          window.smoothScrollBlock = true;
        }

      } else {
      }
      window.smoothScrollBlock = (_nowY === _pageQAY || _nowY === 0) ? false : true;
      window.lastScrollTop = _nowY;
      if(_nowY === 0) {
        this._nextPageBtn.removeAttribute('style');
        this._share1.removeAttribute('style');
      } else {
        this._nextPageBtn.setAttribute('style', 'display: none;');
        this._share1.setAttribute('style', 'display: none!important;');
      }

      if(tCurrFlagAsideFlags >= 0) {
        this._flagsAside.children[ tCurrFlagAsideFlags ].setAttribute('style', 'opacity: 1;');
      }
    }
  }
  _setFlags() {
  }
  _setFlagsAside() {
    let _str = '';
    for(let i = 0; i < flagsList.length; i++ ){
      _str += '<img src="img/flags/' + flagsList[ i ][ 'file' ] + '" title="' + flagsList[ i ][ 'country' ] + '" style="display: block"/>'
    }
    this._flagsAside.innerHTML = _str;
  }
  _getRelatedPost() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        const related = data['_items'];
        let _relatedPostsHTMLStr = '';
        for(let j in related) {
          let url = (related[j]['style'] == 'projects') ? '/projects/'+related[j]['slug']+'/' : '/story/'+related[j]['slug']+'/';
          _relatedPostsHTMLStr += ''
                                      + '<div class="related-post">'
                                        + '<a href="' + url + '" onclick="ga(\'send\', \'event\', \'project\', \'click\', \'related\')">'
                                          + '<div class="heroimg" style="background-image:url(' + related[j]['heroImage']['image']['url'] + ');background-position: center center;"></div>'
                                          + '<div class="content">'
                                            + '<h1>' +  related[j]['title'] + '</h1>'
                                            + '<p>' + truncate(related[j]['brief']['html'].replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/g, ""), 75) + '</p>'
                                          + '</div>'
                                        + '</a>'
                                      + '</div>'
                                    + '';
        }
        document.querySelector('.related-post-container').innerHTML = _relatedPostsHTMLStr;
      }
    };
    xhttp.open('POST', '/api/posts?where={"_id":"585ce6aff8cb670e00389c15"}', true);
    xhttp.send('');

  }
  initialize() {
    this._setPage1Behaivior();
    this._setOnscrollBehavior();
    this._setFlags();
    this._setFlagsAside();
    this._setShareFB('header .menu.mobile-hide .btn.facebook', 'pc');
    this._setShareWeibo('header .menu.mobile-hide .btn.weibo', 'pc');
    this._setShareLine('header .menu.mobile-hide .btn.line', 'pc');
    this._setShareFB('.page-qa .menu.mobile-hide .btn-container .btn.facebook', 'pc');
    this._setShareWeibo('.page-qa .menu.mobile-hide .btn-container .btn.weibo', 'pc');
    this._setShareLine('.page-qa .menu.mobile-hide .btn-container .btn.line', 'pc');
    this._setShareFB('header .mobile-menu.mobile-only .btn.facebook', 'mobile');
    this._setShareWeibo('header .mobile-menu.mobile-only .btn.weibo', 'mobile');
    this._setShareLine('header .mobile-menu.mobile-only .btn.line', 'mobile');
    this._getRelatedPost();
  }


  _setShareFB(target, targePos) {
    let _btnFB = document.querySelector(target);
    _btnFB.addEventListener('click', function() {
      ga('send', 'event', 'project', 'click', 'fbShare: ' + targePos);
      window.open('https://www.facebook.com/share.php?u=https://statics.mirrormedia.mg/projects/taiwan_diplomatic_relations/index.html');
    });
  }
  _setShareWeibo(target, targePos) {
    let _btnWB = document.querySelector(target);
    let _thisTitle = document.querySelector('meta[property="og:title"]').getAttribute('content');
    let _thisDesc = document.querySelector('meta[property="og:description"]').getAttribute('content');
    _btnWB.addEventListener('click', function() {
      ga('send', 'event', 'project', 'click', 'weiboShare: ' + targePos);
      window.open('http://service.weibo.com/share/share.php?appkey=&title=' + encodeURIComponent(_thisTitle) + "%0D%0A" + _thisDesc + '&url=https://statics.mirrormedia.mg/projects/taiwan_diplomatic_relations/index.html')
    });
  }
  _setShareLine(target, targePos) {
    let _btnLine = document.querySelector(target);
    let _thisTitle = document.querySelector('meta[property="og:title"]').getAttribute('content');
    let _thisDesc = document.querySelector('meta[property="og:description"]').getAttribute('content');
    _btnLine.addEventListener('click', function() {
      ga('send', 'event', 'project', 'click', 'lineShare: ' + targePos);
      window.open('http://line.naver.jp/R/msg/text/?' + encodeURIComponent(_thisTitle) + "%0D%0A" + encodeURIComponent('https://statics.mirrormedia.mg/projects/taiwan_diplomatic_relations/index.html'));
    });
  }


/* do scroll smooth */
  _currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
          return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) return document.body.scrollTop;
      return 0;
  }
  _elmYPosition(eID) {
      let elm = document.querySelector(eID);
      let y = elm.offsetTop;
      let node = elm;
      while (node.offsetParent && node.offsetParent != document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
      } return y;
  }
  _smoothScroll(eID) {
      let startY = this._currentYPosition();
      let stopY = this._elmYPosition(eID);
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
}

window.onload = () => {
  const diplomaticRelations = new DiplomaticRelations();
  diplomaticRelations.initialize();
}
