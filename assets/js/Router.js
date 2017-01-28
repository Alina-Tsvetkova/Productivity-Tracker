class Router {
    static listenToHashChanges() {
        if (window.location.hash === '#settings-cycle') {


        }
    }

    static addHash(hash) {
        window.location.hash = hash;
    }
}

Router.listenToHashChanges();

