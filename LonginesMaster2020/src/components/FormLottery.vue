<template>
  <div v-if="hasStoreInfo" class="form-lottery">
    <h2>留下抽獎資料<br>/預約鑑賞󠄀</h2>
    <div class="form-lottery__form">
      <form @submit.prevent="onSubmit">
        <label class="radio">
          <input
            v-model="participation"
            type="radio"
            name="participation"
            :value="PARTICIPATION_SHARE"
            :disabled="formDisabled"
            required
            @change="handleCustomInputChange"
            @invalid="handleCustomInputInvalid"
          >
          <span class="radio__btn" />
          我已分享活動結果，參加抽獎
        </label>
        <label class="radio">
          <input
            v-model="participation"
            type="radio"
            name="participation"
            :value="PARTICIPATION_TO_STORE"
            :disabled="formDisabled"
            required
            @change="handleCustomInputChange"
            @invalid="handleCustomInputInvalid"
          >
          <span class="radio__btn" />
          我要臨櫃鑑賞
        </label>
        <label class="radio">
          <input
            v-model="participation"
            type="radio"
            name="participation"
            :value="PARTICIPATION_BOTH"
            :disabled="formDisabled"
            required
            @change="handleCustomInputChange"
            @invalid="handleCustomInputInvalid"
          >
          <span class="radio__btn" />
          我已分享活動結果，參加抽獎＋臨櫃鑑賞
        </label>
        <template v-if="participation">
          <div v-if="participationIsNotShare" class="form__item">
            <label for="email"><span>櫃</span><span>點</span><span>地</span><span>區</span></label>
            <div class="form__select">
              <select v-model="region" :disabled="formDisabled" required>
                <option disabled value="">請選擇地區</option>
                <option v-for="region in regions" :key="region" :value="region" v-text="region" />
              </select>
            </div>
          </div>
          <div v-if="participationIsNotShare" class="form__item place">
            <label for="email"><span>預</span><span>約</span><span>櫃</span><span>點</span></label>
            <div class="form__select">
              <select v-model="store" :disabled="formDisabled" required>
                <option disabled value="">請選擇櫃點</option>
                <option v-for="store in storesFiltered" :key="store" :value="store" v-text="store" />
              </select>
            </div>
          </div>
          <div class="form__item">
            <label for="name"><span>姓</span><span>名</span></label>
            <input id="name" v-model.trim="name" :readonly="formDisabled" type="text" placeholder="請填寫聯絡人姓名" required>
          </div>
          <div class="form__item">
            <label for="phone"><span>手</span><span>機</span><span>號</span><span>碼</span></label>
            <input id="phone" v-model="phone" :readonly="formDisabled" type="tel" pattern="[0-9]{10}" placeholder="請填寫聯絡人手機號碼" required>
          </div>
          <div v-if="participationIsNotShare" class="form__item">
            <label for="email"><span>電</span><span>子</span><span>信</span><span>箱</span></label>
            <input id="email" v-model.trim="email" :readonly="formDisabled" type="email" placeholder="請填寫聯絡人電子信箱" required>
          </div>
          <div v-if="participationIsNotToStore" class="form__item">
            <label for="address"><span>收</span><span>件</span><span>地</span><span>址</span></label>
            <input id="address" v-model.trim="address" :readonly="formDisabled" type="text" placeholder="請填寫聯絡人收件地址" required>
          </div>
          <div v-if="participationIsNotToStore" class="form__item">
            <label for="facebook">FB ID</label>
            <input id="facebook" v-model.trim="facebook" :readonly="formDisabled" type="text" placeholder="請填寫聯絡人 FB ID" required>
          </div>
          <label class="radio">
            <input
              v-model="agreement"
              :disabled="formDisabled"
              type="checkbox"
              name="agreement"
              required
              @change="handleCustomInputChange"
              @invalid="handleCustomInputInvalid"
            >
            <span class="radio__btn" />
            我同意本網站的
            <span
              class="lightbox-trigger"
              @click="showLightbox = 'privacy'"
            >
              隱私權使用政策
            </span>及
            <span
              class="lightbox-trigger"
              @click="showLightbox = 'activity'"
            >
              活動注意事項
            </span>
          </label>
          <button :disabled="formDisabled" type="submit">同意送出</button>
          <p v-if="submitStatus" :class="submitStatus" v-text="submitStatusMessage" />
        </template>
      </form>
    </div>
    <TheLightbox
      :showLightbox="showLightbox"
      @close="showLightbox = false"
    >
      <template v-if="showLightbox === 'privacy'">
        <h2>隱私權使用政策</h2>
        <h3>個人資料蒐集聲明</h3>
        <ol>
          <li>您了解及同意所留下的資料，主辦單位基於贈品抽獎活動、行銷、問題統計分析之目的範圍內，可進行蒐集、處理及利用。除此之外，主辦單位不會將您的資料提供給他人。</li>
          <li>除法令另有規定或本活動小組執行職務、業務所必須外，您可透過活動信箱 <a href="mailto:salesteam@mirrormedia.mg" target="_blank">salesteam@mirrormedia.mg</a>，請主辦單位對上開資料(1)查閱或閱覽、(2)製給複製本、(3)補充或更正、(4)停止蒐集、處理或利用、(5)刪除。本告知事項內容如有更新，請詳見主辦單位網站公告。</li>
          <li>若您未提供相關個人資料，將影響您參加本活動之資格。</li>
        </ol>
      </template>
      <template v-if="showLightbox === 'activity'">
        <h2>活動注意事項</h2>
        <ol>
          <li>本活動由浪琴表 Longines 與精鏡傳媒股份有限公司(以下簡稱主辦單位)共同舉辦。</li>
          <li>本活動僅限在中華民國台灣（包含金門、馬祖、澎湖）地區設有住居所之本國人或外國人參加。預約賞錶/購錶之贈品亦僅限前述地區，商品數量有限，送完為止。</li>
          <li>本活動獎品以實物為準，中獎者不得要求折現或轉換它項產品，主辦單位保留更換等值產品之權利，相關內容以門市公告為主，主辦單位保留審核之權利。</li>
          <li>獲獎者所填寫的聯繫方式如電話或地址等相關資訊不完整，導致無法聯繫，將不具獲獎資格。</li>
          <li>依中華民國稅法規定，中獎價值如超過新台幣$1,000元(含)以上者，獎項所得將列入個人年度綜合所得稅申報，故得獎人需依規定填寫領獎收據及繳交兌獎者身分證正反面影本(若未達法定年齡，尚無身分證者，請附上戶口名簿影本，並須由父母或監護人代為領取)，在活動主辦單位確認兌獎資格後，方可領獎。若贈品所得總額超過NT$20,000，需另繳納10%稅額，若無法配合，則視為自動棄權，不具得獎資格。</li>
          <li>獲獎者簽收獎項後，若有遺失或被竊等喪失佔有之情形，主辦單位不負補發獎項之責任。</li>
          <li>本活動如遇其他不可抗力之事由者，得順延之；主辦單位保有取消、終止、修改或暫停、審核民眾參加本活動資格及解釋本活動相關事項之權利，同時保留對此活動之所有事宜最終解釋與裁決的權利。</li>
          <li>關於本活動的細節如有任何問題請聯繫活動小組：<a href="mailto:salesteam@mirrormedia.mg" target="_blank">salesteam@mirrormedia.mg</a>。</li>
        </ol>
      </template>
    </TheLightbox>
    <ThePopup :showPopup="showPopup">
      <div :class="{ active: showPopup }" class="check-icon">
        <div class="check-icon__curtain" />
      </div>
      <p>資料已成功送出<br>感謝您的參與</p>
    </ThePopup>
  </div>
</template>
<script>
import axios from 'axios'

import TheLightbox from './TheLightbox.vue'
import ThePopup from './ThePopup.vue'

const SHEET_ID = '1VMxCNVRc-50Po3Oxx7peE269A5hc5622rAIVFDu9_5E'
const GET_SHEET_URL = `https://www.readr.tw/project-api/googlesheet?spreadsheet_id=${SHEET_ID}&range=櫃點資料!B2:C&majorDimension=ROWS`
const POST_SHEET_URL = `https://www.readr.tw/project-api/googlesheet?spreadsheet_id=${SHEET_ID}&range=表單回應&value_input_option=RAW`

const PARTICIPATION_SHARE = '1'
const PARTICIPATION_TO_STORE = '2'
const PARTICIPATION_BOTH = '3'

export default {
  name: 'FormLottery',
  components: {
    TheLightbox,
    ThePopup
  },
  data () {
    return {
      PARTICIPATION_SHARE,
      PARTICIPATION_TO_STORE,
      PARTICIPATION_BOTH,
      storeInfo: [],
      participation: '',
      region: '',
      store: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      facebook: '',
      agreement: false,
      showLightbox: false,
      showPopup: false,
      submitStatus: '',
      loading: false
    }
  },
  computed: {
    formDisabled () {
      return this.loading || this.hasSubmittedSuccess
    },
    isValid () {
      const commonValid = !!(this.participation &&
        this.name &&
        this.phone &&
        this.agreement)
      let specificValid = false
      if (this.participation === PARTICIPATION_SHARE) {
        specificValid = !!(this.facebook && this.address)
      } else if (this.participation === PARTICIPATION_TO_STORE) {
        specificValid = !!(this.store && this.email)
      } else {
        specificValid = !!(this.store && this.email && this.facebook && this.address)
      }
      return commonValid && specificValid
    },
    hasStoreInfo () {
      return this.storeInfo.length > 0
    },
    hasSubmittedSuccess () {
      return this.submitStatus === 'success'
    },
    participationIsNotShare () {
      return this.participation === PARTICIPATION_TO_STORE || this.participation === PARTICIPATION_BOTH
    },
    participationIsNotToStore () {
      return this.participation === PARTICIPATION_SHARE || this.participation === PARTICIPATION_BOTH
    },
    regions () {
      return this.storeInfo
        .map(column => column[0])
        .filter((v, i, a) => a.indexOf(v) === i)
    },
    storesFiltered () {
      return this.storeInfo
        .filter(column => column[0] === this.region)
        .map(column => column[1])
    },
    submitStatusMessage () {
      if (this.submitStatus === 'success') {
        return '資料已成功送出'
      } else if (this.submitStatus === 'fail') {
        return '資料送出失敗，請重新填寫或稍後再試'
      }
      return ''
    }
  },
  mounted () {
    this.fetchStoreData()
  },
  watch: {
    participation (value) {
      if (value === PARTICIPATION_SHARE) {
        this.region = ''
        this.store = ''
        this.email = ''
      } else if (value === PARTICIPATION_TO_STORE) {
        this.address = ''
        this.facebook = ''
      }
    }
  },
  methods: {
    fetchStoreData () {
      axios
        .get(GET_SHEET_URL)
        .then(res => {
          this.storeInfo = res.data
        })
        .catch(err => {
          console.log('[Error] fetch store data:', err)
        })
    },
    handleCustomInputChange (e) {
      const targetGroup = e.target.name
      const items = [...document.querySelectorAll(`[name="${targetGroup}"]`)]
      items.forEach(item => {
        item.parentNode.classList.remove('invalid')
      })
    },
    handleCustomInputInvalid (e) {
      e.target.parentNode.classList.add('invalid')
    },
    onSubmit () {
      if (this.isValid && !this.loading && !this.hasSubmittedSuccess) {
        this.sendDataTOSheet()
      }
      this.$root.sendGa({ label: '送出表單鈕' })
    },
    sendDataTOSheet () {
      this.loading = true
      const requestBody = {
        majorDimension: 'ROWS',
        values: [
          [
            new Date().toLocaleString(),
            this.participation,
            this.store,
            this.name,
            this.phone,
            this.email,
            this.address,
            this.facebook
          ]
        ]
      }
      axios
        .post(POST_SHEET_URL, requestBody)
        .then(res => {
          this.submitStatus = 'success'
          this.loading = false
          this.showPopup = true
          setTimeout(() => {
            location.replace('https://www.mirrormedia.mg/campaigns/LonginesMaster_2020/')
          }, 1500)
        })
        .catch(err => {
          this.submitStatus = 'fail'
          this.loading = false
          console.log('[Error] send data to sheet:', err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../util/global.styl'

.form-lottery
  padding 33px 0 0
  font-size 1.6rem
  & h2
    font-size 3.0rem
    font-weight normal
    line-height 1.4
    text-align center
    @media (min-width $breakpoint-md)
      & br
        display none
  & input[type="number"]
    -moz-appearance textfield
    -webkit-appearance none
    appearance none
    margin 0
  &__form
    margin-top 20px
    @media (min-width $breakpoint-md)
      max-width 600px
      margin-left auto
      margin-right auto
    & form
      box-sizing border-box
      width 100%
      margin-top 25px
      & *
        box-sizing inherit
      & .radio
        display block
        position relative
        padding-left 30px
        line-height 1.75
        cursor pointer
        user-select none
        & + .radio
          margin-top 10px
        & + .form__item
          margin-top 25px
        & input
          position absolute
          width 0
          height 0
          opacity 0
          cursor pointer
          &:checked ~ .radio__btn:after
            display block
        &__btn
          position absolute
          top 5px
          left 0
          width 20px
          height 20px
          background-color #fff
          border-radius 4px
        &__btn:after
          content ''
          display none
          position absolute
          top -2px
          left 5px
          width 10px
          height 15px
          border solid #000
          border-width 0 3px 3px 0
          transform rotate(45deg)
        &.invalid
          .radio__btn
            border 2px solid #f14056
      & .form__item
        display flex
        height 40px
        padding 8px 16px 4px 20px
        background-color #9b9b9b
        border-radius 4px
        box-shadow inset 2px 2px 3px 0 rgba(0, 0, 0, 0.5)
        & + .form__item
          margin-top 30px
        & + .radio
          margin-top 27px
        & label
          display inline-flex
          justify-content space-between
          align-items center
          width 64px
          min-width 64px
        & input, & .form__select
          flex 1
          padding 0 3px
          height 28px
          margin-left 17px
          color #4a4a4a
          font-size 1.6rem
          line-height 1
          background-color transparent
          border 0
        & input
          max-width calc(100% - 81px)
        & input:-webkit-autofill
          -webkit-box-shadow 0 0 0px 1000px #9b9b9b inset
          -webkit-text-fill-color #4a4a4a
        & .form__select
          position relative
          &:after
            content ''
            position absolute
            top 50%
            right 3px
            transform translateY(-50%)
            width 0
            height 0
            border-style solid
            border-width 17.3px 10px 0 10px
            border-color #fff transparent transparent transparent
          & select
            position relative
            z-index 10
            width 100%
            height 100%
            color #4a4a4a
            font-size 1.6rem
            line-height 1
            background-color transparent
            border 0
        &.place
          & .form__select
            & select
              padding-right 20px
    & button
      width 100%
      height 50px
      margin-top 41px
      color #fff
      font-size 2.0rem
      background-color transparent
      border 1px solid #fff
      border-radius 4px
      cursor pointer
      & + p
        margin-top 10px

  & p.fail
    color #f14056
  & span.lightbox-trigger
    text-decoration underline

.check-icon
  position relative
  width 80px
  height 60px
  margin 0 auto
  & + p
    margin-top 10px
  &:before
    content ''
    position absolute
    top 40px
    left 10px
    width 30px
    height 4px
    background-color #fff
    border-radius 2px
    transform rotate(45deg)
  &:after
    content ''
    position absolute
    top 28px
    right -3px
    width 60px
    height 4px
    background-color #fff
    border-radius 2px
    transform rotate(-48deg)
  &.active
    .check-icon__curtain
      position absolute
      top 0
      right 0
      z-index 10
      width 100%
      height 100%
      background-color #505050
      animation curtain .6s linear .4s forwards

@keyframes curtain {
  from {
    width 100%
  }
  to {
    width 0
  }
}

</style>
