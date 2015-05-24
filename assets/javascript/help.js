// This JS document is used by the help.php page, this will hide the contact form allowing javascript to animate it, also allowing Ajax requests to assets/server/mail.php
//
// mail.php returns a JSON object, this JSON object will contain what the user typed, along side a status code and status text, here are the possible values:


// 304 - already_sent: Message has already been sent
// 200 - sent: Message successfully sent
// 404 - missing_fields: Required fields were not filled in
// 208 - error: Unknown Error Occurred.

// If a fatal error occurs then a simple string may be returned:

// 308: Unexpected end of file
// 208: Unknown JavaScript Presence 

(function($){
	CF = {
		init: function( options ) {
			// Setup the div containing the contact form.
			CF.config = $.extend(true, {}, CF.config, options)
			var config, base;
			base = CF;
			config = base.config;
			$(config.trigger).show()
			if ( !config.css.start_show ) {
				$(config.container).hide()
			}
			if ( config.css.animate_css ) {
				$(config.container).animate( config.position.beforeanim, config.animation.speed )
			}
			setTimeout(function() {
				$( config.container ).css( config.position.before ).hide()
			}, config.css.animate_css ? config.animation.speed : 0)

			// Hide extra_hide
			for ( var i = 0; i < config.extra_hide.length; i++ ) {
				$(config.extra_hide[i]).hide()
			}
			for ( var i = 0; i < config.extra_show.length; i++ ) {
				$(config.extra_hide[i]).show()
			}
		},

		trigger: function() {
			
		},

		send: function() {
			// Submit an AJAX request to the mail.php file requesting a JSON object
		},

		response: function() {
			// Use the returned JSON object and act accordingly 
		},

		error: function() {
			// Something went wrong while sending an AJAX request
		},

		events: function() {
			// Setup a click event handler on the contacts trigger (user set)
		},

		transition: function() {
			// Animate the css specified in the config
		},

		setcss: function() {
			// Set the css specified in the config
		},

		config: {
			// The config (duh)
			container: "#container",
			trigger: "#trigger",
			position: {
				beforeanim: {},
				afteranim: {},
				before: {},
				after: {}
			},
			callback: {
				before: function() {},
				after: function() {}
			},
			css: {
				animate_css: true,
				start_show: false
			},
			animation: {
				speed: 1000
			},
			extra_hide: [],
			extra_show: []
		}
	}

	CF.init({
		// custom options
		container: "#contact-container",
		trigger: ".contact-trigger",
		extra_hide: ["#contact-title"]
	})

})(jQuery);