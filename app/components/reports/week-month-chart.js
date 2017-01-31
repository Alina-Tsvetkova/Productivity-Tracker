function createChart(chartObj) {
    Highcharts.chart(chartObj.id, {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            lineColor: 'blue',
            borderColor: 'white',
            spacingBottom: 65
        },

        credits: {
            enabled: false
        },

        exporting: {
            enabled: false
        },
        title: {
            text: ''
        },

        legend: {
            itemMarginTop: 30,
            itemStyle: {
                color: '#8da5b8',
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: '\'Roboto\', sans-serif',
            },
            itemHoverStyle: {
                color: 'white'
            },
            symbolRadius: 0
        },

        xAxis: {
            categories: chartObj.chartCategories,
            labels: {
                style: {
                    color: 'white',
                    fontFamily: '\'Roboto\', sans-serif',
                }
            },
            lineWidth: 1,
            lineColor: 'white',
            tickColor: 'transparent',
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            gridLineColor: '#345168',
            color: 'white',
            title: {
                text: ''
            },
            lineWidth: 1,
            lineColor: 'white',
            labels: {
                style: {
                    color: 'white',
                    fontFamily: '\'Roboto\', sans-serif',
                }
            }
        },

        tooltip: {
            formatter: function() {
                return this.series.name.toUpperCase() + '<br/>' +
                    'Tasks: ' + this.point.y;
            },
            borderColor: 'none',
            opacity: 0.7,
            useHTML: true,
            backgroundColor: "#cddde9",
            style: {
                "color": '#3c5162',
                "fontSize": "14px",
                "fontWeight": 'bold',
                "fontFamily": '\'Roboto-Bold\', sans-serif',
            },
        },

        plotOptions: {
            column: {
                pointPadding: 0,
                pointWidth: chartObj.columnWidth,
                borderWidth: 0,
                stacking: 'normal',
            }
        },

        colors: ['#f15a4a', '#fea741', '#fddc43', '#1abb9b', '#8da5b8'],

        series: chartObj.chartData,
    });

}
