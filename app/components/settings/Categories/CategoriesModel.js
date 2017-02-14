class Categories { // all logic for operations that are connected with data
    static createCategories(event) {
        let savedCategories = new Categories();
        categoriesController.saveCategories(event, localStorage.getItem('currentUser'));
        return savedCategories;
    }

    sendSavedCategories(possibleCategories, userId) {
        firebase.database().ref('users/' + userId).update({
            categories: possibleCategories
        });
    }

    getSavedCategories() {
        let categoriesReceiver = firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/categories');
        categoriesReceiver.once('value', function (data) {
            let dataValue = [].concat(data.val());
            for (let k = 0; k < dataValue.length; k++) {
                let val = dataValue[k];
                categoriesController.transitCategoriesToView(val,k);
            }
        });
    }
}

let categoriesModel = new Categories();
