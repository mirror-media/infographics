$(document).ready(function(){

let $body = $("body");
let $card = $(".cardBoard");
let $cardTotal = $(".pager--total");

const jqueryDone = new Event('jqueryDone');


//fix ios flexbox issue
{
    $(".cardwpr").each(function(){
        $(this)
        .wrap("<div class='wrapTable'></div>");
    });

}

//偶數卡片設定較深背景
$card.filter(":odd").addClass("dark");

//標示頁數
{
    let sum = $card.length -1; //扣掉首圖
    $cardTotal.text(sum);

    $card.each(function(){
        let index = $(this).index();
        $(this).addClass("card" + "0" + index)
        .find(".pager--current").text(index -1);
    });
}

//only for firefox preview
// $card.filter(":lt(9)").remove();

/*
//init ScrollMagic
var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onLeave'
    }
});

//get all slides
var slides = document.querySelectorAll(".pinSection");

//creat scene for every slide
for(var i=0; i<slides.length; i++){
    new ScrollMagic.Scene({
        triggerElement: slides[i]
    }).setPin(slides[i])   
    .addTo(controller);
}
*/


//設定卡片圖檔容器高度
function setImageHeight(){
    let wheight = $(window).height();
    $card.each(function(){

        if($(this).find(".desc").length){

            let descHeight = $(this).find(".desc").outerHeight();

            if($(this).find(".cardwpr").length){

                let imgHeight =  wheight - descHeight; 

                $(this)
                .find(".wrapTable").height(imgHeight + "px")
                .find(".cardwpr").css({
                    height: imgHeight + "px",
                    minHeight:  imgHeight + "px"                    
                });

            }

        }
    });

}


//interview RWD, clone content
{

    $(".interview").each(function(){

        if($(this).find(".interview--brief").length){
            var cloneBrief = $(this).find(".interview--brief").clone().addClass("cloneBrief");
            $(this).find(".interview--content").prepend(cloneBrief);
            // console.log("interview done");
        }

    });    


}

//show viewport size
//remove before publish
function sizeDetect(){
    var wwidth = $(window).width();
    var wheight = $(window).height();
    //$("#wwidth").text("vw:"+wwidth+"px"); //remove before publish
    //$("#wheight").text("vh:"+wheight+"px"); //remove before publish

    if(wheight > wwidth){
        $body.addClass("compactMode");
    } else {
        $body.removeClass("compactMode");
    }

}

$(window).resize(function(){
    sizeDetect();
    setImageHeight();
    window.dispatchEvent(jqueryDone);
}).trigger("resize");


});