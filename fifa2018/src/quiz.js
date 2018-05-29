/* ---------- 建立題目 ----------*/
export function initQuiz(quizData){

    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const resultSlide = document.querySelector('#result-slide');

    quizData.forEach((element) => {          

        /* ----- create swiper slide ----- */
        const entry = 
        `<div class="quiz">
                <h2 class="quiz--question">${element.question}</h2>                
        </div>`.trim();

        let slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = entry;

        swiperWrapper.insertBefore(slide,resultSlide);        

        /* ----- create slide options ----- */
        element.option.forEach((element) => {

            let option = document.createElement('div');
            option.classList.add('quiz--option','roofbtn');
            option.innerHTML = `<div class="text">${element.content}</div>`;

            option.setAttribute('data-team', `${element.team.replace(/\s/g,'')}`);

            slide.querySelector('.quiz').appendChild(option);           

        });

    });

}

/* ---------- quiz 操作行為 ----------*/
export function quizAction(quizSwiper,blackboard) {

  //   console.log(typeof(team[1].score));
  document.querySelectorAll(".quiz--option").forEach(element => {
    element.addEventListener("click", () => {

        quizSwiper.slideNext();

        quizCount(element.dataset.team,blackboard)

      },
      false
    );
  });

}

/* ---------- 計分 ----------*/
export function quizCount(team,blackboard) {

    // console.log(team);
    // 使用者選擇的選項所代表的國家
    const teamArray = team.split(','); 

    /* ----- 比對 taemArray 與計分板 ----- */
    blackboard.forEach((element) => {

        if(teamArray.indexOf(element.FIFA) > -1){
            
            // 符合的國家分數 +1
            element.score = element.score + 1;

            // console.log(`${element.country}(${element.FIFA}) +1`);
            // console.log(element.score);
        }

    });

    // console.log('---------- 題目分隔線 ----------');

    // showScore(blackboard);

}

/* ---------- 顯示測試用的計分黑板 ----------*/
export function showScore(blackboard){

    let wrapper = document.querySelector('.blackboard');
    wrapper.innerHTML = '';

    blackboard.forEach((element) => {
        let entry = document.createElement('div');
        entry.classList.add('score-entry');
        entry.innerHTML = `${element.country}：${element.score}`;

        wrapper.appendChild(entry);
    });
    // console.log('show blackboard');
}


/* ---------- 顯示結果 ----------*/
export function showResult(quizSwiper,blackboard,imagesLoaded){
    // 隱藏 pagination
    document.querySelector(".quizwpr").classList.add("result");

    setTimeout(() => {
       
        let finalScore =  _.orderBy(blackboard, ['score','rank'], ['desc','asc']);         

        let resultCountry = finalScore[0].country; // 國家名稱     
        let resultScore = finalScore[0].score;     

        // console.log(`結算成績 / 國家：${resultCountry}(${finalScore[0].FIFA}) / 分數：${resultScore} / FIFA 排名：${finalScore[0].rank}`);     
        
        let brief = finalScore[0].brief; // 國家介紹

        document.querySelector('.result--content').innerHTML = 
        `<div class="result--image" style="background-image:url('${finalScore[0].image}');"></div>
         <div class="result--brief">
            <div class="brief--container">
                <h4>${resultCountry}</h4>
                <p>${brief}</p>
            </div>
         </div>`.trim();

        /* 
        document.querySelector('.result--extra').innerHTML = 
        `<h3 class="deco white">說到${resultCountry}隊，你一定聽過</h3>
         <div class="extra--container">
            <div class="extra--portrait"><img src="${finalScore[0].extra.portrait}" /></div>
            <div class="extra--brief">                
                <div class="brief--container">
                    <h4>${finalScore[0].extra.name}<span class="status">${finalScore[0].extra.status}</span></h4>
                    <p>${finalScore[0].extra.intro}</p>
                </div>
            </div>
         </div>`.trim(); 
        */
       
        imagesLoaded( '#result-slide',{background:true}, function() {
            // console.log('image loaded');
            quizSwiper.updateAutoHeight();
            document.querySelector('.result--btnwpr').classList.remove('disabled');
        });

    },0);
    
}

/* ---------- 再玩一次 ----------*/
export function resetQuiz(quizSwiper,blackboard) {  
 
    blackboard.forEach((element) => {
        element.score = 0;
    });
    
    document.querySelector(".quizwpr").classList.remove("result");

    quizSwiper.slideTo(0,0);

}
