<?php
	// This PHP file will allow users with JavaScript turned off to use the contact form, users that have JS on, will simply be returned a Ajax Response.
	
	// First, check if the passed fields are correct, the information will be serialised so access the information using the key that matches the inputs (name) tag.
	
	// Create a test JSON object and echo it out to the console.
	
	$test_json = array('item_type_id' => $item_type,
    'string_key' => $string_key,
    'string_value' => $string_value,
    'string_extra' => $string_extra,
    'is_public' => $public,
    'is_public_for_contacts' => $public_contacts);
	
	echo($test_json);
	echo(json_encode(array('item' => $test_json), JSON_FORCE_OBJECT));

?>