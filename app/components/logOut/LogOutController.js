class LogOutController {

    get logOutElements() {
        return {
            logOutFormWrap: document.getElementsByClassName('log-out-form-wrapper')[0],
            logOutBtn: document.getElementsByClassName('log-out-btn'),
            closeLogOutFrom: document.getElementsByClassName('close-log-out-form'),
        }
    }

    cancelLogOut(event) {
        event.preventDefault();
        let logOutElems = logOutController.logOutElements;
        classManager.removeClass(logOutElems.logOutFormWrap, 'log-out-form-wrapper-appearance');
        setTimeout(function () {
            document.getElementById('wrapper').removeChild(logOutElems.logOutFormWrap);
        }, 1000);
    }

    subscribeLogOutEvents() {
        let logOutElems = logOutController.logOutElements;
        ElementsListener.listenToEvents('click', logOutElems.closeLogOutFrom, function (event) {
            logOutController.cancelLogOut(event);
        });
        ElementsListener.listenToEvents('click', logOutElems.logOutBtn, function () {
            logOutModel.logOutUser();
        }, 500);
    }

    proceedErrors(error) {
        return 'An error has occured';
    }
}

let logOutController = new LogOutController();