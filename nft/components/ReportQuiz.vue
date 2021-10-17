<template>
  <div class="quiz">
    <div id="interact-5e746fc2bb7d7000148263d2" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          hid: 'quiz',
          innerHTML: `
            var app_5e746fc2bb7d7000148263d2;
            (function(d, t){
              var s = d.createElement(t),
              options = {
                "appId": "5e746fc2bb7d7000148263d2",
                "width": "800",
                "height": "800",
                "async": true,
                "host": "quiz.tryinteract.com",
                "auto_resize": true,
                "footer": "show",
              };
              s.src = 'https://i.tryinteract.com/embed/app.js';
              s.onload = s.onreadystatechange = function(){
                var rs = this.readyState;
                if(rs) if(rs != 'complete') if(rs != 'loaded') return;
                try{
                  app_5e746fc2bb7d7000148263d2 = new InteractApp();
                  app_5e746fc2bb7d7000148263d2.initialize(options);
                  app_5e746fc2bb7d7000148263d2.display();
                } catch(e){}
              };
              var scr = d.getElementsByTagName(t)[0],
              par = scr.parentNode;
              par.insertBefore(s, scr);
            })(document, 'script');
          `,
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        quiz: ['innerHTML'],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.quiz {
  width: 100%;
  margin: 0 auto;
  @include media-breakpoint-up(md) {
    width: 656px;
  }
}
</style>
