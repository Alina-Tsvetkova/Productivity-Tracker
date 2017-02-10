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

    receiveReportsData() {
        let quantityOfAllTasks = 0;
        firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/reports').on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                for (let i = 0; i < 5; i++) {
                    for (let j in childData) {
                        if (j == monthChartData.chartData[i].name) {
                            monthChartData.chartData[i].data = childData[j];
                        }
                    }
                    for (let k in childData) {
                        for (let i = 0; i < childData[k].length; i++) {
                            quantityOfAllTasks += childData[k][i];
                        }
                    }
                    if (quantityOfAllTasks == 0) {
                        reports.removeReportsContainers();
                    }
                }
                return key;
            });
        });
    }

    generateReportsData() {
        firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/tasks').orderByChild("taskIsDone").equalTo(true).once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                let finishDate = childData[key].dateOfFinish;
                let priority = childData[key].priority;
                monthChartData.countPositionFromToday(finishDate, priority);
            });
        });

        firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/tasks').orderByChild("taskIsDone").equalTo("failed").once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                let finishDate = childData[key].dateOfFinish;
                let priority = childData[key].priority;
                monthChartData.countPositionFromToday(finishDate, priority);
            });
        });
    }

    countPositionFromToday(finishDate, priority) {
        let today = productivityManager.addDefaultData(); // i.e 7.2.2017
        let parsedDate = today.split('.')[0];
        let parsedFinishedDate = finishDate.split('.')[0];
        let indexReport;
        if (parsedDate - parsedFinishedDate == 0) {
            indexReport = 30;
            try {
                for (let key in monthAndCounterBinding) {
                    if (priority == key) {
                        monthAndCounterBinding[key][indexReport]++;
                        monthChartData.sendUpdatedReportsData(indexReport, monthAndCounterBinding[key][indexReport], priority);
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
                        monthChartData.sendUpdatedReportsData(indexReport, monthAndCounterBinding[key][indexReport], priority);
                    }
                }
            } catch (e) {
                return "can not create property";
            }
        }
    }

    clearReportsBeforeFill() {
        for (let key in monthAndCounterBinding) {
            for (let l = 0; l <= 30; l++) {
                monthAndCounterBinding[key][l] = 0;
            }
        }

        firebase.database().ref('users/' + localStorage.getItem('currentUser')).update({
            reports: monthAndCounterBinding
        });
    }

    sendUpdatedReportsData(indexReport, counterReports, priority) {
        firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/reports/' + priority + '/' + indexReport).set(counterReports);
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


//monthChartData.clearReportsBeforeFill();
//reports.receiveReportsStatistics();