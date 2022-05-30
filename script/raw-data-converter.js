let datas = require('./raw-data.json')
const fs = require('fs');
const path = require('path');

let i18n_zh_tw = []
let i18n_en = []
let pages = []

/*
  欠缺landing page 圖片\前言、map for mobile
*/

datas = datas.sort((a, b) => {
  if (a.order - 0 < b.order - 0) {
    return -1
  } else if (a.order > b.order) {
    return 1
  } else {
    return 0
  }
})

let firstPage = datas.find(data => data.type === "L")
firstPage = {
  order: firstPage.order,
  type: "L",
  name: "Landing Page",
  filename: firstPage.filename,
  text: {
    title: "前線的前線\n攝影師張乾琦烏克蘭戰地紀實",
    foreword: "2022 年 2 月開始的俄烏戰爭仍持續延燒，台灣攝影師張乾琦二度前往被戰爭撕裂的烏克蘭紀錄實況。",
    credit: "張乾琦",
    ig: "https://www.instagram.com/chien_chi_chang",
    text: firstPage.text
  },
  eng_text: {
    title: "The Frontline of Frontline\nPhotographer Chien-Chi Chang in Ukraine",
    foreword: "The Russian invasion of Ukraine started on February 24 is still raging. Taiwanese photographer Chien-Chi Chang went to the war-torn Ukraine twice to record the situation.",
    credit: "Chien-Chi Chang",
    ig: "https://www.instagram.com/chien_chi_chang",
    eng_text: firstPage.eng_text
  }
}

const endingPage = datas.filter(data => data.type === "E").reduce((first, second) => {
  return {
    order: first.order,
    type: first.type,
    name: first.name,
    filename: first.filename,
    text: {
      first: {
        name: '張乾琦',
        ig: 'https://www.instagram.com/chien_chi_chang',
        pairs: [
          {
            head: '出生：',
            body: '1961年1月生於台中市烏日區。\n\n',
          },
          {
            head: '學經歷：',
            body: '美國印第安那大學教育碩士，曾任《西雅圖時報》《巴爾的摩太陽報》攝影記者，現為馬格蘭通訊社終身會員。\n\n',
          },
          {
            head: '攝影作品：',
            body: '《鍊》（The Chain）、《我願意》（I do I do I do）、《囍》（Double Happiness）、《時差》（Jet Lag）、《唐人街》（Chinatown）、《脫北者》(Escape from North Korea )等。\n\n',
          },
          {
            head: '獲獎：',
            body: '曾獲荷蘭世界新聞攝影獎、美國NPPA年度攝影師、法國影像Visa國際紀實攝影獎、尤金．史密斯攝影獎、美國年度新聞攝影獎、加拿大人權攝影獎多媒體類首獎、第二十八屆東元獎人文類獎。攝影作品廣泛刊於《國家地理雜誌》、《時代雜誌》、《泰晤士報》、《費加洛報》等國際知名媒體。\n\n',
          },
          {
            head: '展覽與典藏：',
            body: '曾參與威尼斯雙年展、巴西聖保羅雙年展、紐約攝影三年展、斐列茲藝術博覽會等國際展覽。攝影作品獲亨利·卡地亞-布列松基金會、喬治·伊斯曼博物館、紐約國際攝影博物館、台南奇美博物館、台灣美術館、紐約皇后藝術博物館等納為典藏。',
          }
        ]
      },
      second: {
        first: '張乾琦是全球最高地位的紀實攝影組織「馬格蘭通訊社」的終生會員（full member），是該通訊社唯一的華人、台灣攝影家。烏俄戰爭 2 月 24 日開打，他 3 月 4 日就進入烏克蘭開始一系列記錄工作。\n\n61 歲了，他還是穿戴了防彈背心和頭盔，背著相機勇闖前線，他說之所以這麼做，「特別是為了台灣的年輕世代。」本刊獨家取得授權，刊載這些難得的紀實影像，他也寫下身在戰地的第一手。\n\n他說：「我想去前線的前線。」因為他，我們不再只有西方主流媒體的視角，我們要用自己看的方法，去記錄當下，也記錄歷史。',
        pairs: [
          {
            head: '當異鄉人深入異鄉',
            body: '五月初，距離烏克蘭首都基輔八小時車程外的工業大城扎波羅熱（Zaporizhzhia），馬格蘭通訊社攝影師張乾琦與我們進行網路通話，「剛剛，有導彈從我頭上飛過去。」他的語氣平靜平淡，彷彿目睹飛過去的只是日常不過的小鳥。',
          },
          {
            head: '讓台灣觀點，站上世界頂尖舞台',
            body: '烏俄戰爭二月二十四日開打，張乾琦三月四日進入烏克蘭進行一系列拍攝記錄工作。二個月來，他的相機記錄戰爭中親人對彼此的告別、火車站難民潮、教堂喪禮、練習打靶備戰的平民、烏克蘭軍警的戰時訓練、醫院中受救治的人，槍聲、彈孔、爆炸後廢墟、一層層管制檢查哨…，他的鏡頭一向冷靜，不販賣激情，那些卑微、殘缺、意外與痛苦，全都籠罩著他獨有的、屬於人性的溫度。\n張乾琦於一九九五年成為馬格蘭通訊社成員，是該通訊社唯一的華人、台灣攝影家。「馬格蘭攝影通訊社」由世界知名攝影家羅伯．卡帕（Robert Capa）、布列松（Henri Cartier-Bresson）、喬治．羅傑（George Rodger）、大衛．西蒙（David Seymour Magnum），為忠實呈現第二次世界大戰後影像，於一九四七年成立。馬格蘭原意為大瓶香檳，因成員見面時會開香檳，便以此為名，國際上公認該通訊社為紀實攝影界地位最高的組織。張乾琦的作品不但獲全球各大美術館邀展和典藏，並得過美國年度新聞攝影獎、荷蘭世界新聞攝影日常生活類首獎、尤金．史密斯人道主義攝影獎等獎項的肯定。\n為忠實呈現紐約唐人街中國非法移民的生活實況，張乾琦曾搬到與移工們同樣條件惡劣的公寓裡生活，作品《唐人街》讓美國勞工部為此展開查緝，改善非法移民的生活困境。他更花了六年時間取得信任，作品《鍊》記錄高雄龍發堂將精神病患以一條感情鍊相連共同生活的驚人實相；作品《囍》忠實呈現台灣仲介越南新娘的情景；他也曾跟隨脫北者，拍攝從北韓邊境一路逃亡到泰國的五千公里大逃亡過程。二○二一年張乾琦獲第二十八屆東元獎人文類獎，賀獎讚辭為：「讓台灣觀點站上世界頂尖舞台的攝影詩人」。'
          },
          {
            head: '照看戰爭之殘酷，也看見人性之高貴',
            body: '疏離與連結往往是張乾琦的作品主題，長年居於奧地利，遊走各國拍攝，讓他認為自己是永遠的異鄉人。公視《記錄觀點》製作人王派彰認為，攝影師通常都有一種從苦難中輕易轉身離開的能力，「但張乾琦沒有。他似乎對情緒高漲的感染力不感興趣。他的照片總散發出一種『回家』的感覺，即便身處異地，即便空無一物，也不斷招喚你的回眸、牽掛與流連。」\n好友攝影家謝三泰說：「我特別叮嚀他在戰區要小心自身安全，他回答：『我希望可以去烏東』，我回答：『那更要注意安全』，他即回我：『我想去前線的前線，也許我瘋了！』這樣的留言如同他對拍照的熱愛，甚於愛他自己，也顯現他對不公不義的事情，無論如何都要用相機去揭露殘酷的事實公諸於世，不難看出這就是他的個性使然。」\n烏克蘭與俄羅斯的關係，彷彿台灣與中國，自認是異鄉人的攝影家深入另一個異鄉，意在以台灣人的眼神記錄戰爭，也為台灣人打開一扇觀景窗，照看戰爭之殘酷，也看見人性之高貴。'
          }
        ]
      },
      caption: '張乾琦。Photo by Ruslan Ganushchak',
      credit: '主要撰文、攝影：張乾琦\n介紹撰文：陳昌遠\n網頁製作/策展：李文瀚、曾立宇、李又如、陳玟諺、簡信昌\n翻譯：陳虹瑾、尹俞歡、王思涵、蔣宜婷',
    },
    eng_text: {
      first: {
        name: 'Chien-Chi Chang',
        ig: 'https://www.instagram.com/chien_chi_chang',
        pairs: [
          {
            head: '',
            body: 'Born in January, 1961. From Taichung, Taiwan.\n\n',
          },
          {
            head: 'Education and Work Experience',
            body: 'Chang received an MS from Indiana University, Bloomington. He worked as a photo journalist at The Seattle Times and The Baltimore Sun. His photographic works have been widely published in internationally renowned media such as National Geographic, Time, The Times, and Le Figaro.\nChang joined Magnum Photos in 1995 and was elected as a Full Member in 2001.\n\n',
          },
          {
            head: 'Photography Works',
            body: 'The Chain, I do I do I do, Double Happiness, Jet Lag, Chinatown, Escape from North Korea, and etc.\n\n',
          },
          {
            head: 'Awards',
            body: "First prize, Daily Life Stories, World Press Photos, Amsterdam.\nMagazine Photographer of the Year, National Press Photographers Association, US. \nVisa d'Or, Visa pour l'image, Perpignan, France. \nW. Eugene Smith Grant, W. Eugene Smith Memorial Fundfor Humanistic PhotographyChien-Chi Chang: An Outlander in the Strange Land, New York.\n2021 TECO Award Culture Category, Taiwan.\n\n",
          },
          {
            head: 'Selected Exhibitions and Collections',
            body: 'Chang’s works have been shown in galleries and museums around the world including Venice Biennale, São Paulo Biennial, International Center of Photography. His photographic works has been collection by Henri Cartier-Bresson Foundation, George Eastman Museum, International Center of Photography, Queens Museum, National Taiwan Museum of Fine Arts, Chimei Museum, and so on.',
          }
        ]
      },
      second: {
        first: 'As a full member of Magnum Photos, Chien-Chi Chang is the only ethnic Chinese and Taiwanese photographer of this most prestigious organization in documentary photography.\n\nThe Ukraine-Russian war began on the 24th of February, Chang went to Ukraine on the 4th of March and began his documentary work immediately.\n\nAlthough he is 61 years old, he still went straight to the frontline with his bulletproof vest, helmet and camera. He said he did this because of “the younger generation in Taiwan.”\n\nMirror Media has obtained the exclusive authorization to publish these rare documentary images and his reflection notes on the battlefield. “I want to be the frontline of frontline,” he said. Owing to Chien-Chi Chang, we no longer perceive the war only by the views of western media. We are going to develop our ways of seeing to document the present and history.',
        pairs: [
          {
            head: 'An Outlander in The Strange Land',
            body: 'In May, we talked to Chien-Chi Chang via the internet calls, a Magnum Photos photographer, who was at Zaporizhzhia, a city eight hours away from Kyiv.‘When I was at a restaurant, there’s missile flying from the hill.’ he said. His tone was so calm, as it was just birds flying by. \nUkraine-Russian war began on 24th of February, Chang went to Ukraine on 4th of March, recording funerals, bullet holes, ruins, gunshots, and all of the daily lives in the war zone through camera since then. His lenses always focus on a sense of tranquility, all of the humbleness, fractions, accidents and pain on the field, are covered with his unique and human touch.\n\n',
          },
          {
            head: '',
            body: 'Chang joined Magnum Photos in 1995 and has been the only Chinese and Taiwanese photographer since then. Magnum Photos was founded in Paris in 1947 by Robert Capa, David \"\"Chim\"\" Seymour, Henri Cartier-Bresson. Magnum refers to a big bottle of wine, the name\"\"Magnum\"\" was chosen because the founding members always drank a bottle of champagne during the first meetings. Magnum Photos is reckoned as the most prestigious organization in the field of documentary photography. Chang’s works not only collected and exhibited by museums around the world, has also won The Academy Award for Best Picture，World Press Photo daily life first prize, and W.Eugene Smith Award.\n\n'
          },
          {
            head: '',
            body: 'In 1996, Chang moved to New York Chinatown, where he lived with illegal Chinese immigrants in poor apartments for six years in order to uncover their living situation. Series works allowed the Department of Labor to investigate and improve their living standard. Chang’s work“The Chain” shows how an asylum in Kaohsiung uses virtual and physical chains to contain its patients, “Double Happiness” revealed human traffickers arranging marriages between Vietnamese women and Taiwanese men.Chang had also hired by ‘National Geography’ to follow the process of a Korean who escaped all the way from North Korea and fled to Thailand. In 2021, Chang received the Humanities Award from TECO Technology Foundation, for hw ‘putTaiwanese viewpoint on world’s top platform’.\n\n'
          },
          {
            head: '',
            body: `Estrangement and connection can be seen in Chang’s work, which may relate to his living status. He lives in Austria and often travels for work, which always makes him feel like a stranger. Pei-Chang Wang, a documentary producer, says most photographers can easily recover from suffering and walk away, but Chang can’t : “He has no interest in emotional attractions. His pictures always come with the feeling of coming home, even if it's in unfamiliar places and nothing exists, they still make you keep thinking about it.”\n\n`
          },
          {
            head: '',
            body: `Chang’s friend, San-Tai Hsieh, also a photographer, says: “ I asked Chang to keep safe in war zone, he only replied that he wanted to go East of Ukraine, I asked him to be more careful, he said ‘only want to be the frontline of frontline, maybe I’m crazy.’ His message shows he loves photography more than himself, and also implies that when he sees injustice he would do anything to reveal the cruel truth.”\n\n`
          },
          {
            head: '',
            body: `Relationship between Ukraine and Russia is just like Taiwan and China. A photographer who sees himself as a stranger is now in another foreign country recording the war as a Taiwanese, and also opened a window for Taiwanese to see the cruelty of war.`
          }
        ]
      },
      caption: 'Chien-Chi Chang.  Photo by Ruslan Ganushchak',
      credit: `Reporting and Photography by Chien-Chi Chang\nAdditional reporting by Chen Chang-Yuan\nCuration, design and development by Lee Wen-Han, Tseng Lee-Yu, Lee Yu-Ju, Chen Wen-Yen, Chien Hsin-chan\nTranslation by Hung-Chin Chen, Yuhuan Yin, Wang Szu-Han, Chiang I-Ting`
      ,
    },
  }
})

datas = [firstPage, ...datas.filter(data => data.type !== "E" && data.type !== "L"), endingPage]

datas.forEach(({ text, eng_text, order, type, filename, name }, index) => {
  i18n_zh_tw.push({ text })
  i18n_en.push({ text: eng_text })
  let image
  if (type === "M") {
    image = order === "1" ? "images/map1.m4v" : "images/map2.m4v"
  } else {
    image = filename ? filename : ''
  }
  pages.push({
    id: index,
    type,
    image,
    name,
  })
})

i18n_zh_tw[0].rotate = {
  hint: '此專題建議以橫向格式閱讀\n請橫置手機\n以獲得最佳閱讀體驗',
  confirm: '確定'
}
i18n_en[0].rotate = {
  hint: 'Rotate your phone for best experience',
  confirm: 'OK'
}
i18n_zh_tw[2].tutorial = {
  caption: {
    title: '操作說明',
    hint: '點擊螢幕任意處，開啟圖片說明\n再次點擊可關閉',
  },
  navigate: '點擊按鈕開啟側欄，選擇縮圖，可快速跳轉至指定照片',
  arrow: '點擊左右箭頭，或直接滑動螢幕，可播放下一張照片',
}
i18n_en[2].tutorial = {
  caption: {
    title: 'Instructions',
    hint: 'To click anywhere on the screen will open the caption.\nClick again to close the caption.',
  },
  navigate: 'Click the button and choose a thumbnail. It can swiftly change into the chosen photo. ',
  arrow: 'To click left and right arrow buttons or to swipe the screen can play the next photo.',
}


console.log(`pages has ${pages.length} pages`)
console.log(`i18n_tw has ${i18n_zh_tw.length} pages`)
console.log(`i18n_en has ${i18n_en.length} pages`)

fs.writeFile(path.join(__dirname, '../src/datas/pages.json'), JSON.stringify(pages), err => {
  if (err) {
    console.error(err);
  }
});
fs.writeFile(path.join(__dirname, '../src/i18n/zh-TW.json'), JSON.stringify(i18n_zh_tw), err => {
  if (err) {
    console.error(err);
  }
});
fs.writeFile(path.join(__dirname, '../src/i18n/en.json'), JSON.stringify(i18n_en), err => {
  if (err) {
    console.error(err);
  }
});
