let counterOfTasks = 0;

class TaskRenderer extends TaskManager {

    checkIfTaskListEmpty() {
        try {
            firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').on('value', function (data) {
                let tasksTabs = document.getElementById('tasksTabs');
                let addTaskSection = $('.add-task-sect')[0];
                if (data.val() == null) {
                    classManager.removeClass(addTaskSection, 'non-visible-elem');
                    tasksTabs.classList.add('non-visible-elem');
                }
                else {
                    classManager.removeClass(tasksTabs, 'non-visible-elem');
                    tasksRenderer.filterDoneTasks();
                    try {
                        addTaskSection.classList.add('non-visible-elem');
                    }
                    catch (e){
                        return false;
                    }
                }
            });
        }
        catch (e) {
            return;
        }
    }

    filterDoneTasks() {
        try {
            document.getElementById('globalTasks').innerHTML = '';
            document.getElementById('tab2').innerHTML = '';
            let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').limitToLast(5);
            taskData.orderByChild("taskIsDone").equalTo(false).once("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    let childData = snapshot.val();
                    let key = childSnapshot.key;
                    tasksRenderer.renderTask(childData, key);
                });
            });
            tasksRenderer.filterToDoTasks();
            Binder.downloadPlugins();
        }
        catch (e) {
            return;
        }
    }

    filterToDoTasks() {
        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').limitToLast(5);
        taskData.orderByChild("taskIsDone").equalTo(true).once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                tasksRenderer.renderTask(childData, key);
            });
        });
    }

    renderTask(data, dataKey, bool) {
        let taskBinder = new Binder('app/components/taskList/task/task.html');
        let docTask = taskBinder.downloadComponent();

        let renderedTask;

        if (!(bool)) {
            renderedTask = data[dataKey];
        }
        else if (bool) {
            renderedTask = data;
        }

        let thisCategory = renderedTask.category;
        TaskRenderer.createCategoryGroup(thisCategory, docTask, renderedTask.colorIndicator, renderedTask);

        setTimeout(function () {
            (function fillTaskContainer(dataKey) {
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
                            todayMonth = allMonths[k - 1];
                        }
                    }
                    monthDeadlineElem[counterOfTasks].innerHTML = todayMonth;
                    priorityIndicator[counterOfTasks].classList.add(renderedTask.priority.toLowerCase());
                    $('.priority-indicator span')[counterOfTasks].innerHTML = renderedTask.estimation;

                    (function addAttributesToTask() {
                        let attributesObj = {
                            'color-category': renderedTask.colorIndicator,
                            'taskKey': dataKey,
                            'dailyTask': renderedTask.dailyTask,
                            'taskisdone': renderedTask.taskIsDone
                        };
                        for (let key in attributesObj) {
                            task[counterOfTasks].setAttribute(key, attributesObj[key]);
                        }
                        ++counterOfTasks;
                        funcTask.groupTasksByCategory('.task');
                    }());
                }
                catch (e) {
                    return false;
                }
            }(dataKey));
        }, 100);

        ElementsListener.listenToEvents('click', $('.indicator'), taskDeletorObj.pushTaskToDelete);
        ElementsListener.listenToEvents('click', $('.remove-btn-icon'), taskDeletorObj.givePossibilityToDelete);
    }

    static createCategoryGroup(category, docTask, indicator, renderedTask) {
        try {
            let ul = document.createElement('ul');
            ul.setAttribute('category', category);
            let h3 = document.createElement('h3');
            h3.innerHTML = category;
            h3.classList.add('categorized-ul-title');
            ul.appendChild(h3);
            ul.classList.add('categorized-ul');
            ul.appendChild(docTask.getElementsByClassName('task')[0]);

            if (renderedTask.taskIsDone == false) {
                document.getElementById('globalTasks').appendChild(ul);
            }
            else {
                document.getElementById('tab2').appendChild(ul);
                ul.getElementsByClassName('task')[0].classList.add('done-task');
            }

            ul.setAttribute('color-category', indicator);
            funcTask.addColorsToCategories();
        }
        catch (e) {
            return false;
        }
    }
}

let tasksRenderer = new TaskRenderer();