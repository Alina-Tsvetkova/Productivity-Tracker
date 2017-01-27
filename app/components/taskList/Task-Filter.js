let priorityFilters;

class filtrationTask {
    static filterTasks() {
        document.getElementById('global-tasks').innerHTML = '';
        document.getElementById('daily-tasks').innerHTML = '';
        counterOfTasks = 0;
        for (var i = 0; i < priorityFilters.length; i++) {
            priorityFilters[i].style.color = '#8ea5b8';
        }
        event.target.style.color = 'white';

        allTasksToDo.on('child_added', function (data) {
            if (event.target.innerHTML == data.val().priority) {
                productivityObj.createTaskField(data);
            }
            else if (event.target.innerHTML == 'All') {
                productivityObj.createTaskField(data);
            }
        });
    }
}