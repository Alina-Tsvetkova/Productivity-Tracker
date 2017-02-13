class CategoriesController { // mediator between categories module and categories view, core of the categories module

    runCategories() {//get earlier saved categories from data base or default
        categoriesController.subscribeOnCategories();
        categoriesModel.getSavedCategories();
    }

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
        else {
            categoriesView.renderEarlierSavedCategories(data, k);
        }
    }

    subscribeOnCategories() {
        ElementsListener.listenToEvents('click', document.getElementsByClassName('save-btn-categories'), Categories.createCategories);
    }
}

let categoriesController = new CategoriesController();