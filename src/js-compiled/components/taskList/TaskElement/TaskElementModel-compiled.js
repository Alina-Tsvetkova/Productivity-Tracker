'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskElementModel = function () {
    function TaskElementModel() {
        _classCallCheck(this, TaskElementModel);
    }

    _createClass(TaskElementModel, [{
        key: 'filterTasks',
        value: function filterTasks(field, value) {
            var taskData = firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks').limitToLast(5);
            taskData.orderByChild(field).equalTo(value).once("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = snapshot.val();
                    var key = childSnapshot.key;
                    var docTask = taskElementView.downloadTaskComponent();
                    taskElementView.fillTaskWithInformation(docTask, childData, key);
                });
            });
            Binder.downloadPlugins();
        }
    }, {
        key: 'sendSubmittedData',
        value: function sendSubmittedData(postData) {
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks').push(postData);
            taskElementController.checkIfTaskListEmpty();
        }
    }, {
        key: 'sendEditedData',
        value: function sendEditedData(updates, editedHash) {
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + editedHash).update(updates);
            taskElementController.checkIfTaskListEmpty();
        }
    }, {
        key: 'sendTodayTask',
        value: function sendTodayTask(key) {
            var today = taskElementController.addDefaultData();
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + key).update({
                deadline: today
            });
            taskElementController.checkIfTaskListEmpty();
        }
    }, {
        key: 'filterDataBase',
        value: function filterDataBase() {
            var taskData = firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks');
            taskData.on('value', function (snapshot) {
                snapshot.forEach(function (child) {
                    var value = child.val();

                    if (event.target.innerHTML == child.val().priority) {
                        var docTask = taskElementView.downloadTaskComponent();
                        taskElementView.fillTaskWithInformation(docTask, value, child.key, true);
                    } else if (event.target.innerHTML == 'All') {
                        taskElementController.checkIfTaskListEmpty();
                    }
                });
            });
        }
    }]);

    return TaskElementModel;
}();

var taskElementModel = new TaskElementModel();
//# sourceMappingURL=TaskElementModel-compiled.js.map
