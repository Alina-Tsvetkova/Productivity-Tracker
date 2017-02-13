class CategoriesView { // logic that render categories, does not contact with model
    renderEarlierSavedCategories(data, k) {
        try {
            let choosedEarlierInputs = document.getElementsByClassName('possible-category');
            choosedEarlierInputs[k].value = data;
        } catch (e) {
            return false;
        }
    }
}

let categoriesView = new CategoriesView();