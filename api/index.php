<?php

$con = mysql_connect('21638.m.tld.pl', 'admin38_timeoff', '9Bi1zFT2.9');
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_select_db("baza38_timeoff", $con);

mysql_query("SET NAMES utf8");
mysql_query("SET CHARACTER SET utf8_unicode_ci");
mysql_query("SET collation_connection = utf8_polish_ci");

if(isset($_GET["email"]))
{
	$email = $_GET["email"];
	
	$sql="SELECT * FROM subscribers WHERE email = '".$email."'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	if(($row) == null)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < 16; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        
        mysql_query("INSERT INTO subscribers (email, unsubid, date) VALUES('".$email."', '".$randomString."', NOW())") or die(mysql_error());
        echo "1";
    }
	else
    {
        echo "0";
    }
}

mysql_close($con);
?>