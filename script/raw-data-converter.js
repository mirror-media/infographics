let datas = require('./raw-data.json')
const fs = require('fs');
const path = require('path');

let i18n_zh_tw = []
let i18n_en = []
let pages = []
const mmBaseUrl = "https://storage.googleapis.com/mirrormedia-files/assets/images"
const fallbackImageUrl = "images/mountain.jpg"

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

const firstPage = {
  order: "0",
  type: "L",
  name: "Landing Page",
  filename: "",
  text: {
    title: "前線的前線\n攝影師張乾琦烏克蘭戰地紀實",
    foreword: "聯合國難民署（UNHCR）統計，俄羅斯入侵烏克蘭以來，已超過465萬烏克蘭難民逃至其他國家，在烏克蘭18至60歲的男性被徵召、無法出國情況下，超過90％難民是婦女和兒童。",
    credit: "張乾琦",
    ig: "https://www.instagram.com/chien_chi_chang"
  },
  eng_text: {
    title: "The Frontline of Frontline\nPhotographer Chien-Chi Chang in Ukraine",
    foreword: "聯合國難民署（UNHCR）統計，俄羅斯入侵烏克蘭以來，已超過465萬烏克蘭難民逃至其他國家，在烏克蘭18至60歲的男性被徵召、無法出國情況下，超過90％難民是婦女和兒童。",
    credit: "Chien-Chi Chang",
    ig: "https://www.instagram.com/chien_chi_chang"
  }
}

const endingPage = datas.filter(data => data.type === "E").reduce((first, second) => {
  return {
    order: first.order,
    type: first.type,
    name: first.name,
    filename: first.filename,
    text: {
      first: first.text,
      second: second.text
    },
    eng_text: {
      first: first.eng_text,
      second: second.eng_text
    }
  }
})

datas = [firstPage, ...datas.filter(data => data.type !== "E"), endingPage]


datas.forEach(({ text, eng_text, order, type, filename, name }, index) => {
  i18n_zh_tw.push({ text })
  i18n_en.push({ text: eng_text })
  let image
  if (type === "P" || type === "L") {
    image = filename ? `${mmBaseUrl}/${filename}.jpg` : fallbackImageUrl
  } else if (type === "M") {
    image = order === "1" ? "images/map1.gif" : "images/map2.gif"
  }
  pages.push({
    id: index,
    type,
    image,
    name,
  })
})

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
