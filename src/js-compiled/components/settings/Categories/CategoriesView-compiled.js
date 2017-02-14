'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CategoriesView = function () {
    function CategoriesView() {
        _classCallCheck(this, CategoriesView);
    }

    _createClass(CategoriesView, [{
        key: 'renderEarlierSavedCategories',
        // logic that render categories, does not contact with model
        value: function renderEarlierSavedCategories(data, k) {
            try {
                var choosedEarlierInputs = document.getElementsByClassName('possible-category');
                choosedEarlierInputs[k].value = data;
            } catch (e) {
                return false;
            }
        }
    }]);

    return CategoriesView;
}();

var categoriesView = new CategoriesView();
//# sourceMappingURL=CategoriesView-compiled.js.map
