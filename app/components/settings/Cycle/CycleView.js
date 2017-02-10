class CycleView  {
    renderSavedCycleSettings(cycleValue) {
        let cycleElements = cycleController.initializeCycleElements;
        try {
            cycleElements.longBreak.value = cycleValue.longBreak + " min";
            cycleElements.shortBreak.value = cycleValue.shortBreak + " min";
            cycleElements.workIteration.value = cycleValue.workIteration;
            cycleElements.workTime.value = cycleValue.workTime + " min";
            cycleController.getDataForCycle();

        } catch (e) {
            return 'element is already removed from DOM';
        }
    }

    createWorkTime() {
        DOMElementsInitializer.cycle.innerHTML = '';
        cycleView.generateWorkAndBreakIt();
        cycleView.generateLongBreak();
        cycleView.showFullCycle();
    }

    generateWorkAndBreakIt() {
        for (let k = 0; k < cycleController.getWorkIterations(); k++) {
            let workPart = document.createElement('div');
            workPart.classList.add('workPartsStyles');
            workPart.style.width = cycleController.countWorkTime();
            DOMElementsInitializer.cycle.appendChild(workPart);
            if (k < cycleController.getWorkIterations() - 1) { // no need to have break after last work time
                cycleView.generateShortBreak();
            }
        }
    }

    generateLongBreak() {
        let longBreak = document.createElement('div');
        longBreak.classList.add('longBreakStyles');
        longBreak.style.width = cycleController.countLongBreak();
        DOMElementsInitializer.cycle.appendChild(longBreak);
    }

    generateShortBreak() {
        let shortBreakPart = document.createElement('div');
        shortBreakPart.classList.add('breakPartsStyles');
        shortBreakPart.style.width = cycleController.countShortBreak();
        DOMElementsInitializer.cycle.appendChild(shortBreakPart);
    }

    showFullCycle() {
        let fullCycleTitle = document.createElement('span');
        fullCycleTitle.classList.add('fullCycleTitleStyles');
        cycleController.countFullCycleHours(fullCycleTitle);
        DOMElementsInitializer.cycle.appendChild(fullCycleTitle);
        cycleView.generateWorkAndBreakIt();
    }

    showPartsCycleHours(elem, mainElem) {
        mainElem.appendChild(elem);
        DOMElementsInitializer.timePoints.appendChild(mainElem);
    }

    createCycleTitle() {
        let smallCycleTitle = document.createElement('span');
        smallCycleTitle.classList.add('smallCycleTitleStyles');
        return smallCycleTitle;
    }

    createCycleWrapper() {
        let wrapperCycleTitle = document.createElement('div');
        wrapperCycleTitle.classList.add('wrapperCycleTitleStyles');
        return wrapperCycleTitle;
    }

    renderPartsCycleMinutes(smallCycleTitle, ...args) {
        smallCycleTitle.innerHTML = '';
        let argsArr = [...args];
        for (let j = 0; j < argsArr.length; j++) {
            smallCycleTitle.innerHTML += argsArr[j];
        }
    }
}

let cycleView = new CycleView();