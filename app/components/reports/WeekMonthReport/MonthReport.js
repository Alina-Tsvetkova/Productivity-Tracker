let monthAndCounterBinding = {
    'Urgent': new Array(30),
    'Middle': new Array(30),
    'High': new Array(30),
    'Low': new Array(30),
    'Failed': new Array(30)
};

class MonthReport {
    constructor(id, chartData, chartCategories, columnWidth) {
        this.id = id;
        this.chartData = chartData;
        this.chartCategories = chartCategories;
        this.columnWidth = columnWidth;
    }

    initializeMonthCounter() {
        for (let key in monthAndCounterBinding) {
            for (let l = 0; l <= 30; l++) {
                monthAndCounterBinding[key][l] = 0;
            }
        }
    }


    countPositionFromToday(finishDate, priority) {
        let today = taskElementController.addDefaultData(); // i.e 7.2.2017
        let parsedDate = today.split('.')[0];
        let parsedFinishedDate = finishDate.split('.')[0];
        let indexReport;
        if (parsedDate - parsedFinishedDate == 0) {
            indexReport = 30;
            try {
                for (let key in monthAndCounterBinding) {
                    if (priority == key) {
                        monthAndCounterBinding[key][indexReport]++;
                        weekMonthReportModel.sendUpdatedReportsData(indexReport, monthAndCounterBinding[key][indexReport], priority);
                    }
                }
            } catch (e) {
                return "can not create property";
            }
        }
        else {
            let difference = parsedDate - parsedFinishedDate;
            if (difference < 0) {
                difference = 31 + difference + 1;
            }
            indexReport = 30 - difference;
            try {
                for (let key in monthAndCounterBinding) {
                    if (priority == key) {
                        monthAndCounterBinding[key][indexReport]++;
                        weekMonthReportModel.sendUpdatedReportsData(indexReport, monthAndCounterBinding[key][indexReport], priority);
                    }
                }
            } catch (e) {
                return "can not create property";
            }
        }
    }
}

let monthChartData = new MonthReport('container-month-report', [{
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
    }],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
        '25', '26', '27', '28', '29', '30', '31'
    ], 10);

