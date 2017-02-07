class Categories {
    constructor(category) {
        this.category = category;
    }

    static createCategories(){
        let savedCategories = new Categories();
        savedCategories.saveCategories(localStorage.getItem('currentUser'));
    }

    saveCategories(userId) {
        let possibleCategories = new Array();
        let allPossibleCategories = document.getElementsByClassName('possible-category');
        for (let i = 0; i < allPossibleCategories.length; i++) {
            possibleCategories.push(allPossibleCategories[i].value);
        }
        firebase.database().ref('users/' + userId).update({
            categories: possibleCategories
        });

        CategoriesView.renderEarlierSavedCategories();
    };

}