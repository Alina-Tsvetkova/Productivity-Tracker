"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DayReportController = function () {
    function DayReportController() {
        _classCallCheck(this, DayReportController);
    }

    _createClass(DayReportController, [{
        key: "countTotalDayTasks",
        value: function countTotalDayTasks(dayChartData) {
            // method counts total tasks of the day
            for (var j = 0; j < dayChartData.chartData.length; j++) {
                dayChartData.tasksQuantity += dayChartData.chartData[dayChartData.index].y;
                dayChartData.index++;
            }
        }
    }, {
        key: "deleteDayReportInfo",
        value: function deleteDayReportInfo(dayChartData) {
            dayChartData.index = 0;
            dayChartData.tasksQuantity = 0;
            dayChartData.chartData = [];
        }
    }]);

    return DayReportController;
}();

var dayReportController = new DayReportController();
//# sourceMappingURL=DayReportController-compiled.js.map
