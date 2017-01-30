class ClassManager {
    addClass(){

    }

    removeClass(obj, cls){
        var classes = obj.className.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == cls) {
                classes.splice(i, 1);
                i--;
            }
        }
        obj.className = classes.join(' ');
        console.log(obj.className);
    }
}

let classManager = new ClassManager();