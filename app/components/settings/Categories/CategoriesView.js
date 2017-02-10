class CategoriesView extends Categories { // logic that render categories, does not contact with model
    renderEarlierSavedCategories(data, k) {
        let choosedEarlierInputs = document.getElementsByClassName('possible-category');
        choosedEarlierInputs[k].value = data;
    }
}

let categoriesView = new CategoriesView();