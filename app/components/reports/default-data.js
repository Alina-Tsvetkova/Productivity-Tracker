let k = 0;
// reports.on('child_added', function (data) {
//     let retrievedData = data.val();
//     let reportPriorityName = monthChartData.chartData[k].name;
//     monthChartData.chartData[k].data = retrievedData['' + reportPriorityName];
//     k++;
// });
let monthArray = [];
let year = new Date().getFullYear();
let month = new Date().getMonth();
monthArray.length = new Date(year, month, 0).getDate();
let reportsData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks');


let monthChartData = {
    id: 'container_month_report',
    chartData: [{
        name: 'Urgent',
        data: 0,
    }, {
        name: 'High',
        data: 0,
    }, {
        name: 'Middle',
        data: 0,
    }, {
        name: 'Low',
        data: 0,
    }, {
        name: 'Failed',
        data: 0,
    }],
    chartCategories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
        '25', '26', '27', '28', '29', '30', '31'
    ],
    columnWidth: 10
};

// /* two methods weekChartData.transferDataToWeekChart and dayChartData.transferDataToDayChart below are created to fill week and day data according to the month data
//  (because when we want to see day chart we wait to see last day of our month and when we want to see week chart
//  we wait to see last working week (that is why last 5 days of the month) of our month
//  */

let weekChartData = {
    id: 'container_week_report',
    chartData: [{
        stack: 'made'
    }, {
        stack: 'made'
    }, {
        stack: 'made'
    }, {
        stack: 'made'
    }, {
        stack: 'failed'
    }],
    chartCategories: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    columnWidth: 27,
    transferDataToWeekChart: function () { // we take the last 5 days data from the month object and create week chart (we can see as it obvious last our week data)
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

let dayChartData = {
    tasks_quantity: 0,
    index: 0,
    chartData: [], // container for day data;
    countTotalDayTasks: function () { // method counts total tasks of the day
        for (let j = 0; j < dayChartData.chartData.length; j++) {
            dayChartData.tasks_quantity += dayChartData.chartData[dayChartData.index].y;
            dayChartData.index++;
        }
    },
    transferDataToDayChart: function () { // we take the last day data from the month object and create donut graph
        for (let j = 0; j < monthChartData.chartData.length; j++) { // 5 iterarions
            let objMonthData = monthChartData.chartData[j];
            let objDayData = dayChartData.chartData;
            let lastDayData = objMonthData.data.length; // the meaning of the last month day data : lines 5,8,11,14,17
            objDayData.push({}); // push object for saving our data for every category
            objDayData[j].name = objMonthData.name;
            objDayData[j].y = objMonthData.data[lastDayData - 1];
        }
        dayChartData.countTotalDayTasks();
    }
};
