<template>
  <div class="game" id="game">
    <div id="interact-5e746fc2bb7d7000148263d2" />
  </div>
</template>

<script>
/* eslint-disable */
var app_5e746fc2bb7d7000148263d2;(function(d, t){var s=d.createElement(t),options={"appId":"5e746fc2bb7d7000148263d2","width":"800","height":"800","async":true,"host":"quiz.tryinteract.com","auto_resize":true,"footer":"show"};s.src='https://i.tryinteract.com/embed/app.js';s.onload=s.onreadystatechange=function(){var rs=this.readyState;if(rs)if(rs!='complete')if(rs!='loaded')return;try{app_5e746fc2bb7d7000148263d2=new InteractApp();app_5e746fc2bb7d7000148263d2.initialize(options);app_5e746fc2bb7d7000148263d2.display();}catch(e){}};var scr=d.getElementsByTagName(t)[0],par=scr.parentNode;par.insertBefore(s,scr);})(document,'script');
/* eslint-enable */
</script>

<style lang="scss">
@import '../util/breakpoint.scss';

.game {
  padding: 45px 10px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  @media (min-width: $breakpoint-md) {
    padding-top: 80px;
    padding-bottom: 100px;
  }
  @media (min-width: 788px) {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>