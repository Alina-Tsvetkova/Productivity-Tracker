class Binder {
    constructor(route, parent) {
        this.route = route;
        this.parent = parent;
    }

    downloadComponent(route, parent) {
        let componentRequest = new XMLHttpRequest();
        let componentParser = new DOMParser();
        componentRequest.open('GET', this.route, false);
        componentRequest.send();
        let doc = componentParser.parseFromString(componentRequest.responseText, "text/html");
        if (this.parent) {
            this.parent.innerHTML = doc.body.innerHTML;
        }
        return doc;
    }
}