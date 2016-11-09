const scenes = [
  {
    'pinElem' : 'cool-knowledge-1',
    'trigger' : 'pin-trig1',
    'tween' : {
      'turnOn' : false,
      'fromTo' : [{}, {}],
      'fromToObj' : '',
    },
  },
  {
    'pinElem' : 'cool-knowledge-2',
    'trigger' : 'pin-trig2',
    'tween' : {
      'fromTo' : [{}, {}],
    },
  },
  {
      'pinElem' : 'cool-knowledge-3',
      'trigger' : 'pin-trig3',
      'tween' : {
        'turnOn' : true,
        'fromTo' : [{
          // width: '50%',
          // height: '200%',

        }, {
          // width: '100%',
          // height: '80%',
          // scale: 0.6,
          width: '140%'
        }],
        'fromToObj' : '#pin-trig3 div.div-pic img',
        'duration' : '250',
      },
  },
  {
      'pinElem' : 'cool-knowledge-4',
      'trigger' : 'pin-trig4',
      'tween' : {
        'fromTo' : [{}, {}],
      },
  },
  {
      'pinElem' : 'cool-knowledge-5',
      'trigger' : 'pin-trig5',
      'tween' : {
        'fromTo' : [{}, {}],
      },
  },
  {
      'pinElem' : 'cool-knowledge-6',
      'trigger' : 'pin-trig6',
      'tween' : {
        'turnOn' : true,
        'fromTo' : [{}, {}],
        'fromToObj' : '#pin-trig6 div.div-pic img',
        'duration' : '250',
      },
  },
  {
      'pinElem' : 'cool-knowledge-7',
      'trigger' : 'pin-trig7',
      'tween' : {
        'turnOn' : true,
        'fromTo' : [{}, {}],
        'fromToObj' : '#pin-trig7 div.div-pic img',
        'duration' : '250',
      },
  },
  {
      'pinElem' : 'cool-knowledge-8',
      'trigger' : 'pin-trig8',
      'tween' : {
        'fromTo' : [{}, {}],
      },
  },
  {
      'pinElem' : 'cool-knowledge-9',
      'trigger' : 'pin-trig9',
      'tween' : {
        'turnOn' : true,
        'fromTo' : [{}, {}],
        'fromToObj' : '#pin-trig9 div.div-pic img',
        'duration' : '250',
      },
  },
  {
      'pinElem' : 'cool-knowledge-10',
      'trigger' : 'pin-trig10',
      'tween' : {
        'fromTo' : [{}, {}],
      },
  },
];
export default scenes;
