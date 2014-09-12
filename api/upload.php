<?php

if(isset($_POST["name"])){
    $name = $_POST["name"];
}
if(isset($_POST["email"])){
    $email = $_POST["email"];
}
if(isset($_POST["subject"])){
    $subject = $_POST["subject"];
}
if(isset($_POST["type"])){
    $type = $_POST["type"];
}
if(isset($_POST["message"])){
    $bodytext = $_POST["message"];
	$bodytext = str_replace("\n", "<br />", $bodytext);
}

$error = '';
$isfile = false;
/*
if ($_FILES["attachement"]["error"] > 0){
    if($_FILES["attachement"]["error"] != 4){
        $error = "invalidfile";
    }
}
else{
    $allowedExts = array("gif", "jpeg", "jpg", "png");
    $temp = explode(".", $_FILES["attachement"]["name"]);
    $extension = strtolower(end($temp));
    if ((($_FILES["attachement"]["type"] == "image/gif")
    || ($_FILES["attachement"]["type"] == "image/jpeg")
    || ($_FILES["attachement"]["type"] == "image/jpg")
    || ($_FILES["attachement"]["type"] == "image/pjpeg")
    || ($_FILES["attachement"]["type"] == "image/x-png")
    || ($_FILES["attachement"]["type"] == "image/png"))
    && in_array($extension, $allowedExts))
    {
        $file_tmp = $_FILES['attachement']['tmp_name'];

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $filename = '';

        for ($i = 0; $i < 8; $i++) {
            $filename .= $characters[rand(0, strlen($characters) - 1)];
        }

        $file_name =  "upload/" . $filename . "." . $extension;

        if(is_uploaded_file($file_tmp)) {
            if(!move_uploaded_file($file_tmp, $file_name)){
                $error = "invalidfile";
            }
            else{
                $isfile = true;
            }
        }
        else{
            $error = "invalidfile";
        }
    }
    else{
        $error = "invalidfileformat";
    }

}
*/

if($error == ''){
    include_once('PEAR/Mail.php');
    include_once('PEAR/Mail/mime.php');

    //$to = "sales@fild.net";
    $to = "bartlomiej.dabrowski@fild.net";
    $from = $name ."<" .$email .">";
    $subject = "[TimeOFF] [$type] " .$subject;

	$bodytext .= "<br/><br/>--<br/>This mail is sent via contact form on  http://timeoff.fild.net";
    $message = new Mail_mime();
    $message->setHTMLBody($bodytext);

    if($isfile){
        $message->addAttachment($file_name);
    }

    $body = $message->get();

    $extraheaders = array("From" => $from, "Subject" => $subject, "Reply-To" => $email);
    $headers = $message->headers($extraheaders);

    $mail = Mail::factory("mail");
    $mail->send($to, $headers, $body);

    header('Location: /contact/?message=success');
}
else{
     $location = "Location: /contact/?message=$error";
     header($location);
}

?>
