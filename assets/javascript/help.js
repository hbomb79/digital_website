// This JS document is used by the help.php page, this will hide the contact form allowing javascript to animate it, also allowing Ajax requests to assets/server/mail.php
//
// mail.php returns a JSON object, the JSON Object has a status attribute, this will equal one of the following:
// 304 - Already Sent
// 200 - Sent
// 400 - Missing Field(s)
// 308 - End Of File
// 208 - Unknown JS value

// If action must be taken, then the JSON object should contain enough data, including what the user did/didn't submit, and the status code, as well as javascript status.

(function($){
	CF = {
		init: function( options ) {
			// Setup triggers and apply before styling
			CF.config = $.extend(true, {}, CF.config, options)
		},

		events: function() {

		},

		transition: function( mode ) {
			// Animate anim defaults
		},

		set: function( mode ) {
			// Set css defaults
		},

		request: function() {
			// Request results via AJAX
		},

		process: function( json ) {
			// Check JSON Object Returned
		},

		tell: function( text, bg, tc ) {

		},

		error: function( x, t, m ) {

		},

		config: {
			"test":true
		}
	}

})(jQuery);