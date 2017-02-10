class DayReportModel {
    transferDataToDayChart() { // we take the last day data from the month object and create donut graph
        for (let j = 0; j < monthChartData.chartData.length; j++) { // 5 iterarions
            let objMonthData = monthChartData.chartData[j];
            let objDayData = dayChartData.chartData;
            let lastDayData = objMonthData.data.length; // the meaning of the last month day data : lines 5,8,11,14,17
            objDayData.push({}); // push object for saving our data for every category
            objDayData[j].name = objMonthData.name;
            objDayData[j].y = objMonthData.data[lastDayData - 1];
        }
        dayReportController.countTotalDayTasks(dayChartData);
    }
}

let dayReportModel = new DayReportModel();