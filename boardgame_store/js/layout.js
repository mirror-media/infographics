$(document).ready(function(){

    var $window = $(window);
    var $html = $("html");
    var $navwpr = $("#navwpr");
    var $navTrigger = $(".navTrigger");
    var $menuWpr = $("#menuWpr");
    var $slideWpr = $("#slideWpr");
    var $sidebar = $("#sidebar");

    GAListener.initialize();

    //觸控螢幕偵測
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }

    if($html.hasClass("no-touch")){

        //top nav trigger
        $navTrigger.click(function(){
           navSlide($(this));
        });

        //click to close sidebar
        $slideWpr.click(sidebarSlide);

    } else {

        $navTrigger.on("touchend",function(){
           navSlide($(this));
        });

        //click to close sidebar
        $slideWpr.on("touchend",function(){
           sidebarSlide();
        });

    }

    function navSlide(target){
        if(target.hasClass("active")){
                menuClose();
            } else {
                menuOpen();
            }
    }

    function sidebarSlide(){
        if($menuWpr.hasClass("active")){
            menuClose();
        }
    }


    //top nav sticky
    function navSticky(){
        var scroll_top = $window.scrollTop();
        var navHeight = $navwpr.height();

        if(scroll_top - navHeight > 0){ // scroll_top - navHeight > navOffsetTop
            $navwpr.addClass("sticky");
        } else {
            $navwpr.removeClass("sticky");
        }

        //scrollTop detection
        //$("#ptop").text("scrollTop:"+scroll_top+"px");

    }

    //sidebar menu open
    function menuOpen(){
        $menuWpr.addClass("active");
        $navTrigger.addClass("active");
        $slideWpr.addClass("slide");
    }

    //sidebar menu close
    function menuClose(){
        $menuWpr.removeClass("active");
        $navTrigger.removeClass("active");
        $slideWpr.removeClass("slide");
    }

    //perfect scrollbar: sidebar scroll
    $sidebar.perfectScrollbar({
        swipePropagation: false
    });

    //size detection for test
    function sizeDetect(){

        //viewport
        var wwidth = $window.width();
        var wheight = $window.height();
        $("#wwidth").text("vw:"+wwidth+"px");
        $("#wheight").text("vh:"+wheight+"px");

        //content zoom
        var awidth = $("#aw").width();
        var aheight = $("#ah").height();
        $("#awidth").text("aw:"+awidth+"px");
        $("#aheight").text("ah:"+aheight+"px");

    }


    // window scroll
    $window.scroll(function(){

        //sticky top nav
        navSticky();

    });

    //window resize
    $window.resize(function(){

        //sizeDetect();//size detection for test
        $sidebar.perfectScrollbar('update'); //update sidebar scroll

    }).trigger("resize");

    //Orientation change
    window.addEventListener('orientationchange', function(){

        setTimeout(menuClose,600); //close sidebar menu
        $sidebar.perfectScrollbar('update'); //update sidebar scroll

    });

    //Single Page Nav
    $sidebar.singlePageNav({
        speed: 1200,
        updateHash: true,
        onComplete: function(){
            setTimeout(menuClose,250); //close sidebar menu
        }
    });

    //touch swipe
    /*
    $slideWpr.touchwipe({
         wipeLeft: function() { menuOpen(); },
         wipeRight: function() { menuClose(); },
         //wipeUp: function() { alert("up"); },
         //wipeDown: function() { alert("down"); },
         min_move_x: 100,
         min_move_y: 250,
         preventDefaultEvents: false
    });
    */

    $.getJSON('https://www.mirrormedia.mg/api/posts?where={"tags":"58521996b854000d002d255f"}', function(data){
      var related = data['_items'];
      for(var j in related) {
        var url = (related[j]['style'] == 'projects') ? '/projects/'+related[j]['slug']+'/' : '/story/'+related[j]['slug']+'/';
        $('.relatedwpr .centerwpr').append(''
                + '<a class=\"slot\" href=\"'+ url +'\" onclick=\"ga(\'send\', \'event\', \'project\', \'click\', \'related\')\">'
                + '<div class="imgwpr" style="background-image:url(' + related[j]['heroImage']['image']['url'] + ');"></div>'
                + '<h1>' + related[j]['title'] + '</h1>'
                + '<p>' + Truncate.doTruncate(related[j]['brief']['html'].replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/g, ""), 75) + '</p>'
                + '</a>'
        );
        if(j%2 === 1 ) {
          $('.relatedwpr .centerwpr').append('<div class="divider"></div>');
        }
      }
    });

});

var GAListener  = (function() {
  var gaRecord = {};
  var _navHandler = function(e) {
    e = e || window.event();
    var target = e.target || e.srcElement;
    if(target.tagName !== 'LI') {
      var section = target.getAttribute('data-section');
      ga('send', 'event', 'project', 'click', 'menu?' + section);
    }
  }
  var _isVisible = function($el) {
    var winTop = $(window).scrollTop();
    var winBottom = winTop + $(window).height();
    var elTop = $el.offset().top;
    var elBottom = elTop + $el.height();
    return (((elTop + $(window).height()/2) <= winBottom));
  }
  var _whichArticleVidible = function() {
    var _articleItem = document.querySelectorAll('article');
    for(var i = 0; i < _articleItem.length; i++) {
      var _id = _articleItem[ i ].getAttribute('id');
      if(_isVisible($('#' + _id)) && !gaRecord[ _id ]){
        gaRecord[ _id ] = true;
        ga('send', 'event', 'project', 'visible', 'article?' + _id);
      }
    }
  }
  var _setShareFB = function(target, targePos) {
    var _btnFB = document.querySelector(target);
    _btnFB.addEventListener('click', function() {
      ga('send', 'event', 'project', 'click', 'fbShare: ' + targePos);
      window.open('https://www.facebook.com/share.php?u=https://statics.mirrormedia.mg/projects/boardgame_store/index.html');
    });
  }
  var _setShareWeibo = function(target, targePos) {
    var _btnWB = document.querySelector(target);
    var _thisTitle = document.querySelector('meta[property="og:title"]').getAttribute('content');
    var _thisDesc = document.querySelector('meta[property="og:description"]').getAttribute('content');
    _btnWB.addEventListener('click', function() {
      ga('send', 'event', 'project', 'click', 'weiboShare: ' + targePos);
      window.open('http://service.weibo.com/share/share.php?appkey=&title=' + encodeURIComponent(_thisTitle) + "%0D%0A" + _thisDesc + '&url=https://statics.mirrormedia.mg/projects/boardgame_store/index.html')
    });
  }
  var _setShareLine = function(target, targePos) {
    var _btnLine = document.querySelector(target);
    var _thisTitle = document.querySelector('meta[property="og:title"]').getAttribute('content');
    var _thisDesc = document.querySelector('meta[property="og:description"]').getAttribute('content');
    _btnLine.addEventListener('click', function() {
      ga('send', 'event', 'project', 'click', 'lineShare: ' + targePos);
      window.open('http://line.naver.jp/R/msg/text/?' + encodeURIComponent(_thisTitle) + "%0D%0A" + encodeURIComponent('https://statics.mirrormedia.mg/projects/boardgame_store/index.html'));
    });
  }

  var _setRelatedGaHandler = function() {
    var _relatedAnchors = document.querySelectorAll('.relatedwpr a');
    for(var i = 0; i < _relatedAnchors.length; i++) {
      _relatedAnchors[ i ].onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        var target = e.target || e.srcElement;
        var _href = '';
        if(target.tagName !== 'A') {
          _href = target.parentNode.getAttribute('href');
        } else {
          _href = target.getAttribute('href');
        }
        ga('send', 'event', 'project', 'click', 'related article?' + _href);
        location.href = _href;
      }
    }
  }

  var _constructor = function() {
    var _navItem = document.querySelectorAll('#nav li');
    for(var i = 0; i < _navItem.length; i++) {
      _navItem[ i ].addEventListener('click', _navHandler);
    }
    window.addEventListener('scroll', _whichArticleVidible);
    _setShareFB('#navwpr .btn.facebook', 'outsideShare');
    _setShareWeibo('#navwpr .btn.weibo', 'outsideShare');
    _setShareLine('#navwpr .btn.line', 'outsideShare');
    _setShareFB('#sidebar .btn.facebook', 'insideShare');
    _setShareWeibo('#sidebar .btn.weibo', 'insideShare');
    _setShareLine('#sidebar .btn.line', 'insideShare');
    // _setRelatedGaHandler();
  }

  return {
    initialize: function(){
      _constructor();
    }
  }
})();
