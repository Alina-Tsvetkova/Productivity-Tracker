'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeekMonthReportView = function () {
    function WeekMonthReportView() {
        _classCallCheck(this, WeekMonthReportView);
    }

    _createClass(WeekMonthReportView, [{
        key: 'createWeekOrMonthChart',
        value: function createWeekOrMonthChart(chartObj) {
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
                        fontFamily: '\'Roboto\', sans-serif'
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
                            fontFamily: '\'Roboto\', sans-serif'
                        }
                    },
                    lineWidth: 1,
                    lineColor: 'white',
                    tickColor: 'transparent'
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
                            fontFamily: '\'Roboto\', sans-serif'
                        }
                    }
                },

                tooltip: {
                    formatter: function formatter() {
                        return this.series.name.toUpperCase() + '<br/>' + 'Tasks: ' + this.point.y;
                    },
                    borderColor: 'none',
                    opacity: 0.7,
                    useHTML: true,
                    backgroundColor: "#cddde9",
                    style: {
                        "color": '#3c5162',
                        "fontSize": "14px",
                        "fontWeight": 'bold',
                        "fontFamily": '\'Roboto-Bold\', sans-serif'
                    }
                },

                plotOptions: {
                    column: {
                        pointPadding: 0,
                        pointWidth: chartObj.columnWidth,
                        borderWidth: 0,
                        stacking: 'normal'
                    }
                },
                colors: ['#f15a4a', '#fea741', '#fddc43', '#1abb9b', '#8da5b8'],
                series: chartObj.chartData
            });
        }
    }]);

    return WeekMonthReportView;
}();

var weekMonthReportView = new WeekMonthReportView();
//# sourceMappingURL=WeekMonthReportView-compiled.js.map
