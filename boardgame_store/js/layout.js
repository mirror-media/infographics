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

    // $.getJSON('https://www.mirrormedia.mg/api/posts?where={"tags":"58521996b854000d002d255f"}', function(data){
    //   var related = data['_items'];
    //   for(var j in related) {
    //     var url = (related[j]['style'] == 'projects') ? '/projects/'+related[j]['slug']+'/' : '/story/'+related[j]['slug']+'/';
    //     $('ul.related').append('<li><a href=\''+url+'\'>'+related[j]['title']+'</a></li>');
    //   }
    // });


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
  var _setShareFB = function() {
    var _btnFB = document.querySelector('.btn.facebook');
    _btnFB.addEventListener('click', function() {
      window.open('https://www.facebook.com/share.php?u=https://statics.mirrormedia.mg/projects/boardgame_store/index.html');
    });
  }
  var _setShareWeibo = function() {
    var _btnWB = document.querySelector('.btn.weibo');
    var _thisTitle = document.querySelector('meta[property="og:title"]').getAttribute('content');
    var _thisDesc = document.querySelector('meta[property="og:description"]').getAttribute('content');
    _btnWB.addEventListener('click', function() {
      window.open('http://service.weibo.com/share/share.php?appkey=&title=' + encodeURIComponent(_thisTitle) + "%0D%0A" + _thisDesc + '&url=https://statics.mirrormedia.mg/projects/boardgame_store/index.html')
    });
  }
  var _setShareLine = function() {
    var _btnLine = document.querySelector('.btn.line');
    var _thisTitle = document.querySelector('meta[property="og:title"]').getAttribute('content');
    var _thisDesc = document.querySelector('meta[property="og:description"]').getAttribute('content');
    _btnLine.addEventListener('click', function() {
      window.open('http://line.naver.jp/R/msg/text/?' + encodeURIComponent(_thisTitle) + "%0D%0A" + encodeURIComponent('https://statics.mirrormedia.mg/projects/boardgame_store/index.html'));
    });
  }
  var _setRelatedGaHandler = function() {
    var _relatedUl = document.querySelector('.related');
    _relatedUl.addEventListener('click', function(e) {
      e = e || window.event();
      var target = e.target || e.srcElement;
      if(target.tagName !== 'A') {
        return;
      }
      ga('send', 'event', 'project', 'click', 'related article?' + target.getAttribute('href'));
    });
  }

  var _constructor = function() {
    var _navItem = document.querySelectorAll('#nav li');
    for(var i = 0; i < _navItem.length; i++) {
      _navItem[ i ].addEventListener('click', _navHandler);
    }
    window.addEventListener('scroll', _whichArticleVidible);
    _setShareFB();
    _setShareWeibo();
    _setShareLine();
    _setRelatedGaHandler();
  }

  return {
    initialize: function(){
      _constructor();
    }
  }
})();
