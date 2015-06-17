// This JS document is used by the help.php page, this will hide the contact form allowing javascript to animate it, also allowing Ajax requests to assets/server/mail.php
//
// mail.php returns a JSON object, this JSON object will contain what the user typed, along side a status code and status text, here are the possible values:

// To prevent spam messaging this file must store a cookie, PHP could also be used...

// 200 - sent: Message successfully sent
// 201 - not_sent - could not send message
// 404 - missing_fields: Required fields were not filled in
// 208 - error: Unknown Error Occurred.
var CF, test_2	;
(function($, window, document, undefined){
	// Restarted 6/15/15
	// This JS file needs to:
	// - Position the contact form.
	// - Overflow the contact form, side by side, one at a time.
	// - Position the next step to the right of the current, then slide on top.
	// - If going back then reverse (go to left, slide on).
	// - Handle AJAX submission and returns (Discussed at top of doc).
	// - Validate fields before submission.
	
	// The JS file does not need to:
	// - Handle cookie/PHP session protection
	// - Actual mailing of information
	// - Compilation of email response

	// This JS file is created using an object literal. In my opinion this makes the code easier to both write and read.

	// Order of progress:
	// Javascript loads on page
	// Current slide is positioned correctly, the others are to the right of that slide on top of each other.

	// WHEN a user clicks NEXT, then the slide matching the step form data will be slid to the right.

	// WHEN a user clicks BACK, then the slide matching the step will be moved to the left of the current slide, it will then slide over top.

	// WHEN a user clicks a BUTTON with a step of SUBMIT, then the JS file will submit the request and process.

	// WHILE an animation is in progress the user CANNOT change slide.

	// WHEN the request is completed, then the SUCCESS slide will be slid over top, until then the SUCCESS slide is display:none;

	// WHEN any button is clicked to change slide, the current_slide is manipulated and the next slide is detected, whether it be behind or infront (if config.current_slide.id < new_id ? backward : forward )

	CF = {
		defaults: {
			container: "#contact-container",
			button: ".button",
			trigger: ".trigger",
			send_step: "send",
			form_class: ".step-form",
			callback: {
				start: function(){}, // When the file is started
				anim_start: function( f_step, t_step ){}, // When the slide begins animating
				anim_done: function( n_step ){}, // When the slide stops animating
				submit: function(){}, // When the final form is submitted
				response: function( response ){} // When an AJAX response is received
			},
			mailer: {
				url: "assets/server/mail.php"
			},
			animation: {
				offset: 0, // Added to offset right ($(elem).offset().left + $(elem).outerWidth() + offset )
				speed: 500, // In ms
			},
			steps: [
			// The script will look here for an entry with a name matching that of the next slide. For eg, if the form requests a step2, then the second entry will be selected and used.
				{
					name: "step1", // As referenced in data-step-name of parent .step-container. CURRENT SLIDE
					inputs: [
						{
							name:"name",
							id:"name", // Ref via ID.
							type:"normal" // Validate only if has value.
						},
						{
							name:"email",
							id:"email",
							type:"email" // Validate if has value and if matches EMAIL filter.
						}
					],
					id:0
				},
				{
					name: "step2",
					inputs: [
						{
							name:"type",
							id:"type",
							type:"select",
							select_param: {
								unselect: "NONE" // Must not match this, otherwise not selected, set to FALSE for no check.
							}
						}
					],
					id:1
				},
				{
					name: "step3",
					cid: "#step3",
					inputs: [
						{
							name:"message",
							id:"message",
							type:"text" // Validate only if has value.
						}
					],
					id:2
				}
			],
			current_slide: {
				cid: "#cid",
				name: "name",
				id:0
			} // NAME
		},

		init: function( options ){
			this.config = $.extend(true, {}, this.defaults, options)
			var config = this.config;
			var self = this;
			// Hide and position the contact form. Non JS users simply wont see the contact form.
			// Firstly, grab the step widths and heights to animate.
			this.restore();
			this.events();
			setTimeout(function(){
				self.resize_container();
				$(config.container).hide();
			}, 10)
			config.callback.start();
		},

		check_bounds: function(){
			// Check if the bottom or top is off screen.
			var elem, $elem, config, self, height, wind_height;
			self = this;
			config = self.config;
			elem = config.container;
			$elem = $(elem);
			wind_height = $(window).outerHeight()
			height = $elem.outerHeight();

			// Window height has to be at least twice as tall as the actual contact form.
			if ( wind_height >= height ) {
				if ( $elem.css("position") == "absolute" ) {
					$elem.css({
						"position":"fixed",
						"transform": "translate(-50%, -50%)",
						"top": "50%"
					})
					scroll_to( config.container, false, 250)
					$("html, body").css({
						"overflow": "hidden"
					})
				}
			} else {
				if ( $elem.css("position") == "fixed" ) {
					$elem.css({
						"position":"absolute",
						"transform": "translate(-50%, 0)",
						"top":"0"
						
					})
					scroll_top();
					$("html, body").css({
						"overflow": "auto"
					})
				}
			}

		},

		restore: function(){
			// Sets all but the first element out of the way
			var width, $element;
			for (var i = 0; i < this.config.steps.length; i++) {
				$element = $(this.config.steps[i].cid)
				if ( this.config.steps[i].id == this.config.current_slide.id ) {
					width = $element.width();
					// This is the current slide.
				} else {
					// This is not, so move it out of the way.
					$element.css({
						"left": width+this.config.animation.offset,
						"opacity": 0
					})
				}
			}
		},

		events: function(){
			var self = this;
			var bound_timer;
			$(self.config.button).on("click", function( e ){
				e.preventDefault();
				self.button_click( this );
			});
			$(self.config.trigger).on("click", function( e ){
				e.preventDefault();
				self.trigger_click();
			});
			$(window).on("scroll resize", function(){
				if ( $(self.config.container).is(":visible") ){
					clearTimeout(bound_timer);
					bound_timer = setTimeout(function(){
						self.check_bounds()
					}, 500);
				}
			})
		},

		trigger_click: function() {
			// Fade in/out the contact form and shadow
			if ( $(this.config.container).is(":visible") ) {
				$(this.config.container).fadeOut(250);
				$("#shadow").fadeOut(250)
				$("html, body").css({
					"overflow":"auto"
				})
			} else {
				$(this.config.container).fadeIn(250)
				$("#shadow").fadeIn(250)
				$("html, body").css({
					"overflow":"hidden"
				})
			}
			scroll_to("#contact-container", false, 250)
		},

		resize_container: function( elem ) {
			var $elem = elem ? $(elem) : $(this.config.current_slide.cid);
			var self = this;
			$(this.config.container).animate( {"height": $elem.outerHeight()}, 250).promise().done(function(){
				self.check_bounds()
			})
		},

		validate_current: function(){
			var d = $.Deferred();
			var self = this;
			this.validate( this.get_slide("name", this.config.current_slide.name) ).done(function( r ){
				var elem, $elem, errors;
				proceed = true;
				for ( var i = 0; i < r.length; i++) {
					elem = r[i]
					$elem = $(elem.id);
					$elem.find(".step-error").remove()
					test_2 = $elem.siblings("#"+elem.name+"-error");
					$errors = $elem.siblings("#"+elem.name+"-error");
					if ( elem.error == 200 ) {
						if( $elem.hasClass("warning") ){
							$elem.removeClass("warning")
						}
						$errors.addClass("done").slideUp(100).promise().done(function(){
							$(".step-error").filter(".done").remove()
						});
					} else {
						proceed = false;
						if ( !$elem.hasClass("warning") ) {
							$elem.addClass("warning")
						}
						if ( $errors.length <= 0 ) {
							$("<div></div>", {
								css: {
									"color": "red",
									"text-align": "center",
									"display": "none"
								},
								id: elem.name+"-error",
								class: "step-error",
								text: elem.errorText
							}).insertAfter( elem.id ).slideDown(100)
						} else if( $errors.length == 1 ) {
							// Already an error message on screen
							$( $errors[0] ).text( elem.errorText );
							if ( !$( $errors[0] ).is(":visible") ) {
								$errors[0].slideDown(100);
							}
						}
						
					}
				}
				setTimeout(function(){
					self.resize_container()
				}, 100)
				d.resolve( proceed );
			})
			return d;
		},

		button_click: function(elem){
			$elem = $(elem);
			var proceed;
			var self = this;
			// Validate this steps fields
			// Check name of button, if step then check value.
			if ( $elem.context.name == "step" ) {
				// This button is supposed to change the slide.
				var value = this.get_slide("name", $elem.context.value);
				if ( value ) {
					// Go to this new slide, first detect whether we are going backwards or forwards.
					if ( value.id < this.config.current_slide.id ) {
						// BACK
						self.slide_trans( value, true )
					} else if ( value.id > this.config.current_slide.id ) {
						// FORWARD
						self.validate_current().done(function( proceed ){
							if ( proceed ) {
								self.slide_trans( value, false );
							}
						})
						
					} else {
						console.warn("User requested slide change to current slide, not moving.")
					}
				} else if ( $elem.context.value == self.config.send_step ) {
					// Going forward, trying to send, validate ALL steps incase an alteration to the fields has been made via inspect element.
					self.validate_current().done(function( proceed ){
						if ( proceed ) {
							self.validate_all().done(function( r ){
								if ( r ) {
									self.submit();
								} else {
									if ( $(elem).siblings("#final-error").length > 0 ) {
										$(elem).siblings("#final-error").remove()
									}
									$("<div></div>", {
										class: "step-error",
										id: "final-error",
										text: "Missing Fields Detected On Previous Steps",
										css: {
											color:"red"
										}
									}).insertBefore( elem )
								}
							})
						}
					})
				}
			}
		},

		validate_all: function() {
			var d = $.Deferred();
			var elems, $elem, elem, proceed, self;
			self = this;
			elems = this.config.steps;
			proceed = true;
			for ( var i = 0; i < elems.length; i++) {
				elem = elems[i];
				$elem = $(elem);
				// Loop through each field
				self.validate( elem ).promise().done(function( r ){
					// Loop through the results.
					for ( var i = 0; i < r.length; i++) {
						if ( r[i].error != 200 ) {
							// ERROR
							proceed = false;
						}
					}
					d.resolve( proceed );
				})
			}
			return d;
		},

		validate_email: function( address ) {
		    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
		    return pattern.test( address );
		},

		get_slide: function( type, selector ) {
			// Return a object grabbed from config.
			var elem;
			for ( var i = 0; i < this.config.steps.length; i++) {
				elem = this.config.steps[i];
				if ( type == "id" && elem.id == selector ) {
					// Check ID
					return elem;
				} else if ( type == "name" && elem.name == selector ) {
					// Check NAME
					return elem;
				} else if ( type == "cid" && elem.cid == selector ) {
					// Check CID
					return elem;
				}
			}
			return false;
		},

		slide_trans: function( step, backwards ){
			// By default animate forward.
			// STEP is the NEW step to go to, use o_step to access current/old
			var o_step, config, self;
			self = this;
			config = this.config
			o_step = config.current_slide;
			// If forward
			$( o_step.cid ).fadeOut(500);
			$( ".step-error" ).fadeOut(250).promise().done(function(){
				$(".step-error").remove()
			});
			$(".warning").removeClass("warning");
			config.current_slide = step;
			self.resize_container( step.cid );
			config.callback.anim_start( config.current_slide, step )
			if ( !backwards ) {
				$( step.cid ).css({
					"left": $(step.cid).outerWidth() + config.animation.offset,
					"opacity": 0
				});
				$( step.cid ).show().animate({
					"left": 0,
					"opacity": 1
				}, 500);
			} else {
				// Go back
				$( step.cid ).css({
					"left": ( $(step.cid).outerWidth() + config.animation.offset )/ -1,
					"opacity": 0
				});
				$( step.cid ).show().animate({
					"left": 0,
					"opacity": 1
				}, 500);
			}
			setTimeout(function(){
				config.callback.anim_done( config.current_slide )
			}, 500)
		},

		validate: function( step ){
			var d = $.Deferred();
			// Check fields
			var type, results, field;
			results = [];
			var fields = step.inputs;
			for ( var i = 0; i < fields.length; i++) {
				type = fields[i].type;
				field = fields[i];
				if ( $.trim( $(field.id).val() ) == "" && type == "normal" || $.trim( $(field.id).val() ) == "" && type == "email" ) {
					results.push({
						"name": field.name,
						"id": field.id,
						"error": 404,
						"errorText": "Please Enter Something"
					})
				}
				else if ( type == "email" && !this.validate_email( $.trim( $(field.id).val() ) ) ) {
					results.push({
						"name": field.name,
						"id": field.id,
						"error": 401,
						"errorText": "Please Enter A Valid Email"
					})
				} else if ( type == "select" && $(field.id).val() == field.select_param.unselect ) {
					results.push({
						"name": field.name,
						"id": field.id,
						"error": 401,
						"errorText": "Please Pick One"
					})
				} else if ( $.trim( $(field.id).val() ) != "" && type == "normal" || type == "email" && $.trim( $(field.id).val() ) != "") {
					results.push({
						"name": field.name,
						"id": field.id,
						"error": 200,
						"errorText": "OK"
					})
				}
			}
			d.resolve(results)
			return d;
		},

		submit: function(){
			this.config.callback.submit();
			var self = this;
			var datac, data;
			data = {};
			datac = self.config.steps;
			for ( var i = 0; i < datac.length; i++ ) {
				// Check data
				if ( datac[i].post ) {
					for ( var c = 0; c < datac[i].inputs.length; c++ ) {
						data[ datac[i].inputs[c].name ] = $(datac[i].inputs[c].id).val();
					}	
				}
			}
			data["js"] = "true";
			console.log(data)
			$.ajax({
				dataType: "json",
				url: self.config.mailer.url,
				data: data,
				method: "post",
				success: function(data){
					self.response(data)
				}
			}).fail(function(x,t,m){
				console.warn(x, t, m)
			})
		},

		response: function( data ){
			this.config.callback.response();
			console.log( data )
		}
	}

	$(window).load(function(){
		CF.init({
			button: ".contact-send",
			form_class: ".step-form",
			trigger: ".contact-trigger",
			callback: {
				start: function(){},
				anim_start: function(){},
				anim_done: function(){},
				submit: function(){},
				reponse: function(){}
			},
			animation: {
				offset: 64
			},
			steps: [
				{
					name: "step1",
					cid: "#step1",
					post: "true",
					inputs: [
						{
							name:"name",
							id:"#name",
							type:"normal"
						},
						{
							name:"email",
							id:"#email",
							type:"email"
						}
					],
					id:0
				},
				{
					name: "step2",
					cid: "#step2",
					post: "true",
					inputs: [
						{
							name:"type",
							id:"#type",
							type:"select",
							select_param: {
								unselect: "NONE"
							}
						}
					],
					id:1
				},
				{
					name: "step3",
					cid: "#step3",
					post: "true",
					inputs: [
						{
							name:"message",
							id:"#message",
							type:"normal"
						}
					],
					id:2
				}
			],
			current_slide: {
				cid: "#step1",
				name: "step1",
				id:0
			}
		})
	});

})(jQuery, window, document);