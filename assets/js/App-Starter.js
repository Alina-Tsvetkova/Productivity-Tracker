class AppStarter {
    downloadLoginPage() {
        let loginBinder = new Binder('app/components/login/login.html', document.body, '#logged');
        loginBinder.downloadComponent();
    }
}

let appStarter = new AppStarter();

appStarter.downloadLoginPage();

