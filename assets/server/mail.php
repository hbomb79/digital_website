<?php
	// Startup session
	session_start("mailer");
	// Gather POST data and store in object
	$json_obj = array("name" => isset($_POST["name"]) ? $_POST["name"] : "null", "email" => isset($_POST["email"]) ? $_POST["email"] : "null", "type" => isset($_POST["type"]) ? $_POST["type"] : "null", "message" => isset($_POST["message"]) ? $_POST["message"] : "null", "js" => isset($_POST["js"]) && !empty($_POST['js']) ? "true" : "false");
	// By default set missing to false
	$missing = false;
	// Loop through each entry of the JSON, check the key anv value
	foreach( $json_obj as $key => $obj ) {
		if ( $key == "type" && $obj == "NONE" ) {
			// IF NONE then missing
			$missing = true;
		}
		if ( $key == "email" && !filter_var($obj, FILTER_VALIDATE_EMAIL) ) {
			$missing = true;
			// Invalid EMAIL
		}
		if ($obj === "null" || empty($obj)) {
			$missing = true;
		}
		if ( empty($obj) ) {
			$json_obj[$key] = "null";
		}
	}

	//Store javascript in variable
	function response( $return ) {
		global $missing, $json_obj;
		// Return Ajax Response, mail has been sent
		// If all fields were filled
		if ( !$missing ) {
			// If the messages were sent successfully
			if ( $return == "OK" ) {
				// If the messages were already set then return 304
				if ( isset($_SESSION["mail"]) || isset($_COOKIE["mail"]) ) {
					// Set JSON status to 304
					$json_obj["status"] = 304;
					$json_obj["statusText"] = "already_sent";
				} else {
					// If the message was not already sent then return 200 OK
					$json_obj["status"] = 200;
					$json_obj["statusText"] = "sent";
					$_SESSION["mail"] = true;
					setcookie("mail","true",time()+86400, "/");
				}
			} else {
				$json_obj["status"] = 201;
				$json_obj["statusText"] = "not_sent";
			}
		// If a field was missing or invalid
		} else {
			// Set the JSON status to 404
			$json_obj["status"] = 404;
			$json_obj["statusText"] = "missing_fields";
		}
		die( json_encode($json_obj) );
	}

	function send() {
		global $missing, $json_obj;
		if ( isset($_SESSION["mail"]) || isset($_COOKIE["mail"]) ) {
			// If already sent, just return OK, this is checked again later
			return "OK";
		}
		if ($missing) {
			// If missing fields return BADßßßß
			return "BAD";
		} else {
			// Send message to HEXCODE

			$from_h = "support@hexcode.com";
	        $from_name_h = "HexCode Support";
	        $subject_h = "HexCode Contact Submission";
	        $message = "Your website contact form has been submitted with the following infomation: "."\n\n";
			$message .= 'Name: '.strip_tags($json_obj["name"])."\n"; 
			$message .= 'Email: '.strip_tags($_POST["email"])."\n";
			$message .= 'Type: '.strip_tags($_POST["type"])."\n";
			$message .= 'Message: '.strip_tags($_POST['message'])."\n";
	        
	        $header_h = "From: ".$from_name_h." <".$from_h.">". "\r\n";
	        $header_h .= "Reply-To: ". $json_obj["email"] . "\r\n";

	        if ( !mail("harryfelton12@gmail.com", $subject_h, $message, $header_h) ) {
	        	// Content message not sent
	        	return "BAD";
	        }
	        // Else, continue and send verification message to user.
			$from = "support@hexcode.com";
	        $from_name = "HexCode Support";
	        $name = $json_obj["name"];
	        $to = $json_obj["email"];
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
	            return "OK";
	        } else {
	            return "BAD";
	        }
		}
	}

	response(send());
?>