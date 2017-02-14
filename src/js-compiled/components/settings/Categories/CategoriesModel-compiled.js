'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Categories = function () {
    function Categories() {
        _classCallCheck(this, Categories);
    }

    _createClass(Categories, [{
        key: 'sendSavedCategories',
        value: function sendSavedCategories(possibleCategories, userId) {
            firebase.database().ref('users/' + userId).update({
                categories: possibleCategories
            });
        }
    }, {
        key: 'getSavedCategories',
        value: function getSavedCategories() {
            var categoriesReceiver = firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/categories');
            categoriesReceiver.once('value', function (data) {
                var dataValue = [].concat(data.val());
                for (var k = 0; k < dataValue.length; k++) {
                    var val = dataValue[k];
                    categoriesController.transitCategoriesToView(val, k);
                }
            });
        }
    }], [{
        key: 'createCategories',
        // all logic for operations that are connected with data
        value: function createCategories(event) {
            var savedCategories = new Categories();
            categoriesController.saveCategories(event, localStorage.getItem('currentUser'));
            return savedCategories;
        }
    }]);

    return Categories;
}();

var categoriesModel = new Categories();
//# sourceMappingURL=CategoriesModel-compiled.js.map
