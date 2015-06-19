// A nice 700 line JS document used by the help.php page (Harry Felton, HexCode, 2015 MIT)
//
// mail.php returns a JSON object, this JSON object will contain what the user typed, along side a status code and status text, here are the possible values:

// To prevent spam messaging this file must store a cookie, PHP could also be used...

// 200 - sent: Message successfully sent
// 201 - not_sent: could not send message
// 404 - missing_fields: Required fields were not filled in
// 304 - already_sent: Already sent a message in past 24 hours
var CF, test_2;
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
			system: {
				hold: false,
				r_param: false
			},
			validation: {
				err_msg: {
					"404": "This field is required",
					"401": "Invalid entry",
					"200": "OK",
					"201": "Error"
				}
			},
			current_slide: {
				cid: "#cid",
				name: "name",
				id:0
			} // NAME
		},

		init: function( options, skip ){
			this.config = $.extend(true, {}, this.defaults, options)
			var config = this.config;
			var self = this;
			// Hide and position the contact form. Non JS users simply wont see the contact form.
			// Firstly, grab the step widths and heights to animate.
			$( config.container ).show().css({
				"opacity":0
			})
			this.restore();
			if ( !skip ) { this.events(); } // Stops multiple event handlers on same element ( causes open and close immediately ) if already been called. Because the page doesnt get reloaded ( JS ) then the init function must be recalled.
			config.callback.start();
			setTimeout(function(){ self.resize_container(); $( config.container ).hide().css("opacity", 1) }, 250)
		},

		check_bounds: function(){
			if ( $(window).width() < 770 ) {
				return;
			}
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
					}).hide()
				}
			}
		},

		events: function(){
			var self = this;
			var bound_timer;
			$("body "+self.config.container).on("click", self.config.button, function( e ){
				e.preventDefault();
				self.button_click( this );
			});
			$("body").on("click", self.config.trigger, function( e ){
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
			});
			$("body").on("change", ".cf-keyup", function(){
				// Check
				self.check_select( this );
			});
			self.target_click();
			self.fade_out();
		},

		check_select: function( e ){
			var step, field, self, config, fields, ps;
			self = this;
			config = self.config;
			fields = config.steps;
			ps = $(e).parents(".step").length == 1 ? $(e).parents(".step")[0] : false;
			if ( !ps ) {
				return;
			}
			step = self.get_slide( "name", $(ps).data("step-name") )
			// We have the step, find which field this input belongs to.
			for ( var i = 0; i < step.inputs.length; i++ ) {
				if ( step.inputs[i].name == $(e).attr("name") ) {
					field = step.inputs[i];
				}
			}
			if ( $(e).val() == field.select_param.other_select ) {
				// SHOW OTHER, HIDE MAIN WARNING
				$( field.select_param.other.id ).slideDown(250)
				$( "#"+field.name+"-error").remove()
				$(field.id).removeClass("warning")
			} else {
				// HIDE OTHER, AND WARNING
				$("#"+field.select_param.other.name+"-error").remove()
				$( field.select_param.other.id ).val("").removeClass("warning").slideUp(250)
			}
			setTimeout(function(){ self.resize_container() }, 250)
		},

		target_click: function(){
			var self = this;
			$(window).on("click", function( e ) {
				if ( !$(self.config.container).is(":visible") ) {
					return;
				}
				var ev = $( e.originalEvent.srcElement ) // Found using Google Chromes inspect element (had no internet for documentation)
				if ( ev.parents( self.config.container ).length != 1 && !ev.hasClass( (self.config.button).replace(".", "") ) && !ev.hasClass( (self.config.trigger).replace(".", "") )) {
					self.trigger_click();
				}
			})
		},

		trigger_click: function() {
			// Fade in/out the contact form and shadow
			var self = this;
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
			if ( self.config.system.r_param ) {
				self.resize_container( self.config.system.r_param )
			}
		},

		fade_out: function() {
			var self = this;
			$(window).on("aj_start", function(){ //Fired when ajax is about to begin changing page
				if ( $(self.config.container).is(":visible") ) {
					self.trigger_click()
				}
			})
		},

		resize_container: function( elem ) {
			var $elem = elem ? $(elem) : $(this.config.current_slide.cid);
			var self = this;
			$(this.config.container).animate( {"height": $elem.outerHeight()}, 250).promise().done(function(){
				self.check_bounds()
			})
		},

		validate_current: function( no_resize ){
			// Used object.validate, then adds/removes highlight & error messages from fields on current slide.
			var d = $.Deferred();
			var self = this;
			this.validate( this.get_slide("name", this.config.current_slide.name) ).done(function( r ){
				var elem, $elem, errors;
				proceed = true;
				for ( var i = 0; i < r.length; i++) {
					elem = r[i]
					$elem = $(elem.id);
					$elem.find(".step-error").remove()
					$errors = $elem.siblings("#"+elem.name+"-error");
					if ( elem.error == 200 ) {
						if( $elem.hasClass("warning") ){
							$elem.removeClass("warning")
						}
						$errors.filter(".step-per-error").addClass("step-error");
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
				if ( !no_resize ) {
					setTimeout(function(){
						self.resize_container()
					}, 100)
				}
				d.resolve( proceed );
			})
			return d;
		},

		button_click: function(elem){
			$elem = $(elem);
			var self = this;
			self.config.system.r_param = false;
			// Validate this steps fields
			// Check name of button, if step then check value.
			if ( $elem.context.name == "step" && !self.config.system.hold ) {
				self.config.system.hold = true;
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
							} else {
								self.config.system.hold = false;
							}
						})
					}
				} else if ( $elem.context.value == self.config.send_step ) {
					// Going forward, trying to send, validate ALL steps incase an alteration to the fields has been made via inspect element.
					self.validate_current( true ).done(function( proceed ){
						if ( proceed ) {
							self.validate_all().done(function( r, s ){
								if ( r ) {
									self.submit();
									// Show sending stage
									self.output({
										"header": "Sending Message",
										"text": "Please wait while we process your message",
										"node_class": "step step-node-load",
										"selector": ".step.step-node-load",
										"resize_param": ".step-node-load",
										"button": false
									});
								} else {
									self.slide_trans( self.get_slide( "id", s ), true )
								}
								self.config.system.hold = false;
							})
						} else {
							setTimeout(function(){
								self.resize_container()
								self.config.system.hold = false;
							}, 100)
						}
					})
				} else if ( $elem.context.value == "step-error-back" ) {
					// Return from error.
					// Fade in last slide, fade and remove error.
					$(".step-node-error").fadeOut(250).promise().done(function(){
						$(".step-node-error").remove();
					})
					var field = $elem.hasClass("restart") ? 0 : self.config.steps[self.config.steps.length-1].id
					self.slide_trans( self.get_slide("id", field ), true ) // Display last step ( The user should only get here if they tried to send from last step. If not then vslidation will catch them )
				}
			}
		},

		validate_all: function() {
			var d = $.Deferred();
			var elems, $elem, elem, proceed, self, first_step;
			first_step = this.config.steps.length-1 ;
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
							// ERROR, highlight field.
							// Remove previous step-per-errors for this element.
							$( "#"+r[i].name+"-error" ).remove();
							$( r[i].id ).after( $("<div></div>", {
								css: {
									color: 'red',
									"text-align": "center"
								},
								text: r[i].errorText,
								class: "step-per-error", // A step-per-error is only removed if you are going next off of that field and validation is correct. step-error is removed whenever slide_trans is called.
								id: r[i].name+"-error"
							}) )
							proceed = false;
							first_step = ( first_step > elem.id ) ? elem.id : first_step // If this error step is less than the first_step, then set it.
						}
					}
				})
			}
			d.resolve( proceed, first_step );
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
			config = this.config;
			o_step = config.current_slide;
			// If forward
			$( o_step.cid ).fadeOut(250);
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
				}, 250);
			} else {
				// Go back
				$( step.cid ).css({
					"left": ( $(step.cid).outerWidth() + config.animation.offset )/ -1,
					"opacity": 0
				});
				$( step.cid ).show().animate({
					"left": 0,
					"opacity": 1
				}, 250);
			}
			setTimeout(function(){
				config.callback.anim_done( config.current_slide )
				self.config.system.hold = false;
			}, 250)
		},

		validate: function( step ){
			var d = $.Deferred();
			// Check fields
			var type, results, field, self;
			self = this;
			results = [];
			var fields = step.inputs;
			for ( var i = 0; i < fields.length; i++) {
				type = fields[i].type;
				field = fields[i];
				// Open the fields error table and extend with defaults.
				var field_preset = field.presets ? field.presets : {};
				var preset = $.extend( true, {}, self.config.validation.err_msg, field_preset )
				if ( $.trim( $(field.id).val() ) == "" && type == "normal" || $.trim( $(field.id).val() ) == "" && type == "email" ) {
					results.push({
						"name": field.name,
						"id": field.id,
						"error": 404,
						"errorText": preset[404]
					})
				}
				else if ( type == "email" && !this.validate_email( $.trim( $(field.id).val() ) ) ) {
					results.push({
						"name": field.name,
						"id": field.id,
						"error": 401,
						"errorText": preset[401]
					})
				} else if ( type == "select" && $(field.id).val() == "" || type == "select" && $(field.id).val() == null || type == "select" && $(field.id).val() == field.select_param.unselect || type == "select" && $(field.id).val() == field.select_param.other_select && $.trim( $(field.select_param.other.id).val() ) == "" ) {
					if ( type == "select" && $.trim( $(field.id).val() ) == field.select_param.other_select ) {
						// Push to the other input
						results.push({
							"name": field.select_param.other.name,
							"id": field.select_param.other.id,
							"error": 404,
							"errorText": field.select_param.other.presets[404] //Push the error defined in the presets of the {other}
						})
						// Also clear the main input (Because other_select is valid)
						results.push({
							"name": field.name,
							"id": field.id,
							"error": 200,
							"errorText": preset[200]
						})
					} else {
						results.push({
							"name": field.name,
							"id": field.id,
							"error": 401,
							"errorText": preset[401]
						})
					}
				} else if ( $.trim( $(field.id).val() ) != "" && type == "normal" || type == "email" && $.trim( $(field.id).val() ) != "" || type == "select" && $.trim( $(field.id).val() ) != "" && $.trim( $(field.id).val() ) != field.select_param.unselect && $.trim( $(field.id).val() ) != field.select_param.other_select || type == "select" && $.trim( $(field.id).val() ) == field.select_param.other_select && $.trim( $( field.select_param.other.id ).val() ) != "" ) {
					results.push({
						"name": field.name,
						"id": field.id,
						"error": 200,
						"errorText": preset[200]
					})
				} else {
					results.push({
						"name": field.name,
						"id": field.id,
						"error": 201,
						"errorText": preset[201]
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
						// Check if type is select
						if ( datac[i].inputs[c].type == "select" && $( datac[i].inputs[c].id ).val() == datac[i].inputs[c].select_param.other_select ) {
							data[ datac[i].inputs[c].name ] = $(datac[i].inputs[c].select_param.other.id).val()
						} else {
							data[ datac[i].inputs[c].name ] = $(datac[i].inputs[c].id).val();
						}
					}	
				}
			}
			data["js"] = "true";
			$.ajax({
				dataType: "json",
				url: self.config.mailer.url,
				data: data,
				method: "post",
				success: function(data){
					self.response(data)
					self.config.system.hold = false;
				},
				timeout: 5000
			}).fail(function(x,t,m){
				console.warn( x, t, m )
				self.config.system.hold = false;
				self.error( x, t, m )
			})
		},

		error: function( x, t, m ){
			var self = this;
			$("#step-loading-node").fadeOut().promise().done(function(){
				$(this).remove();
			})
			if ( x.statusText == "timeout" || x.status == 0 ) {
				self.output({
					"header": "Connection Timeout",
					"text": "Sorry, we could not connect to the server in time.",
					"node_class": "step step-error",
					"selector": ".step.step-error",
					"btext": "Back",
					"resize_param": ".step-error",
				})
			} else if ( x.status == 404 ) {
				self.output({
					"header": "Connection Failed",
					"text": "It appears as though the mailing system is down. We will fix this as soon as we can. Please try again later",
					"node_class": "step step-error",
					"selector": ".step.step-error",
					"btext": "Back",
					"resize_param": ".step-error",
				})
			}
		},

		output: function( settings ){
			// This function made it A LOT easier to display temporary messages on the fly (without a seperate div etc...)
			var defaults, options, self;
			defaults = {
				id: "step-info-node",
				header: "HEADER",
				text: "Some text",
				restart: false,
				back: false,
				node_class: "",
				resize_param: ".step-node",
				type: "after",
				node_css: {
					container: {
						"display": "none",
						"text-align": "center"
					},
					button: {
						"margin": "0 auto"
					}
				},
				selector: "#step-info-node",
				btext: "Button",
				hideOnClick: false,
				button: true
			}
			options = $.extend(true, {}, defaults, settings);
			self = this;
			self.config.system.r_param = options.selector;
			selector = options.selector;
			$("#step-loading-node, .step-node").stop().fadeOut().promise().done(function(){
				$(this).remove();
			})
			$( self.config.current_slide.cid ).fadeOut()
			$("#contact-inner")[ ( options.type == "replace" ) ? "replaceWith" : "after" ]($("<div></div>",{
				class: options.node_class+" step-node",
				id: options.id,
				css: options.node_css.container
			}))
			$(selector).html( $("<h1></h1>", {
				text: options.header
			}) ).fadeIn()
			$(selector + " h1").after( $("<p></p>", {
				text: options.text
			}) )
			if ( options.button ) {
				if ( options.back ) {
					$(selector + " p").after( $("<button class='button contact-trigger' style='margin:0 auto;'>Close</button>") )
				} else {
					$(selector + " p").after( $("<button></button>", {
						value: "step-error-back",
						class: ( options.restart ) ? "button contact-send restart" : "button contact-send",
						css: options.node_css.button,
						text: options.btext,
						name: "step"
					}) )
				}
				if ( options.hideOnClick ) {
					$(selector + " button").on("click", function( e ){
						var self_elem = this;
						$(this).parent(selector).fadeOut( 250 ).promise().done(function(){
							$(self_elem).parent(selector).remove()
						});
					})
				}
			}
			if (options.resize_param != "none") {
				self.resize_container( options.resize_param )
			}
		},

		response: function( data ){
			this.config.callback.response();
			var self = this;
			$("#step-loading-node").fadeOut().promise().done(function(){
				$(this).remove();
			})
			if ( data.status == 200 ) {
				self.output({
					"header": "Message Sent",
					"text": "Your message has been sent. We will get back to you using the email you provided as soon as we can.",
					"node_class": "step step-done",
					"type": "replace",
					"selector": ".step.step-done",
					"btext": "Close",
					"resize_param": ".step-done",
					"back": true
				})
			} else if ( data.status == 201 ) {
				self.output({
					"header": "Unknown Error",
					"text": "An unexpected error prevented us from sending your message.",
					"node_class": "step step-node-error",
					"selector": ".step.step-node-error",
					"btext": "Back",
					"resize_param": ".step-node-error"
				})
			} else if ( data.status == 404 ) {
				self.output({
					"header": "Verification Error",
					"text": "Somethings not quite right. Please go back and check that all fields are correctly filled in.",
					"node_class": "step step-node-error",
					"selector": ".step.step-node-error",
					"btext": "Back",
					"resize_param": ".step-node-error",
					"restart": true
				})
			} else if ( data.status == 304 ) {
				self.output({
					"header": "Already Sent",
					"text": "Please wait a while before sending another message. Thanks",
					"node_class": "step step-done",
					"type": "replace",
					"selector": ".step.step-done",
					"btext": "Close",
					"resize_param": ".step-done",
					"back": true
				})
			}
		}
	}

})(jQuery, window, document);