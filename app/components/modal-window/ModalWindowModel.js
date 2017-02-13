class ModalWindowModel {
    downloadEarlierCategories() {
        let userId = localStorage.getItem('currentUser');
        let categoriesReceiver = firebase.database().ref('users/' + userId + '/categories');
        categoriesReceiver.once('value', function (data) {
            let dataValue = [].concat(data.val());
            for (let k = 0; k < dataValue.length; k++) {
                let val = dataValue[k];
                modalWindowController.transitCategories(val,k);
            }
        });
    }
}

let modalWindowModel = new ModalWindowModel();