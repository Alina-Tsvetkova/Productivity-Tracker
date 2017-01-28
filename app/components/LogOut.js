class LogOut {
    logOutUser() {
        firebase.auth().signOut().then(function () {
            localStorage.removeItem('currentUser');
            window.location.hash = '';
            location.reload();
        }, function (error) {
            console.log('An error occured!');
        });
     }
}