/* ---------- plugins ----------*/
import superagent from "superagent";
import _ from "lodash";
import Swiper from "../plugins/swiper.js";
import imagesLoaded from 'imagesloaded';

/* ---------- import data ----------*/
import {
  initQuiz,
  quizAction,
  quizCount,
  showResult,
  resetQuiz
} from "./quiz.js";

import {
  appendListing,
  setMatchTableTitle,
  setMatchTableContent,
  setScheduleTable,
  tabControl
} from "./news.js";

// var blackboard;
// console.log(imagesLoaded);

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
        showResult(quizSwiper, blackboard,imagesLoaded);

        // imagesLoaded( '#result-slide', function() {
        //   console.log('image loaded');
        //   quizSwiper.updateAutoHeight();
        // });

      });

      //顯示測試用的計分黑板
      // showScore(blackboard);

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

      // 測試用，跳到結果頁
      // quizSwiper.slideTo(8,0);
    })
    .catch(function(err) {
      console.log(err);
    });
}

/* -------------------- 新聞頁 -------------------- */
if (document.querySelector(".newswpr") != null) {

  /* ---------- 新聞頁 ---------- */
  const Listing = 'https://api.mirrormedia.mg/listing?where={%22sections%22:{%22$in%22:[%2257e1e0e5ee85930e00cad4e9%22]}}&embedded={%22heroVideo.coverPhoto%22:1}&max_results=6&page=1&sort=-publishedDate'

  superagent.get(Listing)
    .then(function (res) {
      appendListing(JSON.parse(res.text));

      //測試用，模擬廣告
      let listingEntry = document.querySelectorAll('.listing--entry');
      listingEntry[2].classList.add('adv');

    })
    .catch(function (err) {
      console.log(err);
    });


    /* ---------- 戰績與賽程表 ---------- */
    // 隊伍資料
    const Team = superagent.get("./data/team.json");

    // 戰績表
    const Matches = superagent.get('https://sheets.googleapis.com/v4/spreadsheets/1SWKXLdl3Cbw4ED-DeAAUyhkMj46Hkk3Bfigx0_6zU8E/values/戰績表!A1:I33?key=AIzaSyAyxPNqEwIWW-tXjhxmEjGy3d_T3P_TIBA');

    //賽程表
    //values:batchGet?ranges=Sheet1!B:B&ranges=Sheet1!D:D
    const Schedule = superagent.get('https://sheets.googleapis.com/v4/spreadsheets/1WkUY_MWnEGKCfMwyS-bIaJT9Pdrw3Qux0uQkzv7uIy8/values/賽程!A1:F200?key=AIzaSyAyxPNqEwIWW-tXjhxmEjGy3d_T3P_TIBA');   

    const TabSetting = superagent.get('https://sheets.googleapis.com/v4/spreadsheets/1WkUY_MWnEGKCfMwyS-bIaJT9Pdrw3Qux0uQkzv7uIy8/values/tab-setting!B3?key=AIzaSyAyxPNqEwIWW-tXjhxmEjGy3d_T3P_TIBA');  

    Promise.all([Team,Matches,Schedule,TabSetting])
      .then(function(res){
        /* 
        res[0] 隊伍資料
        res[1] 戰績表
        res[2] 賽程表
        */
        const teamData = JSON.parse(res[0].text);
        const matchesData = JSON.parse(res[1].text);
        const scheduleData = JSON.parse(res[2].text);
        const tabSettingData = JSON.parse(res[3].text);

        // 建立戰績表
        setMatchTableContent(matchesData.values,teamData);

        // 建立賽程表 (小組賽)
        setScheduleTable(scheduleData.values,teamData,document.getElementById('schedule32Table'),document.getElementById('schedule16Table'));

        // console.log(tabSettingData);

        // tab 操作
        tabControl(document.getElementById('scheduleTable'),'.schedule-select','.schedule-table');
        // tabControl(document.getElementById('schedule32Table'));

      })
      .catch(function(err) {
        console.log(err);
      });



  //取得戰績表 (Matches)
  // GET https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId/values/Sheet1!A1:D5 + (API key)
  // const Matches = 'https://sheets.googleapis.com/v4/spreadsheets/1SWKXLdl3Cbw4ED-DeAAUyhkMj46Hkk3Bfigx0_6zU8E/values/戰績表!A1:K33?key=AIzaSyAyxPNqEwIWW-tXjhxmEjGy3d_T3P_TIBA';

  // superagent.get(Matches)
  //   .then(function (res) {

  //     const sheets = JSON.parse(res.text);

  //     setMatchTableTitle(sheets.values[0]);
  //     setMatchTableContent(sheets.values,blackboard);

  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });


  //取的賽程  
  // const Schedule = 'https://sheets.googleapis.com/v4/spreadsheets/1WkUY_MWnEGKCfMwyS-bIaJT9Pdrw3Qux0uQkzv7uIy8/values/小組賽!A1:G3?key=AIzaSyAyxPNqEwIWW-tXjhxmEjGy3d_T3P_TIBA';

  // superagent.get(Schedule)
  //   .then(function (res) {
  //     console.log(JSON.parse(res.text));
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });  
  
}

/* ---------- 分享按鈕 ----------*/
document.querySelector("#shareBtnTrigger").addEventListener(
  "click",
  () => {
    document.querySelector("#shareBtn").classList.toggle("expand");
  },
  false
);
