<template>
  <section class="ending-article">
    <p>2019 年，恐怕是香港開埠以來最分裂的時候，卻也是港人史上最團結的時候。</p>
    <p>反《逃犯條例》修訂一發不可收拾，數百場抗爭行動改變了香港的命運，活著的人從此也換了命。港人上回成功的和平抗爭已是 2003 年的事了；彼時 50 萬港人上街，反對基本法 23 條立法，該法主張禁止任何「叛國、分裂國家、煽動叛亂、顛覆中央人民政府及竊取國家機密」的行為，最後在強烈民意反彈下，終止立法。以往港人注重安定繁榮，即使在 2014 年雨傘運動時已有勇武派人士、2016 年旺角魚蛋革命被香港法院定性為暴動，以中產為主的社會仍堅持和理非（和平、理性、非暴力）的示威手段，相對之下，勇武派行動模式較為激進、主張武力抗爭，常被認為充滿爭議，常在和平遊行中遭到示威者切割。</p>
    <p>但 2019 年下半年起，隨著港府的無法回應民情，前線勇武派被捕，和平示威者前仆後繼上前線「補位」，主流社會對抗爭激進化的理解與接受度提高，在多場抗爭中都出現「此後不分和與勇」的號召；這不單單是口號，而更像行動指導原則，從物資到精神層面，許多和理非示威者開始以不同行動支持勇武派。</p>
    <p>時序從夏天走入秋冬，2019 年底，鏡週刊訪談 9 組香港人，他們談這半年以來行走過的路，每組人的背後都是相似的故事。他們之中，有被父母趕出家庭的抗爭者，也有照顧超過 200 名抗爭者、但其實從未生養孩子的「母親」；有散盡零用錢並因抗爭而負債、全身僅剩 8.3 元港幣的少年，也有辭掉工作捐出存款給抗爭者的中產階級；有吸入過量催淚煙而導致經血發黑的勇武派，也有一邊抗爭、一邊盤算如何離開香港的抗爭者；有自陳曾是「少年港豬」、不關心政治、如今卻在前線出征的勇武派，也有自認「中年港豬」、事業有成卻懺悔對香港從來沒有付出的商人；有調解衝突時遭人咬掉耳朵的男人趙家賢，也有被捕後遭性暴力對待的女孩吳傲雪。</p>
    <p>他們拍照必須蒙面再變裝，大多僅以背影示人。除了身為記錄者的學者和原本就是公眾人物的議員，其他都是籍籍無名的人，是大時代裡沒有臉孔的人，也是在遍地磚瓦裡磕破了頭仍試著挺起腰桿的人。這是 2019 年的香港：平凡的人做了各種的選擇，他們在此相遇相容，涓流雖寡，終為江河。</p>
  </section>
</template>

<script>
export default {
  name: 'EndingArticle',
  mounted () {
    this.$root.wEl.addEventListener('scroll', this.sendGa)
  },
  methods: {
    sendGa () {
      const { top } = this.$el.getBoundingClientRect()
      if (top < 0) {
        const size = this.$root.isDesktopMediumW ? 'desk-md' : (this.$root.isDesktopSmallW ? 'desk-sm' : 'mob')
        this.$root.sendGa('scroll', 'projects', `scroll to ending article - ${size}`, this.$root.profiles.length + 1)
        this.$root.wEl.removeEventListener('scroll', this.sendGa)
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.ending-article
  margin-top 40vh
  padding-left 30px
  padding-right 30px
  line-height 1.88
  font-size 1.6rem
  max-width 600px
  margin-right auto
  margin-left auto
  @media (min-width 660px)
    padding-left 0
    padding-right 0
  @media (min-width $bp-desktop-small)
    margin-top 280px
  & p
    margin-bottom 20px
    &:last-of-type
      margin-bottom 0
</style>
