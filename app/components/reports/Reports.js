class Reports {
    static downloadReports() {
        let reportsBinder = new Binder('app/components/reports/reports.html');
        let reportsDoc = reportsBinder.downloadComponent();
        document.body.innerHTML = '';
        document.body.appendChild(reportsDoc.getElementById('wrapper'));
        reports.downloadDefaultDayChart();
        let tooltips = $('.tooltip');
        tooltips.tooltipSwitcher();
        Router.iconLinksBinder();
        dayChartData.deleteDayReportInfo();
    }

    initializeReportsObject() {
        let functionalityObj = { // needful elements to manipulate with DOCUMENT
            gapVariantsContainer: document.getElementsByClassName('gap-variants')[0],
            gapVariants: document.getElementsByClassName('gap-variant'),
            chartContainer: document.querySelector('.charts')
        };
        return functionalityObj;
    }

    toggleCharts() { // posiibility to generate different charts according to the selected tab (gap)
        if (event.target.classList.contains('week-chart-visualizer')) {
            reports.initializeReportsObject().chartContainer.id = 'container-week-report';
            weekChartData.transferDataToWeekChart();
            Reports.createWeekOrMonthChart(weekChartData);
            dayChartData.deleteDayReportInfo();
        } else if (event.target.classList.contains('day-chart-visualizer')) {
            reports.initializeReportsObject().chartContainer.id = 'container-day-report';
            Reports.changeGapColor(reports.initializeReportsObject().gapVariants[0]);
            dayChartData.transferDataToDayChart();
            dayChartData.createDayChart();
            dayChartData.deleteDayReportInfo();
        } else {
            reports.initializeReportsObject().chartContainer.id = 'container-month-report';
            Reports.createWeekOrMonthChart(monthChartData);
            dayChartData.deleteDayReportInfo();
        }
        Reports.changeGapColor(event.target);
    }

    static changeGapColor(target) { // change color of selected tab (gap)
        for (let i = 0; i < reports.initializeReportsObject().gapVariants.length; i++) {
            reports.initializeReportsObject().gapVariants[i].classList.remove('selectedTab');
        }
        target.classList.add("selectedTab");
    }

    downloadDefaultDayChart() {  // default day chart is downloaded
        reports.initializeReportsObject().chartContainer.id = 'container-day-report';
        Reports.changeGapColor(reports.initializeReportsObject().gapVariants[0]);
        dayChartData.transferDataToDayChart();
        dayChartData.createDayChart();
        reports.initializeReportsObject().gapVariantsContainer.onclick = function (event) { // listen if we click on tab (day/ week/ month)
            if (event.target.classList.contains('gap-variant')) {
                reports.toggleCharts();
            }
        }
    }

    static createWeekOrMonthChart(chartObj) {
        Highcharts.chart(chartObj.id, {
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                lineColor: 'blue',
                borderColor: 'white',
                spacingBottom: 65
            },

            credits: {
                enabled: false
            },

            exporting: {
                enabled: false
            },
            title: {
                text: ''
            },

            legend: {
                itemMarginTop: 30,
                itemStyle: {
                    color: '#8da5b8',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: '\'Roboto\', sans-serif',
                },
                itemHoverStyle: {
                    color: 'white'
                },
                symbolRadius: 0
            },

            xAxis: {
                categories: chartObj.chartCategories,
                labels: {
                    style: {
                        color: 'white',
                        fontFamily: '\'Roboto\', sans-serif',
                    }
                },
                lineWidth: 1,
                lineColor: 'white',
                tickColor: 'transparent',
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                gridLineColor: '#345168',
                color: 'white',
                title: {
                    text: ''
                },
                lineWidth: 1,
                lineColor: 'white',
                labels: {
                    style: {
                        color: 'white',
                        fontFamily: '\'Roboto\', sans-serif',
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    return this.series.name.toUpperCase() + '<br/>' +
                        'Tasks: ' + this.point.y;
                },
                borderColor: 'none',
                opacity: 0.7,
                useHTML: true,
                backgroundColor: "#cddde9",
                style: {
                    "color": '#3c5162',
                    "fontSize": "14px",
                    "fontWeight": 'bold',
                    "fontFamily": '\'Roboto-Bold\', sans-serif',
                },
            },

            plotOptions: {
                column: {
                    pointPadding: 0,
                    pointWidth: chartObj.columnWidth,
                    borderWidth: 0,
                    stacking: 'normal',
                }
            },
            colors: ['#f15a4a', '#fea741', '#fddc43', '#1abb9b', '#8da5b8'],
            series: chartObj.chartData,
        });

    }
}


// /* two methods weekChartData.transferDataToWeekChart and dayChartData.transferDataToDayChart below are created to fill week and day data according to the month data
//  (because when we want to see day chart we wait to see last day of our month and when we want to see week chart
//  we wait to see last working week (that is why last 5 days of the month) of our month
//  */

let reports = new Reports();