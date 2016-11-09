import scenes from '../constants/scenes.js';
import 'animation.gsap';
import 'debug.addIndicators';
import * as ScrollMagic from 'scrollmagic';
import { TimelineMax } from 'gsap';
const flightpath = {
  go : {
			curviness: 1.25,
			autoRotate: true,
			values: [
					{x: 0,	y: 0},
          {x: 200,	y: 20},
					{x: 400,	y: 10},
				]
	},
  back : {
    curviness: 1.25,
    autoRotate: false,
    values: [
      {x: 0,	y: 0},
      {x: -200,	y: 10},
      {x: -400,	y: 20},
    ]
  },
  go2 : {
			curviness: 1.25,
			autoRotate: true,
			values: [
					{x: 0,	y: 10},
				]
	},
  stepupdown : {
    curviness: 0,
    autoRotate: false,
    values: [
      {x: -10,	y: -30},
      {x: -10,	y: 30},
      {x: -20,	y: -20},
      {x: -20,	y: 55},
      {x: -20,	y: 5},
      {x: -20,	y: 55},
      ]
  },
};


class CKscene{
  constructor(controller){
    this.controller = controller;
  }
  init(){
    for (let i = 1; i < scenes.length; i++) {
        $("#" + scenes[i]['trigger'] + ' div').hide();

        let s = (new TimelineMax).fromTo("#" + scenes[i - 1]['trigger'] + ' div', 2, {
            opacity: 1,
        }, {
            opacity: 0,
            ease: Sine.easeOut
        }, 0).fromTo("#" + scenes[i]['trigger'] + ' div', 2, {
            opacity: 0,
        }, {
            opacity: 1,
            ease: Sine.easeIn
        });

        new ScrollMagic.Scene({
            triggerElement: "#" + scenes[i]['trigger'],
            duration: "150",
            triggerHook: "onLeave"
        }).setPin("#" + scenes[i]['trigger'])
        .setTween(s)
        // .addIndicators()
        .on('start', function(){
          $("#" + scenes[i]['trigger'] + ' div').css('opacity','0').show();
          if(i !== scenes.length - 1) $("#" + scenes[i]['trigger'] + ' div[id^="2016uselection_trivia-"]').addClass('stay-fixed');
        })
        .addTo(this.controller);


    }
    for (let i = 0; i < scenes.length; i++){
      if(scenes[i]['tween']['turnOn']){
        // let s = (new TimelineMax)
        //           .fromTo(scenes[i]['tween']['fromToObj'], 1, scenes[i]['tween']['fromTo'][0], scenes[i]['tween']['fromTo'][1])
        //           .to(scenes[i]['tween']['fromToObj'], 1, {css: scenes[i]['tween']['fromTo'][0]});
        new ScrollMagic.Scene({
            triggerElement: "#" + scenes[i]['trigger'],
            duration: scenes[i]['tween']['duration'],
            triggerHook: "onLeave",
            offset: 200,
        })
        // .setPin("#" + scenes[i]['trigger'])
        // .setTween(s)
        // .addIndicators()
        .on('start', function(){
          if(scenes[i]['tween']['turnOn']){
            let tl = new TimelineMax();
            switch(scenes[i]['pinElem']){
              case 'cool-knowledge-3':
              case 'cool-knowledge-9':
                tl.to(scenes[i]['tween']['fromToObj'], 0.2, {scaleX: 1, scaleY: 0.4, repeatDelay:0, repeat:1, yoyo:true});
                tl.to(scenes[i]['tween']['fromToObj'], 0.2, {scaleX: 1, scaleY: 0.6, repeatDelay:0, repeat:1, yoyo:true});
                tl.to(scenes[i]['tween']['fromToObj'], 0.25, {scaleX: 1, scaleY: 0.9, repeatDelay:0, repeat:1, yoyo:true});
                break;
              case 'cool-knowledge-6':
                tl.to($(scenes[i]['tween']['fromToObj']), 0.5, {css:{bezier:flightpath.go}, ease:Power1.easeInOut});
                tl.to($(scenes[i]['tween']['fromToObj']), 1, {css:{bezier:flightpath.back}, ease:Power1.easeInOut});
                tl.to($(scenes[i]['tween']['fromToObj']), 2, {css:{bezier:flightpath.go2}, ease:Power1.easeInOut});
                break;
              case 'cool-knowledge-7':
                tl.to($(scenes[i]['tween']['fromToObj']), 1.5, {css:{bezier:flightpath.stepupdown}, ease:Power1.easeInOut});
                break;
            }
            tl.play();
          }

        })
        .addTo(this.controller);

      }
    }
  }
}
export default CKscene;
