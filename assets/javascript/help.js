// This JS document is used by the help.php page, this will hide the contact form allowing javascript to animate it, also allowing Ajax requests to assets/server/mail.php
//
// mail.php return values:
// 304 - Already Sent
// 200 - Sent
// 308 - End Of File
// 208 - Unknown JS value

(function($){
	CF = {
		config: {
			container: "#contact",
			trigger: "#contact-trigger",
			speed: 1000,
			position: {
				before: {
					position: "absolute",
					top: "0",
					left: "0",
					right: "0",
					background: "white",
					padding: "1em",
					opacity: 0
				},
				after: {
					top: "50%",
					opacity: 1
				},
			},
			callback: {
				before: function() {},
				after: function() {}
			},
			url: "assets/server/mail.php",
			timeout: 5000
		},
		init: function( options ) {
			// Hide the contact form and prepare its DOM position
			CF.config = $.extend(true, {}, CF.config, options)
			config = CF.config
			$(config.container).hide().css(config.before)
		},
		events: function() {
			
		},
	}

	CF.init({
		container: ".form-container"
	})

})(jQuery);