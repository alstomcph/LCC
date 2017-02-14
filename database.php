<?php
    $servername = "localhost";
    $username = "readonly";
    $password = "readonly";
    $dbname = "lcc";

    $query = $_GET["query"];
    //echo "<p><small><b>Query: '" . $query . "'</b></small></p>";

    $connection = mysqli_connect($servername, $username, $password, $dbname);
    if(mysqli_connect_errno()){
        die("connection failed: ".mysqli_connect_error()." (" . mysqli_connect_error().")");
    }
    if($result = mysqli_query($connection, $query)){
        $all_property = array();
        echo '<table class="data-table"><thead><tr>';
        while ($property = mysqli_fetch_field($result)) {
            echo '<th>' . $property->name . '</th>';
            array_push($all_property, $property->name);
        }
        echo '</tr></thead><tbody>';
        while ($row = mysqli_fetch_array($result)) {
            echo "<tr>";
            foreach ($all_property as $item) {
                echo '<td contenteditable="true">' . $row[$item] . '</td>';
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