'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var monthAndCounterBinding = {
    'Urgent': new Array(30),
    'Middle': new Array(30),
    'High': new Array(30),
    'Low': new Array(30),
    'Failed': new Array(30)
};

var MonthReport = function () {
    function MonthReport(id, chartData, chartCategories, columnWidth) {
        _classCallCheck(this, MonthReport);

        this.id = id;
        this.chartData = chartData;
        this.chartCategories = chartCategories;
        this.columnWidth = columnWidth;
    }

    _createClass(MonthReport, [{
        key: 'initializeMonthCounter',
        value: function initializeMonthCounter() {
            for (var key in monthAndCounterBinding) {
                for (var l = 0; l <= 30; l++) {
                    monthAndCounterBinding[key][l] = 0;
                }
            }
        }
    }, {
        key: 'countPositionFromToday',
        value: function countPositionFromToday(finishDate, priority) {
            var today = taskElementController.addDefaultData(); // i.e 7.2.2017
            var parsedDate = today.split('.')[0];
            var parsedFinishedDate = finishDate.split('.')[0];
            var indexReport = void 0;
            if (parsedDate - parsedFinishedDate == 0) {
                indexReport = 30;
                try {
                    for (var key in monthAndCounterBinding) {
                        if (priority == key) {
                            monthAndCounterBinding[key][indexReport]++;
                            weekMonthReportModel.sendUpdatedReportsData(indexReport, monthAndCounterBinding[key][indexReport], priority);
                        }
                    }
                } catch (e) {
                    return "can not create property";
                }
            } else {
                var difference = parsedDate - parsedFinishedDate;
                if (difference < 0) {
                    difference = 31 + difference + 1;
                }
                indexReport = 30 - difference;
                try {
                    for (var _key in monthAndCounterBinding) {
                        if (priority == _key) {
                            monthAndCounterBinding[_key][indexReport]++;
                            weekMonthReportModel.sendUpdatedReportsData(indexReport, monthAndCounterBinding[_key][indexReport], priority);
                        }
                    }
                } catch (e) {
                    return "can not create property";
                }
            }
        }
    }]);

    return MonthReport;
}();

var monthChartData = new MonthReport('container-month-report', [{
    name: 'Urgent',
    data: null
}, {
    name: 'High',
    data: null
}, {
    name: 'Middle',
    data: null
}, {
    name: 'Low',
    data: null
}, {
    name: 'Failed',
    data: null
}], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'], 10);
//# sourceMappingURL=MonthReport-compiled.js.map
