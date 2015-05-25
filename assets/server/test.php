<?php
    
	$FromEmail = "harryfelton12@gmail.com";
	$FromName = "Harry Felton";
	$ToEmail = "harryfelton12@gmail.com";
	$Subject = "HexCode Contact Notification";
	$ReplyTo = "harryfelton12@gmail.com";

    $GET = "name=".urlencode($FromName)."&email=".urlencode($FromEmail);
    $Content = file_get_contents('http://www.harryfelton.web44.net/digital_website/assets/server/response.php?'.$GET);
    
    $Headers  = "MIME-Version: 1.0\n";
    $Headers .= "Content-type: text/html; charset=iso-8859-1\n";
    $Headers .= "From: ".$FromName." <".$FromEmail.">\n";
    $Headers .= "Reply-To: ".$ReplyTo."\n";
    $Headers .= "X-Sender: <".$FromEmail.">\n";
    $Headers .= "X-Mailer: PHP\n"; 
    $Headers .= "X-Priority: 1\n"; 
    $Headers .= "Return-Path: <".$FromEmail.">\n";  

    if(mail($ToEmail, $Subject, $Content, $Headers)) {
        die("OK");
    } else {
    	die("BAD");
    }

    
?>