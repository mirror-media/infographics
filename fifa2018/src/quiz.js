/* ---------- quiz ----------*/
export function quizinit(quizSwiper,team) {
//   console.log(typeof(team[1].score));
    document.querySelectorAll('.quiz--a').forEach((element) => {
        element.addEventListener('click',() => {
            quizSwiper.slideNext();
        }, false);
    })



}
