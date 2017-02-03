(function (H) {
    function deferRender (proceed) {
        var series = this, 
            $renderTo = $(this.chart.container.parentNode);

        // It is appeared, render it
        if ($renderTo.is(':appeared') || !series.options.animation) {
            proceed.call(series);
            
        // It is not appeared, halt renering until appear
        } else  {
            $renderTo.appear(); // Initialize appear plugin
            $renderTo.on('appear', function () {
                proceed.call(series);
            });
        }
    };
    
    H.wrap(H.Series.prototype, 'render', deferRender);
    
}(Highcharts));

$(function () {

    Highcharts.setOptions({
        lang: {
            numericSymbolMagnitude: 10,
            numericSymbols: ['十','百','千', '萬']
        }
    });

    Highcharts.chart('fig1', {
        chart: {
            type: 'bar',
            backgroundColor:'rgba(255, 255, 255, 0)'
        },
        colors: ['rgba(63,134,155,0.8)',  'rgba(239,223,111,0.8)', 'rgba(97,186,109,0.8)'],
        title: {
            text: '柴油車的空氣污染',
            style: {
                display: 'none'
            }
        },
        xAxis: {
            categories: ['六輕', '臺中電廠', '大貨車一期', '大貨車二期', '大貨車三期', '大貨車四期' , '大貨車五期', '小貨車', '公車/客運', '大客車', '小客車'],
            title: {
                text: null
            },
            tickColor: '#cbcbcb',
            lineColor: '#cbcbcb',
            lineWidth: 0.75,
            labels: {
                style: {
                    color: '#FFFFFF'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '排放量 (噸/年)',
                align: 'high',
                style: {
                    color: '#FFFFFF'
                }
            },
            gridLineWidth: 0.75,
            gridLineColor: "#cbcbcb",
            gridLineDashStyle: 'Dash',
            labels: {
                overflow: 'justify',
                style: {
                    color: '#FFFFFF'
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' 噸',
            backgroundColor: '#000000',
            borderWidth: 0,
            style: {
                color: '#FFFFFF'
            }
        },
        plotOptions: {
            bar: {
                minPointLength: 5,
                dataLabels: {
                    enabled: false
                },
                borderWidth: 0
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'bottom',
            x: -20,
            y: -60,
            floating: true,
            borderWidth: 0,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '氮氧化物',
            data: [14671, 23188, 49132, 40623, 17100, 5218, 933, 8836, 7492, 9201, 806]
        }, {
            name: '原生性PM 2.5',
            data: [729, 1235, 3702, 2569, 442, 119, 12, 2101, 359, 480, 209]
        }, {
            name: '揮發性有機物',
            data: [2909, 3, 5188, 3590, 1121, 158, 13, 808, 452, 639, 62]
        }],
        exporting: { enabled: false }
    });
    Highcharts.chart('fig2', {
        chart: {
            backgroundColor:'rgba(255, 255, 255, 0)'
        },
        colors: ['rgba(239,223,111,0.8)', 'rgba(63,134,155,0.8)', 'rgba(97,186,109,0.8)'],
        title: {
            text: '柴油車期別分析',
            style: {
                display: 'none'
            }
        },
        xAxis: [{
            categories: ['一期', '二期', '三期', '四期', '五期'],
            crosshair: {
                color: '#cbcbcb',
                width: 0.75,
                dashStyle: 'Dash'
            },
            tickColor: '#cbcbcb',
            tickWidth: 0.75,
            lineColor: '#cbcbcb',
            gridLineColor: '#cbcbcb',
            lineWidth: 0.75,
            labels: {
                style: {
                    color: '#FFF'
                }
            },
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}%',
                style: {
                    color: '#FFF'
                }
            },
            gridLineDashStyle: 'Dash',
            gridLineColor: '#cbcbcb',
            gridLineWidth: 0.75,
            title: {
                text: '煙度標準',
                style: {
                    color: '#FFF'
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: '大貨車 (輛)',
                style: {
                    color: '#FFF'
                }
            },
            labels: {
                // format: '{value} 輛',
                style: {
                    color: '#FFF'
                }
            }

        }],
        tooltip: {
            shared: true,
            backgroundColor: '#000000',
            borderWidth: 0,
            style: {
                color: '#FFFFFF'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            x: -80,
            verticalAlign: 'top',
            y: 40,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: '大貨車數量',
            type: 'column',
            borderWidth: 0,
            yAxis: 1,
            data: [36641, 45103, 31867, 26947, 26051],
            tooltip: {
                valueSuffix: ' 輛'
            }

        }, {
            name: '煙度標準',
            type: 'spline',
            data: [50, 40, 35, 30, 20],
            tooltip: {
                valueSuffix: ' ％'
            }
        }],
        credits: {
            enabled: false
        },
        exporting: { enabled: false }
    });

    Highcharts.chart('fig3', {
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        title: {
            text: '北部',
            style: {
                color: '#FFF'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        legend: {
            itemStyle: {
                color: '#ffffff',
            },
            itemHoverStyle: {
                color: '#CDCDCD'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: '所佔污染源',
            data: [{
                    borderWidth: 0,
                    color: "rgba(63, 134, 155,0.8)",
                    name: "境外",
                    y: 56
                },
                {
                    borderWidth: 0,
                    color: "rgba(239, 223, 111,0.8)",
                    name: "境內固定污染源",
                    y: 14
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 174, 112,0.8)",
                    name: "境內移動污染源",
                    y: 9
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 121, 112,0.8)",
                    name: "境內其他（如建築工地、道路揚塵等）",
                    y: 21
                },
            ],
            size: '50%',
            innerSize: '30%',
            showInLegend: true,
            borderWidth: 0,
            dataLabels: {
                useHTML: true,
                color: '#ffffff',
                formatter: function() {
                    // display only if larger than 1
                    if(this.point.name === "境內其他（如建築工地、道路揚塵等）")
                        return this.y > 1 ? '<b>境內其他</b> ' + this.y + '%' : null;
                    else
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    series: [{
                        name: '所佔污染源',
                        data: [{
                                borderWidth: 0,
                                color: "rgba(63, 134, 155,0.8)",
                                name: "境外",
                                y: 56
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(239, 223, 111,0.8)",
                                name: "境內固定污染源",
                                y: 14
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 174, 112,0.8)",
                                name: "境內移動污染源",
                                y: 9
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 121, 112,0.8)",
                                name: "境內其他（如建築工地、道路揚塵等）",
                                y: 21
                            }
                        ],
                        size: '50%',
                        innerSize: '30%',
                        showInLegend: true,
                        borderWidth: 0,
                        dataLabels: {
                            useHTML: true,
                            color: '#ffffff',
                            formatter: function() {
                                // display only if larger than 1
                                return this.y > 1 ? '' + this.y + '%' : null;
                            }
                        }
                    }],
                }
            }]
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                allowPointSelect: false,
                point: {
                    events: {
                        legendItemClick: function(e) {
                            e.preventDefault();
                        }
                    }
                }
            }
        },
        exporting: {
            enabled: false
        }
    });
    Highcharts.chart('fig4', {
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        title: {
            text: '中部',
            style: {
                color: '#FFF'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        legend: {
            itemStyle: {
                color: '#ffffff',
            },
            itemHoverStyle: {
                color: '#CDCDCD'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: '所佔污染源',
            data: [{
                    borderWidth: 0,
                    color: "rgba(63, 134, 155,0.8)",
                    name: "境外",
                    y: 33
                },
                {
                    borderWidth: 0,
                    color: "rgba(239, 223, 111,0.8)",
                    name: "境內固定污染源",
                    y: 26
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 174, 112,0.8)",
                    name: "境內移動污染源",
                    y: 17
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 121, 112,0.8)",
                    name: "境內其他（如建築工地、道路揚塵等）",
                    y: 24
                }
            ],
            size: '50%',
            innerSize: '30%',
            showInLegend: true,
            borderWidth: 0,
            dataLabels: {
                useHTML: true,
                color: '#ffffff',
                formatter: function() {
                    // display only if larger than 1
                    if(this.point.name === "境內其他（如建築工地、道路揚塵等）")
                        return this.y > 1 ? '<b>境內其他</b> ' + this.y + '%' : null;
                    else
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    series: [{
                        name: '所佔污染源',
                        data: [{
                                borderWidth: 0,
                                color: "rgba(63, 134, 155,0.8)",
                                name: "境外",
                                y: 33
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(239, 223, 111,0.8)",
                                name: "境內固定污染源",
                                y: 26
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 174, 112,0.8)",
                                name: "境內移動污染源",
                                y: 17
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 121, 112,0.8)",
                                name: "境內其他（如建築工地、道路揚塵等）",
                                y: 24
                            }
                        ],
                        size: '50%',
                        innerSize: '30%',
                        showInLegend: true,
                        borderWidth: 0,
                        dataLabels: {
                            useHTML: true,
                            color: '#ffffff',
                            formatter: function() {
                                // display only if larger than 1
                                return this.y > 1 ? '' + this.y + '%' : null;
                            }
                        }
                    }],
                }
            }]
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                allowPointSelect: false,
                point: {
                    events: {
                        legendItemClick: function(e) {
                            e.preventDefault();
                        }
                    }
                }
            }
        },
        exporting: {
            enabled: false
        }
    });
    Highcharts.chart('fig5', {
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        title: {
            text: '雲嘉南',
            style: {
                color: '#FFF'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        legend: {
            itemStyle: {
                color: '#ffffff',
            },
            itemHoverStyle: {
                color: '#CDCDCD'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: '所佔污染源',
            data: [{
                    borderWidth: 0,
                    color: "rgba(63, 134, 155,0.8)",
                    name: "境外",
                    y: 33
                },
                {
                    borderWidth: 0,
                    color: "rgba(239, 223, 111,0.8)",
                    name: "境內固定污染源",
                    y: 24
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 174, 112,0.8)",
                    name: "境內移動污染源",
                    y: 20
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 121, 112,0.8)",
                    name: "境內其他（如建築工地、道路揚塵等）",
                    y: 23
                },
            ],
            size: '50%',
            innerSize: '30%',
            showInLegend: true,
            borderWidth: 0,
            dataLabels: {
                useHTML: true,
                color: '#ffffff',
                formatter: function() {
                    // display only if larger than 1
                    if(this.point.name === "境內其他（如建築工地、道路揚塵等）")
                        return this.y > 1 ? '<b>境內其他</b> ' + this.y + '%' : null;
                    else
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    series: [{
                        name: '所佔污染源',
                        data: [{
                                borderWidth: 0,
                                color: "rgba(63, 134, 155,0.8)",
                                name: "境外",
                                y: 33
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(239, 223, 111,0.8)",
                                name: "境內固定污染源",
                                y: 24
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 174, 112,0.8)",
                                name: "境內移動污染源",
                                y: 20
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 121, 112,0.8)",
                                name: "境內其他（如建築工地、道路揚塵等）",
                                y: 23
                            }
                        ],
                        size: '50%',
                        innerSize: '30%',
                        showInLegend: true,
                        borderWidth: 0,
                        dataLabels: {
                            useHTML: true,
                            color: '#ffffff',
                            formatter: function() {
                                // display only if larger than 1
                                return this.y > 1 ? '' + this.y + '%' : null;
                            }
                        }
                    }],
                }
            }]
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                allowPointSelect: false,
                point: {
                    events: {
                        legendItemClick: function(e) {
                            e.preventDefault();
                        }
                    }
                }
            }
        },
        exporting: {
            enabled: false
        }
    });
    Highcharts.chart('fig6', {
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        title: {
            text: '高屏',
            style: {
                color: '#FFF'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        legend: {
            itemStyle: {
                color: '#ffffff',
            },
            itemHoverStyle: {
                color: '#CDCDCD'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: '所佔污染源',
            data: [{
                    borderWidth: 0,
                    color: "rgba(63, 134, 155,0.8)",
                    name: "境外",
                    y: 29
                },
                {
                    borderWidth: 0,
                    color: "rgba(239, 223, 111,0.8)",
                    name: "境內固定污染源",
                    y: 29
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 174, 112,0.8)",
                    name: "境內移動污染源",
                    y: 22
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 121, 112,0.8)",
                    name: "境內其他（如建築工地、道路揚塵等）",
                    y: 19
                },
            ],
            size: '50%',
            innerSize: '30%',
            showInLegend: true,
            borderWidth: 0,
            dataLabels: {
                useHTML: true,
                color: '#ffffff',
                formatter: function() {
                    // display only if larger than 1
                    if(this.point.name === "境內其他（如建築工地、道路揚塵等）")
                        return this.y > 1 ? '<b>境內其他</b> ' + this.y + '%' : null;
                    else
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    series: [{
                        name: '所佔污染源',
                        data: [{
                                borderWidth: 0,
                                color: "rgba(63, 134, 155,0.8)",
                                name: "境外",
                                y: 29
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(239, 223, 111,0.8)",
                                name: "境內固定污染源",
                                y: 29
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 174, 112,0.8)",
                                name: "境內移動污染源",
                                y: 22
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 121, 112,0.8)",
                                name: "境內其他（如建築工地、道路揚塵等）",
                                y: 19
                            }
                        ],
                        size: '50%',
                        innerSize: '30%',
                        showInLegend: true,
                        borderWidth: 0,
                        dataLabels: {
                            useHTML: true,
                            color: '#ffffff',
                            formatter: function() {
                                // display only if larger than 1
                                return this.y > 1 ? '' + this.y + '%' : null;
                            }
                        }
                    }],
                }
            }]
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                allowPointSelect: false,
                point: {
                    events: {
                        legendItemClick: function(e) {
                            e.preventDefault();
                        }
                    }
                }
            }
        },
        exporting: {
            enabled: false
        }
    });
    Highcharts.chart('fig6-1', {
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        title: {
            text: '全國',
            style: {
                color: '#FFF'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        legend: {
            itemStyle: {
                color: '#ffffff',
            },
            itemHoverStyle: {
                color: '#CDCDCD'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: '所佔污染源',
            data: [{
                    borderWidth: 0,
                    color: "rgba(63, 134, 155,0.8)",
                    name: "境外",
                    y: 43
                },
                {
                    borderWidth: 0,
                    color: "rgba(239, 223, 111,0.8)",
                    name: "境內固定污染源",
                    y: 21
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 174, 112,0.8)",
                    name: "境內移動污染源",
                    y: 15
                },
                {
                    borderWidth: 0,
                    color: "rgba(237, 121, 112,0.8)",
                    name: "境內其他（如建築工地、道路揚塵等）",
                    y: 21
                },
            ],
            size: '50%',
            innerSize: '30%',
            showInLegend: true,
            borderWidth: 0,
            dataLabels: {
                useHTML: true,
                color: '#ffffff',
                formatter: function() {
                    // display only if larger than 1
                    if(this.point.name === "境內其他（如建築工地、道路揚塵等）")
                        return this.y > 1 ? '<b>境內其他</b> ' + this.y + '%' : null;
                    else
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    series: [{
                        name: '所佔污染源',
                        data: [{
                                borderWidth: 0,
                                color: "rgba(63, 134, 155,0.8)",
                                name: "境外",
                                y: 43
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(239, 223, 111,0.8)",
                                name: "境內固定污染源",
                                y: 21
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 174, 112,0.8)",
                                name: "境內移動污染源",
                                y: 15
                            },
                            {
                                borderWidth: 0,
                                color: "rgba(237, 121, 112,0.8)",
                                name: "境內其他（如建築工地、道路揚塵等）",
                                y: 21
                            }
                        ],
                        size: '50%',
                        innerSize: '30%',
                        showInLegend: true,
                        borderWidth: 0,
                        dataLabels: {
                            useHTML: true,
                            color: '#ffffff',
                            formatter: function() {
                                // display only if larger than 1
                                return this.y > 1 ? '' + this.y + '%' : null;
                            }
                        }
                    }],
                }
            }]
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                allowPointSelect: false,
                point: {
                    events: {
                        legendItemClick: function(e) {
                            e.preventDefault();
                        }
                    }
                }
            }
        },
        exporting: {
            enabled: false
        }
    });
    Highcharts.chart('fig7', {
        chart: {
            type: 'column',
            backgroundColor:'rgba(255, 255, 255, 0)'
        },
        colors: ['rgba(239,223,111,0.8)', 'rgba(63,134,155,0.8)', 'rgba(97,186,109,0.8)'],
        title: {
            text: '慢性疾病相對風險題題',
            style: {
                display: 'none'
            }
        },
        xAxis: {
            categories: [
                '慢性肺病',
                '缺血性心臟病',
                '中風',
                '肺癌'
            ],
            crosshair: true,
            labels: {
                style: {
                    color: '#FFF'
                }
            }
        },
        yAxis: {
            min: 0,
            gridLineDashStyle: 'Dash',
            gridLineColor: '#cbcbcb',
            gridLineWidth: 0.75,
            labels: {
                style: {
                    color: '#FFF'
                }
            },
            title: {
                text: '比率 (%)',
                style: {
                    color: '#FFF'
                }
            }
        },
        legend: {
            itemStyle: {
                color: '#ffffff',
            },
            itemHoverStyle: {
                color: '#CDCDCD'
            }
        },
        tooltip: {
            shared: true,
            backgroundColor: '#000000',
            borderWidth: 0,
            style: {
                color: '#FFFFFF'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                allowPointSelect: false,
                events: {
                    legendItemClick: function(e) {
                        e.preventDefault();
                    }
                }
            }
        },
        series: [{
            name: 'WHO (PM2.5 10μg/m<sub>3</sub>)',
            data: [3, 11, 4, 4],
            tooltip: {
                valueSuffix: ' ％'
            }
        }, {
            name: '台灣2014 (PM2.5 25μg/m<sub>3</sub>)',
            data: [12, 25, 33, 16],
            tooltip: {
                valueSuffix: ' ％'
            }
        }],
        credits: {
            enabled: false
        },
        exporting: { enabled: false }
    });
    Highcharts.chart('fig8', {
        chart: {
            type: 'bar',
            backgroundColor:'rgba(255, 255, 255, 0)'
        },
        colors: ['rgba(239,223,111,0.8)', 'rgba(63,134,155,0.8)', 'rgba(97,186,109,0.8)'],
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        xAxis: {
            categories: ['東亞', '南亞', '非洲撒哈拉以南', '歐洲及中亞', '美國'],
            title: {
                text: null
            },
            labels: {
                style: {
                    color: '#FFF'
                }
            }
        },
        yAxis: {
            min: 0,
            gridLineWidth: 0,
            title: {
                text: '萬人',
                align: 'high',
                style: {
                    color: '#FFF'
                }
            },
            labels: {
                overflow: 'justify',
                style: {
                    color: '#FFF'
                }
            }
        },
        tooltip: false,
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    color: '#FFF'
                }
            }
        },
        legend: false,
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 1800',
            data: [220, 180, 60, 50, 10]
        }],
        exporting: { enabled: false }
    });
});