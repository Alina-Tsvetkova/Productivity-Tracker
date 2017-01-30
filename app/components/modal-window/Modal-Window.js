class ModalWindow {
    static downloadEarlierCategories() {
        let categoryTitles = document.querySelectorAll('.category-input');
        let categoryLabels = document.querySelectorAll('.category-title');
        let i = 0;
        let userId = localStorage.getItem('currentUser');
        let categoriesReceiver = firebase.database().ref('users/' + userId + '/categories');
        categoriesReceiver.on('value', function (data) {
            for (let k = 0; k < categoryTitles.length; k++) {
                categoryTitles[k].value = data.val()[i];
                categoryLabels[i].innerHTML = categoryTitles[k].value;
                i++;
            }
        });
    }

    addTaskModal(event) {
        let taskListRequest = new XMLHttpRequest();
        let taskParser = new DOMParser();
        taskListRequest.open('GET', 'app/components/modal-window/modal-window.html', false);
        taskListRequest.send();

        let doc6 = taskParser.parseFromString(taskListRequest.responseText, "text/html");
        document.body.appendChild(doc6.getElementById('modal-window-elem'));
        ElementsListener.listenToEvents('click', document.getElementsByClassName('icon-add-task'), productivityManager.submitTask);
        ModalWindow.downloadEarlierCategories();
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-button'), function () {
            ModalWindow.closeModalWindow(document.getElementById('modal-window-elem'));
        });
        let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let today = new Date();
        let todayMonth;

        for (let k = 0; k < allMonths.length; k++) {
            if (today.getMonth() == k) {
                todayMonth = allMonths[k];
            }
        }
        document.querySelector('.deadline-input').value = today.getDate() + " " + todayMonth + ", " + today.getFullYear();

        setTimeout(function () {
            document.getElementsByClassName('add-task-modal')[0].style.top = '50%';
        }, 100)
    }

    showEditModal(index, key) {
        let editedTaskKey = document.getElementsByClassName('task')[index].getAttribute('taskKey');
        let taskEditRequest = new XMLHttpRequest();
        let taskEditItemParser = new DOMParser();
        taskEditRequest.open('GET', 'app/components/modal-window/edit-modal-window.html', false);
        taskEditRequest.send();
        let doc9 = taskEditItemParser.parseFromString(taskEditRequest.responseText, "text/html");
        document.body.appendChild(doc9.getElementById('modal-window-elem-edit'));
        ModalWindow.downloadEarlierCategories();
        let taskContainer = document.querySelectorAll('.task')[index];
        document.querySelector('.title-input').value = taskContainer.getElementsByClassName('task-title')[0].innerHTML;
        document.querySelector('.description-input').value = taskContainer.getElementsByClassName('description-content')[0].innerHTML;
        document.querySelector(' .deadline-input').value = taskContainer.getElementsByClassName('dayDeadline')[0].innerHTML + " " + taskContainer.getElementsByClassName('monthDeadline')[0].innerHTML;
        let taskCategory = document.getElementsByClassName('indicator')[index];
        let taskPriority = document.getElementsByClassName('priority-indicator')[index];
        let categoryClass = taskContainer.getAttribute('category-name');
        let choosedRadioCategory = taskContainer.getAttribute('color-category');
        let choosedRadioPriority = null;
        let allCategoriesNames = document.querySelectorAll('.categories li label.category-name');
        let allCategoriesNamesArr = Array.prototype.slice.call(allCategoriesNames);
        let allPriorityLevels = document.querySelectorAll('.priorities li label.priority-name');
        let priorityClass = taskPriority.classList[1];
        let allPriorityLevelsArr = Array.prototype.slice.call(allPriorityLevels);
        for (let k = 0; k < allCategoriesNamesArr.length; k++) {
            if (allCategoriesNamesArr[k].innerHTML.toLowerCase() == categoryClass) {
                choosedRadioCategory = allCategoriesNamesArr.indexOf(allCategoriesNamesArr[k]);
            }
        }
        for (let k = 0; k < allPriorityLevelsArr.length; k++) {
            if (allPriorityLevelsArr[k].innerHTML.toLowerCase() == priorityClass) {
                choosedRadioPriority = allPriorityLevelsArr.indexOf(allPriorityLevelsArr[k]);

            }
        }
        document.querySelectorAll("input[name=category-name]")[choosedRadioCategory].checked = true;
        document.querySelectorAll("input[name=priority-level]")[choosedRadioPriority].checked = true;
        let modalCheckboxes = document.querySelectorAll('#modal-window-elem-edit input[type=checkbox]');
        let priorityIndicator = document.querySelectorAll('.priority-indicator span')[index].innerHTML // i.e. 2;
        for (let j = 0; j < priorityIndicator; j++) {
            modalCheckboxes[j].checked = true;
        }
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-button'), function () {
            ModalWindow.closeModalWindow(document.getElementById('modal-window-elem-edit'));
        });
        setTimeout(function () {
            document.getElementsByClassName('add-task-modal')[0].style.top = '50%';
        }, 100)
    }

    static closeModalWindow(child) {
        if (child == document.getElementById('modal-w-remove')) {
            child.style.display = 'none';
        }
        else {
            child.getElementsByClassName('add-task-modal')[0].style.top = '-50%';
            setTimeout(function () {
                document.body.removeChild(child);
            }, 500)
        }
    }

}

let modalWindowObj = new ModalWindow();

