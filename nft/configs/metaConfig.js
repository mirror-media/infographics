const { app } = require('./config')

export const SITE_TITLE = '測試'
export const SITE_DESCRIPTION = '測試'
export const SITE_URL = `${app.siteProtocol}://${app.domain}${app.base}`
export const SITE_DOMAIN = `${app.domain}${app.base}`
export const SITE_OG_IMAGE = `${app.siteProtocol}://${app.domain}${app.base}/images/og.jpeg`
export const SITE_LOGO = `${app.siteProtocol}://${app.domain}${app.base}/images/logo.png`
export const SITE_BASE = `${app.base}/`
export const FB_APP_ID = `KJ`
