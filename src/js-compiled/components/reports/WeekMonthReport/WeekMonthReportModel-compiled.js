'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeekMonthReportModel = function () {
    function WeekMonthReportModel() {
        _classCallCheck(this, WeekMonthReportModel);
    }

    _createClass(WeekMonthReportModel, [{
        key: 'receiveReportsData',
        value: function receiveReportsData() {
            var quantityOfAllTasks = 0;
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/reports').on("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = snapshot.val();
                    var key = childSnapshot.key;
                    for (var i = 0; i < 5; i++) {
                        for (var j in childData) {
                            if (j == monthChartData.chartData[i].name) {
                                monthChartData.chartData[i].data = childData[j];
                            }
                        }
                        for (var k in childData) {
                            for (var _i = 0; _i < childData[k].length; _i++) {
                                quantityOfAllTasks += childData[k][_i];
                            }
                        }
                    }
                    if (quantityOfAllTasks == 0) {
                        setTimeout(function () {
                            reports.removeReportsContainers();
                        }, 200);
                    }
                    return key;
                });
            });
        }
    }, {
        key: 'generateReportsData',
        value: function generateReportsData() {
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks').orderByChild("taskIsDone").equalTo(true).once("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = snapshot.val();
                    var key = childSnapshot.key;
                    var finishDate = childData[key].dateOfFinish;
                    var priority = childData[key].priority;
                    monthChartData.countPositionFromToday(finishDate, priority);
                });
            });
            weekMonthReportModel.generateFailedReportsData();
        }
    }, {
        key: 'generateFailedReportsData',
        value: function generateFailedReportsData() {
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks').orderByChild("taskIsDone").equalTo("failed").once("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = snapshot.val();
                    var key = childSnapshot.key;
                    var finishDate = childData[key].dateOfFinish;
                    var priority = childData[key].priority;
                    monthChartData.countPositionFromToday(finishDate, priority);
                });
            });
        }
    }, {
        key: 'clearReportsBeforeFill',
        value: function clearReportsBeforeFill() {
            for (var key in monthAndCounterBinding) {
                for (var l = 0; l <= 30; l++) {
                    monthAndCounterBinding[key][l] = 0;
                }
            }

            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally()).update({
                reports: monthAndCounterBinding
            });
        }
    }, {
        key: 'sendUpdatedReportsData',
        value: function sendUpdatedReportsData(indexReport, counterReports, priority) {
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/reports/' + priority + '/' + indexReport).set(counterReports);
        }
    }]);

    return WeekMonthReportModel;
}();

var weekMonthReportModel = new WeekMonthReportModel();
//# sourceMappingURL=WeekMonthReportModel-compiled.js.map
