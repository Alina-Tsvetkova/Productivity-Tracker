class filtrationTask extends TaskManager {
    static filterTasks() {
        taskElementView.clearContainers();
        let priorityFilters = document.querySelectorAll('.priority-list button');

        for (let i = 0; i < priorityFilters.length; i++) {
            classManager.removeClass(priorityFilters[i], 'active-elem-white');
        }
        event.target.classList.add('active-elem-white');

        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks');
        taskData.on('value', function (snapshot) {
            snapshot.forEach(function (child) {
                let value = child.val();
                console.log(value);
                if (event.target.innerHTML == child.val().priority) {
                    let docTask = taskElementView.downloadTaskComponent();
                    taskElementView.fillTaskWithInformation(docTask,value, child.key, true);
                }
                else if (event.target.innerHTML == 'All') {
                    taskElementController.checkIfTaskListEmpty();
                }
            });
        });
    }
}