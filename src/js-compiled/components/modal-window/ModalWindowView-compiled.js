'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalWindowView = function () {
    function ModalWindowView() {
        _classCallCheck(this, ModalWindowView);
    }

    _createClass(ModalWindowView, [{
        key: 'addTaskModal',
        value: function addTaskModal() {
            var modalBinder = new Binder('app/components/modal-window/modal-window.html');
            var receivedDoc = modalBinder.downloadComponent();
            document.body.appendChild(receivedDoc.getElementById('modal-window-elem'));
            modalWindowController.subscribeAddTaskEvents();
            modalWindowController.moveModalWindow(50);
            modalWindowView.attachDatePicker();
        }
    }, {
        key: 'showEditModal',
        value: function showEditModal(index) {
            var modalBinder = new Binder('app/components/modal-window/edit-modal-window.html');
            var receivedDoc = modalBinder.downloadComponent();
            document.body.appendChild(receivedDoc.getElementById('modal-window-elem-edit'));
            modalWindowModel.downloadEarlierCategories();
            modalWindowView.fillEditModal(index);
        }
    }, {
        key: 'downloadRemoveModalWindow',
        value: function downloadRemoveModalWindow() {
            var modalBinder = new Binder('app/components/modal-window/remove-modal-window.html');
            var receivedDoc = modalBinder.downloadComponent();
            document.body.appendChild(receivedDoc.getElementById('modal-w-remove'));
            modalWindowController.moveModalWindow(50);
        }
    }, {
        key: 'fillEditModal',
        value: function fillEditModal(index) {

            var modalWindow = modalWindowController.getModalWindowElements;
            var taskContainer = modalWindow.task[index];
            modalWindow.titleInput.value = taskContainer.getElementsByClassName('task-title')[0].innerHTML;
            modalWindow.descriptionInput.value = taskContainer.getElementsByClassName('description-content')[0].innerHTML;

            var modalCheckboxes = document.querySelectorAll('#modal-window-elem-edit input[type=checkbox]');
            var priorityIndicator = document.querySelectorAll('.priority-indicator span')[index].innerHTML;
            for (var j = 0; j < priorityIndicator; j++) {
                modalCheckboxes[j].checked = true;
            }
            var taskPriority = $('.priority-indicator')[index];

            modalWindowModel.downloadEarlierCategories();
            var choosedRadioCategory = void 0;
            setTimeout(function () {
                choosedRadioCategory = modalWindowView.findChoosedCategory(taskContainer);
                modalWindow.categoriesInputs[choosedRadioCategory].checked = true;
            }, 200);
            var choosedRadioPriority = modalWindowView.findChoosedPriority(taskPriority);

            modalWindow.priorityInputs[choosedRadioPriority].checked = true;

            modalWindowController.subscribeModalEvents();
            modalWindowController.moveModalWindow(50);
            modalWindowView.attachDatePicker();
        }
    }, {
        key: 'findChoosedCategory',
        value: function findChoosedCategory(taskContainer) {

            var choosedRadioCategory = taskContainer.getAttribute('category');
            var allCategoriesNames = document.querySelectorAll('label.category-name');
            var allCategoriesNamesArr = Array.prototype.slice.call(allCategoriesNames);
            for (var k = 0; k < allCategoriesNamesArr.length; k++) {
                console.log(allCategoriesNamesArr[k].innerText);
                if (allCategoriesNamesArr[k].innerText == taskContainer.parentNode.getAttribute('category')) {
                    choosedRadioCategory = allCategoriesNamesArr.indexOf(allCategoriesNamesArr[k]);
                } else if (choosedRadioCategory == null) {
                    choosedRadioCategory = 0;
                }
            }
            return choosedRadioCategory;
        }
    }, {
        key: 'findChoosedPriority',
        value: function findChoosedPriority(taskPriority) {
            var allPriorityLevels = document.querySelectorAll('.priorities li label.priority-name');
            var choosedRadioPriority = void 0;
            var allPriorityLevelsArr = Array.prototype.slice.call(allPriorityLevels);
            for (var k = 0; k < allPriorityLevelsArr.length; k++) {
                if (allPriorityLevelsArr[k].innerHTML.toLowerCase() == taskPriority.classList[1]) {
                    choosedRadioPriority = allPriorityLevelsArr.indexOf(allPriorityLevelsArr[k]);
                }
            }
            return choosedRadioPriority;
        }
    }, {
        key: 'renderEarlierSavedCategories',
        value: function renderEarlierSavedCategories(data, k) {
            var modalWindow = modalWindowController.getModalWindowElements;
            modalWindow.categoryTitles[k].value = data;
            modalWindow.categoryLabels[k].innerHTML = modalWindow.categoryTitles[k].value;
        }
    }, {
        key: 'attachDatePicker',
        value: function attachDatePicker() {
            $(function () {
                $("#datepicker").datepicker({
                    dateFormat: 'dd.mm.yy'
                });
            });
            return true;
        }
    }]);

    return ModalWindowView;
}();

var modalWindowView = new ModalWindowView();
//# sourceMappingURL=ModalWindowView-compiled.js.map
