class CategoriesView extends Categories {

    static renderEarlierSavedCategories() {
        let choosedEarlierInputs = document.getElementsByClassName('possible-category');
        let userId = localStorage.getItem('currentUser');
        let i = 0;
        var categoriesReceiver = firebase.database().ref('users/' + userId + '/categories');
        categoriesReceiver.on('value', function (data) {
            for (let k = 0; k < choosedEarlierInputs.length; k++) {
                choosedEarlierInputs[k].value = data.val()[i];
                i++;
            }
        });
    }

}
