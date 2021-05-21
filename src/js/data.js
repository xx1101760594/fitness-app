require('../css/data.less');
const echarts = require('echarts');

document.ready(function () {

    let backBtn = document.querySelector('#back-btn');
    let hederImgDom = document.querySelector('#heder-img');

    let user=JSON.parse(localStorage.getItem('user'));

    // 返回上一页
    backBtn.addEventListener('click', function () {
        history.back();
    });
    // 换头像
    hederImgDom.src=user.imgurl;
    // 柱状图
    var timesDom = echarts.init(document.getElementById('times'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '近七天运动时长'
        },
        xAxis: {
            type: 'category',
            data: ['11-5', '11-6', '11-7', '11-8', '11-9', '11-10', '11-15']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [20, 50, 100, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.7)'
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    timesDom.setOption(option);

    // 饼状图
    var classifyDom = echarts.init(document.getElementById('classify'));

    var optionClassify = {
        title: {
            text: '运动分类',
            subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [{
            name: '大数据',
            type: 'pie',
            radius: '50%',
            data: [{
                    value: 26,
                    name: '跑步'
                },
                {
                    value: 38,
                    name: '骑行'
                },
                {
                    value: 35,
                    name: '训练'
                },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    classifyDom.setOption(optionClassify);


    // 横向图
    var recentlyDom = echarts.init(document.getElementById('recently'));


    var optionRecently = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            data: ['跑步', '骑行', '训练']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['11-5', '11-6', '11-7', '11-8', '11-9', '11-10', '11-11']
        },
        series: [{
                name: '跑步',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: '骑行',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '训练',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            }

        ]
    };

    recentlyDom.setOption(optionRecently);

    // 折线图
    var lineDom = echarts.init(document.getElementById('line'));

    var optionLine = {
        xAxis: {
            type: 'category',
            data: ['11-7', '11-8', '11-9', '11-10', '11-11', '11-12', '11-12']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }]
    };

    lineDom.setOption(optionLine);

    var chartDom = echarts.init(document.getElementById('chart'));

    var data = [];

    for (var i = 0; i <= 100; i++) {
        var theta = i / 100 * 360;
        var r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
        data.push([r, theta]);
    }

    var optionChart = {
        title: {
            text: ''
        },
        legend: {
            data: ['line'],
            left: 'left'
        },
        polar: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        angleAxis: {
            type: 'value',
            startAngle: 0
        },
        radiusAxis: {},
        series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            data: data
        }]
    };
    chartDom.setOption(optionChart);












})