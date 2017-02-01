class ModalWindow {
    static downloadEarlierCategories() {
        let categoryTitles = document.querySelectorAll('.categories-names .category-input');
        let categoryLabels = document.querySelectorAll('.categories-names .category-title');
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
        let modalBinder = new Binder('app/components/modal-window/modal-window.html');
        let receivedDoc = modalBinder.downloadComponent();
        document.body.appendChild(receivedDoc.getElementById('modal-window-elem'));

        ElementsListener.listenToEvents('click', document.getElementsByClassName('icon-add-task'), productivityManager.submitTask);
        ModalWindow.downloadEarlierCategories();
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-button'), function () {
            ModalWindow.closeModalWindow(document.getElementById('modal-window-elem'));
        });

        setTimeout(function () {
            document.getElementsByClassName('add-task-modal')[0].style.top = '50%';
        }, 100);

        ModalWindow.attachDatePicker();
    }

    showEditModal(index) {
        let modalBinder = new Binder('app/components/modal-window/edit-modal-window.html');
        let receivedDoc = modalBinder.downloadComponent();
        document.body.appendChild(receivedDoc.getElementById('modal-window-elem-edit'));

        modalWindowObj.fillEditModal();
    }

    fillEditModal() {
        ModalWindow.downloadEarlierCategories();
        let taskContainer = document.querySelectorAll('.task')[index];
        $('.title-input').value = taskContainer.getElementsByClassName('task-title')[0].innerHTML;
        $('.description-input').value = taskContainer.getElementsByClassName('description-content')[0].innerHTML;
        $(' .deadline-input').value = taskContainer.getElementsByClassName('dayDeadline')[0].innerHTML + " " + taskContainer.getElementsByClassName('monthDeadline')[0].innerHTML;
        let taskPriority = $('.priority-indicator')[index];
        let choosedRadioCategory = taskContainer.getAttribute('color-category');
        let choosedRadioPriority;
        let allCategoriesNames = $('.categories li label.category-name');
        let allCategoriesNamesArr = Array.prototype.slice.call(allCategoriesNames);
        let allPriorityLevels = $('.priorities li label.priority-name');
        let allPriorityLevelsArr = Array.prototype.slice.call(allPriorityLevels);
        for (let k = 0; k < allCategoriesNamesArr.length; k++) {
            if (allCategoriesNamesArr[k].innerHTML.toLowerCase() == taskContainer.parentNode.getAttribute('category')) {
                choosedRadioCategory = allCategoriesNamesArr.indexOf(allCategoriesNamesArr[k]);
            }
        }
        for (let k = 0; k < allPriorityLevelsArr.length; k++) {
            if (allPriorityLevelsArr[k].innerHTML.toLowerCase() == taskPriority.classList[1]) {
                choosedRadioPriority = allPriorityLevelsArr.indexOf(allPriorityLevelsArr[k]);
            }
        }

        $("input[name=category-name]")[choosedRadioCategory].checked = true;
        $("input[name=priority-level]")[choosedRadioPriority].checked = true;
        let modalCheckboxes = document.querySelectorAll('#modal-window-elem-edit input[type=checkbox]');
        let priorityIndicator = document.querySelectorAll('.priority-indicator span')[index].innerHTML // i.e. 2;
        for (let j = 0; j < priorityIndicator; j++) {
            modalCheckboxes[j].checked = true;
        }
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-button'), function () {
            ModalWindow.closeModalWindow(document.getElementById('modal-window-elem-edit'));
        });

        ModalWindow.moveModalWindow(50);
        ModalWindow.attachDatePicker();
    };

    static attachDatePicker() {
        $(function () {
            $("#datepicker").datepicker({
                dateFormat: 'dd.mm.yy'
            });
        });
    };

    static moveModalWindow(coord) {
        setTimeout(function () {
            document.getElementsByClassName('add-task-modal')[0].style.top = coord + '%';
        }, 100)
    }

    static closeModalWindow(child) {
        if (child == document.getElementById('modal-w-remove')) {
            child.style.display = 'none';
        }
        else {
            ModalWindow.moveModalWindow(-50);
            setTimeout(function () {
                document.body.removeChild(child);
            }, 500)
        }
    }
}

let modalWindowObj = new ModalWindow();

