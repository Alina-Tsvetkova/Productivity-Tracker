class AppStarter {
    downloadLoginPage() {
        let loginBinder = new Binder('app/components/login/login.html', document.body);
        loginBinder.downloadComponent();
        Router.addHash("");
    }
}

let appStarter = new AppStarter();

appStarter.downloadLoginPage();

