class WeekMonthReportModel {

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
                }
                if (quantityOfAllTasks == 0) {
                    setTimeout(function () {
                        reports.removeReportsContainers();
                    },200)

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
        weekMonthReportModel.generateFailedReportsData();
    }

    generateFailedReportsData() {
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

let weekMonthReportModel = new WeekMonthReportModel();