function RUN_AJAX() {
    $.ajax({
        url: "http://rest-service.guides.spring.io/greeting",
        dataType: "json",
        success: function (data) {
            init_chart('chart');
        }
    })
}

function init_chart(inDiv) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        data = google.visualization.arrayToDataTable([
            ['Group', 'Total Discard Cost', 'Total MMHACM Cost', 'Total Repair Cost', 'Total  Renewal Cost', 'Total MMHAPM Cost', { role: 'annotation' }],
            ['Trackside Equipment', 10, 24, 20, 32, 18, ''],
            ['ATC (Trackside)', 16, 22, 23, 30, 16, ''],
            ['TCC TMS', 28, 19, 29, 30, 12, ''],
            ['Train Position, Detection & Integrity', 16, 22, 23, 30, 16, ''],
            ['IXL', 16, 22, 23, 30, 16, ''],
            ['Overall System', 12, 2, 3, 3, 6, ''],
            ['Test Equipment', 16, 12, 23, 5, 3, '']
        ]);

        var options = {
            title: 'Total maintenance Cost (k€/year)',
            width: screen.width * 0.5,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true,
            //animation: {startup: true, duration: 400, easing: 'inAndOut'},
            //colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
        };

        chart = new google.visualization.ColumnChart(document.getElementById(inDiv));
        google.visualization.events.addListener(chart, 'select', selectHandler);
        google.visualization.events.addListener(chart, 'click', clickHandler);
        chart.draw(data, options);
    }
}

function clickHandler(e) {
    var match = e.targetID.match(/hAxis#\d#label#(\d)/);
    if (match != null && match.length) {
        var rowIndex = parseInt(match[1]);
        var label = data.getValue(rowIndex, 0);
        fetchdata("SELECT * FROM const WHERE SubSystem = '" + label + "'");
    }
}

function selectHandler() {
    var selection = chart.getSelection();
    if (selection.length) {
        var item = selection[0];
        if (item.row != null)
            var str = data.getFormattedValue(item.row, item.column);
    }
    else {
        selection = previous_selection;
    }

    previous_selection = selection;
    chartSelectSwitch(selection[0].row, selection[0].column);
}

function chartSelectSwitch(row, column){
    if(row == null && column == 1){
        drawSubChart()
    }
}

function drawSubChart() {
    var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          //title: 'My Daily Activities',
          height: 600, 
          width: 600,
          pieHole: 0.4,
          colors: ['#66a3ff', '#4d94ff', '#3385ff', '#1a75ff', '#0066ff', '#005ce6', '#0052cc']
        };

    chart = new google.visualization.PieChart(document.getElementById('subchart'));
    chart.draw(data, options);
}