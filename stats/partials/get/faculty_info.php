<?php
$dbhost							= "cetus.stat.cmu.edu";
$dbuser							= "reception";
$dbpass							= "UMdx8H92nfAawtFh";
$dbname							= "drupal2014test";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass) or die ("Error connecting to database");
mysqli_select_db($conn,$dbname);

$query = "SELECT CONCAT('http://www.stat.cmu.edu/sites/default/files/',file_managed.filename) AS image_link, field_revision_field_first_name.field_first_name_value AS firstname, field_revision_field_last_name.field_last_name_value AS lastname, field_revision_field_office.field_office_value AS office, field_revision_field_phone.field_phone_value AS phone
 FROM node 
JOIN field_data_field_picture ON node.nid = field_data_field_picture.entity_id AND node.vid = field_data_field_picture.revision_id 
JOIN file_managed ON field_data_field_picture.field_picture_fid = file_managed.fid 
JOIN field_revision_field_first_name ON field_revision_field_first_name.entity_id = node.nid AND field_revision_field_first_name.revision_id = node.vid
JOIN field_revision_field_last_name ON field_revision_field_last_name.entity_id = node.nid AND field_revision_field_last_name.revision_id = node.vid
JOIN field_revision_field_office ON field_revision_field_office.entity_id = node.nid AND field_revision_field_office.revision_id = node.vid
JOIN field_revision_field_phone ON field_revision_field_phone.entity_id = node.nid AND field_revision_field_phone.revision_id = node.vid
 WHERE node.type LIKE 'faculty' AND node.status = 1 
 ORDER BY node.title ASC";
 
$result = mysqli_query($conn,$query);

if(!$result)
{
	die("failed to retrieve data: " .mysqli_error($conn));
}

//create n array to hold the result rows consisting of "image_link", "firstname", "lastname", "office", "phone"
$faculty_array = array();

$count = 0;
while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
{
	$faculty_array[$counter] = $row;
	$counter = $counter + 1;
}

//now you have a 2D array of your data!
//print_r($faculty_array);
echo json_encode($faculty_array);

?>