// jQuery
window.$ = require('jquery');
window.jQuery = require('jquery');

// localScroll (require scrollto)
const scrollto = require('jquery.scrollto');
const localScroll = require('jquery.localscroll');

// Home: parallax hero image, slick slider
const parallax = require('jquery-parallax.js');
const slick = require('slick-carousel');

// fix Firefox anchor link position issue
if(window.location.hash.length > 1){

    const urlHash = window.location.hash;

    window.onload = function (event) {
        window.location.hash = urlHash;
    };
}


$(document).ready(function(){

// Home: hero image parallax
$(".hero--img").parallax({
    imageSrc: "images/hero.jpg",
    position: "left top",
    speed: 0.2
});    

// Home: slick slider    
$(".slider--container").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: '<div class="slick-prev">Previous</div>',
    nextArrow: '<div class="slick-next">Next</div>',
    responsive: [
        {
            breakpoint: 970,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '35px'
            }
        },
        {
            breakpoint: 350,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
    // autoplay: true
});

const $menuContainer = $("#menuContainer");

// open aside menu
function openMenu(){
    $menuContainer.addClass("active");
    $("html").addClass("lock");
}

// close aside menu
function closeMenu(){
    $menuContainer.removeClass("active");
    $("html").removeClass("lock");
}

// aside menu
$("#menuTrigger").click(function(){
    openMenu();
});

$menuContainer.children(".overlay").click(function(){    
    closeMenu();
});

$(".menuClose").click(function(){    
    closeMenu();
});

$(".menu--item a").click(function(){
    closeMenu();
});

// aside menu scroll action (homepage only)
if($("body").hasClass("home")){
    //local scroll
    $.localScroll({
        duration: 350,
        hash: false
    });
}

// back top button
$("#backTop").click(function(){
	$("body,html").animate({
		scrollTop: 0
	}, 400);
	return false;
});

// show/hide back top button
function showBacktop(fixBtn){
    let scroll_top = $(window).scrollTop();
    //scroll top btn
    if(scroll_top > 100){
        fixBtn.addClass("active");
    } else {
        fixBtn.removeClass("active");
    }    
}

// window scroll
window.addEventListener("scroll",() => {

    showBacktop($("#fixBtn"));

}, false);


/* ---------- 分享按鈕操作：展開 / 收合 ----------*/
document.querySelector("#shareBtnTrigger").addEventListener("click",() => {
    document.querySelector("#shareBtn").classList.toggle("expand");
},false);



}); // document ready


/* -------------------- GA init --------------------*/
(function (i, s, o, g, r, a, m) {
i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
}, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-83609754-1', 'mirrormedia.mg');
ga('create', 'UA-83609754-1', 'auto');
ga('require', 'linkid', 'linkid.js');

/* -------------------- GA Events (common) --------------------*/
ga('send', 'pageview');
