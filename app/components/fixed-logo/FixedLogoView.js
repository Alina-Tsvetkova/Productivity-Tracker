class FixedLogoViewComponent {
    downloadFixedLogo (){
        let headerBinder = new Binder('app/components/fixed-logo/fixed-logo.html');
        let headerDoc = headerBinder.downloadComponent();
        document.body.appendChild(headerDoc.getElementsByClassName('fixed-logo')[0]);
        TaskList.subscribeCommonTaskListEvents();
    }
}

let fixedLogoView = new FixedLogoViewComponent();