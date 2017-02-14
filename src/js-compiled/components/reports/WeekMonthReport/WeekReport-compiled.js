'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var k = 0;

var WeekReport = function () {
    function WeekReport(id, chartData, chartCategories, columnWidth) {
        _classCallCheck(this, WeekReport);

        this.id = id;
        this.chartData = chartData;
        this.chartCategories = chartCategories;
        this.columnWidth = columnWidth;
    }

    _createClass(WeekReport, [{
        key: 'transferDataToWeekChart',
        value: function transferDataToWeekChart() {
            // we take the last 5 days data from the month object and create week chart (we can see as it obvious last our week data)
            for (var j = 0; j < monthChartData.chartData.length; j++) {
                var objWeekData = weekChartData.chartData[j];
                var objMonthData = monthChartData.chartData[j];
                objWeekData.data = []; // clean array if click one more time
                var lastDayData = objMonthData.data.length;
                objWeekData.name = objMonthData.name;
                for (var _k = lastDayData - 7; _k <= lastDayData; _k++) {
                    objWeekData.data.push(objMonthData.data[_k]);
                }
            }
        }
    }]);

    return WeekReport;
}();

var weekChartData = new WeekReport('container-week-report', [{
    stack: 'made'
}, {
    stack: 'made'
}, {
    stack: 'made'
}, {
    stack: 'made'
}, {
    stack: 'failed'
}], ['1', '2', '3', '4', '5', '6', '7'], 27);
//# sourceMappingURL=WeekReport-compiled.js.map
