class LogOutView {
    downloadLogOut() {
        let logOutBinder = new Binder('app/components/logOut/logOut.html');
        let logOutElem = logOutBinder.downloadComponent();
        document.getElementById('wrapper').appendChild(logOutElem.getElementsByClassName('log-out-form-wrapper')[0]);
        let logOutElems = logOutController.logOutElements;
        setTimeout(function () {
            logOutElems.logOutFormWrap.classList.add('log-out-form-wrapper-appearance');
        }, 500);
        logOutController.subscribeLogOutEvents();
    }
}

let logOutView = new LogOutView();