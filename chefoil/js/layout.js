$(document).ready(function(){

var $window = $(window);
var $fixBtn = $("#fixBtn");
var $backTop = $("#backTop");

//slick slider    
$(".slider--container").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: '<div class="slick-prev">Previous</div>',
    nextArrow: '<div class="slick-next">Next</div>',
    responsive: [
        {
            breakpoint: 680,
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

//hero parallax
$(".hero--img").parallax({
    imageSrc: "images/hero.jpg",
    position: "left top",
    speed: 0.2
});

if($("body").hasClass("home")){

    //local scroll
    $.localScroll({
        duration: 350,
        hash: false
    });

}


//nav trigger
{
let $menuTrigger = $("#menuTrigger");
let $menuContainer = $("#menuContainer");
let $menuOverlay = $menuContainer.children(".overlay");
let $menuClose = $(".menuClose");

$menuTrigger.click(function(){
    openMenu();
});

$menuOverlay.click(function(){    
    closeMenu();
});

$menuClose.click(function(){    
    closeMenu();
});

$(".menu--item a").click(function(){
    closeMenu();
});

function openMenu(){
    $menuContainer.addClass("active");
    $("html").addClass("lock");
}

function closeMenu(){
    $menuContainer.removeClass("active");
    $("html").removeClass("lock");
}
}

//recipes section
$(".recontainer .sectionwpr:odd").addClass("even");

//back top btn
$backTop.click(function(){
	$('body,html').animate({
		scrollTop: 0
	}, 400);
	return false;
});

//check recipes title length
if($(".recontent--title h2").length > 0){

    $(".recontent--title h2").each(function(){
        var length = $(this).text().length;
        
        if(length > 12){
            $(this).addClass("long");
        }
    });

}


function scrollDetect(){
    var scroll_top = $window.scrollTop();

    //scroll top btn
    if(scroll_top > 100){
        $fixBtn.addClass("active");
    } else {
        $fixBtn.removeClass("active");
    }
    
}


// window scroll
$window.scroll(function(){
    scrollDetect();
});

// if(window.location.hash.length > 0) {
//     window.scrollTo(0, $(window.location.hash).offset().top);
// }

console.log("layout.js done");

});
