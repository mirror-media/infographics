/* ---------- plugins ----------*/
import superagent from "superagent";
import _ from "lodash";
import Swiper from "../plugins/swiper.js";

/* ---------- import data ----------*/
import { initSwiper, initQuiz, quizOption } from "./quiz.js";

if (document.querySelector(".quizwpr") != null) {
  var blackboard = null;
  var quizSwiper = null;

  /* ----- team score array -----*/
  superagent
    .get("/data/team.json")
    .then(function(res) {
      blackboard = JSON.parse(res.text);

      console.log(blackboard);
    })
    .catch(function(err) {
      console.log(err);
    });

  /* ----- init swiper and quiz content -----*/
  superagent
    .get("/data/quiz.json")
    .then(function(res) {
      const quizData = JSON.parse(res.text);
      // console.log(JSON.parse(res.text));
      // initSwiper(Swiper);
      initQuiz(quizData);

      initSwiper(Swiper);
      quizOption();
      
      // setTimeout(() => {
        
      //   quizOption();
      // },200);
      
      
    })
    .catch(function(err) {
      console.log(err);
    });
}
