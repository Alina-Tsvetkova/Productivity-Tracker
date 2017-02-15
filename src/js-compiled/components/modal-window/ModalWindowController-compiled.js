'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalWindowController = function () {
    function ModalWindowController() {
        _classCallCheck(this, ModalWindowController);
    }

    _createClass(ModalWindowController, [{
        key: 'initModalWindow',
        value: function initModalWindow() {
            // start module of Modal Window
            modalWindowModel.downloadEarlierCategories();
            modalWindowView.addTaskModal();
        }
    }, {
        key: 'initEditModalWindow',
        value: function initEditModalWindow(index) {
            // start module of Modal Edit Window
            modalWindowModel.downloadEarlierCategories();
            modalWindowView.showEditModal(index);
        }
    }, {
        key: 'transitCategories',
        value: function transitCategories(data, k) {
            if (!data) {
                return false;
            }

            modalWindowView.renderEarlierSavedCategories(data, k);
        }
    }, {
        key: 'closeModalWindow',
        value: function closeModalWindow(child) {
            modalWindowController.moveModalWindow(-50);
            setTimeout(function () {
                document.body.removeChild(child);
            }, 500);
        }
    }, {
        key: 'moveModalWindow',
        value: function moveModalWindow(coord) {
            setTimeout(function () {
                document.getElementsByClassName('add-task-modal')[0].style.top = coord + '%';
            }, 100);

            return coord;
        }
    }, {
        key: 'subscribeModalEvents',
        value: function subscribeModalEvents() {
            ElementsListener.listenToEvents('click', document.getElementsByClassName('close-button'), function () {
                modalWindowController.closeModalWindow(document.getElementById('modal-window-elem-edit'));
            });

            ElementsListener.listenToEvents('click', document.getElementsByClassName('check-button-edit'), function () {
                productivityManager.saveEditedTask(index);
            });
        }
    }, {
        key: 'subscribeAddTaskEvents',
        value: function subscribeAddTaskEvents() {
            ElementsListener.listenToEvents('click', document.getElementsByClassName('icon-add-task'), productivityManager.submitTask);
            ElementsListener.listenToEvents('click', document.getElementsByClassName('close-button'), function () {
                modalWindowController.closeModalWindow(document.getElementById('modal-window-elem'));
            });
        }
    }, {
        key: 'subscribeRemoveTaskModalEvents',
        value: function subscribeRemoveTaskModalEvents(modalElements) {
            ElementsListener.listenToEvents('click', modalElements.removeBtn, taskDeletorObj.submitDeleteTask);
            ElementsListener.listenToEvents('click', modalElements.cancelBtn, taskDeletorObj.cancelDeletion);
        }
    }, {
        key: 'getModalWindowElements',
        get: function get() {
            return {
                task: document.querySelectorAll('.task'),
                titleInput: document.getElementsByClassName('title-input')[0],
                descriptionInput: document.getElementsByClassName('description-input')[0],
                categoryRadioBtn: document.querySelector('input.category-input:checked + label + label'),
                deadlineInput: document.getElementsByClassName('deadline-input')[0],
                estimationCheckboxes: document.querySelectorAll('input[type="checkbox"]:checked').length,
                priorityRadioBtn: document.querySelector('input[name="priority-level"]:checked + label + label'),
                categoryTitles: document.querySelectorAll('.categories-names .category-input'),
                categoryLabels: document.querySelectorAll('.categories-names .category-title'),
                categoriesInputs: document.querySelectorAll('input[name=category-name]'),
                priorityInputs: document.querySelectorAll('input[name=priority-level]')
            };
        }
    }]);

    return ModalWindowController;
}();

var modalWindowController = new ModalWindowController();
//# sourceMappingURL=ModalWindowController-compiled.js.map
