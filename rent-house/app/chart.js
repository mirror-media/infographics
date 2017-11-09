import * as d3 from 'd3'
import Highcharts from 'highcharts'

const division = ['新北市板橋區', '新北市三重區', '新北市中和區', '台北市中山區', '新北市新莊區', '台北市大安區', '新北市永和區', '台北市內湖區', '台北市信義區', '新北市新店區',
  '新北市淡水區', '台北市文山區', '台北市士林區', '新北市汐止區', '台北市松山區', '台北市中正區', '台北市北投區', '新北市土城區', '台北市萬華區', '台北市南港區',
  '新北市蘆洲區', '台北市大同區', '新北市林口區', '新北市三峽區', '新北市樹林區', '新北市五股區', '新北市泰山區', '新北市鶯歌區', '新北市八里區', '新北市深坑區',
  '新北市三芝區', '新北市瑞芳區', '新北市萬里區', '新北市金山區', '新北市石碇區', '新北市貢寮區', '新北市平溪區', '新北市雙溪區', '新北市烏來區', '新北市石門區', '新北市坪林區']

const groundMarket = [477, 138, 87, 793, 173, 261, 239, 209, 68, 251, 464, 84, 17, 0, 3, 0, 55, 117, 1, 13,
  8, 20, 3, 0, 0, 8, 0, 1, 0, 0, 1, 76, 31, 61, 4, 0, 2, 0, 29, 47, 0]

const undergroundMarket = [1839, 952, 1291, 3339, 1458, 2334, 2391, 1375, 1891, 1610, 2695, 1156, 1319, 1, 254, 19, 3469, 3412, 198, 970,
  896, 1686, 362, 4, 0, 486, 1, 1, 0, 17, 67, 2585, 2291, 4255, 709, 119, 718, 1, 2775, 2123, 27]

export function taipeiGeo(width, height) {
  d3.json('./data/twtown.json', (geojson) => {
    for (let i = 0; i < geojson.features.length; i += 1) {
      const geoj = geojson
      geoj.features[i].properties.groundMarket = groundMarket[i]
    }
    const taipeiGeoContainer = d3.select('#js-taipeiGeo').attr('width', '100%').attr('height', '100%')
    const center = d3.geoCentroid(geojson)
    let scale = 150
    let offset = [width / 2, height / 2]
    let projection = d3.geoMercator().scale(scale).center(center).translate(offset)
    let path = d3.geoPath(projection)

    const bounds = path.bounds(geojson)
    const hscale = (scale * width) / (bounds[1][0] - bounds[0][0])
    const vscale = (scale * height) / (bounds[1][1] - bounds[0][1])
    scale = (hscale < vscale) ? hscale : vscale
    offset = [width - ((bounds[0][0] + bounds[1][0]) / 2), height - ((bounds[0][1] + bounds[1][1]) / 2)]
    projection = d3.geoMercator().scale(scale).center(center).translate(offset)
    path = d3.geoPath(projection)
    taipeiGeoContainer.append('rect').attr('width', width).attr('height', height)
      .style('stroke', 'none')
      .style('fill', 'none')
    taipeiGeoContainer.selectAll('path').data(geojson.features).enter().append('path')
      .attr('d', path)
      .style('stroke', '#999799')
      .style('fill', (it) => {
        if (it.properties.county === '臺北市') {
          return '#cccccc'
        }
        return '#eeecee'
      })
    const chartRadiusMap = d3.scaleLinear().domain([0, 793]).range([0, 100])
    const chartDorling = d3.select('#js-taipeiGeo').selectAll('g').data(geojson.features).enter()
      .append('g')
    chartDorling
      .append('circle')
      .each((it) => {
        const temp = it
        temp.properties.r = chartRadiusMap(Math.sqrt(it.properties.groundMarket)) * 10
        temp.properties.c = path.centroid(it)
        temp.properties.x = width / 2
        temp.properties.y = height / 2
      })
      .attr('cx', it => (it.properties.x + it.properties.c[0]) - (width / 2))
      .attr('cy', it => (it.properties.y + it.properties.c[1]) - (height / 2))
      .attr('r', it => it.properties.r)
      .style('fill', (it) => {
        if (it.properties.groundMarket > 260) {
          return 'rgba(174, 138, 187, .9)'
        }
        return 'rgba(174, 138, 187, .6)'
      })
      .style('stroke', '#fff')

    chartDorling
      .append('text')
      .attr('x', it => (it.properties.x + it.properties.c[0]) - (width / 2))
      .attr('y', it => (it.properties.y + it.properties.c[1]) - (height / 2))
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '300')
      .style('fill', (it) => {
        if (it.properties.groundMarket > 0 && it.properties.groundMarket < 21) {
          return '#000'
        }
        return '#fff'
      })
      .text(it => it.properties.groundMarket)
  })
}

export function gMarket() {
  d3.json('./data/twtown.json', (geojson) => {
    for (let i = 0; i < geojson.features.length; i += 1) {
      const geoj = geojson
      geoj.features[i].properties.groundMarket = groundMarket[i]
    }
    const chartRadiusMap = d3.scaleLinear().domain([0, 793]).range([0, 100])
    const chartDorling = d3.select('#js-taipeiGeo').selectAll('g').data(geojson.features)
    const circle = chartDorling.select('circle')
    const text = chartDorling.select('text')
    circle
      .each((it) => {
        const temp = it
        temp.properties.r = chartRadiusMap(Math.sqrt(it.properties.groundMarket)) * 10
      })
      .transition()
      .duration(1000)
      .attr('r', it => it.properties.r)
      .style('fill', (it) => {
        if (it.properties.groundMarket > 260) {
          return 'rgba(174, 138, 187, .9)'
        }
        return 'rgba(174, 138, 187, .6)'
      })
    text
      .transition()
      .duration(1000)
      .text(it => it.properties.groundMarket)
      .style('fill', (it) => {
        if (it.properties.groundMarket > 0 && it.properties.groundMarket < 21) {
          return '#000'
        }
        return '#fff'
      })
    document.querySelector('#js-geoText').innerHTML = '住宅租賃實價登錄'
  })
}

export function underMarket() {
  d3.json('./data/twtown.json', (geojson) => {
    for (let i = 0; i < geojson.features.length; i += 1) {
      const geoj = geojson
      geoj.features[i].properties.undergroundMarket = undergroundMarket[i]
    }
    const chartRadiusMap = d3.scaleLinear().domain([0, 793]).range([0, 100])
    const chartDorling = d3.select('#js-taipeiGeo').selectAll('g').data(geojson.features)
    const circle = chartDorling.select('circle')
    const text = chartDorling.select('text')
    circle
      .each((it) => {
        const temp = it
        temp.properties.r = chartRadiusMap(Math.sqrt(it.properties.undergroundMarket)) * 10
      })
      .transition()
      .duration(1000)
      .attr('r', it => it.properties.r)
      .style('fill', (it) => {
        if (it.properties.undergroundMarket > 2330) {
          return 'rgba(162, 218, 209, .6)'
        }
        return 'rgba(162, 218, 209, .3)'
      })
      .style('stroke', '#fff')
    text
      .transition()
      .duration(1000)
      .text(it => it.properties.undergroundMarket)
      .style('fill', (it) => {
        if (it.properties.undergroundMarket > 0 && it.properties.undergroundMarket < 21) {
          return '#000'
        }
        return '#fff'
      })
    document.querySelector('#js-geoText').innerHTML = '591租金行情（去除商業使用、倉庫）'
  })
}

export function chartHotArea() {
  Highcharts.chart('chart-hotArea', {
    chart: { type: 'bar' },
    title: { text: '雙北的租屋熱區' },
    xAxis: {
      categories: division,
      title: { text: null },
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: { text: '數量 (間)', align: 'high' },
      labels: {
        overflow: 'justify',
        style: { fontSize: '14px' },
      },
    },
    tooltip: { valueSuffix: ' 間' },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '14px',
            textOutline: 0,
          },
        },
      },
    },
    credits: { enabled: false },
    series: [{
      name: '數量',
      showInLegend: false,
      data: [4255, 3469, 3412, 3339, 2775, 2695, 2585, 2391, 2334, 2291, 2123, 1891,
        1839, 1686, 1610, 1458, 1375, 1319, 1291, 1156, 970, 952, 896, 718, 709, 486,
        362, 254, 198, 119, 67, 27, 19, 17, 4, 1, 1, 1, 1, 0, 0],
    }],
  })
}

export function chartEasyRent() {
  Highcharts.chart('chart-easyRent', {
    chart: { type: 'column' },
    title: { text: '兩萬元以下，<br>哪個價格的物件最多？' },
    xAxis: {
      categories: ['5000元以下', '5000-9999元', '10000-14999元', '15000-19999元'],
      crosshair: true,
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: { text: '數量 (間)', align: 'middle' },
      labels: {
        overflow: 'justify',
        style: { fontSize: '14px' },
      },
    },
    tooltip: { valueSuffix: ' 間' },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '14px',
            textOutline: 0,
          },
        },
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [{
      name: '數量',
      showInLegend: false,
      color: '#ae8abb',
      data: [1040, 16205, 11556, 9355],
    }],
    credits: { enabled: false },
  })
}

export function chartIncreaseHome() {
  Highcharts.chart('chart-increase', {
    chart: { type: 'line' },
    title: { text: '' },
    xAxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: { text: '元/坪' },
      labels: {
        style: { fontSize: '14px' },
      },
    },
    legend: {
      itemStyle: {
        fontSize: '14px',
      },
    },
    tooltip: { headerFormat: '<b>{series.name}</b><br/>', pointFormat: '{point.y} 元/坪' },
    plotOptions: {
      series: {
        events: {
          legendItemClick() {
            if (this.color === '#e6e6e6') {
              this.update({ zIndex: 11, color: '#ede09f' })
              return false
            }
            if (this.color === '#ede09f') {
              this.update({ zIndex: 1, color: '#e6e6e6' })
              return false
            }
            return true
          },
        },
      },
    },
    credits: { enabled: false },
    series: [{
      name: '台北市',
      color: '#ae8abb',
      marker: { symbol: 'circle' },
      zIndex: 10,
      visible: true,
      data: [833, 783, 818, 864, 891, 928, 983, 1025, 1040],
    }, {
      name: '中正區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [907, 830, 876, 931, 959, 977, 1063, 1092, 1102],
    }, {
      name: '萬華區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [659, 670, 655, 684, 743, 744, 818, 839, 878],
    }, {
      name: '大同區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [683, 679, 781, 797, 780, 846, 918, 990, 963],
    }, {
      name: '中山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [972, 906, 1015, 1056, 1075, 1177, 1181, 1226, 1217],
    }, {
      name: '松山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [910, 863, 897, 927, 953, 972, 1063, 1120, 1189],
    }, {
      name: '大安區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1027, 960, 996, 1046, 1111, 1132, 1199, 1248, 1253],
    }, {
      name: '信義區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [936, 830, 846, 913, 940, 960, 1035, 1109, 1167],
    }, {
      name: '內湖區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [739, 694, 722, 768, 813, 867, 913, 974, 962],
    }, {
      name: '南港區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [669, 657, 682, 733, 742, 782, 857, 909, 909],
    }, {
      name: '士林區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [738, 736, 753, 773, 802, 826, 885, 904, 942],
    }, {
      name: '北投區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [698, 672, 669, 710, 739, 768, 830, 844, 834],
    }, {
      name: '文山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [690, 645, 680, 699, 717, 751, 794, 829, 840],
    }, {
      name: '新北市',
      color: '#a2dad1',
      marker: { symbol: 'circle' },
      zIndex: 10,
      visible: true,
      data: [508, 484, 507, 538, 559, 583, 627, 652, 664],
    }, {
      name: '板橋區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [538, 519, 537, 589, 619, 631, 679, 701, 739],
    }, {
      name: '新莊區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [467, 433, 466, 492, 526, 553, 605, 650, 656],
    }, {
      name: '中和區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [566, 536, 561, 584, 606, 633, 682, 700, 709],
    }, {
      name: '永和區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [610, 582, 603, 627, 642, 667, 701, 741, 754],
    }, {
      name: '土城區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [455, 428, 454, 476, 506, 547, 569, 576, 598],
    }, {
      name: '樹林區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [387, 364, 399, 422, 436, 470, 503, 534, 556],
    }, {
      name: '三峽區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [363, 361, 389, 418, 454, 478, 520, 544, 584],
    }, {
      name: '鶯歌區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [298, 263, 293, 317, 341, 364, 415, 405, 412],
    }, {
      name: '三重區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [546, 516, 533, 572, 601, 641, 701, 732, 727],
    }, {
      name: '蘆洲區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [463, 457, 469, 527, 541, 583, 611, 626, 655],
    }, {
      name: '五股區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [393, 349, 399, 413, 450, 449, 523, 600, 605],
    }, {
      name: '泰山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [431, 407, 435, 452, 467, 493, 562, 562, 592],
    }, {
      name: '林口區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [424, 385, 425, 459, 479, 510, 568, 617, 662],
    }, {
      name: '八里區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [369, 385, 388, 412, 441, 436, 495, 509, 513],
    }, {
      name: '淡水區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [496, 507, 538, 569, 541, 542, 589, 592, 584],
    }, {
      name: '三芝區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [261, 255, 255, 277, 303, 327, 299, 307, 315],
    }, {
      name: '汐止區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [465, 448, 469, 482, 512, 553, 585, 619, 625],
    }, {
      name: '新店區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [550, 519, 539, 571, 585, 614, 659, 688, 687],
    }, {
      name: '深坑區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [451, 407, 411, 463, 459, 488, 534, 589, 528],
    }],
  })
}

export function chartIncreaseSeparateSuite() {
  Highcharts.chart('chart-increase', {
    chart: { type: 'line' },
    title: { text: '' },
    xAxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: { text: '元/坪' },
      labels: {
        style: { fontSize: '14px' },
      },
    },
    legend: {
      itemStyle: {
        fontSize: '14px',
      },
    },
    tooltip: { headerFormat: '<b>{series.name}</b><br/>', pointFormat: '{point.y} 元/坪' },
    plotOptions: {
      series: {
        events: {
          legendItemClick() {
            if (this.color === '#e6e6e6') {
              this.update({ zIndex: 11, color: '#ede09f' })
              return false
            }
            if (this.color === '#ede09f') {
              this.update({ zIndex: 1, color: '#e6e6e6' })
              return false
            }
            return true
          },
        },
      },
    },
    credits: { enabled: false },
    series: [{
      name: '台北市',
      color: '#ae8abb',
      marker: { symbol: 'circle' },
      zIndex: 10,
      visible: true,
      data: [1324, 1257, 1298, 1350, 1371, 1397, 1447, 1490, 1504],
    }, {
      name: '中正區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1402, 1307, 1344, 1424, 1436, 1470, 1516, 1581, 1571],
    }, {
      name: '萬華區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1063, 1053, 1072, 1103, 1137, 1207, 1260, 1309, 1323],
    }, {
      name: '大同區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1110, 1118, 1160, 1248, 1227, 1302, 1339, 1411, 1386],
    }, {
      name: '中山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1304, 1252, 1283, 1348, 1401, 1399, 1481, 1527, 1550],
    }, {
      name: '松山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1330, 1297, 1364, 1421, 1412, 1451, 1519, 1573, 1596],
    }, {
      name: '大安區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1577, 1487, 1549, 1591, 1594, 1621, 1673, 1716, 1739],
    }, {
      name: '信義區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1447, 1387, 1433, 1459, 1490, 1513, 1571, 1597, 1606],
    }, {
      name: '內湖區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1412, 1163, 1206, 1266, 1312, 1319, 1359, 1398, 1449],
    }, {
      name: '南港區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1212, 1131, 1147, 1229, 1264, 1251, 1324, 1329, 1422],
    }, {
      name: '士林區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1276, 1245, 1285, 1301, 1329, 1370, 1386, 1464, 1462],
    }, {
      name: '北投區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1156, 1094, 1150, 1192, 1212, 1246, 1272, 1290, 1288],
    }, {
      name: '文山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1114, 1119, 1142, 1197, 1195, 1227, 1244, 1285, 1293],
    }, {
      name: '新北市',
      color: '#a2dad1',
      marker: { symbol: 'circle' },
      zIndex: 10,
      visible: true,
      data: [951, 899, 950, 968, 995, 1003, 1043, 1069, 1094],
    }, {
      name: '板橋區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1052, 992, 1009, 1072, 1107, 1103, 1147, 1180, 1209],
    }, {
      name: '新莊區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [885, 841, 862, 870, 907, 959, 1007, 1030, 1054],
    }, {
      name: '中和區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [974, 913, 1026, 989, 1002, 1030, 1071, 1079, 1105],
    }, {
      name: '永和區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1112, 1026, 1032, 1086, 1102, 1121, 1160, 1195, 1211],
    }, {
      name: '土城區',
      color: '#e6e6e6',
      data: [839, 790, 833, 876, 882, 898, 947, 974, 1016],
    }, {
      name: '樹林區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [742, 751, 789, 869, 948, 924, 931, 938, 955],
    }, {
      name: '三峽區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [614, 580, 584, 647, 694, 715, 775, 809, 820],
    }, {
      name: '三重區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [971, 932, 968, 991, 1037, 1036, 1082, 1113, 1144],
    }, {
      name: '蘆洲區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [954, 951, 973, 1021, 1035, 1034, 1067, 1129, 1156],
    }, {
      name: '五股區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [734, 721, 778, 795, 791, 842, 862, 1002, 920],
    }, {
      name: '泰山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [973, 865, 846, 891, 913, 896, 912, 979, 973],
    }, {
      name: '林口區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [728, 757, 801, 822, 865, 836, 888, 908, 1021],
    }, {
      name: '淡水區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [747, 709, 735, 756, 776, 773, 815, 823, 845],
    }, {
      name: '汐止區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [788, 746, 813, 851, 876, 892, 950, 998, 1027],
    }, {
      name: '新店區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1106, 1056, 1082, 1113, 1132, 1140, 1167, 1210, 1226],
    }],
  })
}

export function chartIncreaseShareSuite() {
  Highcharts.chart('chart-increase', {
    chart: { type: 'line' },
    title: { text: '' },
    xAxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: { text: '元/坪' },
      labels: {
        style: { fontSize: '14px' },
      },
    },
    legend: {
      itemStyle: {
        fontSize: '14px',
      },
    },
    tooltip: { headerFormat: '<b>{series.name}</b><br/>', pointFormat: '{point.y} 元/坪' },
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
        },
        events: {
          legendItemClick() {
            if (this.color === '#e6e6e6') {
              this.update({ zIndex: 11, color: '#ede09f' })
              return false
            }
            if (this.color === '#ede09f') {
              this.update({ zIndex: 1, color: '#e6e6e6' })
              return false
            }
            return true
          },
        },
      },
    },
    credits: { enabled: false },
    series: [{
      name: '台北市',
      color: '#ae8abb',
      marker: { symbol: 'circle' },
      zIndex: 10,
      visible: true,
      data: [1386, 1316, 1350, 1369, 1382, 1387, 1442, 1471, 1489],
    }, {
      name: '中正區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1506, 1338, 1393, 1416, 1445, 1391, 1503, 1452, 1530],
    }, {
      name: '萬華區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1127, 1114, 1083, 1163, 1127, 1179, 1219, 1234, 1254],
    }, {
      name: '大同區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1188, 1142, 1241, 1270, 1279, 1265, 1375, 1338, 1435],
    }, {
      name: '中山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1400, 1320, 1336, 1368, 1400, 1412, 1428, 1490, 1487],
    }, {
      name: '松山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1464, 1381, 1382, 1401, 1414, 1430, 1510, 1523, 1552],
    }, {
      name: '大安區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1613, 1462, 1489, 1542, 1557, 1549, 1603, 1644, 1693],
    }, {
      name: '信義區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1404, 1369, 1390, 1433, 1418, 1424, 1487, 1502, 1570],
    }, {
      name: '內湖區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1297, 1326, 1375, 1353, 1395, 1388, 1437, 1439, 1480],
    }, {
      name: '南港區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1320, 1219, 1265, 1251, 1292, 1296, 1423, 1396, 1379],
    }, {
      name: '士林區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1327, 1249, 1289, 1341, 1341, 1353, 1363, 1534, 1447],
    }, {
      name: '北投區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1320, 1243, 1296, 1321, 1295, 1275, 1329, 1394, 1369],
    }, {
      name: '文山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1308, 1258, 1280, 1277, 1297, 1293, 1339, 1358, 1391],
    }, {
      name: '新北市',
      color: '#a2dad1',
      marker: { symbol: 'circle' },
      zIndex: 10,
      visible: true,
      data: [1092, 1028, 1056, 1072, 1085, 1086, 1118, 1138, 1158],
    }, {
      name: '板橋區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1135, 1059, 1100, 1116, 1122, 1150, 1167, 1197, 1210],
    }, {
      name: '新莊區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [968, 952, 942, 954, 1010, 997, 1057, 1037, 1112],
    }, {
      name: '中和區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1118, 1030, 1051, 1070, 1071, 1070, 1132, 1143, 1158],
    }, {
      name: '永和區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1208, 1136, 1142, 1177, 1167, 1178, 1209, 1243, 1255],
    }, {
      name: '土城區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1009, 942, 970, 975, 1016, 979, 1039, 1057, 1077],
    }, {
      name: '樹林區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [877, 869, 885, 930, 915, 908, 899, 1011, 988],
    }, {
      name: '三重區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1029, 994, 1018, 1053, 1104, 1077, 1093, 1151, 1186],
    }, {
      name: '蘆洲區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1045, 972, 1040, 1091, 1052, 1047, 1098, 1135, 1126],
    }, {
      name: '泰山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [969, 928, 875, 942, 903, 987, 944, 993, 966],
    }, {
      name: '淡水區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [829, 804, 861, 856, 954, 925, 964, 998, 938],
    }, {
      name: '汐止區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1180, 1050, 1072, 1054, 1073, 1080, 1112, 1096, 1112],
    }, {
      name: '新店區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1228, 1159, 1162, 1164, 1190, 1178, 1250, 1221, 1256],
    }],
  })
}

export function chartIncreaseRoom() {
  Highcharts.chart('chart-increase', {
    chart: { type: 'line' },
    title: { text: '' },
    xAxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: { text: '元/坪' },
      labels: {
        style: { fontSize: '14px' },
      },
    },
    legend: {
      itemStyle: {
        fontSize: '14px',
      },
    },
    tooltip: { headerFormat: '<b>{series.name}</b><br/>', pointFormat: '{point.y} 元/坪' },
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
        },
        events: {
          legendItemClick() {
            if (this.color === '#e6e6e6') {
              this.update({ zIndex: 11, color: '#ede09f' })
              return false
            }
            if (this.color === '#ede09f') {
              this.update({ zIndex: 1, color: '#e6e6e6' })
              return false
            }
            return true
          },
        },
      },
    },
    credits: { enabled: false },
    series: [{
      name: '台北市',
      color: '#ae8abb',
      marker: { symbol: 'circle' },
      zIndex: 10,
      visible: true,
      data: [1237, 1196, 1220, 1294, 1324, 1277, 1288, 1318, 1341],
    }, {
      name: '中正區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1271, 1259, 1261, 1383, 1337, 1370, 1384, 1366, 1394],
    }, {
      name: '萬華區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1056, 1001, 1011, 1083, 976, 1007, 1017, 1145, 1189],
    }, {
      name: '大同區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1101, 1168, 1192, 1123, 1162, 1157, 1184, 1175, 1266],
    }, {
      name: '中山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1225, 1141, 1192, 1468, 1736, 1264, 1240, 1311, 1317],
    }, {
      name: '松山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1262, 1214, 1240, 1302, 1277, 1276, 1332, 1366, 1373],
    }, {
      name: '大安區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1387, 1326, 1365, 1405, 1419, 1504, 1431, 1465, 1542],
    }, {
      name: '信義區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1336, 1286, 1271, 1282, 1311, 1311, 1362, 1381, 1369],
    }, {
      name: '內湖區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1210, 1189, 1222, 1237, 1244, 1239, 1309, 1267, 1301],
    }, {
      name: '南港區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1261, 1125, 1101, 1235, 1172, 1168, 1182, 1291, 1270],
    }, {
      name: '士林區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1138, 1121, 1141, 1142, 1160, 1151, 1134, 1248, 1262],
    }, {
      name: '北投區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1188, 1091, 1154, 1133, 1203, 1145, 1202, 1145, 1146],
    }, {
      name: '文山區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1132, 1099, 1137, 1201, 1191, 1130, 1204, 1245, 1237],
    }, {
      name: '新北市',
      color: '#a2dad1',
      marker: { symbol: 'circle' },
      zIndex: 10,
      visible: true,
      data: [1027, 972, 969, 1006, 995, 1014, 1039, 1013, 1068],
    }, {
      name: '板橋區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [979, 966, 993, 996, 1033, 1012, 1075, 1026, 1055],
    }, {
      name: '新莊區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [862, 822, 938, 958, 929, 935, 895, 904, 934],
    }, {
      name: '中和區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1027, 1046, 957, 1103, 1001, 983, 1036, 986, 1032],
    }, {
      name: '永和區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1073, 1041, 1060, 1049, 1039, 1101, 1113, 1118, 1157],
    }, {
      name: '土城區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [860, 870, 811, 884, 880, 825, 848, 872, 919],
    }, {
      name: '樹林區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [821, 897, 849, 900, 852, 912, 909, 884, 974],
    }, {
      name: '三重區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [898, 915, 887, 964, 967, 980, 1005, 951, 1042],
    }, {
      name: '蘆洲區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1019, 989, 860, 927, 1024, 965, 987, 890, 953],
    }, {
      name: '汐止區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [993, 1032, 1032, 995, 969, 1017, 988, 1069, 1047],
    }, {
      name: '新店區',
      color: '#e6e6e6',
      marker: { enabled: false },
      data: [1047, 1044, 1036, 1059, 1124, 1178, 1128, 1061, 1212],
    }],
  })
}

export function chartGender() {
  Highcharts.chart('chart-gender', {
    chart: { type: 'column' },
    title: { text: '限男／女的比例（共有 8.76% 限性別）' },
    xAxis: {
      categories: ['獨立套房', '分租套房', '雅房', '整層住家', '其他'],
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      max: 100,
      title: { text: '比例', align: 'middle' },
      labels: {
        style: { fontSize: '14px' },
      },
    },
    legend: {
      itemStyle: { fontSize: '14px' },
    },
    tooltip: { headerFormat: '<b>{point.x}</b><br/>', pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}' },
    plotOptions: {
      column: { stacking: 'normal', dataLabels: { enabled: true, color: '#000', style: { fontSize: '14px', fontWeight: '300', textOutline: 0 } } },
    },
    series: [{
      name: '女生',
      color: '#ee9dbd',
      data: [8.38, 21.43, 40.19, 0, 0],
    }, {
      name: '不限',
      color: '#ae8abb',
      data: [90.99, 76.13, 45.44, 100, 100],
    }, {
      name: '男生',
      color: '#a2dad1',
      data: [0.63, 2.44, 14.37, 0, 0],
    }],
    credits: { enabled: false },
  })
}

export function chartPet() {
  Highcharts.chart('chart-pet', {
    chart: { type: 'pie' },
    title: { text: '可養寵物的比例', margin: 0 },
    tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b>' },
    plotOptions: {
      pie: {
        showInLegend: true,
        dataLabels: {
          distance: -70,
          format: '{point.percentage:.1f} %',
          style: {
            color: '#000', fontSize: '14px', fontWeight: '300', textOutline: 0,
          },
        },
      },
    },
    legend: {
      itemStyle: { fontSize: '14px' },
    },
    series: [{
      data: [{
        name: '可以',
        color: '#ae8abb',
        y: 26.16,
      }, {
        name: '不可以',
        color: '#a2dad1',
        y: 73.84,
        sliced: true,
        selected: true,
      }],
    }],
    credits: { enabled: false },
  })
}

export function chartCook() {
  Highcharts.chart('chart-cook', {
    chart: { type: 'column' },
    title: { text: '可以開伙比例' },
    xAxis: {
      categories: ['獨立套房', '分租套房', '雅房', '整層住家', '其他'],
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      max: 100,
      title: { text: '比例 (%)' },
      labels: {
        style: { fontSize: '14px' },
      },
    },
    legend: {
      padding: 30,
      verticalAlign: 'top',
      itemStyle: { fontSize: '14px' },
    },
    tooltip: { headerFormat: '<b>{point.x}</b><br/>', pointFormat: '{series.name} {point.y}%<br/>' },
    plotOptions: {
      column: { stacking: 'normal', dataLabels: { enabled: true, color: '#000', style: { fontSize: '14px', fontWeight: '300', textOutline: 0 } } },
    },
    credits: { enabled: false },
    series: [{
      name: '可以',
      color: '#ae8abb',
      data: [60.46, 27.52, 33.67, 97.42, 83.33],
    }, {
      name: '不可以',
      color: '#a2dad1',
      data: [39.54, 72.48, 66.33, 2.58, 16.67],
    }],
  })
}

export function chartDevelop() {
  Highcharts.chart('chart-develop', {
    chart: { type: 'column' },
    title: { text: '住宅發展分布不均' },
    xAxis: {
      categories: ['台灣分佈', '先進國家分佈'],
      crosshair: true,
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: { text: '百分比 (％)', align: 'middle' },
      labels: {
        overflow: 'justify',
        style: { fontSize: '14px' },
      },
    },
    legend: {
      itemStyle: { fontSize: '14px' },
    },
    tooltip: {
      pointFormat: '{series.name} {point.y}%<br/>',
    },
    plotOptions: {
      column: { stacking: 'normal', dataLabels: { enabled: true, color: '#000', style: { fontSize: '14px', fontWeight: '300', textOutline: 0 } } },
    },
    series: [{
      name: '公共住宅',
      data: [0.095, 10],
      color: '#ae8abb',
      stack: 'rent',
    }, {
      name: '租屋市場',
      data: [8.41, 25],
      color: '#ae8abb',
      stack: 'rent',
    }, {
      name: '購屋市場',
      data: [91.495, 65],
      color: '#a2dad1',
      stack: 'buy',
    }],
    credits: { enabled: false },
  })
}

export function chartSelfRate() {
  Highcharts.chart('chart-selfRate', {
    chart: { type: 'column' },
    title: { text: '房屋自有率過高' },
    xAxis: {
      type: 'category',
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: { text: '百分比 (％)', align: 'middle' },
      labels: { overflow: 'justify', style: { fontSize: '14px' } },
    },
    legend: {
      itemStyle: { fontSize: '14px' },
    },
    tooltip: {
      pointFormat: '{series.name} {point.y}%<br/>',
    },
    plotOptions: {
      column: { stacking: 'normal', dataLabels: { enabled: true, color: '#000', style: { fontSize: '14px', fontWeight: '300', textOutline: 0 } } },
    },
    series: [{
      name: '公共住宅',
      showInLegend: false,
      data: [
        ['德國', 44.0],
        ['法國', 55.0],
        ['荷蘭', 54.0],
        ['南韓', 54.0],
        ['日本', 61.2],
        ['美國', 67.8],
        ['英國', 70.0],
        ['台灣', 87.4],
        ['新加坡', 90.1],
      ],
      dataLabels: {
        enabled: true,
      },
      color: '#ae8abb',
    }],
    credits: { enabled: false },
  })
}

export function chartRoR() {
  Highcharts.chart('chart-ror', {
    chart: { type: 'column' },
    title: { text: '租金報酬率偏低' },
    xAxis: {
      type: 'category',
      labels: {
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: { text: '百分比 (％)', align: 'middle' },
      labels: { overflow: 'justify', style: { fontSize: '14px' } },
    },
    tooltip: {
      pointFormat: '{series.name} {point.y}%<br/>',
    },
    plotOptions: {
      column: { stacking: 'normal', dataLabels: { enabled: true, color: '#000', style: { fontSize: '14px', fontWeight: '300', textOutline: 0 } } },
    },
    series: [{
      name: '公共住宅',
      showInLegend: false,
      data: [
        ['台灣', 1.57],
        ['新加坡', 2.54],
        ['日本', 3.43],
        ['香港', 2.75],
        ['美國', 3],
        ['英國', 3.21],
        ['荷蘭', 5.45],
        ['澳洲', 4.39],
      ],
      dataLabels: {
        enabled: true,
      },
      color: '#ae8abb',
    }],
    credits: { enabled: false },
  })
}
