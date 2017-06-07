$(document).ready(function(){

var $html = $("html");
var $lbTrigger = $(".infobox");
var $lightbox = $("#lightbox");
var $lbOverlay = $(".lightbox__overlay");
var $lbCloseBtn = $(".lightbox__close");

//lightbox
$lbTrigger.click(function(){
    openLightbox();    
});

$lbOverlay.click(function(){
    closeLightbox();    
});

$lbCloseBtn.click(function(){
    closeLightbox();    
});

function openLightbox(){
    $html.addClass("stop-scroll");
    $lightbox.addClass("show");
}

function closeLightbox(){
    $html.removeClass("stop-scroll");
    $lightbox.removeClass("show");
}

var $window = $(window);
});