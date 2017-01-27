class Categories {
    constructor(category) {
        this.category = category;
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
        CategoriesView.renderEarlierSavedCategories();
    }
}