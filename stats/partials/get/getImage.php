<?php
/**
 * Created by PhpStorm.
 * User: general
 * Date: 7/28/17
 * Time: 11:39 AM
 */

include 'inc/db.php';
$connect=pg_connect("host=$hostname dbname=$database user=$user password=$password");
if(!$connect) {
    die('failed to connect!!');
}
$query="SELECT * from images WHERE active = '0'";
$result=pg_query($connect, $query) or die ("Error in Query:$query.".pg_last_error($connect));
$numrows = pg_num_rows($result);
$i = 0;
while ($i < $numrows){
    $row = pg_fetch_array($result);
    $filename = $row['fileName'];
    $pos = $row['position'];
    $data[$i][]=$filename;
    $data[$i][]=$pos;
    $i++;
}
$images = array();
$i = 0;
if(isset($data)) {
    foreach ($data as $line) {
        $images[$i]['fileName'] = $line[0];
        $images[$i]['position'] = $line[1];
        $i = $i + 1;
    }
    echo json_encode($images);
}