class DayReports {
    constructor(tasksQuantity, index, chartData) {
        this.tasksQuantity = tasksQuantity;
        this.index = index;
        this.chartData = chartData;
    }

    countTotalDayTasks() { // method counts total tasks of the day
        for (let j = 0; j < dayChartData.chartData.length; j++) {
            dayChartData.tasksQuantity += dayChartData.chartData[dayChartData.index].y;
            dayChartData.index++;
        }
    }

    transferDataToDayChart() { // we take the last day data from the month object and create donut graph
        for (let j = 0; j < monthChartData.chartData.length; j++) { // 5 iterarions
            let objMonthData = monthChartData.chartData[j];
            let objDayData = dayChartData.chartData;
            let lastDayData = objMonthData.data.length; // the meaning of the last month day data : lines 5,8,11,14,17
            objDayData.push({}); // push object for saving our data for every category
            objDayData[j].name = objMonthData.name;
            objDayData[j].y = objMonthData.data[lastDayData - 1];
        }
        dayChartData.countTotalDayTasks();
    }

    deleteDayReportInfo() {
        dayChartData.index = 0;
        dayChartData.tasksQuantity = 0;
        dayChartData.chartData = [];
    }

    createDayChart() {
        Highcharts.chart('container-day-report', {
            chart: {
                plotBackgroundColor: null,
                type: 'pie',
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: 'transparent'
            },

            credits: {
                enabled: false
            },

            exporting: {
                enabled: false
            },

            title: {
                text: dayChartData.tasksQuantity,
                align: 'center',
                verticalAlign: 'middle',
                y: 15,
                style: {
                    color: 'white',
                    fontFamily: 'Roboto-Regular, sans-serif',
                    fontWeight: 'normal',
                    fontSize: '70px'
                }
            },

            subtitle: {
                text: 'total',
                align: 'center',
                verticalAlign: 'middle',
                y: 50,
                style: {
                    color: 'white',
                    fontFamily: 'Roboto-Regular, sans-serif',
                    fontWeight: 'normal',
                    fontSize: '20px'
                }
            },
            tooltip: {

                formatter: function () {
                    return this.point.name.toUpperCase() + '<br/>' +
                        'Tasks: ' + this.point.y;
                },
                useHTML: true,
                borderColor: 'none',
                opacity: 0.7,
                padding: 5,
                backgroundColor: "#cddde9",
                style: {
                    "color": '#3c5162',
                    "fontSize": "14px",
                    "fontWeight": 'bold',
                    "fontFamily": '\'Roboto-Bold\', sans-serif',
                },
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -40,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: false,
                            fontSize: '16px',
                            borderColor: 'none',
                            fontFamily: '\'PT Sans\', sans-serif',
                        }
                    },
                    showInLegend: true,
                },
                series: {
                    states: {
                        hover: {
                            halo: {
                                attributes: {
                                    fill: '#fff'
                                },
                                opacity: '.9'
                            }
                        }
                    }
                }
            },
            legend: {
                enabled: false
            },

            colors: ['#f15a4a', '#fea741', '#fddc43', '#1abb9b', '#8da5b8'],
            series: [{
                innerSize: '50%',
                data: dayChartData.chartData,
            }],
        });
    }


}

let dayChartData = new DayReports(0, 0, []);// container for day data;
