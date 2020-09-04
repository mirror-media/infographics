export default {
  highcharts1: {
    exporting: {
      enabled: false,
    },
    chart: {
      marginBottom: -30,
      marginTop: 0,
      marginLeft: 10,
      marginRight: 10,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: '你是哪一種社工？',
      align: 'center',
      verticalAlign: 'top',
      style: {
        fontSize: '25px',
      }
    },
    tooltip: {
      pointFormat: '{point.y:.f}%',
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          format: '{point.name} {point.y:.f}%',
          style: {
            fontWeight: 'normal',
            color: 'white',
            textOutline: '0px',
            fontSize: "13px",
          },
          x: 8,
          y: -8
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '70%'],
        size: '100%'
      }
    },
    series: [{
      type: 'pie',
      innerSize: '50%',
      data: [{
        name: '一般性社工',
        color: '#5C7886',
        y: 56,
      }, {
        name: '保護性社工',
        color: '#FABA45',
        y: 30
      }, {
        name: '社會工作相關<br>職位*',
        color: '#B3B3B3',
        y: 14
      }]
    }]
  },
  highcharts2: {
    chart: {
      type: 'bar',
      height: '500px'
    },
    exporting: {
      enabled: false,
    },
  
    title: {
      text: '關於身體安全健康或心理精神層面<br>你曾受到哪種明確對象的傷害？',
      align: 'center',
    },
    subtitle: {
      text: '可複選'
    },
    xAxis: {
      style: {
        fontSize: "12px",
      },
      categories: ['來自服務對象', '來自機構主管、督導', '來自機構同事<br>（含正職、兼職及實習生）', '來自服務對象之親友', '來自服務對象之相對人', '來自環境（非人為）', '來自社區民眾', '來自其他', '來自網絡單位', '來自民意代表', '來自政策、制度', '來自當事人委任律師', '來自自己', '來自媒體'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: '占比',
        align: 'high'
      },
      labels: {
        overflow: 'justify',
        style: {
          fontSize: "12px"
        }
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{point.y} %',
          style: {
            textOutline: '0px',
            fontWeight: 'normal',
          }
        }
      }
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    series: [{
      colorByPoint: true,
      colors: ['#5C7886', '#FBCD78'],
      fontSize: '12px',
      name: '占比',
      data: [75.0, 66.4, 42.9, 36.7, 29.0, 22.8, 21.0, 2.8, 2.8, 2.2, 1.9, 0.6, 0.6, 0.3]
    }]
  },
  highcharts3: {
    chart: {
      type: 'bar',
      height: '500px'
    },
    exporting: {
      enabled: false,
    },
  
    title: {
      text: '關於服務對象<br>請勾選出你曾遇過或正在發生的事情',
      align: 'center',
    },
    subtitle: {
      text: '可複選'
    },
    xAxis: {
      style: {
        fontSize: "12px",
      },
      categories: ['受到公然侮辱，覺得人格受損<br>例如被罵髒話', '被服務對象言語恐嚇威<br>內心感到恐懼害怕', '受到服務對象或其親友<br>性騷擾或性侵害', '遭受服務對象或其親友的器具攻擊<br>或直接身體攻擊', '其他主觀感受恐嚇威脅的情況<br>例如被跟蹤', '從來沒有因服務對象受傷過', '感染了服務對象身上的傳染疾病<br>例如疥瘡、開放性肺結核...等', '被以令人生畏的物品恐嚇<br>例如血書、斷頭娃娃、沾血衛生紙...等', '被服務對象或其相對人、親友<br>責備或情緒勒索', '服務對象情緒不穩定導致心理負擔'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: '占比',
        align: 'high'
      },
      labels: {
        overflow: 'justify',
        style: {
          fontSize: "12px"
        }
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{point.y} %',
          style: {
            textOutline: '0px',
            fontWeight: 'normal',
          }
        }
      }
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    series: [{
      colorByPoint: true,
      colors: ['#FBCD78', '#FBCD78', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886'],
      fontSize: '12px',
      name: '占比',
      data: [63.0, 60.2, 19.4, 19.1, 18.2, 11.4, 9.0, 3.7, 1.5, 1.2]
    }]
  },
  highcharts4: {
    chart: {
      type: 'bar',
      height: '480px'
    },
    exporting: {
      enabled: false,
    },
  
    title: {
      text: '關於工作型態<br>請勾選出你曾遇過或正在發生的事情',
      align: 'center',
    },
    subtitle: {
      text: '可複選'
    },
    xAxis: {
      style: {
        fontSize: "12px",
      },
      categories: ['案量龐大<br>訪視做不完、紀錄寫不完', '壓力大到睡不好<br>常感身體無故不適', '因工作型態無法按時吃飯<br>導致腸胃等消化器官不適或內分泌失調', '輪班或值機後隔天仍要正常上班<br>感到身心能量過度消耗', '從來沒有因工作型態受傷過', '假日或下班後回到家<br>仍需要自行加班完成工作', '因工作型態而憋尿、減少補充水份<br>導致泌尿道感染發炎', '因工作型態壓縮與家人相處時間', '壓力大經期絮亂'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: '占比',
        align: 'high'
      },
      labels: {
        overflow: 'justify',
        style: {
          fontSize: "12px"
        }
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{point.y} %',
          style: {
            textOutline: '0px',
            fontWeight: 'normal',
          }
        }
      }
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    series: [{
      colorByPoint: true,
      colors: ['#FBCD78', '#FBCD78', '#FBCD78', '#FBCD78', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886'],
      fontSize: '12px',
      name: '占比',
      data: [72.2, 71.9, 61.4, 39.5, 5.9, 1.5, 0.9, 0.6, 0.3]
    }]
  },
  highcharts5: {
    chart: {
      type: 'bar',
      height: '600px'
    },
    exporting: {
      enabled: false,
    },
  
    title: {
      text: '關於心理層面<br>請勾選出你曾遇過或正在發生的事情',
      align: 'center',
    },
    subtitle: {
      text: '可複選'
    },
    xAxis: {
      style: {
        fontSize: "12px",
      },
      categories: ['工作長期累積的負能量<br>引發憂鬱、悲傷、沮喪等情緒', '為服務對象計劃處遇時遇到重重困難<br>而感到挫敗，對自己或工作本身失望', '由於擔心服務對象的狀況<br>即使休假也難以放鬆休息', '因選項所有狀況而產生難以消化的心理壓力', '在協助服務對象的過程中有所觸動<br>勾起過去的創傷回憶', '必須非常努力才能完成工作<br>沒辦法充分的休息', '看或聽服務對象受暴狀況與細節<br>彷彿自己也被傷害，感到焦慮、害怕不安', '遭受職場霸凌<br>而感到被孤立、憤怒、傷心或無助等感受', '與夥伴合作上發生爭執或理念不合', '工作遇到困難時<br>主管及督導給的支持協助不足', '服務對象死亡造成心理陰影', '因心理壓力產生身心症', '民意代表關切造成心理負擔', '從來沒有心理層面的受傷'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: '占比',
        align: 'high'
      },
      labels: {
        overflow: 'justify',
        style: {
          fontSize: "12px"
        }
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{point.y} %',
          style: {
            textOutline: '0px',
            fontWeight: 'normal',
          }
        }
      }
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    series: [{
      colorByPoint: true,
      colors: ['#FBCD78', '#FBCD78', '#FBCD78', '#FBCD78', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886', '#5C7886'],
      fontSize: '12px',
      name: '占比',
      data: [77.2, 72.8, 61.7, 56.2, 51.9, 50.9, 32.4, 27.5, 1.9, 1.5, 0.9, 0.6, 0.6, 0.3]
    }]
  },
  highcharts6: {
    exporting: {
      enabled: false,
    },
    chart: {
      marginBottom: -100,
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: '你是否曾因傷向機構或雇主<br>申請職災給付或補償？',
      align: 'center',
      verticalAlign: 'top',
      style: {
        fontSize: '25px',
      }
  
    },
    tooltip: {
      pointFormat: '{point.y:.f}%',
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          format: '{point.name} {point.y:.f}%',
          style: {
            fontWeight: 'normal',
            color: 'white',
            textOutline: '0px',
            fontSize: "13px",
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '70%'],
        size: '100%'
      }
    },
    series: [{
      type: 'pie',
      innerSize: '50%',
      data: [{
        name: '否',
        color: '#5C7886',
        y: 90,
      }, {
        name: '是',
        color: '#FABA45',
        y: 10
      }]
    }]
  }
}
