export { default as Cover } from '../../components/Cover.vue'
export { default as CoverBottomGif } from '../../components/CoverBottomGif.vue'
export { default as CoverTopGif } from '../../components/CoverTopGif.vue'
export { default as Credit } from '../../components/Credit.vue'
export { default as Navbar } from '../../components/Navbar.vue'
export { default as ReportArticle } from '../../components/ReportArticle.vue'
export { default as ReportQuiz } from '../../components/ReportQuiz.vue'
export { default as ReportRelated } from '../../components/ReportRelated.vue'
export { default as UiAnnotation } from '../../components/UiAnnotation.vue'
export { default as UiNavbarList } from '../../components/UiNavbarList.vue'
export { default as UiReportImage } from '../../components/UiReportImage.vue'
export { default as UiShare } from '../../components/UiShare.vue'

export const LazyCover = import('../../components/Cover.vue' /* webpackChunkName: "components/cover" */).then(c => c.default || c)
export const LazyCoverBottomGif = import('../../components/CoverBottomGif.vue' /* webpackChunkName: "components/cover-bottom-gif" */).then(c => c.default || c)
export const LazyCoverTopGif = import('../../components/CoverTopGif.vue' /* webpackChunkName: "components/cover-top-gif" */).then(c => c.default || c)
export const LazyCredit = import('../../components/Credit.vue' /* webpackChunkName: "components/credit" */).then(c => c.default || c)
export const LazyNavbar = import('../../components/Navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => c.default || c)
export const LazyReportArticle = import('../../components/ReportArticle.vue' /* webpackChunkName: "components/report-article" */).then(c => c.default || c)
export const LazyReportQuiz = import('../../components/ReportQuiz.vue' /* webpackChunkName: "components/report-quiz" */).then(c => c.default || c)
export const LazyReportRelated = import('../../components/ReportRelated.vue' /* webpackChunkName: "components/report-related" */).then(c => c.default || c)
export const LazyUiAnnotation = import('../../components/UiAnnotation.vue' /* webpackChunkName: "components/ui-annotation" */).then(c => c.default || c)
export const LazyUiNavbarList = import('../../components/UiNavbarList.vue' /* webpackChunkName: "components/ui-navbar-list" */).then(c => c.default || c)
export const LazyUiReportImage = import('../../components/UiReportImage.vue' /* webpackChunkName: "components/ui-report-image" */).then(c => c.default || c)
export const LazyUiShare = import('../../components/UiShare.vue' /* webpackChunkName: "components/ui-share" */).then(c => c.default || c)
