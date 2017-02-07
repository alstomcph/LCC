<!DOCTYPE html>
<html>
    <head>
        <title>Life Cycle Cost</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
		<link rel="stylesheet" href="css/milligram.min.css">
        <link rel="stylesheet" href="css/overwrite.css">

		<!--<link rel="stylesheet" href="https://milligram.github.io/styles/main.css"> -->
        <script src="js/jquery.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script src="js/scripts.js"></script>
    </head>

    <body>
        <div>
            <h1>Life cycle cost (LCC)</h1>
            <button type="button" ID="AJAX_button" onclick="RUN_AJAX()">Run SAP Query</button>
            <p class="greeting-id">The ID is: </p>
            <p class="greeting-content">The content is: </p>
            <div id="piechart" style="width: 700px; height: 300px;"></div>
            <div>
                <?php
                    $servername = "localhost";
                    $username = "readonly";
                    $password = "readonly";
                    $dbname = "lcc";
                    $query = "SELECT * FROM const";
                    // Create connection
                    $connection = mysqli_connect($servername, $username, $password, $dbname);
                    //test if connection failed
                    if(mysqli_connect_errno()){
                        die("connection failed: "
                            . mysqli_connect_error()
                            . " (" . mysqli_connect_error()
                            . ")");
                    }

                    //get results from database
                    if($result = mysqli_query($connection, $query)){
                        $all_property = array();  //declare an array for saving property

                        //showing property
                        echo '<table class="data-table"><thead><tr>';  //initialize table tag
                        while ($property = mysqli_fetch_field($result)) {
                            echo '<th>' . $property->name . '</th>';  //get field name for header
                            array_push($all_property, $property->name);  //save those to array
                        }
                        echo '</tr></thead><tbody>'; //end tr tag

                        //showing all data
                        while ($row = mysqli_fetch_array($result)) {
                            echo "<tr>";
                            foreach ($all_property as $item) {
                                echo '<td>' . $row[$item] . '</td>'; //get items using property value
                            }
                            echo '</tr>';
                        }
                        echo "</tbody></table>";
                    }
                    else{
                        echo "error";
                    }
                    $connection->close();
                ?>
            </div>
        </div>
    </body>
</html>
