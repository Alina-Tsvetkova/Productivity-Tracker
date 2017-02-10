class CategoriesView extends Categories {
    static renderEarlierSavedCategories() {
        let choosedEarlierInputs = document.getElementsByClassName('possible-category');
        let i = 0;
        let categoriesReceiver = firebase.database().ref('users/' + localStorage.getItem('currentUser') + '/categories');
        categoriesReceiver.on('value', function (data) {
            for (let k = 0; k < choosedEarlierInputs.length; k++) {
                choosedEarlierInputs[k].value = data.val()[i];
                i++;
            }
        });
    }

}
