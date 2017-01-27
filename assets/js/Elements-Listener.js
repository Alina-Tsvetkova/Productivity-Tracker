class ElementsListener {
    static listenToEvents(event, elements, func) {
        for (var k = 0; k < elements.length; k++) {
            elements[k].addEventListener(event, func, false);
        }
    }
}