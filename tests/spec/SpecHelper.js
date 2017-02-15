describe("Current User", function () {
    it ("Write user to DB", function () {
        expect(registrationModel.saveUserDataLocally('n7w15RNqoWPaa1sbgRwDk6vTKm13')).toEqual('user is saved');
    })
    it("Return current user for a@mail.ru", function () {
        expect(RegistrationModel.getUserDataLocally()).toEqual('n7w15RNqoWPaa1sbgRwDk6vTKm13');
    });

});

describe('Log-Out', function () {
    it("Should return error message", function () {
        expect(logOutController.proceedErrors()).toEqual('An error has occured');
    });
});

describe('Router', function () {
    it("Return window hash", function () {
        expect(Router.addHash('hash')).toEqual('#hash');
    });
});

describe('Task Controller', function () {
    var today = new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();

    it ('Should return today date', function () {
        expect(taskElementController.addDefaultData()).toEqual(today);
    });
    it ('Should return month according to index', function () {
        expect(taskElementController.generateWordMonth([15,2,2017])).toEqual('February');
    });

    it ('Return if no categories were found in DB', function () {
        expect(modalWindowController.transitCategories()).toEqual(false);
    });

    it ('Move modal window', function () {
        expect(modalWindowController.moveModalWindow(50)).toEqual(50);
    });

    it ('Should attach Date Picker', function () {
        expect(modalWindowView.attachDatePicker()).toEqual(true);
    })
});

describe('Timer', function () {

    beforeEach(function () {
        var wrap = document.createElement('div');
        document.body.appendChild(wrap);
        wrap.id = 'wrap';
    });

    it("Add border to element", function () {
        expect(timer.addBorderColor(document.getElementById('wrap'),3)).toEqual('#e16c65');
    });

    it("Refuse to add border to element", function () {
        expect(timer.addBorderColor(document.getElementById('wrap2'),3)).toEqual('no element to add border');
    });
});

describe('Reports', function () {
    it ('Should be instance of', function () {
        expect(dayChartData).toEqual(jasmine.any(DayReports));
    });

    it ('Month report object should be created properly', function () {
        var monthChartData = new  MonthReport('container-month-report');
        expect(monthChartData.id).toEqual('container-month-report');
    });

    it ('Week report object should be created properly', function () {
        var weekChartData = new WeekReport('container-week-report');
        expect(weekChartData.id).toEqual('container-week-report');
    });
});

describe('User Data', function () {
    var user = new UserData('abc', 'n@mail.ua');
    it ('Should return User Data', function () {
        expect(user.userId).toEqual('abc');
    });
    it ('Should return User Email ', function () {
        expect(user.email).toEqual('n@mail.ua');
    });

});


