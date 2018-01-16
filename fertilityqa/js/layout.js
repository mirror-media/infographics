$(document).ready(function(){

//section
$("article").each(function(){

    if($(this).find(".section").length == 1){

        //只有選項沒有文章內容
        $(this).addClass("single");

      } else {
          
        //含選項與文章內容
        var $section = $(this).find(".section");
        var $desc = $section.eq(1); //文章內容
        
        $section.eq(0).addClass("option"); //選項
        $desc.addClass("desc");

        //手機板顯示的選項
        $(this).find(".choices").clone().appendTo($desc);
      }
});

const layoutDone = new Event('layoutDone')
window.dispatchEvent(layoutDone)

});