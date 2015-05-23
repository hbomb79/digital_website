<?php
	// This PHP file will allow users with JavaScript turned off to use the contact form, users that have JS on, will simply be returned a Ajax Response.
	
	// First, check if the passed fields are correct, the information will be serialised so access the information using the key that matches the inputs (name) tag.
	
	// Append the isset variable to each JSON object key
	
	session_start("mailer");

	$json_obj = array("name" => isset($_GET["name"]) ? $_GET["name"] : "null", "type" => isset($_GET["type"]) ? $_GET["type"] : "null", "message" => isset($_GET["message"]) ? $_GET["message"] : "null", "js" => isset($_GET["js"]) && !empty($_GET['js']) ? "true" : "false");
	$missing = false;
	foreach( $json_obj as $key => $obj ) {
		if ($obj === "null" || empty($obj)) {
			// A field is not filled, stop processing the message and return if an AJAX request is present, otherwise, display the error on screen.
			$missing = true;
		}
	}
	$json_obj['js'] == "false" ? $js = false : $js = true;

	//Store javascript in variable
	function response( $return ) {
		global $js, $missing, $json_obj;
		if ($js) {
			// Return JSON response;
			if ( !$missing ) {
				$json_obj["status"] = isset($_SESSION["mail"]) ? 304 : 200;
				$json_obj["statusText"] = isset($_SESSION["mail"]) ? "not_modified" : "sent";
			} else if ( $missing ) {
				$json_obj["status"] = 404;
				$json_obj["statusText"] = "missing_fields";
			}
			// Convert to JSON
			$json_obj = json_encode($json_obj);
			die($json_obj);
		} elseif (!$js) {
			// Return Response With CSS (Full Page)
			?>
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Contact Us</title>
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
						text-decoration: none;
						list-style-type: none;
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
									if ( !isset($_SESSION['mail']) && !$missing ) {
									//$_SESSION['mail'] = true;
								?>
								<div class="warn">
									<h1>Mail Sent</h1>
									<p>Your message has been sent to us, one of out customer service representatives will get back to you within 1-3 working days</p>
								</div>
								<?php
									} else if ( $missing ) {
								?>
								<div class="warn">
									<h1>Cannot Send</h1>
									<p>Your Message Could Not Be Sent As The Following Fields Were Not Filled: </p>
									<ul>
										<?php
											foreach( $json_obj as $key => $obj ) {
												if ( $obj == "null" || empty($obj) ) {
													echo("<li class='none'>" . $key . "</li>");
												}
											}
										?>
									</ul>
								</div>
								<?php
									} else {
								?>
								<div class="warn">
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
		global $js, $missing;
		// This function will send the email.
		// Check for missing variables
		if ($missing) {
			return "BAD";
		} else {
			return "OK";
		}
	}

	function error() {
		global $js;
		// This function is called if there is missing fields.
	}

	// Send
	if ( isset($_SESSION['mail']) ) {
		response("OK");
	} else { 
		response(send());
	}
?>