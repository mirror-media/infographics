const { app } = require('./config')

export const SITE_TITLE = '不只是暴富　NFT 新世界拓荒記'
export const SITE_DESCRIPTION =
  '一張迷因圖讓人從此脫貧、一群無聊猿猴的頭像交易突破五億美金——今年以來，NFT（非同質化代幣）的暴利神話從國際新聞到社群一波一波傳散開來，在大家還沒搞清楚 NFT 之前，NFT 已經像一場「有錢人」的金錢遊戲。'
export const SITE_URL = `${app.siteProtocol}://${app.domain}${app.base}`
export const SITE_DOMAIN = `${app.domain}${app.base}`
export const SITE_OG_IMAGE = `${app.siteProtocol}://${app.domain}${app.base}/images/og.png`
export const SITE_LOGO = `${app.siteProtocol}://${app.domain}${app.base}/images/logo.png`
export const SITE_BASE = `${app.base}/`
export const FB_APP_ID = `KJ`
