/* ---------- Swiper 初始化 ----------*/
export function initSwiper(Swiper){
    window.quizSwiper = new Swiper(".swiper-container", {
  
      allowTouchMove: false,
      pagination: {
        el: ".swiper-pagination",
        type: 'fraction'
      }
  
    });
  
    quizSwiper.on('reachEnd',() => {
      console.log('swiper end!');
    });
  }

/* ---------- 建立題目 ----------*/
export function initQuiz(quizData){

    const swiperWrapper = document.querySelector('.swiper-wrapper');

    quizData.forEach((element) => {          

        /* ----- create swiper slide ----- */
        const entry = 
        `<div class="quiz">
                <h2 class="quiz--question">${element.question}</h2>                
        </div>`.trim();

        let slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = entry;

        swiperWrapper.appendChild(slide);

        /* ----- create slide options ----- */
        element.option.forEach((element) => {

            let option = document.createElement('div');
            option.classList.add('quiz--option');
            option.innerHTML = element.content;
            option.setAttribute('data-team', `${element.team}`);

            slide.querySelector('.quiz').appendChild(option);           

        });

    });
}

/* ---------- quiz 行為 ----------*/
export function quizOption() {

  //   console.log(typeof(team[1].score));
  document.querySelectorAll(".quiz--option").forEach(element => {
    element.addEventListener(
      "click",
      () => {
        window.quizSwiper.slideNext();
        console.log(element.dataset.team);

      },
      false
    );
  });

}



export function resetQuiz() {
  console.log("再玩一次");
}
