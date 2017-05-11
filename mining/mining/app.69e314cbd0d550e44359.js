/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dev_keith/infographics/mining/mining/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(21)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js!./index.styl", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js!./index.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_styl__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_styl__);
// import Chart from 'chart.js'


class Mining {
  constructor () {
    this._setUpLineChart = this._setUpLineChart.bind(this)
    this._renderLine = this._renderLine.bind(this)
    this._renderLineChartMessage = this._renderLineChartMessage.bind(this)
    this._setUpTaiwanMiningSpots = this._setUpTaiwanMiningSpots.bind(this)
    this._renderSpots = this._renderSpots.bind(this)
    this._renderVehicle = this._renderVehicle.bind(this)
    this._renderSpotsMsg = this._renderSpotsMsg.bind(this)
  }
  _setUpLineChart () {
    return this._renderLine(0).then(() => {
      return this._renderLine(1).then(() => {
        return this._renderLineChartMessage()
      })
    })
  }
  _renderLine (index) {
    return new Promise((resolve) => {
      const _lineChart = document.querySelectorAll('.chart-import-vs-export > .chart > div')[index]
      _lineChart.setAttribute('class', 'active')
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }
  _renderLineChartMessage () {
    return new Promise((resolve) => {
      const _hole = document.querySelector('.chart-import-vs-export > .conclusion > .hole')
      _hole.setAttribute('class', `${_hole.getAttribute('class')} active`)
      const _boat = document.querySelector('.chart-import-vs-export > .conclusion > .boat > img')
      _boat.setAttribute('class', 'active')
      setTimeout(() => {
        const _point = document.querySelector('.chart-import-vs-export > .conclusion > .point > img')
        _point.setAttribute('class', 'active')
        resolve()
      }, 1500)
    })
  }
  _setUpTaiwanMiningSpots () {
    return this._renderSpots().then(() => {
      return this._renderVehicle().then(() => {
        return this._renderSpotsMsg()
      })
    })
  }
  _renderSpots () {
    return new Promise((resolve) => {
      const _miaoli = document.querySelector('.mining_spots > .taiwan_map > .miaoli')
      const _yilan = document.querySelector('.mining_spots > .taiwan_map > .yilan')
      const _taitung = document.querySelector('.mining_spots > .taiwan_map > .taitung')
      const _hualian = document.querySelector('.mining_spots > .taiwan_map > .hualian')
      _hualian.setAttribute('class', `${_hualian.getAttribute('class')} active`)  
      setTimeout(() => {
        _yilan.setAttribute('class', `${_yilan.getAttribute('class')} active`)  
        setTimeout(() => {
          _miaoli.setAttribute('class', `${_miaoli.getAttribute('class')} active`)
          setTimeout(() => {
            _taitung.setAttribute('class', `${_taitung.getAttribute('class')} active`)
            setTimeout(() => {
              _miaoli.querySelector('.token').setAttribute('class', `${_miaoli.querySelector('.token').getAttribute('class')} active`)
              _yilan.querySelector('.token').setAttribute('class', `${_yilan.querySelector('.token').getAttribute('class')} active`)
              _hualian.querySelector('.token').setAttribute('class', `${_hualian.querySelector('.token').getAttribute('class')} active`)
              _taitung.querySelector('.token').setAttribute('class', `${_miaoli.querySelector('.token').getAttribute('class')} active`)
              resolve()
            }, 500)
          }, 500)
        }, 500)      
      }, 500)
    })
  }
  _renderVehicle () {
    return new Promise(resolve => {
      const _excavator = document.querySelector('.mining_spots > .taiwan_map > .excavator')
      const _bigtruck = document.querySelector('.mining_spots > .taiwan_map > .bigtruck')
      _excavator.setAttribute('class', `${_excavator.getAttribute('class')} active`) 
      setTimeout(() => {
        _bigtruck.setAttribute('class', `${_bigtruck.getAttribute('class')} active`) 
        resolve() 
      }, 1000)
    })
  }
  _renderSpotsMsg () {
    return new Promise(resolve => {
      const _msgMiaoli = document.querySelector('.mining_spots > .taiwan_map > .msg-miaoli')
      const _msgYilan = document.querySelector('.mining_spots > .taiwan_map > .msg-yilan')
      const _msgHualian = document.querySelector('.mining_spots > .taiwan_map > .msg-hualian')
      const _msgTaitung = document.querySelector('.mining_spots > .taiwan_map > .msg-taitung')
      _msgMiaoli.setAttribute('class', `${_msgMiaoli.getAttribute('class')} active`)
      _msgYilan.setAttribute('class', `${_msgYilan.getAttribute('class')} active`)
      _msgHualian.setAttribute('class', `${_msgHualian.getAttribute('class')} active`)
      _msgTaitung.setAttribute('class', `${_msgTaitung.getAttribute('class')} active`)
    })
  }

  initialize () {
    this._setUpLineChart()
    this._setUpTaiwanMiningSpots()
    console.log('module Mining initialized...')
  }
}
window.addEventListener('load', () => {
  const mining = new Mining()
  mining.initialize()
})

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "html ::-webkit-scrollbar {\n  display: none;\n  width: 0px;\n}\nhtml ::-webkit-scrollbar-track-piece {\n  background-color: transparent;\n  -webkit-border-radius: 6px;\n}\nbody {\n  margin: 0;\n  font-size: 16px;\n  font-family: \"Noto Sans TC\", Microsoft JhengHei, sans-serif;\n  line-height: 1.6rem;\n}\nbody ::-webkit-scrollbar {\n  display: none;\n  width: 0px;\n}\nbody ::-webkit-scrollbar-track-piece {\n  background-color: transparent;\n  -webkit-border-radius: 6px;\n}\nbody div ::-webkit-scrollbar {\n  display: none;\n  width: 0px;\n}\nbody div ::-webkit-scrollbar-track-piece {\n  background-color: transparent;\n  -webkit-border-radius: 6px;\n}\n.chart-import-vs-export {\n  width: 600px;\n  margin: 0 auto;\n}\n.chart-import-vs-export > .chart {\n  background-image: url(" + __webpack_require__(16) + ");\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center 0;\n  width: 600px;\n  height: 439.99999999999994px;\n  position: relative;\n}\n.chart-import-vs-export > .chart > div {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 439.99999999999994px;\n  overflow: hidden;\n  background-repeat: no-repeat;\n  background-size: 600px;\n  background-position: 0 0;\n}\n.chart-import-vs-export > .chart > div.active {\n  width: 100%;\n  -webkit-animation: cover-out 0.35s linear;\n          animation: cover-out 0.35s linear;\n}\n.chart-import-vs-export > .conclusion {\n  width: 600px;\n  height: 219.99999999999997px;\n  position: relative;\n  top: -35px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: reverse;\n      -ms-flex-direction: row-reverse;\n          flex-direction: row-reverse;\n  overflow: hidden;\n}\n.chart-import-vs-export > .conclusion > .hole {\n  width: 219.99999999999997px;\n  height: 219.99999999999997px;\n  border-radius: 50%;\n  background-color: #271f19;\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: none;\n}\n.chart-import-vs-export > .conclusion > .hole.active {\n  display: block;\n  -webkit-animation: fade-out 0.15s linear;\n          animation: fade-out 0.15s linear;\n}\n.chart-import-vs-export > .conclusion > .boat,\n.chart-import-vs-export > .conclusion .point {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.chart-import-vs-export > .conclusion > .boat > img,\n.chart-import-vs-export > .conclusion .point > img {\n  width: 90%;\n  position: relative;\n}\n.chart-import-vs-export > .conclusion > .boat > img.active,\n.chart-import-vs-export > .conclusion .point > img.active {\n  display: block;\n}\n.chart-import-vs-export > .conclusion > .boat {\n  width: 360px;\n  height: 219.99999999999997px;\n  z-index: 1;\n}\n.chart-import-vs-export > .conclusion > .boat > img {\n  left: -300%;\n  transition: left 2s;\n}\n.chart-import-vs-export > .conclusion > .boat > img.active {\n  left: 0;\n}\n.chart-import-vs-export > .conclusion > .point {\n  width: 240px;\n  height: 219.99999999999997px;\n  overflow: hidden;\n  z-index: 0;\n}\n.chart-import-vs-export > .conclusion > .point > img {\n  right: -100%;\n  transition: right 1s;\n}\n.chart-import-vs-export > .conclusion > .point > img.active {\n  right: 0;\n}\n.mining_spots .taiwan_map {\n  background-image: url(" + __webpack_require__(14) + ");\n  background-position: center center;\n  background-size: contain;\n  background-repeat: no-repeat;\n  width: 247px;\n  height: 464px;\n  margin: 100px auto 0;\n  position: relative;\n}\n.mining_spots .taiwan_map > .miaoli,\n.mining_spots .taiwan_map .yilan,\n.mining_spots .taiwan_map .hualian,\n.mining_spots .taiwan_map .taitung {\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  background-position: center center;\n  background-size: contain;\n  background-repeat: no-repeat;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.mining_spots .taiwan_map > .miaoli > .token,\n.mining_spots .taiwan_map .yilan > .token,\n.mining_spots .taiwan_map .hualian > .token,\n.mining_spots .taiwan_map .taitung > .token {\n  width: 34px;\n  height: 34px;\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n}\n.mining_spots .taiwan_map > .miaoli > .token > i,\n.mining_spots .taiwan_map .yilan > .token > i,\n.mining_spots .taiwan_map .hualian > .token > i,\n.mining_spots .taiwan_map .taitung > .token > i {\n  background-position: center bottom;\n  background-size: contain;\n  background-repeat: no-repeat;\n  width: 100%;\n  height: 0;\n  transition: height 0.25s;\n  display: block;\n}\n.mining_spots .taiwan_map > .miaoli > .token.active > i,\n.mining_spots .taiwan_map .yilan > .token.active > i,\n.mining_spots .taiwan_map .hualian > .token.active > i,\n.mining_spots .taiwan_map .taitung > .token.active > i {\n  height: 53px;\n  -webkit-animation: jump-align-bottom 0.3s ease-out;\n          animation: jump-align-bottom 0.3s ease-out;\n}\n.mining_spots .taiwan_map > .miaoli.active,\n.mining_spots .taiwan_map .yilan.active,\n.mining_spots .taiwan_map .hualian.active,\n.mining_spots .taiwan_map .taitung.active {\n  opacity: 1;\n  -webkit-animation: fade-out 1s;\n          animation: fade-out 1s;\n}\n.mining_spots .taiwan_map > .miaoli {\n  background-image: url(" + __webpack_require__(11) + ");\n}\n.mining_spots .taiwan_map > .miaoli > .token {\n  top: 60px;\n  left: 90px;\n}\n.mining_spots .taiwan_map > .miaoli > .token > i {\n  background-image: url(" + __webpack_require__(9) + ");\n}\n.mining_spots .taiwan_map > .yilan {\n  background-image: url(" + __webpack_require__(15) + ");\n}\n.mining_spots .taiwan_map > .yilan > .token {\n  top: 50px;\n  right: 25px;\n}\n.mining_spots .taiwan_map > .yilan > .token > i {\n  background-image: url(" + __webpack_require__(8) + ");\n}\n.mining_spots .taiwan_map > .hualian {\n  background-image: url(" + __webpack_require__(6) + ");\n}\n.mining_spots .taiwan_map > .hualian > .token {\n  top: 165px;\n  right: 55px;\n}\n.mining_spots .taiwan_map > .hualian > .token > i {\n  background-image: url(" + __webpack_require__(7) + ");\n}\n.mining_spots .taiwan_map > .taitung {\n  background-image: url(" + __webpack_require__(13) + ");\n}\n.mining_spots .taiwan_map > .taitung > .token {\n  bottom: 120px;\n  right: 105px;\n}\n.mining_spots .taiwan_map > .taitung > .token > i {\n  background-image: url(" + __webpack_require__(10) + ");\n}\n.mining_spots .taiwan_map > .bigtruck,\n.mining_spots .taiwan_map .excavator {\n  background-position: center bottom;\n  background-size: contain;\n  background-repeat: no-repeat;\n  position: absolute;\n  opacity: 0;\n}\n.mining_spots .taiwan_map > .bigtruck.active,\n.mining_spots .taiwan_map .excavator.active {\n  -webkit-animation: vehicle-vibration 0.1s linear 25, fade-out 1s ease;\n          animation: vehicle-vibration 0.1s linear 25, fade-out 1s ease;\n  opacity: 1;\n}\n.mining_spots .taiwan_map > .bigtruck {\n  background-image: url(" + __webpack_require__(4) + ");\n  width: 85px;\n  height: calc(75px * 85 / 126);\n  left: -100px;\n  bottom: 215px;\n  transition: left 2.5s;\n}\n.mining_spots .taiwan_map > .bigtruck.active {\n  left: 35px;\n}\n.mining_spots .taiwan_map > .excavator {\n  background-image: url(" + __webpack_require__(5) + ");\n  width: 90px;\n  height: calc(82px * 90 / 128);\n  right: -100px;\n  bottom: 20px;\n  transition: right 2.5s;\n}\n.mining_spots .taiwan_map > .excavator.active {\n  right: 10px;\n}\n.mining_spots .taiwan_map > .msg-yilan,\n.mining_spots .taiwan_map .msg-miaoli,\n.mining_spots .taiwan_map .msg-hualian,\n.mining_spots .taiwan_map .msg-taitung {\n  background-position: center bottom;\n  background-size: contain;\n  background-repeat: no-repeat;\n  position: absolute;\n  opacity: 0;\n}\n.mining_spots .taiwan_map > .msg-yilan.active,\n.mining_spots .taiwan_map .msg-miaoli.active,\n.mining_spots .taiwan_map .msg-hualian.active,\n.mining_spots .taiwan_map .msg-taitung.active {\n  opacity: 1;\n  -webkit-animation: fade-out 1s ease;\n          animation: fade-out 1s ease;\n}\n.mining_spots .taiwan_map > .msg-miaoli {\n  background-image: url(" + __webpack_require__(19) + ");\n  width: 178px;\n  height: 209px;\n  left: -120px;\n  top: -40px;\n}\n.mining_spots .taiwan_map > .msg-yilan {\n  background-image: url(" + __webpack_require__(18) + ");\n  width: 198px;\n  height: 231px;\n  right: -198px;\n  top: -100px;\n}\n.mining_spots .taiwan_map > .msg-hualian {\n  background-image: url(" + __webpack_require__(17) + ");\n  width: 220px;\n  height: 256px;\n  right: -210px;\n  bottom: 60px;\n}\n.mining_spots .taiwan_map > .msg-taitung {\n  background-image: url(" + __webpack_require__(20) + ");\n  width: 178px;\n  height: 200px;\n  left: -100px;\n  bottom: -5px;\n}\n.tiny-royalty {\n  width: 600px;\n}\n.tiny-royalty > .imgwpr > .compare-demo .royalty .pile-paper-money {\n  width: 98px;\n  height: 29px;\n  background-position: center center;\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-image: url(" + __webpack_require__(12) + ");\n}\n@-webkit-keyframes cover-out {\n  0% {\n    width: 0;\n  }\n  100% {\n    width: 100%;\n  }\n}\n@keyframes cover-out {\n  0% {\n    width: 0;\n  }\n  100% {\n    width: 100%;\n  }\n}\n@-webkit-keyframes fade-out {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fade-out {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes large-out {\n  0% {\n    width: 0;\n  }\n  100% {\n    width: 100%;\n  }\n}\n@keyframes large-out {\n  0% {\n    width: 0;\n  }\n  100% {\n    width: 100%;\n  }\n}\n@-webkit-keyframes rotate {\n  0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n  }\n  100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n  }\n}\n@keyframes rotate {\n  0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n  }\n  100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n  }\n}\n@-webkit-keyframes jump-align-bottom {\n  0% {\n    margin-bottom: 0;\n  }\n  50% {\n    margin-bottom: 20px;\n  }\n  100% {\n    margin-bottom: 0;\n  }\n}\n@keyframes jump-align-bottom {\n  0% {\n    margin-bottom: 0;\n  }\n  50% {\n    margin-bottom: 20px;\n  }\n  100% {\n    margin-bottom: 0;\n  }\n}\n@-webkit-keyframes vehicle-vibration {\n  0% {\n    margin-bottom: 0;\n  }\n  50% {\n    margin-bottom: 3px;\n  }\n  100% {\n    margin-bottom: 0px;\n  }\n}\n@keyframes vehicle-vibration {\n  0% {\n    margin-bottom: 0;\n  }\n  50% {\n    margin-bottom: 3px;\n  }\n  100% {\n    margin-bottom: 0px;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "413787518607ae81e5ae5363993eb0a7.png";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1f740a30c28f0940609cb716bcc25aef.png";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ce2a771c5cc927b1a44f6fb786d07707.png";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c615923778b925915c88ac956c1d2089.png";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ce11d9b935e716b558a99cb8546a94b0.png";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a16c383261c71f8987a3c729f9581850.png";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b92adb9120e5d765920ec2d2cbc1efdb.png";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7654c476e172fd48504594f9308a6196.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8bef644ca913cee4f63f3b68260aac41.png";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fd4ade4cfa8850193320f15bbc8025fd.png";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cf7c36c5c341ec11b0bc2756062cc28b.png";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aff8f06b7715d1728979be7bc7e5790f.png";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a1ebd6ea82ef9d086c7d2ae4ef88cf7c.png";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d29beb9c62edda4d3ffa09f7d1081b4b.png";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0b5f6703eebe822da3ab55dbab8a7d80.png";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "dbe17a05934b00bbf289e0dc7d132a65.png";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f3ca9641a2c5d41e8126a0f0278dfa92.png";

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ })
/******/ ]);