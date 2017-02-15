let counterOfTasks = 0;
let notificationCounter = 0;
class TaskElementView {

    clearContainers() {
        reports.receiveReportsStatistics();
        document.getElementById('globalTasks').innerHTML = '';
        document.getElementById('tab2').innerHTML = '';
        counterOfTasks = 0;
    }

    downloadTaskComponent() {
        let taskBinder = new Binder('app/components/taskList/task/task.html');
        let docTask = taskBinder.downloadComponent();
        return docTask;
    }

    fillTaskWithInformation(docTask, data, dataKey,bool) {
        let renderedTask;

        if (!(bool)) {
            renderedTask = data[dataKey];
        }
        else if (bool) {
            renderedTask = data;
        }

        let thisCategory = renderedTask.category;
        taskElementView.createCategoryGroup(thisCategory, docTask, renderedTask.colorIndicator, renderedTask, dataKey);

        setTimeout(function () {
            (function fillTaskContainer(dataKey) {
                try {
                    let taskObj = taskElementController.taskElementsObj;
                    taskObj.taskTitle[counterOfTasks].innerHTML = renderedTask.title;
                    taskObj.taskTitle[counterOfTasks].classList.add(renderedTask.priority.toLowerCase() + '-sign');
                    taskObj.descriptionContent[counterOfTasks].innerHTML = renderedTask.description;
                    let splitedArray = renderedTask.deadline.split('.');
                    taskElementView.trimDateDeadline(splitedArray);
                    taskObj.monthDeadlineElem[counterOfTasks].innerHTML = taskElementController.generateWordMonth(splitedArray);
                    taskObj.priorityIndicator[counterOfTasks].classList.add(renderedTask.priority.toLowerCase());
                    taskObj.priorityIndicatorSpan[counterOfTasks].innerHTML = renderedTask.estimation;

                    (function addAttributesToTask() {
                        let attributesObj = {
                            'color-category': renderedTask.colorIndicator,
                            'taskKey': dataKey,
                            'taskisdone': renderedTask.taskIsDone
                        };
                        for (let key in attributesObj) {
                            taskObj.task[counterOfTasks].setAttribute(key, attributesObj[key]);
                        }
                        counterOfTasks++;
                    }());
                }
                catch (e) {
                    return false;
                }
            }(dataKey));
        }, 50);
        taskElementController.subscribeTaskEvents();
        taskElementController.checkIfALLTasksAreDone();
    }

    trimDateDeadline(splitedArray) {
        let taskElements = taskElementController.taskElementsObj;
        let zeroDelete = splitedArray[0].split('');
        if (zeroDelete[0] == 0) {
            taskElements.dayDeadline[counterOfTasks].innerHTML = zeroDelete[1];
        }
        else {
            taskElements.dayDeadline[counterOfTasks].innerHTML = splitedArray[0];
        }
    }

    removeMoveTaskBtn(ul) {
        ul.getElementsByClassName('move-task')[0].classList.add('non-visible-elem');
    }

    createCategoryGroup(category, docTask, indicator, renderedTask) {
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
                taskElementView.appendTask('globalTasks', ul);
                taskElementController.notifyAboutMissedDeadlines(renderedTask.deadline);
            }
            else if (renderedTask.taskIsDone == true) {
                taskElementView.addDoneClasses(ul);
            }

            ul.setAttribute('color-category', indicator);
            taskElementView.addColorsToCategories();
        }
        catch (e) {
            return false;
        }
    }

    addDoneClasses(ul) {
        taskElementView.appendTask('tab2', ul);
        ul.getElementsByClassName('task')[0].classList.add('done-task');
        let doneTasks = document.getElementsByClassName('done-task');
        for (let j = 0; j < doneTasks.length; j++) {
            doneTasks[j].getElementsByClassName('edit')[0].style.display = 'none';
            doneTasks[j].getElementsByClassName('indicator-wrapper')[0].style.display = 'none';
            taskElementView.removeMoveTaskBtn(ul);
        }
    }

    appendTask(container, ul) {
        document.getElementById(container).appendChild(ul);
        return 'Element is appended';
    }

    addColorsToCategories() {
        let allCategories = document.querySelectorAll('.categorized-ul');
        for (let j = 0; j < allCategories.length; j++) {
            if (allCategories[j].getAttribute('color-category') == 0) {
                allCategories[j].classList.add('work-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('work-group-title');
            }
            else if (allCategories[j].getAttribute('color-category') == 1) {
                allCategories[j].classList.add('education-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('education-group-title');
            }
            else if (allCategories[j].getAttribute('color-category') == 2) {
                allCategories[j].classList.add('hobby-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('hobby-group-title');
            }
            else if (allCategories[j].getAttribute('color-category') == 3) {
                allCategories[j].classList.add('sport-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('sport-group-title');
            }

            else if (allCategories[j].getAttribute('color-category') == 4) {
                allCategories[j].classList.add('other-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('other-group-title');
            }
        }
    }
}

let taskElementView = new TaskElementView();