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

        quizCount(element.dataset.team,blackboard);

        // GA events: 點擊選項
        ga('send', 'event', 'projects', 'click', `select quiz option`, { nonInteraction: false });

      },
      false
    );
  });

  document.querySelectorAll('.swiper-slide').forEach((slide,index) => {

    let slideIndex = index + 1;

    slide.querySelectorAll('.quiz--option').forEach((option) => {

        option.addEventListener('click',() => {      
            // GA events: 回答了第幾題
            ga('send', 'event', 'projects', 'click', `answerd Q${slideIndex}`, { nonInteraction: false });
        });

    });

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
export function showResult(quizSwiper,blackboard,imagesLoaded,PerfectScrollbar){
    // 隱藏 pagination
    document.querySelector(".quizwpr").classList.add("result");

    setTimeout(() => {
       
        let finalScore =  _.orderBy(blackboard, ['score','rank'], ['desc','asc']); 
        
        let finalTeam = finalScore[0];

        // let resultCountry = finalScore[0].country; // 國家名稱     
        let resultScore = finalScore[0].score;     

        // console.log(`結算成績 / 國家：${resultCountry}(${finalScore[0].FIFA}) / 分數：${resultScore} / FIFA 排名：${finalScore[0].rank}`);     
        
        // let brief = finalScore[0].brief; // 國家介紹

        document.querySelector('.result--content').innerHTML = 
        `<div class="result--image" style="background-image:url('images/team/${finalTeam.FIFA}.jpg');">
            <img src="images/team/${finalTeam.FIFA}.jpg" />
        </div>
         <div class="result--brief" id="resultScrollwpr">
            <div class="brief--container">
                <h4>${finalTeam.nickname}&nbsp;&nbsp;${finalTeam.country}</h4>
                ${finalTeam.brief}
                <div class="result--star">
                    <h5>重點球星</h5>
                    <ul>
                        <li class="name">${finalTeam.star.name}</li>
                        <li>生日：${finalTeam.star.birthday}</li>
                        <li>位置：${finalTeam.star.position}</li>
                        <li>效力球會：${finalTeam.star.team}</li>
                    </ul>
                </div>
            </div>
         </div>`.trim();

        // PerfectScrollbar
        const scrollwpr = document.getElementById('resultScrollwpr');
        let ps = null;

        function setPs(){

            let vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            if(vw > 990){

                if(ps == null){
                    ps = new PerfectScrollbar(scrollwpr);
                    scrollwpr.scrollTop = 0;
                } else {
                    ps.update();
                    scrollwpr.scrollTop = 0;
                }     

            } else if (vw < 900) {

                if(ps != null){
                    ps.destroy();
                    ps == null;
                }
            }
        }

        setPs();    

        window.addEventListener('resize',() => {

            setPs();  

        },false);     
       
        imagesLoaded( '#result-slide',{background:true}, function() {
            // console.log('image loaded');
            quizSwiper.updateAutoHeight();
            document.querySelector('.result--btnwpr').classList.remove('disabled');
        });

        // Share link (facebook)
        const currentLocation = window.location.protocol + '//' + window.location.host;

        document.getElementById('shareResult').setAttribute("href", `https://www.facebook.com/share.php?u=${currentLocation}/fifa2018/quiz/${finalTeam.FIFA}/`);

        //GA evemts: 送出結果
        ga('send', 'event', 'projects', 'result', `${finalTeam.FIFA}`, { nonInteraction: false })


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
