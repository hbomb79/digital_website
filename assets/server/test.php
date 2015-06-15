<?php
    
    function send_sec() {

        $from = "support@hexcode.com";
        $from_name = "HexCode Support";
        $name = "Harry Felton";
        $to = "harryfelton12@gmail.com";
        $subject = "HexCode Contact Notification";
        $ReplyTo = "harryfelton12@gmail.com";
        $GET = "name=".urlencode(stripslashes($name))."&email=".urlencode(stripslashes($to));
        $content = file_get_contents('http://www.harryfelton.web44.net/digital_website/assets/server/response.php?'.$GET);
        if ( $content == "DIE" || $content == "" || !$content ) {
            $content = "Thanks for your message ".$name.", we will get back to you in around 1-3 working days";
        }
        
        $Headers  = "MIME-Version: 1.0". "\r\n";
        $Headers .= "Content-type: text/html; charset=iso-8859-1". "\r\n";
        $Headers .= "From: ".$from_name." <".$from.">". "\r\n";
        $Headers .= "Reply-To: ".$ReplyTo. "\r\n";

        if(mail($to, $subject, $content, $Headers)) {
            die("OK");
        } else {
            die("BAD");
        }
    }

    function send() {
        $to = 'harryfelton12@gmail.com';
        $subject = 'Website Form Submission';
        $message = 'HEY There'."\n"; 
        $headers = 'From: noReply@harryfelton.com' . "\r\n" .
        'Reply-To: '."harryfelton12@gmail.com" . "\r\n";
        if(mail($to, $subject, $message, $headers)){
            die("SENT");
        } else {
            die("FAIL");
        }
    }

    send_sec();
    
?>