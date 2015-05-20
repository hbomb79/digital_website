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
			addshow: [],
			addhide: [],
			container: "#contact-container",
			trigger: "#contact-trigger",
			shadow: "#shadow",
			speed: 1000,
			position: {
				before: {
					position: "absolute",
					"z-index": 2000
				},
				beforeanim: {
					top: "0",
					left: "0",
					right: "0",
					opacity: 0
				},
				after: {
					transform: "translate(0, -50%)",
				},
				afteranim :{
					opacity: 1,
					top: "50%"
				},
				transition: "fadeToggle",
				speed: 350,
				animatecss: true
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
			if (!$(config.trigger).is(":visible")) {
				$(config.trigger).show()
			}
			$(config.container).hide().css(config.position.before)
			for (var i = 0; i < config.addhide.length; i++) {
				$(config.addhide[i]).hide()
			}
			for (var i = 0; i < config.addshow.length; i++) {
				$(config.addshow[i]).show()
			}
			CF.events()
		},
		events: function() {
			$(config.trigger).on("click", CF.show)
		},

		show: function() {
				// If it is already visible, set css to config.before
				var css, cssanim;
				css = ( $(config.container).is(":visible") ) ? config.position.before : config.position.after
				cssanim = ( $(config.container).is(":visible") ) ? config.position.beforeanim : config.position.afteranim
				if ( config.position.animatecss ) {
					$(config.container).animate(cssanim, config.position.speed)
				}
				setTimeout(function() { $(config.container).css(css) }, config.position.speed)

			$(config.container)[config.position.transition](config.position.speed).delay(config.position.speed)
			$(config.shadow).fadeToggle(config.position.speed)
		},
	}

	CF.init({
		trigger: "#contact-trigger",
		addhide: ["#contact-title"],
	})

})(jQuery);