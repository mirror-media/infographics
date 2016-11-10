var resultGood = ["golden", "bond", "yen"];
var resultOk = ["oil"];
var resultBad = ["market", "dollar", "cnstock", "twstock", "rmb"];
var point = 0;
var gameStop = false;
var commentText = {
	golden: "越動盪越高漲的避險資產，黃金一有回檔就買，考慮佔資產配置一到三成",
	oil: "油價震盪加劇；美元貶值，有利原油，但主要變數還是會受市場供需、減產協議影響",
	bond: "短期因避險需求將大漲，但中長期因川普恐要求美國國債債主接受八五折還款要求，存在變因",
	market: "貿易保護主義興起，股債、貨幣波動加劇，考慮減碼",
	dollar: "川普反對強勢美元，貨幣戰爭恐導致美元貶值",
	yen: "因避險需求升值",
	rmb: "貶值壓力增大",
	twstock: "市場不確定性大增，可能發生恐慌性賣壓",
	cnstock: "貿易保護主義將傷害中美貿易，損及經濟基本面，賣壓增強"
}

$("#comment").hide();
$("#comment-end").hide();

$("#jiugongge-content img").click(function(){
  var choose = $(this).attr('id');

  $("#comment-img").attr("src","img/minigame_minesweeper_" + choose + ".png")
  				   .attr("srcset","img/minigame_minesweeper_" + choose + "2x.png 2x");
  $("#comment-text").text(commentText[choose]);

  switch(true) {
  	case (resultGood.indexOf(choose) !== -1 ):
  		point += 100;
  		$("#point-result").text(point); 
  		$(this).css("transform","rotateX(360deg)")
  			   .delay(500)
			   .queue(function() {
			        $(this).attr("src","img/minigame_minesweeper_good.png")
			       		   .attr("srcset","img/minigame_minesweeper_good2x.png 2x").dequeue();
			   })
			   .delay(800)
			   .queue(function() {
			   		$("#comment").fadeIn('fast', function() {
			   			$("#comment").show();
			   		});
			   });
  		break;
  	case (resultOk.indexOf(choose) !== -1 ):
  		point += 50;
  		$("#point-result").text(point);
  		$(this).css("transform","rotateX(360deg)")
  			   .delay(500)
			   .queue(function() {
			       $(this).attr("src","img/minigame_minesweeper_ok.png")
			       		  .attr("srcset","img/minigame_minesweeper_ok2x.png 2x").dequeue();
			   })
			   .delay(800)
			   .queue(function() {
			   		$("#comment").fadeIn('fast', function() {
			   			$("#comment").show();
			   		});
			   });
  		break;
  	case (resultBad.indexOf(choose) !== -1 ):
  		$("#point-result").text(point); 
  		$(this).css("transform","rotateX(360deg)")
  			   .delay(500)
			   .queue(function() {
			       $(this).attr("src","img/minigame_minesweeper_bad.png")
			       		  .attr("srcset","img/minigame_minesweeper_bad2x.png 2x").dequeue();
			   })
			   .delay(800)
			   .queue(function() {
			   		$("#comment").fadeIn('fast', function() {
			   			$("#comment").show();
			   			$("#comment-point").text(point);
			   			if (point !== 350) {
			   				gameStop = true;
			   				$("#comment-button-text").text("重新開始");
			   				$("#comment-button-img").attr("src","img/minigame_minesweeper_restart.png");
			   				$("#comment-end").show();
			   			} 
			   		});
			   });
  		break;
  }
});

$("#comment-button").click(function(){
	if (gameStop) {
		location.reload();
	}
	$("#comment").hide();
});