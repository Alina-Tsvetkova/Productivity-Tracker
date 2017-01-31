class Reports {
    constructor() {

    }

    static downloadReports() {
        let reportsBinder = new Binder('app/components/reports/reports.html', null, '#reports');
        let reportsDoc = reportsBinder.downloadComponent();
        document.body.innerHTML = '';
        document.body.appendChild(reportsDoc.getElementById('wrapper'));

        x();
        let tooltips = $('.tooltip');
        tooltips.tooltipSwitcher();
        Router.iconLinksBinder();
    }
}


function x() {
    let functionalityObj = { // needful elements to manipulate with DOCUMENT
        gapVariantsContainer: document.getElementsByClassName('gap-variants')[0],
        gapVariants: document.getElementsByClassName('gap-variant'),
        chartContainer: document.querySelector('.charts')
    };

    // default day chart is downloaded
    functionalityObj.chartContainer.id = 'container-day-report';
    changeGapColor(functionalityObj.gapVariants[0]);
    dayChartData.transferDataToDayChart();
    createDayChart();


    function toggleCharts() { // posiibility to generate different charts according to the selected tab (gap)
        if (event.target.classList.contains('week-chart-visualizer')) {
            functionalityObj.chartContainer.id = 'container-week-report';
            weekChartData.transferDataToWeekChart();
            createChart(weekChartData);
        } else if (event.target.classList.contains('day-chart-visualizer')) {
            functionalityObj.chartContainer.id = 'container-day-report';
            createDayChart();
        } else {
            functionalityObj.chartContainer.id = 'container-month-report';
            createChart(monthChartData);
        }
        changeGapColor(event.target);
    }

    function changeGapColor(target) { // change color of selected tab (gap)
        for (let i = 0; i < functionalityObj.gapVariants.length; i++) {
            functionalityObj.gapVariants[i].classList.remove('selectedTab');
        }
        target.classList.add("selectedTab");
    }

    functionalityObj.gapVariantsContainer.onclick = function (event) { // listen if we click on tab (day/ week/ month)
        if (event.target.classList.contains('gap-variant')) {
            toggleCharts();
        }
    }
}
