'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DayReportView = function () {
    function DayReportView() {
        _classCallCheck(this, DayReportView);
    }

    _createClass(DayReportView, [{
        key: 'createDayChart',
        value: function createDayChart(dayObjReport) {
            dayReportView.removeLegendThatIsAbsent(dayObjReport);
            Highcharts.chart('container-day-report', {
                chart: {
                    plotBackgroundColor: null,
                    type: 'pie',
                    plotBorderWidth: 0,
                    plotShadow: false,
                    backgroundColor: 'transparent'
                },

                credits: {
                    enabled: false
                },

                exporting: {
                    enabled: false
                },

                title: {
                    text: dayObjReport.tasksQuantity,
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 15,
                    style: {
                        color: 'white',
                        fontFamily: 'Roboto-Regular, sans-serif',
                        fontWeight: 'normal',
                        fontSize: '70px'
                    }
                },

                subtitle: {
                    text: 'total',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 50,
                    style: {
                        color: 'white',
                        fontFamily: 'Roboto-Regular, sans-serif',
                        fontWeight: 'normal',
                        fontSize: '20px'
                    }
                },
                tooltip: {

                    formatter: function formatter() {
                        return this.point.name.toUpperCase() + '<br/>' + 'Tasks: ' + this.point.y;
                    },
                    useHTML: true,
                    borderColor: 'none',
                    opacity: 0.7,
                    padding: 5,
                    backgroundColor: "#cddde9",
                    style: {
                        "color": '#3c5162',
                        "fontSize": "14px",
                        "fontWeight": 'bold',
                        "fontFamily": '\'Roboto-Bold\', sans-serif'
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -40,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: false,
                                fontSize: '16px',
                                borderColor: 'none',
                                fontFamily: '\'PT Sans\', sans-serif'
                            }
                        },
                        showInLegend: true
                    },
                    series: {
                        states: {
                            hover: {
                                halo: {
                                    attributes: {
                                        fill: '#fff'
                                    },
                                    opacity: '.9'
                                }
                            }
                        }
                    }
                },
                legend: {
                    enabled: false
                },

                colors: ['#f15a4a', '#fea741', '#fddc43', '#1abb9b', '#8da5b8'],
                series: [{
                    innerSize: '50%',
                    data: dayObjReport.chartData
                }]
            });
        }
    }, {
        key: 'removeLegendThatIsAbsent',
        value: function removeLegendThatIsAbsent(dayObjReport) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = dayObjReport.chartData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    for (var x in key) {
                        if (key[x] == 0) {
                            key.name = '';
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return DayReportView;
}();

var dayReportView = new DayReportView();
//# sourceMappingURL=DayReportView-compiled.js.map
