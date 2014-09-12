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


$sql="SELECT * FROM subscribers";
$result = mysql_query($sql);

while ($res = mysql_fetch_array($result))
{
    echo $res['email'].";";
}

mysql_close($con);
?>