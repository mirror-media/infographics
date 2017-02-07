$.fn.smartBackgroundImage = function(url){
    var t = this;
    //create an img so the browser will download the image:
    $('<img />')
        .attr('src', url)
        .on('load', function(){ //attach onload to set background-image
            t.each(function(){
                $(this)
                    .css('backgroundImage', "url('"+url+"')" )
                    .addClass( "fadein" );
            });
        });
    return this;
}

$(document).ready(function() {

    var progressBar = $('progress');

    // Set the Max attr for the first time
    progressBar.attr({
        value: 1,
        max: $('div.section').length
    });

    $('#fullpage').fullpage({
        scrollingSpeed: 1000,
        afterLoad: function(anchorLink, index) {
          //console.log('afterLoad', index);  
          var loadedSection = $(this).next();
          //FIRE SCRIPT
          $(this).smartBackgroundImage($(this).data('src'));
          $(this).next().smartBackgroundImage($(this).next().data('src'));
        },
        onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);

            //console.log('scroll to ', nextIndex);
            ga('send', 'event', 'projects', 'scroll', 'scroll to '+nextIndex);

            if(direction =='down'){
                progressBar.animate({
                    value: nextIndex
                }, 1000);
            } else 
                if(direction == 'up'){
                    progressBar.animate({
                        value: nextIndex
                    }, 1000);
                }
        }
    });

    // Next Page
    $('.continue').on('click', function() {
        $.fn.fullpage.moveSectionDown();
    });
});

$(".notice-button--over").click(function() {
  $('#over18-notice').hide();
})

$(".notice-button--less").click(function() {
  window.location.href = "https://www.mirrormedia.mg/";
})
