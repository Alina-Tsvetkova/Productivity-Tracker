'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CategoriesController = function () {
    function CategoriesController() {
        _classCallCheck(this, CategoriesController);
    }

    _createClass(CategoriesController, [{
        key: 'runCategories',
        // mediator between categories module and categories view, core of the categories module

        value: function runCategories() {
            //get earlier saved categories from data base or default
            categoriesController.subscribeOnCategories();
            categoriesModel.getSavedCategories();
        }
    }, {
        key: 'saveCategories',
        value: function saveCategories(event, userId) {
            var possibleCategories = [];
            var allPossibleCategories = document.getElementsByClassName('possible-category');
            for (var i = 0; i < allPossibleCategories.length; i++) {
                possibleCategories.push(allPossibleCategories[i].value);
            }
            categoriesModel.sendSavedCategories(possibleCategories, userId);
            Settings.notifyAboutSuccessfulSave(event);
        }
    }, {
        key: 'transitCategoriesToView',
        value: function transitCategoriesToView(data, k) {
            if (!data) {
                return false;
            } else {
                categoriesView.renderEarlierSavedCategories(data, k);
            }
        }
    }, {
        key: 'subscribeOnCategories',
        value: function subscribeOnCategories() {
            ElementsListener.listenToEvents('click', document.getElementsByClassName('save-btn-categories'), Categories.createCategories);
        }
    }]);

    return CategoriesController;
}();

var categoriesController = new CategoriesController();
//# sourceMappingURL=CategoriesController-compiled.js.map
