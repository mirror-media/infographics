// jQuery
window.$ = require('jquery');
window.jQuery = require('jquery');

// localScroll (require scrollto)
const scrollto = require('jquery.scrollto');
const localScroll = require('jquery.localscroll');

// Home: parallax hero image, slick slider
const parallax = require('jquery-parallax.js');
const slick = require('slick-carousel');


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
            breakpoint: 500,
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




// if($("body").hasClass("home")){

//     //local scroll
//     $.localScroll({
//         duration: 350,
//         hash: false
//     });

// }

// let $menuContainer = $("#menuContainer");

// function openMenu(){
//     $menuContainer.addClass("active");
//     $("html").addClass("lock");
// }

// function closeMenu(){
//     $menuContainer.removeClass("active");
//     $("html").removeClass("lock");
// }

// openMenu();