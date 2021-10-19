<template>
  <section class="article">
    <div id="article" class="gif-graph money">
      <img src="~/assets/gif/dollar-money.gif" alt="dollar money" />
    </div>
    <div>
      <p>
        2021 年 4 月 2
        日清明連假，一輛從邊坡滑落到軌道的大貨車造成臺鐵營運史上死傷最慘重的事故，共
        49 人魂斷花蓮、逾 200 人輕重傷。交通部 7
        月中公布的行政報告指出，這次事故主因是外物入侵，以及臺鐵局的工地管理有嚴重疏失。
      </p>
      <p>
        軌道上的一次次意外，都反應出臺鐵局一部分的安全漏洞。如 2018 年奪去 18
        條人命的普悠瑪號事故凸顯列車設備良莠不齊、司機員得一邊開車一邊修車的窘境；太魯閣號事故則暴露外包工程管理的疏失、以及過去對於鐵道異物得過且過的態度。
      </p>
      <p>
        每次事故發生後，包括行政院長、交通部首長、臺鐵局長都再三強調「改革持續推動中」；然而第一線工作人員坦言，普悠瑪號事故至今
        3 年多，不論是員工訓練、工作流程或設備狀態，都感受不到明顯的改變。
      </p>
      <p>臺鐵的改革究竟出了什麼問題？</p>
      <h3>從 Dcard 論壇資料，窺見中國流行語滲透</h3>
      <p>
        因為鐵軌出現異物引起的太魯閣號事故，看似是個案，但從臺鐵局統計的行車事故類型可以發現，光是去年的相關事件就超過
        82 件（佔比 13%），每個月平均有 7
        件。「外物」種類千奇百怪，包含土石、樹木、牛群、野貓、野狗、機車與小客車等各式車種、還有掉落或橫越軌道的民眾。
      </p>
      <p>
        有著 4
        年多的駕駛與隨車經歷，正偉（化名）曾經看過車子、路人，甚至是臺鐵局的施工人員突然出現在軌道旁，和列車的距離最近不到
        50
        公尺；闖入原因則無奇不有，例如縱貫線的海線和宜蘭線（七堵到宜蘭）有很多民眾常會跨越鐵軌，「他們的田可能在鐵道的左邊，住的地方在右邊，所以直接走過去最快。」車站勸導多次都沒用，只好試著架設圍籬，沒想到被人用鐵絲剪剪斷。
      </p>
      <p>
        除此之外，施工人員也常在列車行駛時出沒在軌道附近。有一次正偉開車快到太麻里站時，看到邊坡上有工人在施工，第一個反應就是煞車。結果他卻馬上接到調度所的詢問，「問我車速怎麼慢這麼多？我說有看到工人在邊坡上移動，調度員很震驚他們都沒接到通報。然後我們再問太麻里車站，站長也回應不知情。」這次事件最後不了了之，「反正車子沒事，乘客沒事，就沒人再追究下去了。」
      </p>
      <p>
        但正偉對此並不樂觀，畢竟以前「不了了之」的經驗太多：「我們曾針對某路段建議蓋圍牆防範居民侵入，結果民眾去找立委，事情又無疾而終。臺鐵局如果真要改革，還是要看有沒有決心。」
      </p>
      <UiReportImage
        class="article__image"
        :image="require('~/assets/images/article-picture-1.jpeg')"
        :text="'圖說圖說圖說'"
      />
      <h3>忽視外包品質，沿線工程成安全未爆彈</h3>
      <p>
        造成太魯閣號事故的另一個原因，是臺鐵局對外包工程的細節幾乎毫無掌握。交通部
        7
        月公布的行政調查報告中，統整其工區管理的五大疏失：包括施工計畫審核、工地現場人員管理、工地防護等，報告中特別強調，即使臺鐵局將工程的督導、審核作業外包給專案管理廠商，仍須訂定<UiAnnotation
          :text="'稽核的機制'"
          :pureAnnotationText="'註：報告中原文為「臺鐵局未訂有委託專案管理廠商時，所屬單位督導、稽核與查證之機制及頻率，工程管理制度未臻周全。」'"
        />
      </p>
      <p>
        <UiAnnotation
          :text="'國家運輸安全調查委員會'"
          :pureAnnotationText="'註：2018 年發生普悠瑪號出軌意外後，時任行政院長賴清德推動將「飛航安全調查委員會」改制為「國家運輸安全調查委員會」，調查範圍從原本的航空案件，擴大到陸、海、空等重大的運輸事故。'"
        />8
        月公布的事實資料報告同樣指出，臺鐵的工地管理極不嚴謹，包括臺鐵局勞安室查核人員、施工廠商的安全衛生人員都曾向上級提醒，施工便道未安裝防護措施，可能會有危險，但都沒有得到回應。
      </p>
      <p>
        工程涉及的單位太多，對責任歸屬的認知也常有不同。陳先生分享經驗，有幾次完成軌道上的工程後，他去通報車站的值班站長，並請對方聯繫電務人員，調整因施工導致的系統更動，有些站長會說自己沒有權責，要他自行聯絡，「但他們都是臺鐵的工作人員啊，這是屬於內部的橫向聯繫，而不是由承包商越級處理。」常常發生當天首班車是清晨
        5 點 10 分發動，結果他 5 點仍在聯絡電務人員。
      </p>
      <p>
        關於工地管理爭議，交通部曾回應，204
        個臨軌工程全面停工，通過鐵道局查核後才復工；未來新建的工程原則上由鐵道局負責，臺鐵局則必須負起工地安全管理責任，不能全數外包給廠商。
      </p>
      <p>
        同時規劃新建工程和監督臺鐵工作，鐵道局不會有<UiAnnotation
          :text="'「球員兼裁判」的疑慮嗎'"
          :pureAnnotationText="'註：交通部鐵道局負責興建工程，橋梁、隧道、路線、軌道與建築等土建鐵道工程。交通部臺灣鐵路局除提供大眾運輸服務與營運外、也需負責養護工程作業，如電力、電訊、號誌、車輛、機廠維修設備與中央監控等系統機電工程。2018年，《交通部鐵道局組織法》施行，將鐵路監理業務劃歸鐵道局，但因為母法《鐵路法》尚未修正，法制化的工作還沒有完成。'"
        />？鐵道局進一步解釋，未來新增的業務會包含重大邊坡、橋樑、隧道及車站等工程，鐵道建設及營運監理是不同部門負責，各自辦理業務，如果鐵道局負責的業務出現疏失，「我們也不會參與調查作業。」
      </p>
      <p>
        此外，鐵道局表示，行政院 9 月 16
        日通過《鐵路法》修正草案，明訂<UiAnnotation
          :text="'「鐵路監督管理」'"
          :pureAnnotationText="'包含鐵路興建營運備查、列車駕駛檢定發照、設備不當通知改善、重大事故通報查核等業務。'"
        />由交通部改成鐵道局執行；而過去發生重大鐵道事故時，是由交通部聘請專家學者調查，修法後無論是重大、一般或異常事故，全部都由鐵道局負責。
      </p>
    </div>
    <div id="extend" class="gif-graph bonus">
      <img src="~/assets/gif/bonus.gif" alt="bonus" />
    </div>
    <div>
      <h2>番外番外番外番外番外番外番外番外番外番外番外番外番外番外番外番外</h2>
      <p>
        2021 年 4 月 2
        日清明連假，一輛從邊坡滑落到軌道的大貨車造成臺鐵營運史上死傷最慘重的事故，共
        49 人魂斷花蓮、逾 200 人輕重傷。交通部 7
        月中公布的行政報告指出，這次事故主因是外物入侵，以及臺鐵局的工地管理有嚴重疏失。
      </p>
      <p>臺鐵的改革究竟出了什麼問題？</p>
      <h3>從 Dcard 論壇資料，窺見中國流行語滲透</h3>
      <p>
        因為鐵軌出現異物引起的太魯閣號事故，看似是個案，但從臺鐵局統計的行車事故類型可以發現，光是去年的相關事件就超過
        82 件（佔比 13%），每個月平均有 7
        件。「外物」種類千奇百怪，包含土石、樹木、牛群、野貓、野狗、機車與小客車等各式車種、還有掉落或橫越軌道的民眾。
      </p>
    </div>
  </section>
</template>

<script>
import UiAnnotation from '~/components/UiAnnotation.vue'
import UiReportImage from '~/components/UiReportImage.vue'
import gaMixin from '~/mixins/gaMixin'

export default {
  components: {
    UiAnnotation,
    UiReportImage,
  },
  mixins: [gaMixin],
}
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  max-width: 600px;
  font-family: 'Noto Serif TC', serif;
  font-weight: 400;
  .gif-graph {
    &.money {
      width: 55px;
      height: 62px;
      margin: 60px auto;
      @include media-breakpoint-up(md) {
        margin: 96px auto;
      }
    }
    &.bonus {
      width: 130px;
      height: 137px;
      margin: 36px auto;
      @include media-breakpoint-up(md) {
        margin: 72px auto;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  h2 {
    font-size: 24px;
    font-weight: 500;
    line-height: 36px;
    color: #e9b34a;
    text-align: center;
    margin: 0 0 16px;
    @include media-breakpoint-up(md) {
      font-size: 32px;
      line-height: 44px;
      margin: 0 0 40px;
    }
  }
  h3 {
    font-size: 20px;
    font-weight: 500;
    line-height: 29px;
    color: #979797;
    text-align: center;
    margin: 40px 0 16px;
    @include media-breakpoint-up(md) {
      font-size: 28px;
      line-height: 40px;
      color: #c7c7c7;
      margin: 60px 0 20px;
    }
    span {
      display: block;
    }
  }
  p {
    font-size: 16px;
    font-weight: 300;
    line-height: 32px;
    text-align: left;
    color: #fff;
    @include media-breakpoint-up(md) {
      font-size: 18px;
      font-weight: 400;
      line-height: 34px;
    }
    a {
      text-decoration: underline;
      text-decoration-color: #e0e0e0;
      text-underline-offset: 4px;
    }
  }
  p + p {
    margin: 16px 0 0;
    @include media-breakpoint-up(md) {
      margin: 32px 0 0;
    }
  }
  &__image {
    width: calc(100% + 40px);
    height: calc((100vw - 40px) / 1.5);
    transform: translateX(-20px);
    @include media-breakpoint-up(md) {
      width: 100%;
      height: 400px;
      transform: none;
    }
  }
}
</style>
