class filtrationTask extends TaskManager {
    static filterTasks() {
        tasksRenderer.clearContainers();
        counterOfTasks = 0;
        let priorityFilters = document.querySelectorAll('.priority-list button');

        for (let i = 0; i < priorityFilters.length; i++) {
            classManager.removeClass(priorityFilters[i], 'active-elem-white');
        }
        event.target.classList.add('active-elem-white');

        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks');
        taskData.on('value', function (snapshot) {
            snapshot.forEach(function (child) {
                let value = child.val();
                if (event.target.innerHTML == child.val().priority) {
                    console.log(child.val().priority);
                    tasksRenderer.renderTask(value, child.key, true);
                }
                else if (event.target.innerHTML == 'All') {
                    tasksRenderer.clearContainers();
                    tasksRenderer.filterDoneTasks();
                }
            });
        });
    }
}