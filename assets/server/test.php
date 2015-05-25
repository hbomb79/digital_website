<?php
    
	$FromEmail = "harryfelton12@gmail.com";
	$FromName = "Harry Felton";
	$ToEmail = "harryfelton12@gmail.com";
	$Subject = "Test Message";
	$ReplyTo = "harryfelton12@gmail.com";
	if(($Content = file_get_contents("response.php")) === false) {
        $Content = "Thanks for you'r email, we will get back to you soon!";
    }

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