"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DayReports = function DayReports(tasksQuantity, index, chartData) {
    _classCallCheck(this, DayReports);

    this.tasksQuantity = tasksQuantity;
    this.index = index;
    this.chartData = chartData;
};

var dayChartData = new DayReports(0, 0, []); // container for day data;
//# sourceMappingURL=DayReport-compiled.js.map
