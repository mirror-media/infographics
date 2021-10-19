<template>
  <div id="quiz-start" class="quiz">
    <div id="interact-61696c472cc20c0018ae71a6"></div>
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
            var app_61696c472cc20c0018ae71a6;
            (function(d, t) {
              var s = d.createElement(t),
              options = {
                "appId": "61696c472cc20c0018ae71a6",
                "width": 800,
                "height": 800,
                "async": true,
                "host": "quiz.tryinteract.com",
                "auto_resize": true,
                "footer": "show",
              };
              s.src = 'https://i.tryinteract.com/embed/app.js';
              s.onload = s.onreadystatechange = function() {
                var rs = this.readyState;
                if(rs) if(rs != 'complete') if(rs != 'loaded') return;
                try {
                  app_61696c472cc20c0018ae71a6 = new InteractApp();
                  app_61696c472cc20c0018ae71a6.initialize(options);
                  app_61696c472cc20c0018ae71a6.display();
                } catch(e) {}
              };
              var scr = d.getElementsByTagName(t)[0],
              par = scr.parentNode;
              par.insertBefore(s, scr);
            })(document,'script');
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
  @include media-breakpoint-up(md) {
    width: 656px;
  }
}
</style>
