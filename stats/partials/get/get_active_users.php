<?php
include 'inc/db.php';

$connect=pg_connect("host=$hostname dbname=$database user=$user password=$password");
$data="SELECT * FROM users WHERE active = 1";
$result=pg_query($connect, $data) or die ("Error in query:$data.".pg_last_error($connect));
$i=0;
if(pg_num_rows($result)>0){
	while($row=pg_fetch_array($result)){
		$id=$row['id'];
		$first_name=$row['first_name'];
		$last_name=$row['last_name'];
		$active = $row['active'];
		if($row['nickname']){
			$nickname = "(" . $row['nickname'] . ")";
		}
		else{
			$nickname = "";
		}
        if($row['image_src']) {
//				echo "enter the image src!";
            $image_src = $row['image_src'];
        }
		
		if($row['andrew_id']){
			$email=$row['andrew_id'];
			$email .= '@andrew.cmu.edu';
		}
		else{
			$email = $row['email_address'];
		}
		
		$db[$i][]=$id;
		$db[$i][]=$first_name;
		$db[$i][]=$last_name;
		$db[$i][]=$email;
		$db[$i][]=$active;
		$db[$i][]=$nickname;
		$db[$i][]=$image_src;
		$i++;
	}
}		
$tempuser="[ ";
if(isset($db)){
	foreach($db as $line){
			$tempuser.= '{ 
			"id": "' . $line[0] . '",
			"firstName": "' . $line[1] . '", 
			"lastName": "' . $line[2] . '", 
			"email": "' . $line[3] . '",
			"name": "' . $line[2] . ', ' . $line[1] . ' ' . $line[5] . '", 
			"active": "' . $line[4] . '",
            "image" : "' . $line[5] . '"},';
	}
	$user = substr($tempuser, 0, -1);	
	$user.=" ]";
	echo $user;
}
		
?>