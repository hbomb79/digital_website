<?php
	session_start("mailer");
	// This PHP file will allow users with JavaScript turned off to use the contact form, users that have JS on, will simply be returned a Ajax Response.
	
	// First, check if the passed fields are correct, the information will be serialised so access the information using the key that matches the inputs (name) tag.
	
	// Append the isset variable to each JSON object key
	if ( !isset($_POST["type"]) ) {
		$_POST = $_GET;
	}
	$json_obj = array("name" => isset($_POST["name"]) ? $_POST["name"] : "null", "email" => isset($_POST["email"]) ? $_POST["email"] : "null", "type" => isset($_POST["type"]) ? $_POST["type"] : "null", "message" => isset($_POST["message"]) ? $_POST["message"] : "null", "js" => isset($_POST["js"]) && !empty($_POST['js']) ? "true" : "false");
	$missing = false;
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
	$json_obj['js'] == "false" ? $js = false : $js = true;

	//Store javascript in variable
	function response( $return ) {
		global $js, $missing, $json_obj;
		if ($js) {
			// Return Ajax Response, mail has been sent
			if ( !$missing ) {
				if ( $return == "OK" ) {
					if ( isset($_SESSION["mail"]) || isset($_COOKIE["mail"]) ) {
						$json_obj["status"] = 304;
						$json_obj["statusText"] = "already_sent";
					} else {
						$json_obj["status"] = 200;
						$json_obj["statusText"] = "sent";
						$_SESSION["mail"] = true;
						setcookie("mail","true",time()+86400, "/");
					}
				} else {
					$json_obj["status"] = 201;
					$json_obj["statusText"] = "not_sent";
				}
			} else {
				$json_obj["status"] = 404;
				$json_obj["statusText"] = "missing_fields";
			}
			die( json_encode($json_obj) );
		} elseif (!$js) {
			// DEPRECATED - REMOVING 6/16/15. A pure JSON approach will be used, start changing PHP code to accomodate that. Use GET js=true to use JSON before 6/16/15.
			// Return Response With CSS (Full Page)
			?>
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Mail Sent!</title>
				<link rel="stylesheet" href="../css/main.css">
				<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
				<style>
					.page-container {
						width:100%;
						height:100%;
						top:0;
					}

					#wrapper {
						margin-top: 0;
					}

					#container {
						padding:0;
						background:transparent;
						position: absolute;
						top:50%;
						left:50%;
						-webkit-transform: translate(-50%, -50%);
						-ms-transform: translate(-50%, -50%);
						-o-transform: translate(-50%, -50%);
						transform: translate(-50%, -50%);
						box-shadow: none;
					}

					li.none {
						list-style-type: none;
						text-decoration: none;
					}

					ul {
						padding:0;
					}
				</style>
			</head>
			<body>
				<div id="bg-wrapper">
				 	<div class="page-bg" id="mail-page-bg">
				</div> <!--Faded out and replaced using ajax--> </div>
				<div class="page-container current" id="mail"> <!-- Slide off screen, slide new page on screen using ajax -->
					<div id="wrapper">
						<div id="container">
							<main>
								<?php
									if ( !$missing && $return == "OK" && !isset($_SESSION["mail"]) && !isset($_COOKIE["mail"]) ) {
								?>
								<div class="info-box confirm">
									<h1>Mail Sent</h1>
									<p>Your message has been sent to us, one of out customer service representatives will get back to you within 1-3 working days</p>
								</div>
								<?php
								$_SESSION["mail"] = true;
								setcookie("mail","true",time()+86400, "/");
								} else if ( $missing ) {
								?>
								<div class="info-box error">
									<h1>Cannot Send</h1>
									<p>Your message cannot be sent due to missing field(s), please ensure the following field(s) are filled in and try again:</p>
									<ul>
										<?php foreach ($json_obj as $key => $value){
											if( $value == "null" || empty($value) || $key == "type" && $value == "NONE" || $key == "email" && !filter_var($value, FILTER_VALIDATE_EMAIL) ) {
												echo("<li class='none'>".$key."</li>");
											}
										} ?>
									</ul>
								</div>
								<?php
								} else if ( $return == "BAD" ) {
								?>
								<div class="info-box error">
									<h1>Cannot Send</h1><br>
									<p>We could not send your message, an unknown error occurred </p>
								</div>
								<?php
									} else {
								?>
								<div class="info-box warn">
									<h1>Already Sent!</h1>
									<p>Your message has already been sent to us, please hang tight for 1-3 working days for a reply</p>
								</div>
								<?php
									}
								?>
							</main>
						</div>
					</div>
				</div>
			</body>
			</html>
			<?php
		} else {
			die("208 - Unknown Error (undefined)");
		}
	}

	function send() {
		global $js, $missing, $json_obj;
		if ( isset($_SESSION["mail"]) || isset($_COOKIE["mail"]) ) {
			return "OK";
		}
		if ($missing) {
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