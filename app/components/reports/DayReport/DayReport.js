class DayReports {
    constructor(tasksQuantity, index, chartData) {
        this.tasksQuantity = tasksQuantity;
        this.index = index;
        this.chartData = chartData;
    }
}

let dayChartData = new DayReports(0, 0, []);// container for day data;

