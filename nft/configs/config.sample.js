module.exports = {
  app: {
    siteProtocol: 'https',
    domain: 'www.readr.tw',
    base: '/project/3/taiwan-dashboard-2021_LIYI',
  },
}
/* 
建立靜態檔案方式：yarn build並且yarn generate 
生成的dist資料夾裏面就是靜態檔案了

再來到terminal（注意 路徑要在此專題底下！）執行以下code：
gsutil -m cp -r -a public-read ./dist/ gs://readr-coverages/3/taiwan-dashboard-2021_LIYI

注意！
因為此專題有設定router.base
所以上方指令的gs://readr-coverages/3/taiwan-dashboard-2021
url後半段必須要跟router.base一模一樣！
*/
