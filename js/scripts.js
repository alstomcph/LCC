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
            ['Group', 'Total Discard Cost', 'Total MMHACM Cost', 'Total Repair Cost', 'Total  Renewal Cost', 'Total MMHAPM Cost'],
            ['Trackside Equipment', 10, 24, 20, 32, 18],
            ['ATC (Trackside)', 16, 22, 23, 30, 16],
            ['TCC TMS', 28, 19, 29, 30, 12],
            ['Train Position, Detection & Integrity', 16, 22, 23, 30, 16],
            ['IXL', 16, 22, 23, 30, 16],
            ['Overall System', 12, 2, 3, 3, 6],
            ['Test Equipment', 16, 12, 23, 5, 3]
        ]);

        var options = {
            title: 'Total maintenance Cost (k€/year)',
            width: screen.width * 1,
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

function drawTreeMapChart() {
    google.charts.load('current', { 'packages': ['treemap'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(TableToArray());
        /*
        var data = google.visualization.arrayToDataTable([
            ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
            ['Global', null, 0, 0],
            ['America', 'Global', 0, 0],
            ['Europe', 'Global', 0, 0],
            ['Asia', 'Global', 0, 0],
            ['Australia', 'Global', 0, 0],
            ['Africa', 'Global', 0, 0],
            ['Brazil', 'America', 11, 10],
            ['USA', 'America', 52, 31],
            ['Mexico', 'America', 24, 12],
            ['Canada', 'America', 16, -23],
            ['France', 'Europe', 42, -11],
            ['Germany', 'Europe', 31, -2],
            ['Sweden', 'Europe', 22, -13],
            ['Italy', 'Europe', 17, 4],
            ['UK', 'Europe', 21, -5],
            ['China', 'Asia', 36, 4],
            ['Japan', 'Asia', 20, -12],
            ['India', 'Asia', 40, 63],
            ['Laos', 'Asia', 4, 34],
            ['Mongolia', 'Asia', 1, -5],
            ['Israel', 'Asia', 12, 24],
            ['Iran', 'Asia', 18, 13],
            ['Pakistan', 'Asia', 11, -52],
            ['Egypt', 'Africa', 21, 0],
            ['S. Africa', 'Africa', 30, 43],
            ['Sudan', 'Africa', 12, 2],
            ['Congo', 'Africa', 10, 12],
            ['Zaire', 'Africa', 8, 10]
        ]);
        */
        var options = {
            highlightOnMouseOver: true,
            maxDepth: 1,
            maxPostDepth: 0,
            //minHighlightColor: '#8c6bb1',
            //midHighlightColor: '#9ebcda',
            //maxHighlightColor: '#edf8fb',
            minColor: '#ffe6e6',
            midColor: '#ff6666',
            maxColor: '#e60000',
            headerHeight: 30,
            showScale: true,
            height: 700,
            useWeightedAverageForAggregation: true, 
            fontSize: 11
        };

        chart = new google.visualization.TreeMap(document.getElementById('chart'));
        chart.draw(data, options);
    }
}
function TableToArray() {
    var dataTabelArray = [];
    dataTabelArray.push(['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)']);
    dataTabelArray.push(['Total LCC', null, 0, 0]);

    dataTabelArray.push(['Trackside Equipment', 'Total LCC', 0, 0]);
    dataTabelArray.push(['ATC (Trackside)', 'Total LCC', 0, 0]);
    dataTabelArray.push(['TCC TMS', 'Total LCC', 0, 0]);
    dataTabelArray.push(['Train Position, Detection & Integrity', 'Total LCC', 0, 0]);
    dataTabelArray.push(['IXL', 'Total LCC', 0, 0]);
    dataTabelArray.push(['Overall System', 'Total LCC', 0, 0]);
    dataTabelArray.push(['Test Equipment', 'Total LCC', 0, 0]);
    
    dataTabelArray.push(['Point / Switch machines', 'Trackside Equipment', 0, 0]);
    dataTabelArray.push(['Staff / Passenger crossing protection device', 'Trackside Equipment', 0, 0]);
    dataTabelArray.push(['Level Crossing', 'Trackside Equipment', 0, 0]);

    dataTabelArray.push(['RBC in 2oo3PF', 'ATC (Trackside)', 0, 0]);
    dataTabelArray.push(['NTG Batch 3 with UDP Router in rack with power supply', 'ATC (Trackside)', 0, 0]);
    dataTabelArray.push(['KMS', 'ATC (Trackside)', 0, 0]);
    dataTabelArray.push(['HHT', 'ATC (Trackside)', 0, 0]);
    dataTabelArray.push(['Euro-encoder', 'ATC (Trackside)', 0, 0]);
    dataTabelArray.push(['Trackside', 'ATC (Trackside)', 0, 0]);

    dataTabelArray.push(['TCC TMS_', 'TCC TMS', 0, 0]);
    dataTabelArray.push(['TMS Equipment in M-TOB', 'TCC TMS', 0, 0]);
    dataTabelArray.push(['TMS Equipment in S-TOB', 'TCC TMS', 0, 0]);

    dataTabelArray.push(['Centralised Train Detection (Axle counter)', 'Train Position, Detection & Integrity', 0, 0]);

    dataTabelArray.push(['CIXL (SML 400 GP BL2)', 'IXL', 0, 0]);
    dataTabelArray.push(['Interlocking', 'IXL', 0, 0]);

    dataTabelArray.push(['Power, UPS & Batteries', 'Overall System', 0, 0]);
    dataTabelArray.push(['Miscellaneous equipment', 'Overall System', 0, 0]);
    dataTabelArray.push(['Shelter (with redundant UPS/batteries)', 'Overall System', 0, 0]);

    dataTabelArray.push(['Test Specific Equipment', 'Test Equipment', 0, 0]);


    $(".data-table tbody tr").each(function (index) {
        var ID = $(this).find("td:nth-child(1)").text();
        var SubSystem = $(this).find("td:nth-child(2)").text();
        var SubSystemModule = $(this).find("td:nth-child(3)").text();
        var Product = $(this).find("td:nth-child(4)").text();
        var qty = Number($(this).find("td:nth-child(6)").text());

        dataTabelArray.push([Product + '. ID: ' +  ID.toString(), SubSystemModule, qty, qty]);

    });
    return dataTabelArray;
}