(function () {
  var scripts = document.getElementsByTagName( 'script' );
  var thisScriptTag = scripts[ scripts.length - 1 ];
  var attr;
  var param = new Array();
  for (var i = 0; i < thisScriptTag.attributes.length; i++) {
    attr = thisScriptTag.attributes[i];
    if (/^data-/.test(attr.nodeName)) {
      var tmp = attr.nodeName.replace(/^data-/, '');
      if (tmp.search('-') == -1) param[tmp] = attr.nodeValue;
      else
      {
        var tmp2 = tmp.split('-');
        if (!param[tmp2[0]]) param[tmp2[0]] = {};
        param[tmp2[0]][tmp2[1]] = attr.nodeValue;
      }
    }
  }
  
  var c = document.createElement('canvas');
  var w = window.innerWidth;
  var h = window.innerHeight;
  c.width = w;
  c.height = h;
  c.style.left = "0px";
  c.style.top = "0px";
  c.style.position = "fixed";
  c.style.zIndex = "1024";
  c.style.pointerEvents = "none";
  document.body.appendChild(c);
  var ctx = c.getContext("2d");
  var elems = {};
  var scatter = parseFloat(param.scatter);
  var initScatter = parseInt(param.initscatter);
  var elemSize = parseInt(param.elemsize);
  var countElems = parseInt(param.countelems);
  var fallingSpeed = parseInt(param.fallingspeed);
  var lifeSpan = parseFloat(param.lifespan);
  var initOpac = parseFloat(param.initopac);
  var elemStepTime = 50;
  var soh1 = false;
  var soh2 = false;
  var lastDist = 0;
  var shapeType = param.shapetype;
  var shapeNormal = param.shapenormal;
  var lastMoveT = 0;
  var charsOrder = param.charsorder;
  var colorsOrder = param.colorsorder;
  var lastCharKey = 'i1';
  var lastColorKey = 'i1';
  var rotation = parseInt(param.rotation);
  var startRotated = parseInt(param.startrotated);
  var colorType = param.colortype;
  var color = param.color;
  var sat = parseInt(param.sat);
  var light = parseInt(param.light);
  var rainbowVar = parseInt(param.rainbowvar);
  var glow = parseInt(param.glow);
  var glitter = parseInt(param.glitter);
  var preloadedImg = null;
  var screenOffset = 0;
  if (param.imageurl)
  {
    var image = new Image();
    image.onload = function() {
      preloadedImg = image;
    }
    image.src = param.imageurl;
  }
  var elementsObj = param.elementsobj;
  var multicolorObj = param.multicolorobj;
  
  //console.log(param);
  //console.log(elementsObj);
  //console.log(multicolorObj);
  
  
    function getXpos(ee)
    {
  
      return ee.clientX;
    }
  
    function getYpos(ee)
    {
      //return ee.screenY-screenOffset;
      return ee.clientY;
    }
  
    function rnd_snd()
    {
      return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
    }
    function rnd(mean, stdev)
    {
      return Math.round(rnd_snd()*stdev+mean);
    }
  
    window.addEventListener('resize',function(e) {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w;
      c.height = h;
    }, false);
  
    document.body.addEventListener('mousemove',function(e) {
      //console.log(e);
      var x = getXpos(e);
      var y = getYpos(e);
  
      var moveX = e.movementX || e.webkitMovementX || e.mozMovementX || 0;
      var moveY = e.movementY || e.webkitMovementY || e.mozMovementY || 0;
      if (moveX==0 && moveY==0) return false;
      var dist = Math.sqrt(moveX*moveX+moveY*moveY);
      dist = dist+lastDist;
      //console.log(x);
      //console.log(y);
      var t = Date.now();
  
      if (screenOffset == 0)
      {
        var tmpOff = Math.abs(e.screenY-e.clientY);
        if (soh1 == tmpOff && soh2 == tmpOff) screenOffset = tmpOff;
        else if (soh1) soh2 = tmpOff;
        else soh1 = tmpOff;
        //console.log('sof',screenOffset);
        //console.log(e);
      }
      var iters = Math.floor(dist/(100/countElems));
      var i = 0
      //console.log(e);
      //console.log('dist, iters',dist, iters,moveY);
      while (dist >= (100/countElems))
      {
        var outKey = 'i1';
        if (shapeType == 'custom')
        {
          if (charsOrder == 1)
          {
            var tmp = lastCharKey.substr(1);
            if (tmp < Object.keys(elementsObj).length) tmp++;
            else tmp = 1;
            outKey = 'i'+tmp;
            lastCharKey = outKey;
          }
          else
          {
            var count = 0;
            for (var prop in elementsObj)
              if (Math.random() < 1/++count)
                 outKey = prop;
          }
        }
  
  
        if (startRotated) var rot = Math.floor(Math.random()*360);
        else var rot = 0;
  
        if (i>0) xStart = x - moveX * i/iters;
        else xStart = x;
        if (initScatter > 0) var xout = rnd(xStart,initScatter/2);
        else xout = xStart;
        if (i>0 && t-lastMoveT < 200) var fallingMod = (i/iters) * fallingSpeed * ((t-lastMoveT)/elemStepTime);
        else var fallingMod = 0;
        if (i>0) yStart = y - moveY * i/iters + fallingMod;
        else yStart = y;
        if (initScatter > 0) var yout = rnd(yStart,initScatter/2);
        else yout = yStart;
        //console.log(yout);
        var colorKey = 'i1';
        if (colorType == 'rainbow') var tmpColor = Math.floor(Math.random()*360);
        else if (colorType == 'multi')
        {
          if (colorsOrder)
          {
            var tmp = lastColorKey.substr(1);
            if (tmp < Object.keys(multicolorObj).length) tmp++;
            else tmp = 1;
            colorKey = 'i'+tmp;
            lastColorKey = colorKey;
          }
          else
          {
            var count = 0;
            for (var prop in multicolorObj)
              if (Math.random() < 1/++count)
                 colorKey = prop;
          }
        }
        elems['i'+t+'d'+i] = {opac:100,x:xout,y:yout,t:t,rotation:rot,side:0,side2:0,elemkey:outKey,colorkey:colorKey,color:tmpColor,rainbow:0};
        dist = dist - (100/countElems);
        i++;
      }
      lastDist = dist;
      lastMoveT = t;
    }, false);
  
    var t = setInterval(function(){
    //	console.time('someFunction');
      ctx.clearRect(0, 0, w, h);
      //var testy = 0;
      //var testy2 = 1;
      for (key in elems)
      {
        var el = elems[key];
  
        var t = Date.now()
        var mult = (t-el.t)/elemStepTime;
        //testy2 = testy2*mult;
  
        //console.log(initOpac);
        var opac = el.opac-(5/lifeSpan)*mult;
        if (opac > 0)
        {
          //console.log(el);
          el.t = t;
          el.opac = opac;
          el.y = el.y+fallingSpeed*mult;
          if (scatter)
          {
  
            var tmpSize = Math.floor(Math.random()*(scatter*10+1))*2*mult;
            el.side = el.side+tmpSize-scatter*mult*10;
            el.x = el.x+el.side/10;
  
            //testy = testy+tmpSize-scatter;
  
            var tmpSize2 = Math.floor(Math.random()*(scatter*10+1))*2*mult;
            el.side2 = el.side2+tmpSize2-scatter*mult*10;
            el.y = el.y+el.side2/10;
            //console.log(tmpSize,el.side,el.x);
          }
  
          //console.log(el.colorkey, multicolorObj[el.colorkey]);
          //console.log(multicolorObj[el.colorkey].color.replace('rgb', 'rgba').replace(')', ','+((el.opac/100)*initOpac)+')'))
          if (colorType == 'single') ctx.fillStyle = color.replace('rgb', 'rgba').replace(')', ','+((el.opac/100)*initOpac)+')');
          else if (colorType == 'multi') ctx.fillStyle = multicolorObj[el.colorkey].replace('rgb', 'rgba').replace(')', ','+((el.opac/100)*initOpac)+')');
          else if (colorType == 'rainbow')
          {
            if (rainbowVar == 0) ctx.fillStyle = 'hsla('+el.color+','+sat+'%,'+light+'%,'+((el.opac/100)*initOpac)+')';
            else if (rainbowVar < 5)
            {
              var colorChange = Math.floor(Math.random()*rainbowVar*rainbowVar*2);
              el.rainbow = el.rainbow+(colorChange-(rainbowVar*rainbowVar))*mult;
              var colorOut = el.color+el.rainbow;
              if (colorOut >= 360) colorOut = colorOut-360;
              else if (colorOut < 0) colorOut = colorOut+360;
              //console.log(colorOut,el.color,el.rainbow,colorChange);
              ctx.fillStyle = 'hsla('+colorOut+','+sat+'%,'+light+'%,'+((el.opac/100)*initOpac)+')';
              //console.log(ctx.fillStyle);
            }
            else if (rainbowVar == 5)
            {
              var hue = Math.floor(Math.random()*360);
              ctx.fillStyle = 'hsla('+hue+','+sat+'%,'+light+'%,'+((el.opac/100)*initOpac)+')';
            }
          }
          //ctx.fillStyle = 'rgba(255,0,0,'+((el.opac/100)*initOpac)+')';
          //console.log(elemSize,shapeType,shapeNormal);
  
  
          if (glow > 0)
          {
            //context.shadowColor = '#999';
            if (colorType == 'single') ctx.shadowColor = color.replace('rgb', 'rgba').replace(')', ','+((el.opac/100)*(glow/50))+')');
            else if (colorType == 'multi') ctx.shadowColor = multicolorObj[el.colorkey].replace('rgb', 'rgba').replace(')', ','+((el.opac/100)*(glow/50))+')');
            else if (colorType == 'rainbow')
            {
              if (rainbowVar == 0) ctx.shadowColor = 'hsla('+el.color+','+sat+'%,'+light+'%,'+((el.opac/100)*(glow/50))+')';
              else if (rainbowVar < 5) ctx.shadowColor = 'hsla('+colorOut+','+sat+'%,'+light+'%,'+((el.opac/100)*(glow/50))+')';
              else if (rainbowVar == 5) ctx.shadowColor = 'hsla('+hue+','+sat+'%,'+light+'%,'+((el.opac/100)*(glow/50))+')';
  
            }
  
            ctx.shadowBlur = elemSize/2;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          }
  
  
          if (elemSize <= 2)
          {
            ctx.beginPath();
            ctx.rect(el.x-(elemSize/2), el.y-(elemSize/2), elemSize, elemSize);
            ctx.fill();
          }
          else
          {
            if (rotation != 0 || startRotated)
            {
              ctx.save();
              el.rotation = el.rotation+rotation;
              ctx.translate(el.x, el.y);
              ctx.rotate((Math.PI / 180) * el.rotation);
              ctx.translate(-el.x, -el.y);
            }
            if (shapeType == 'normal')
            {
              if (shapeNormal == 'circle')
              {
                ctx.beginPath();
                ctx.arc(el.x, el.y, elemSize, 0, 2 * Math.PI, false);
                ctx.fill();
              }
              else if (shapeNormal == 'star1')
              {
                ctx.beginPath();
                ctx.moveTo(el.x,el.y-elemSize/2);
                ctx.quadraticCurveTo(el.x,el.y,el.x+elemSize/2,el.y);
                ctx.quadraticCurveTo(el.x,el.y,el.x,el.y+elemSize/2);
                ctx.quadraticCurveTo(el.x,el.y,el.x-elemSize/2,el.y);
                ctx.quadraticCurveTo(el.x,el.y,el.x,el.y-elemSize/2);
                ctx.fill();
              }
              else if (shapeNormal == 'star2')
              {
                ctx.beginPath();
                ctx.moveTo(el.x,el.y-elemSize/2);
                ctx.quadraticCurveTo(el.x+elemSize/8,el.y-elemSize/8,el.x+elemSize/2,el.y);
                ctx.quadraticCurveTo(el.x+elemSize/8,el.y+elemSize/8,el.x,el.y+elemSize/2);
                ctx.quadraticCurveTo(el.x-elemSize/8,el.y+elemSize/8,el.x-elemSize/2,el.y);
                ctx.quadraticCurveTo(el.x-elemSize/8,el.y-elemSize/8,el.x,el.y-elemSize/2);
                ctx.fill();
              }
              else if (shapeNormal == 'drop')
              {
                var c = 0.551915024494*elemSize/2;
                ctx.beginPath();
                ctx.moveTo(el.x,el.y-elemSize);
                ctx.bezierCurveTo(el.x,el.y-elemSize+c/2,el.x+elemSize/2,el.y-c,el.x+elemSize/2,el.y);
                ctx.bezierCurveTo(el.x+elemSize/2,el.y+c,el.x+c,el.y+elemSize/2,el.x,el.y+elemSize/2);
                ctx.bezierCurveTo(el.x-c,el.y+elemSize/2,el.x-elemSize/2,el.y+c,el.x-elemSize/2,el.y);
                ctx.bezierCurveTo(el.x-elemSize/2,el.y-c,el.x,el.y-elemSize+c/2,el.x,el.y-elemSize);
                ctx.fill();
  
              }
            }
            else if (shapeType == 'custom')
            {
              ctx.font = elemSize+'px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(elementsObj[el.elemkey], el.x, el.y+elemSize/2);
            }
            else if (shapeType == 'image')
            {
              if (preloadedImg) ctx.drawImage(preloadedImg,0,0,preloadedImg.width,preloadedImg.height,el.x,el.y,elemSize*2,preloadedImg.height*(elemSize*2/preloadedImg.width));
            }
  
            if (rotation != 0 || startRotated)
            {
              ctx.restore();
            }
          }
  
          if (glitter && Math.floor(Math.random()*1000) < glitter*10*(el.opac/100))
          {
            var xpos = Math.floor(Math.random()*(elemSize+1))-elemSize/2;
            var ypos = Math.floor(Math.random()*(elemSize+1))-elemSize/2;
            ctx.fillStyle = 'white';
            var r = 10;
            var p = 4+Math.floor(Math.random()*5);
            var m = 0.05;
            ctx.save();
            ctx.beginPath();
            ctx.translate(el.x+xpos, el.y+ypos);
            ctx.moveTo(0,0-r);
            for (var i = 0; i < p; i++)
            {
              ctx.rotate(Math.PI / p);
              ctx.lineTo(0, 0 - (r*m));
              ctx.rotate(Math.PI / p);
              ctx.lineTo(0, 0 - r);
            }
            ctx.fill();
            ctx.restore();
          }
  
          elems[key] = el;
  
        }
        else delete elems[key];
  
  
      }
      //console.log(testy, testy2);
    //	console.timeEnd('someFunction');
    }, elemStepTime);
  
  
  
  })();
  