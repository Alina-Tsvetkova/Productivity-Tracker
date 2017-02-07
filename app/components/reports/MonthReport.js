class MonthReport {
    constructor(id, chartData, chartCategories, columnWidth) {
        this.id = id;
        this.chartData = chartData;
        this.chartCategories = chartCategories;
        this.columnWidth = columnWidth;
    }

    receiveReportsData() {
        let reportsData = firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/reports');
        reportsData.on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                for (let i = 0; i < 5; i++) {
                    for (let j in childData) {
                        if (j == monthChartData.chartData[i].name) {
                            monthChartData.chartData[i].data = childData[j];
                            console.log(monthChartData.chartData[i].data);
                        }
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
    }

    countPositionFromToday(finishDate, priority) {
        let reportsData = firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/reports');
        reportsData.on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let reportsKey = childSnapshot.key;
                let dataArr = childData[reportsKey][priority]; //array by priority
                let today = productivityManager.addDefaultData(); // i.e 7.2.2017
                // let lastDay = dataArr.length;
                // let lastDayData = dataArr[[lastDay] - 1];
                // let counter = 0;
                // if (today == finishDate) {
                //     console.log('equal dates', dataArr[[dataArr.length] - 1]);
                // }
                // firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/reports/' + reportsKey + '/' + priority).update({
                //     [lastDay]: lastDayData
                // });
            })
        });
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

monthChartData.generateReportsData();
monthChartData.receiveReportsData();
