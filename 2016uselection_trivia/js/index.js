import scenes from './constants/scenes';
import CKscene from './ckscene/CKscene';
import '../css/index.less';
import * as ScrollMagic from 'scrollmagic';


$(window).on("beforeunload", function() {
    $(window).scrollTop(0);
});

function isMobile() {
    try {
        return document.createEvent("TouchEvent"), !0
    } catch (e) {
        return !1
    }
}


window.onorientationchange = function(event){
  console.log('orientation changed to ', event.orientation);
  $(window).scrollTop(0);
  window.location.reload();
}
window.onload = function(){
  console.log('mobile? ' + isMobile());
  if(window.innerHeight < window.innerWidth){
    $('main').addClass('landscape');
  }else{
    $('main').addClass('portrait');
  }
  let controller = new ScrollMagic.Controller();
  let ckscene = new CKscene(controller);
  ckscene.init();
  $.getJSON('https://www.mirrormedia.mg/api/posts?where={"tags":"57f49821a89ee20d00cc4c0f"}', function(data){
    var related = data['_items'];
    for(var j in related) {
      var url = (related[j]['style'] == 'projects') ? '/projects/'+related[j]['slug']+'/' : '/story/'+related[j]['slug']+'/';
      $('ul.related').append('<li><a href=\''+url+'\'>'+related[j]['title']+'</a></li>');
    }
  });
};
