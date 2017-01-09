$.fn.is_on_screen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
 
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
 
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

var canvidAControl = canvid({
    selector : '#videoA',
    videos: {
        clip1: { 
            src: 'sprites/Araw.jpg', 
            frames: 28, 
            cols: 7, 
            loops: 1, 
            fps: 2,
            onEnd: function(){
              console.log('clipA ended.');
              ga('send', 'event', 'projects', 'play', 'first child onEnd');
              $('#videoA .after').show();
            }
        }
    },
    width: 600,
    height: 400,
    loaded: function() {
      $('#continueA').show();
    }
});
var canvidBControl = canvid({
    selector : '#videoB',
    videos: {
        clip1: { 
            src: 'sprites/Braw.jpg', 
            frames: 28, 
            cols: 7, 
            loops: 1, 
            fps: 2,
            onEnd: function(){
              console.log('clipB ended.');
              ga('send', 'event', 'projects', 'play', 'second child onEnd');
              $('#videoB .after').show();
            }
        }
    },
    width: 600,
    height: 400,
    loaded: function() {
      $('#continueB').show();
    }
});
var canvidCControl = canvid({
    selector : '#videoC',
    videos: {
        clip1: { 
            src: 'sprites/Craw.jpg', 
            frames: 28, 
            cols: 7, 
            loops: 1, 
            fps: 2,
            onEnd: function(){
              console.log('clipC ended.');
              ga('send', 'event', 'projects', 'play', 'third child onEnd');
              $('#videoC .after').show();
            }
        }
    },
    width: 600,
    height: 400,
    loaded: function() {
      $('#continueC').show();
    }
});

$(document).ready(function() {

    $('#continueA').click(function(){
        canvidAControl.play('clip1');
        $(this).hide()
    });
    $('#continueB').click(function(){
        canvidBControl.play('clip1');
        $(this).hide()
    });
    $('#continueC').click(function(){
        canvidCControl.play('clip1');
        $(this).hide()
    });

    function checkOnScreen() {
        if( $('.footer').length > 0 ) {
            if( $('.footer').is_on_screen() ) {
                $('.footer').addClass('active');
            } else {
                $('.footer').removeClass('active');
            }
        }
    }
    $(window).scroll(checkOnScreen);
    $(window).on('resize', checkOnScreen);
});