"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DayReportModel = function () {
    function DayReportModel() {
        _classCallCheck(this, DayReportModel);
    }

    _createClass(DayReportModel, [{
        key: "transferDataToDayChart",
        value: function transferDataToDayChart() {
            // we take the last day data from the month object and create donut graph
            for (var j = 0; j < monthChartData.chartData.length; j++) {
                // 5 iterarions
                var objMonthData = monthChartData.chartData[j];
                var objDayData = dayChartData.chartData;
                var lastDayData = objMonthData.data.length; // the meaning of the last month day data : lines 5,8,11,14,17
                objDayData.push({}); // push object for saving our data for every category
                objDayData[j].name = objMonthData.name;
                objDayData[j].y = objMonthData.data[lastDayData - 1];
            }
            dayReportController.countTotalDayTasks(dayChartData);
        }
    }]);

    return DayReportModel;
}();

var dayReportModel = new DayReportModel();
//# sourceMappingURL=DayReportModel-compiled.js.map
