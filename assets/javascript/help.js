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
			base = this;
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

			// Call event function to prepare trigger
			CF.events()

		},

		trigger: function( element ) {
			// A trigger button has been clicked, toggle the visibility of the container
			// Call the before callback
			CF.config.callback.before()
			var config = CF.config;
			// Check current status
			var css, animcss, visible;
			visible = $( config.container+":visible" ).length > 0 ? true : false;
			css = visible ? config.position.before : config.position.after;
			animcss = visible ? config.position.beforeanim : config.position.afteranim;

			// Animate these values.

			$( config.container ).stop()[config.animation.toggle]( config.animation.speed )
			if ( config.animation.additional ) {
				var additional = config.animation.additional;
				for ( var i = 0; i < additional.length; i++) {
					$(additional[i]).stop()[config.animation.toggle](config.animation.speed)
				}
			}
			setTimeout(function() {
				if ( config.css.animate_css ) {
					$( config.container ).animate( animcss, config.animation.speed )
				}

				setTimeout(function() {
					$( config.container ).css( css )
					CF.config.callback.after()
				}, config.css.animate_css ? config.animation.speed : 0)
			}, config.animation.async ? 0 : config.animation.speed)

		},

		send: function() {
			// Submit an AJAX request to the mail.php file requesting a JSON object
			var datas = {};
			datas.js = "true";
			var datac = CF.config.mailer.data;
			for (var key in datac) {
				if (datac.hasOwnProperty(key)) {
					// Process value
					datas[key] = $(datac[key]).val();
				}
			}
			
			$.ajax({
				dataType: "json",
				url: CF.config.mailer.url,
				data: datas,
				method: "post",
				success: function(data){
					CF.response(data)
				}
			}).fail(function( x,t,m ){
				CF.error(x,t,m)
			})

		},

		response: function( data ) {
			// Use the returned JSON object and act accordingly
			if ( data.status == 404 ) {
				// Highlight missing fields
				notify("Missing Fields", "limegreen", "white", "#contact-notify")
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						// Process value
						if ( data[key] == "null" || data[key] == "") {
							$("#"+key).addClass("warning")
						} else {
							$("#"+key).removeClass("warning")
						}
					}
				}
			} else if ( data.status == 304 ) {
				notify("Message Already Sent!", "limegreen", "white", "#contact-notify")
				$(".warning").removeClass("warning")
			} else if ( data.status == 200 ) {
				notify("Sent", "limegreen", "white", "#contact-notify")
				$(".warning").removeClass("warning")
			} else {
				$(".warning").removeClass("warning")
			}
		},

		error: function(x, t, m) {
			// Something went wrong while sending an AJAX request
			console.error("An Error Occurred During XMLHttp Request: "+x+", "+t+", "+m)
		},

		events: function() {
			// Setup a click event handler on the contacts trigger (user set)
			$( CF.config.trigger ).off().on("click", function( e ){
				e.preventDefault()
				CF.trigger(this)
			});
			$( CF.config.sendbtn ).off().on("click", function( e ){
				e.preventDefault()
				CF.send()
			})
			
		},

		transition: function() {
			// Animate the css specified in the config
			console.warn("The transition function is deprecated")
		},

		setcss: function() {
			// Set the css specified in the config
			console.warn("The setcss function is deprecated")
		},

		config: {
			// The config (duh)
			container: "#container",
			trigger: "#trigger",
			sendbtn: "#send-trigger",
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
				speed: 1000,
				toggle: "fadeToggle",
				async: false
			},
			mailer: {
				data: {},
				url: ""
			},
			extra_hide: [],
			extra_show: []
		}
	}

	CF.init({
		// custom options
		container: "#contact-container",
		trigger: ".contact-trigger",
		sendbtn: "#contact-send",
		extra_hide: ["#contact-title"],
		position: {
			before: {
				"position": "fixed",
				"top": "50%",
				"left": "50%",
				"transform":"translate( -50%, -50%)",
				"z-index": 2000,
				"width": "50%",
				"border": "3px #FF003F solid"
			}
		},
		animation: {
			async: true,
			speed: 150,
			additional: ["#shadow"]
		},
		mailer:{
			data:{
				"name": "#name",
				"type": "#type",
				"message": "#message",
				"email": "#email"
			},
			url: "assets/server/mail.php"
		}
	})

})(jQuery);