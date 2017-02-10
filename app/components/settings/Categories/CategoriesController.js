class CategoriesController { // mediator between categories module and categories view, core of the categories module
    saveCategories(event, userId) {
        let possibleCategories = [];
        let allPossibleCategories = document.getElementsByClassName('possible-category');
        for (let i = 0; i < allPossibleCategories.length; i++) {
            possibleCategories.push(allPossibleCategories[i].value);
        }
        categoriesModel.sendSavedCategories(possibleCategories, userId);
        Categories.notifyAboutSuccessfulSave(event);
    };

    transitCategoriesToView(data, k) {
        if (!(data)) {
            return false;
        }
        categoriesView.renderEarlierSavedCategories(data, k);
    }

    subscribeOnCategories() {
        ElementsListener.listenToEvents('click', document.getElementsByClassName('save-btn-categories'), Categories.createCategories);
    }

    orderToGetCategories() { //get earlier saved categories from data base or default
        categoriesController.subscribeOnCategories();
        categoriesModel.getSavedCategories();

    }
}

let categoriesController = new CategoriesController();