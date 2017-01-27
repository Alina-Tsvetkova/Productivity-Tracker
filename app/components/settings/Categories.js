class Categories {
    constructor(category) {
        this.category = category;
    }

    static renderEarlierSavedCtegories() {
        let choosedEarlierInputs = document.getElementsByClassName('possible-category');
        let i = 0;
        categories.on('value', function (data) {
            for (let k = 0; k < choosedEarlierInputs.length; k++) {
                choosedEarlierInputs[k].value = data.val()[i];
                i++;
            }
        })
    }

    static saveCategories() {
        let possibleCategoriesSet = new Set();
        let allPossibleCategories = document.getElementsByClassName('possible-category');
        for (let i = 0; i < allPossibleCategories.length; i++) {
            possibleCategoriesSet.add(allPossibleCategories[i].value);
        }
        Categories.pushCategoriesToDB(possibleCategoriesSet);
        let choosedCategories = {};
        let k = 0;
        for (let item of possibleCategoriesSet) {
            choosedCategories[k] = item;
            k++;
        }
        localStorage.setItem('categories', JSON.stringify(choosedCategories));
    }

    static pushCategoriesToDB(iterableSet) {
        let choosedCategories = {};
        let k = 0;
        let ifBaseIsFULL = false;
        for (let item of iterableSet) {
            choosedCategories[k] = item;
            k++;
        }
        categories.set(choosedCategories);
        Categories.renderEarlierSavedCtegories();
    }
}