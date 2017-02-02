let k = 0;

class WeekReport {
    constructor(id, chartData, columnWidth) {
        this.id = id;
        this.chartData = chartData;
        this.columnWidth = columnWidth;
    }

    transferDataToWeekChart() { // we take the last 5 days data from the month object and create week chart (we can see as it obvious last our week data)
        for (let j = 0; j < monthChartData.chartData.length; j++) {
            let objWeekData = weekChartData.chartData[j];
            let objMonthData = monthChartData.chartData[j];
            objWeekData.data = []; // clean array if click one more time
            let lastDayData = objMonthData.data.length;
            objWeekData.name = objMonthData.name;
            for (let k = lastDayData - 5; k < lastDayData; k++) {
                objWeekData.data.push(objMonthData.data[k]);
            }
        }
    }
}

let weekChartData = new WeekReport('container-week-report', [{
    stack: 'made'
}, {
    stack: 'made'
}, {
    stack: 'made'
}, {
    stack: 'made'
}, {
    stack: 'failed'
}], 27);

