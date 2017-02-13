class InitialTimerController {
    subscribeStartTimerEvents(timerElements) {
        ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, workPhaseController.finishPomodora);
        ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, workPhaseController.failPomodora);
    }

    transitTaskInformation(taskKey) {
        initialTimerModel.addTaskInformation(taskKey);
    }

    transferInfoForRender(taskKey, taskTitle, taskDescription, taskEstimation) {
        initialTimerView.renderTaskInformation(taskKey, taskTitle, taskDescription, taskEstimation);
    }

}

let initialTimerController = new InitialTimerController();