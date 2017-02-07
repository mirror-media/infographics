var section = 1;
var touch = true;
var slideTimeout = setInterval(function () {
                $.fn.fullpage.moveSlideRight();
            }, 5000);
if (touch) {
  $('body').bind('touchstart', function(){
    document.getElementById("media-2").load();
    document.getElementById("media-3").load();
    document.getElementById("media-4").load();
    document.getElementById("media-5").load();
    document.getElementById("media-6").load();
    document.getElementById("media-7").load();
    document.getElementById("media-8").load();
    document.getElementById("media-9").load();
    document.getElementById("media-10").load();
    document.getElementById("media-11").load();
    document.getElementById("media-12").load();
    touch = false;
  });
}


$(document).ready(function() {
  $('#fullpage').fullpage({
    controlArrows: true,
    scrollOverflow: false,
    onLeave: function(index, nextIndex, direction){
        var leavingSection = $(this);
        
        section = nextIndex;
        
        $(".icon-volume-off").hide();
        $(".icon-volume-up").show();

        // to 1
        if(index == 2 && direction == 'up'){
          document.getElementById("media-1").play();
          document.getElementById("media-2").pause();
        }

        // to 2
        else if(index == 1 && direction =='down'){
          document.getElementById("media-2").load(); 
          document.getElementById("media-1").pause();
          document.getElementById("media-2").play();
        }

        else if(index == 3 && direction =='up'){
          document.getElementById("media-2").load();
          clearInterval(slideTimeout);
          document.getElementById("media-3").pause();
          document.getElementById("media-2").play();
        }

        // to 3
        else if(index == 2 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-2").pause();
          document.getElementById("media-3").play();
        }

        else if(index == 4 && direction =='up'){
          clearInterval(slideTimeout);
          document.getElementById("media-4").pause();
          document.getElementById("media-3").play();
        }

        else if(index == 3 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-3").pause();
          document.getElementById("media-4").play();
        }

        else if(index == 5 && direction =='up'){
          clearInterval(slideTimeout);
          document.getElementById("media-5").pause();
          document.getElementById("media-4").play();
        }

        else if(index == 4 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-4").pause();
          document.getElementById("media-5").play();
        }

        else if(index == 6 && direction =='up'){
          clearInterval(slideTimeout);
          document.getElementById("media-6").pause();
          document.getElementById("media-5").play();
        }

        else if(index == 5 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-5").pause();
          document.getElementById("media-6").play();
        }

        else if(index == 7 && direction =='up'){
          clearInterval(slideTimeout);
          document.getElementById("media-7").pause();
          document.getElementById("media-6").play();
        }

        else if(index == 6 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-6").pause();
          document.getElementById("media-7").play();
        }

        else if(index == 8 && direction =='up'){
          clearInterval(slideTimeout);
          document.getElementById("media-8").pause();
          document.getElementById("media-7").play();
        }

        else if(index == 7 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-7").pause();
          document.getElementById("media-8").play();
        }

        else if(index == 9 && direction =='up'){
          clearInterval(slideTimeout);
          document.getElementById("media-9").pause();
          document.getElementById("media-8").play();
        }

        else if(index == 8 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-8").pause();
          document.getElementById("media-9").play();
        }

        else if(index == 10 && direction =='up'){
          clearInterval(slideTimeout);
          document.getElementById("media-10").pause();
          document.getElementById("media-9").play();
        }

        else if(index == 9 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-9").pause();
          document.getElementById("media-10").play();
        }

        else if(index == 11 && direction =='up'){
          clearInterval(slideTimeout);
          document.getElementById("media-11").pause();
          document.getElementById("media-10").play();
        }

        else if(index == 10 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-10").pause();
          document.getElementById("media-11").play();
        }

        else if(index == 12 && direction =='up'){
          clearInterval(slideTimeout);
          document.getElementById("media-12").pause();
          document.getElementById("media-11").play();
        }

        else if(index == 11 && direction =='down'){
          clearInterval(slideTimeout);
          document.getElementById("media-11").pause();
          document.getElementById("media-12").play();
        }

        else if(index == 13 && direction =='up'){
          clearInterval(slideTimeout);
          $(".volume-text").show();
          $(".icon-volume-up").show();
          $(".icon-volume-off").show();
          document.getElementById("media-12").play();
        }

        else if(index == 12 && direction =='down'){
          $(".volume-text").hide();
          $(".icon-volume-up").hide();
          $(".icon-volume-off").hide();
          document.getElementById("media-12").pause();
        }
    }
  });
  $.fn.fullpage.setMouseWheelScrolling(false);
  $.fn.fullpage.setAllowScrolling(false);
});

$(".notice-button--over").click(function() {
  $('#over18-notice').hide();
  $('#fullpage').css('overflow-y', 'visible');
  document.getElementById('media-1').play();
  $.fn.fullpage.setMouseWheelScrolling(true);
  $.fn.fullpage.setAllowScrolling(true);
})

$(".notice-button--less").click(function() {
  window.location.href = "https://www.mirrormedia.mg/";
})

$("#intro-button--open").click(function() {
  $(".intro-text").css("transform", "translateY(-100%)");
})

$("#intro-button--close").click(function() {
  $(".intro-text").css("transform", "translateY(100%)");
})

$(".icon-volume-off").hide();

// mute
$(".icon-volume-up").click(function() {
  $(".icon-volume-up").hide();
  $(".icon-volume-off").show();
  document.getElementById("media-" + section).pause();
})

//unmute
$(".icon-volume-off").click(function() {
  $(".icon-volume-off").hide();
  $(".icon-volume-up").show();
  document.getElementById("media-" + section).play();
})