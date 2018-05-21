/* ---------- plugins ----------*/
import superagent from "superagent";
import Swiper from "../plugins/swiper.js";

/* ---------- import data ----------*/
import {quizinit} from "./quiz.js";


if (document.querySelector(".quizwpr") != null) {
  /* ---------- Swiper ----------*/
  let quizSwiper = new Swiper(".swiper-container", {

    allowTouchMove: false,
    pagination: {
      el: ".swiper-pagination",
      type: 'fraction'
    }

  });

  quizSwiper.on('reachEnd',() => {
    console.log('swiper end!');
  });

  /* ---------- quiz ----------*/
  superagent
    .get("/data/team.json")
    .then(function(res) {

      const team = JSON.parse(res.text);
      quizinit(quizSwiper,team);

    })
    .catch(function(err) {
      console.log(err);
    });
}
