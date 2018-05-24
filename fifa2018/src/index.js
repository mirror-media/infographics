/* ---------- plugins ----------*/
import superagent from "superagent";
import _ from "lodash";
import Swiper from "../plugins/swiper.js";

/* ---------- import data ----------*/
import {
  initQuiz,
  quizAction,
  quizCount,
  showResult,
  showScore,
  resetQuiz
} from "./quiz.js";

import {
  appendListing
} from "./news.js";

/* -------------------- 測驗頁 --------------------*/
if (document.querySelector(".quizwpr") != null) {
  const getTeam = superagent.get("./data/team.json"); //取得計分板
  const getQuiz = superagent.get("./data/quiz.json"); //取得題目

  Promise.all([getTeam, getQuiz])
    .then(function(res) {
      let blackboard = JSON.parse(res[0].text); //計分板
      const quizData = JSON.parse(res[1].text); //題目

      initQuiz(quizData); //建立題目

      //初始化 Swiper
      let quizSwiper = new Swiper(".swiper-container", {
        allowTouchMove: false,
        autoHeight: true,

        pagination: {
          el: ".swiper-pagination",
          type: "custom",
          renderCustom: function(quizSwiper, current, total) {
            // return current + " / " + (total - 1);
            return `<span class="qmark">Q</span><span class="current">${current}</span><span class="slash">/</span><span class="total">${total -
              1}</span>`;
          }
        }
      });

      quizSwiper.on("reachEnd", () => {
        // 顯示結果頁，隱藏 pagination
        showResult(quizSwiper, blackboard);
      });

      //顯示測試用的計分黑板
      showScore(blackboard);

      //quiz 操作行為
      quizAction(quizSwiper, blackboard);

      //再玩一次
      document.querySelector("#resetQuiz").addEventListener(
        "click",
        () => {
          resetQuiz(quizSwiper, blackboard);
          showScore(blackboard);
        },
        false
      );

      // DEV: 跳到結果頁
      // quizSwiper.slideTo(8,0)
    })
    .catch(function(err) {
      console.log(err);
    });
}

/* -------------------- 新聞頁 --------------------*/
if (document.querySelector(".newswpr") != null) {

  //取得新聞 list
  const Listing = 'https://api.mirrormedia.mg/listing?where={%22sections%22:{%22$in%22:[%2257e1e0e5ee85930e00cad4e9%22]}}&embedded={%22heroVideo.coverPhoto%22:1}&max_results=6&page=1&sort=-publishedDate'

  superagent.get(Listing)
    .then(function (res) {
      appendListing(JSON.parse(res.text));
    })
    .catch(function (err) {
      console.log(err);
    });



  //取得戰績表 (Matches)
  // GET https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId/values/Sheet1!A1:D5 + (API key)
  const Matches = 'https://sheets.googleapis.com/v4/spreadsheets/1SWKXLdl3Cbw4ED-DeAAUyhkMj46Hkk3Bfigx0_6zU8E/values/戰績表!A1:K9?key=AIzaSyAyxPNqEwIWW-tXjhxmEjGy3d_T3P_TIBA';

  superagent.get(Matches)
    .then(function (res) {
      console.log(JSON.parse(res.text));
    })
    .catch(function (err) {
      console.log(err);
    });

  const Schedule = 'https://sheets.googleapis.com/v4/spreadsheets/1SWKXLdl3Cbw4ED-DeAAUyhkMj46Hkk3Bfigx0_6zU8E/values/賽程表!A1:K9?key=AIzaSyAyxPNqEwIWW-tXjhxmEjGy3d_T3P_TIBA';

  superagent.get(Schedule)
    .then(function (res) {
      console.log(JSON.parse(res.text));
    })
    .catch(function (err) {
      console.log(err);
    });  

  //取得賽程 (Schedule)

  // Promise.all([getSectionList,sheets])
  //   .then(function(res){  

  //     appendListing(JSON.parse(res[0].text));

  //     console.log(JSON.parse(res[1].text));

  //   })
  //   .catch(function(err){
  //     console.log(err);
  //   });


  // window.addEventListener('resize',() => {

  //   setEqualHeight(document.querySelectorAll('.listing--innerwpr'));

  // });  




  
}

/* ---------- 分享按鈕 ----------*/
document.querySelector("#shareBtnTrigger").addEventListener(
  "click",
  () => {
    document.querySelector("#shareBtn").classList.toggle("expand");
  },
  false
);
