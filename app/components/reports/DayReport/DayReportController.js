class DayReportController {
    countTotalDayTasks(dayChartData) { // method counts total tasks of the day
        for (let j = 0; j < dayChartData.chartData.length; j++) {
            dayChartData.tasksQuantity += dayChartData.chartData[dayChartData.index].y;
            dayChartData.index++;
        }
    }

    deleteDayReportInfo(dayChartData) {
        dayChartData.index = 0;
        dayChartData.tasksQuantity = 0;
        dayChartData.chartData = [];
    }
}

let dayReportController = new DayReportController();