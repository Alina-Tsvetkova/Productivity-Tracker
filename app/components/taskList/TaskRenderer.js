let counterOfTasks = 0;
let allTasksToDoFromDatabase = [];

class TaskRenderer extends TaskManager {
    ifTaskPresent() {
        document.getElementById('globalTasks').innerHTML = '';
        document.getElementById('tab2').innerHTML = '';

        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks');
        taskData.orderByChild("taskisdone").equalTo('false').on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                tasksRenderer.renderTask(childData, key);
            });
        });
        tasksRenderer.filterToDoTasks();
    }

    filterToDoTasks() {
        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks');
        taskData.orderByChild("taskisdone").equalTo(true).on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                tasksRenderer.renderTask(childData, key);
            });
        });
    }

    renderTask(data, dataKey, bool) {
        let taskRequest = new XMLHttpRequest();
        let taskItemParser = new DOMParser();
        taskRequest.open('GET', 'app/components/taskList/task/task.html', false);
        taskRequest.send();
        let docTask = taskItemParser.parseFromString(taskRequest.responseText, "text/html");
        let renderedTask;

        if(!(bool)) {
            renderedTask = data[dataKey];
        }
        else if(bool){
            renderedTask = data;
        }

        let thisCategory = renderedTask.category;
        TaskRenderer.createCategoryGroup(thisCategory, docTask, renderedTask.color_indicator, renderedTask);

        allTasksToDoFromDatabase.push(data.val);

        function fillTaskContainer(dataKey) {
            try {
                let task = $('.task');
                let taskTitle = $('.task-title');
                let monthDeadlineElem = $('.monthDeadline');
                let priorityIndicator = $('.priority-indicator');
                let descriptionContent = $('.description-content');
                taskTitle[counterOfTasks].innerHTML = renderedTask.title;
                taskTitle[counterOfTasks].classList.add(renderedTask.priority.toLowerCase() + '-sign');
                descriptionContent[counterOfTasks].innerHTML = renderedTask.description;
                let splitedArray = renderedTask.deadline.split('.');
                $('.dayDeadline')[counterOfTasks].innerHTML = splitedArray[0];


                let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                let todayMonth = splitedArray[1];

                for (let k = 0; k < allMonths.length; k++) {
                    if (todayMonth == k) {
                        todayMonth = allMonths[k-1];
                    }
                }

                $('.monthDeadline')[counterOfTasks].innerHTML = todayMonth;
                priorityIndicator[counterOfTasks].classList.add(renderedTask.priority.toLowerCase());
                $('.priority-indicator span')[counterOfTasks].innerHTML = renderedTask.estimation;

                let attributesObj = {
                    'category-name': thisCategory,
                    'color-category': renderedTask.color_indicator,
                    'taskKey': dataKey,
                    'dailyTask': renderedTask.dailyTask,
                    'taskisdone': renderedTask.taskisdone
                };
                for (let key in attributesObj) {
                    task[counterOfTasks].setAttribute(key, attributesObj[key]);
                }
                ++counterOfTasks;
            }
            catch (e) {
                return false;
            }
        }

        setTimeout(function () {
            fillTaskContainer(dataKey)
        }, 100);

        setTimeout(function () {
            funcTask.groupTasksByCategory('.task');
        }, 60);

        let elementListenerElems = [$('.indicator'), $('.remove-btn-icon'), $('.priority-indicator'), $('.move-task')];
        let i = 0;

        let elementListenerData = {
            "0": taskDeletorObj.pushTaskToDelete,
            "1": taskDeletorObj.givePossibilityToDelete,
            "2": function (event) {
                let timerHash = event.target.parentNode.parentNode.getAttribute('taskkey');
                console.log(timerHash);
                Timer.showTimer(timerHash);
            },
        };

        for (let key in elementListenerData) {
            ElementsListener.listenToEvents('click', elementListenerElems[i], elementListenerData[key]);
            i++;
        }
        if ($('.add-task-sect')[0]) {
            $('.add-task-sect')[0].classList.add('non-visible-elem');
        }
        $.fn.tooltipSwitcher();
    }

    static createCategoryGroup(category, docTask, indicator,renderedTask) {
        let ul = document.createElement('ul');
        ul.setAttribute('category', category);
        let h3 = document.createElement('h3');
        h3.innerHTML = category;
        h3.classList.add('categorized-ul-title');
        ul.appendChild(h3);
        ul.classList.add('categorized-ul');
        ul.appendChild(docTask.getElementsByClassName('task')[0]);

        if(renderedTask.taskisdone == 'false'){
            document.getElementById('globalTasks').appendChild(ul);
        }
        else {
            document.getElementById('tab2').appendChild(ul);
            ul.getElementsByClassName('task')[0].classList.add('done-task');
        }

        ul.setAttribute('color-category', indicator);
        funcTask.addColorsToCategories();
    }
}

let tasksRenderer = new TaskRenderer();