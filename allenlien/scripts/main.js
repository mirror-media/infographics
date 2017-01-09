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

$(document).ready(function() {
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