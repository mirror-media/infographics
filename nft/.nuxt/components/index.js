export { default as Credit } from '../../components/Credit.vue'
export { default as ReportArticle } from '../../components/ReportArticle.vue'
export { default as UiAnnotation } from '../../components/UiAnnotation.vue'
export { default as UiReportImage } from '../../components/UiReportImage.vue'

export const LazyCredit = import('../../components/Credit.vue' /* webpackChunkName: "components/credit" */).then(c => c.default || c)
export const LazyReportArticle = import('../../components/ReportArticle.vue' /* webpackChunkName: "components/report-article" */).then(c => c.default || c)
export const LazyUiAnnotation = import('../../components/UiAnnotation.vue' /* webpackChunkName: "components/ui-annotation" */).then(c => c.default || c)
export const LazyUiReportImage = import('../../components/UiReportImage.vue' /* webpackChunkName: "components/ui-report-image" */).then(c => c.default || c)
