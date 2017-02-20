fetchdata("SELECT * FROM const");

function fetchdata(query){
    $.ajax({
        url: "database.php",
        dataType: "html",
        data: {query: query},
        async: true,
        success: succes,
        error: error
    });
}

function succes(data){
    $('#table').html(data);
    readTableToSunburst();
}

function error(){
    alert('error in query');
}