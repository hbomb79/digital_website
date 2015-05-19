<?php
	// This PHP file will allow users with JavaScript turned off to use the contact form, users that have JS on, will simply be returned a Ajax Response.
	
	// First, check if the passed fields are correct, the information will be serialised so access the information using the key that matches the inputs (name) tag.
	
	// Append the isset variable to each JSON object key
	
	$json_obj = array("name" => isset($_POST["name"]) ? $_POST["name"] : "null", "type" => isset($_POST["type"]) ? $_POST["type"] : "null", "message" => isset($_POST["message"]) ? $_POST["message"] : "null", "js" => isset($_POST["js"]) ? true : false);
	
	foreach( $json_obj as $key => $obj ) {
		if ($obj) {
			// A field is not filled, stop processing the message and return if an AJAX request is present, otherwise, display the error on screen.
			$missing = true;
			echo($key." is missing<br><br>");
		}
	}
	
	print_r($json_obj);
	if ($missing) {
		// Missing fields, if JavaScript is present, then return a Ajax repsonse, else display an error on screen.
	}
	die();
?>