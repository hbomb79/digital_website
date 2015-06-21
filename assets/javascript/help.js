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

	// Object literal, I have used this because it is easier to read and takes up less global space, this way I can 
	// have A.init and B.init because init is a private function to A / B
	CF = {
		// Assign default settings
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
				url: "assets/server/mail.php" // URI to submit field data
			},
			animation: {
				offset: 0, // Added to offset right ($(elem).offset().left + $(elem).outerWidth() + offset )
				speed: 500, // In ms
			},
			steps: [
				// The script will look here for an entry with a name matching that of the next slide. For eg, if the form requests a step2, then the second entry will be selected and used.
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
			// Options is the users custom settings, they are merged with the defaults using jQuery.extend
			this.config = $.extend(true, {}, this.defaults, options)
			var config = this.config;
			var self = this;
			// Store THIS and the config in a variable to accessing them is easier. this = the object (CF). When calling jQuery, this can sometimes
			// be changed to an event, thats why we store it in self, self will always equal the object literal.

			// show the contact form (display:block) but hide using opacity:0. This is because we need to get the height of the div, this wont
			// work if the div is display:none, but it will work fine if invisible
			$( config.container ).show().css({
				"opacity":0
			})
			this.restore();
			// function restore will set the current slide to top, left: 0, but the other slides will be set the right hand side and set to display:none;
			if ( !skip ) { this.events(); } // Stops multiple event handlers on same element ( causes open and close immediately ) if already been called. Because the page doesnt get reloaded ( JS ) then the init function must be recalled.
			config.callback.start(); // Call the user start callback ( config )
			setTimeout(function(){ self.resize_container(); $( config.container ).hide().css("opacity", 1) }, 250) // After 250ms resize the container to match the size of the current step. Then revert the opacity change we did earlier.
		},

		check_bounds: function(){
			if ( $(window).width() < 770 ) {
				// Dont alter the positioning of the div if the screen is in mobile mode ( media )
				return;
			}
			// Check if the bottom or top is off screen.
			var elem, $elem, config, self, height, wind_height; // Store frequently used values in variables for easier use and readability.
			self = this;
			config = self.config;
			elem = config.container;
			$elem = $(elem);
			wind_height = $(window).outerHeight()
			height = $elem.outerHeight();

			// If the height of the window is larger than the container height then set the position to fixed if not already
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
				// If the window height is smaller, then change position to absolute if currently set to fixed
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
			// Handles event catching
			var self = this;
			var bound_timer;
			// Sets a event listener using event delegation for the button class contained in the body container
			// Event delegation allows elements that are created on the fly ( using function output )
			$("body").on("click", self.config.button, function( e ){
				e.preventDefault();
				self.button_click( this );
			});
			// Set another for the trigger elements contained in the body
			$("body").on("click", self.config.trigger, function( e ){
				e.preventDefault();
				self.trigger_click();
			});
			// This fires when the window is resized or scrolled.
			$(window).on("scroll resize", function(){
				if ( $(self.config.container).is(":visible") ){
					clearTimeout(bound_timer);
					bound_timer = setTimeout(function(){
						self.check_bounds()
					}, 500);
				}
			});
			$("body").on("click", ".node-fade-click", function(){
				var self_elem = this;
				self.config.system.hold = false;
				$(this).parent(selector).fadeOut( 250 ).promise().done(function(){
					$(self_elem).parent(selector).remove()
				});
			});
			// When an element with class cf-keyup changes value then fire this function
			$("body").on("change", ".cf-keyup", function(){
				// Check
				self.check_select( this );
			});
			self.target_click();
			self.fade_out();
		},

		check_select: function( e ){
			// e = the select. Since we have the select, we will now loop through each field, compiling a list of elements that use this
			// select as a parent. Check each one and if the criteria matches, show this field. function validate will automatically start
			// monitoring them on submit.
			var self, step, field, field_buffer, fields, config, steps;
			self = this;
			config = self.config;
			steps = config.steps;
			field_buffer = [];
			for ( var s = 0; s < steps.length; s++ ) {
				step = steps[s];
				fields = step.inputs;
				// loop each field;
				for ( var f = 0; f < fields.length; f++ ) {
					field = fields[f];
					if ( field.parent ) {
						// Field has a parent
						if ( field.parent.id.replace("#", "") == $(e).attr("id") ) {
							// This is the same parent, check criteria
							if ( $(e).val() == field.parent.showWhen ) {
								// Show field
								field_buffer.push({
									"show": true,
									"name": field.name,
									"id": field.id
								})
							} else {
								field_buffer.push({
									"show": false,
									"name": field.name,
									"id": field.id
								})
							}
						}
					}
				}
			}

			// Show/Hide those in buffer
			for ( var i = 0; i < field_buffer.length; i++ ) {
				if ( field_buffer[i].show ) {
					// Show if not already visible
					if ( !$(field_buffer[i].id).is(":visible") ) {
						$(field_buffer[i].id).slideDown(250)
					}
				} else {
					// Hide if shown
					if ( $(field_buffer[i].id).is(":visible") ) {
						$(field_buffer[i].id).slideUp(250)
					}
				}
				
			}
			setTimeout( function(){
				self.resize_container()
			}, 300)

		},

		target_click: function(){
			// The user has clicked, check if the user clicked inside/on the contact form. If they did NOT then toggle the visibility of the contact form.
			var self = this;
			$(window).on("click", function( e ) {
				if ( !$(self.config.container).is(":visible") ) {
					return;
					// If the contact form is currently invisible then return because we only want this function to apply when the contact form is visible
					// because this is desgined to close the form.
				}
				var ev = $( e.originalEvent.srcElement ) // Found using Google Chromes inspect element (had no internet for documentation)
				// ev stores the element the user clicked on.
				if ( ev.parents( self.config.container ).length != 1 && !ev.hasClass( (self.config.button).replace(".", "") ) && !ev.hasClass( (self.config.trigger).replace(".", "") )) {
					self.trigger_click();
					// If the length of the parents of the element clicked is not 1 ( normally 0 ) and the element does not have the target or send class then it is not part of the form
					// so hide the contact form because they clicked off of it.
				}
			})
		},

		trigger_click: function() {
			// Fade in/out the contact form and shadow
			var self = this;
			if ( $(this.config.container).is(":visible") ) {
				// If the container is currently visible then fade out
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
					// Fade the contact form away
				}
			})
		},

		resize_container: function( elem ) {
			var $elem = elem ? $(elem) : $(this.config.current_slide.cid);
			var self = this;
			// Animate the height of the contact container to match the current_slide ( settings ) or the ELEM passed.
			$(this.config.container).animate( {"height": $elem.outerHeight()}, 250).promise().done(function(){
				self.check_bounds() // Once complete check that the container is within the bounds of the screen.
			})
		},

		validate_current: function( no_resize ){
			// Used object.validate, then adds/removes highlight & error messages from fields on current slide.
			var d = $.Deferred();
			var self = this;
			// use get_slide to retrieve information for a slide via the name specified. validate returns a deferred with a response
			this.validate( this.get_slide("name", this.config.current_slide.name) ).done(function( r ){
				// Create private variables
				var elem, $elem, errors;
				proceed = true;
				// By default proceed is true, meaning we can go to the next slide
				for ( var i = 0; i < r.length; i++) {
					elem = r[i]
					$elem = $(elem.id);
					$elem.find(".step-error").remove()
					// store the input in elem, and a jQuery handle of the input in $elem
					$errors = $elem.siblings("#"+elem.name+"-error");
					if ( elem.error == 200 ) {
						// If the error is 200, then the field is actually OK, remove the warning border and text
						if( $elem.hasClass("warning") ){
							$elem.removeClass("warning")
						}
						// $errors is a array containing warning for the current field
						$errors.filter(".step-per-error").addClass("step-error");
						$errors.addClass("done").slideUp(100).promise().done(function(){
							$(".step-error").filter(".done").remove()
							// Slide up the errors that have been dismissed, afterwards remove them from the DOM completely
						});
					} else {
						proceed = false;
						// An error has been found, dont go to the next slide.
						if ( !$elem.hasClass("warning") ) {
							$elem.addClass("warning")
							// Add the warning class if it is not already on this element
						}
						if ( $errors.length <= 0 ) {
							// If NO errors for this element exist, then create a new one
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
							// otherwise there already is an error message on screen, so replace its text
							$( $errors[0] ).text( elem.errorText );
							if ( !$( $errors[0] ).is(":visible") ) {
								$errors[0].slideDown(100);
							}
						}
						
					}
				}
				if ( !no_resize ) {
					// if no_resize is set then dont resize the container ( this is used before sending because the resize is handled afterwards )
					setTimeout(function(){
						self.resize_container()
					}, 100)
				}
				d.resolve( proceed );
				// resolve the deferred with true/false.
			})
			// return deferred
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
					var field = $elem.hasClass("restart") ? 0 : self.config.steps[self.config.steps.length-1].id
					self.slide_trans( self.get_slide("id", field ), true ) // Display last step ( The user should only get here if they tried to send from last step. If not then vslidation will catch them )
				}
			}
		},

		validate_all: function() {
			// function validate_all
			// This function is called before form submission, it checks each step using function validate.
			// If an error is found a warning is placed under it and the earliest error found is then scrolled to using function slide_trans
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
			// Returns true if address is in a valid email structure
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
			// o_step is the current_slide BEFORE animating, therefore it is the old slide.
			$( o_step.cid ).fadeOut(250);
			$( ".step-error" ).fadeOut(250).promise().done(function(){
				$(".step-error").remove()
			});
			$(".warning").removeClass("warning");
			// Fade out the old slide and remove any warnings, remove warning border form wide and change the current slide to the new slide
			config.current_slide = step;
			self.resize_container( step.cid );
			config.callback.anim_start( o_step, step )
			// Call the config callback anim_start, passing the old and new step
			if ( !backwards ) {
				// If going forward then animate accordingly
				$( step.cid ).css({
					"left": $(step.cid).outerWidth() + config.animation.offset,
					"opacity": 0
				});
				$( step.cid ).show().animate({
					"left": 0,
					"opacity": 1
				}, 250);
			} else {
				// If going backwards then animate accordingly
				$( step.cid ).css({
					"left": ( $(step.cid).outerWidth() + config.animation.offset )/ -1, // Set the step to the left of the container
					"opacity": 0 // Invisible
				});
				$( step.cid ).show().animate({
					"left": 0,
					"opacity": 1 // Animate to the right over top the o_step
				}, 250);
			}
			setTimeout(function(){
				// system.hold prevents users from clicking, when true. Set to false because transition done.
				// Call user callback with the new slide.
				config.callback.anim_done( config.current_slide )
				self.config.system.hold = false;
			}, 250)
		},

		validate: function( step ){
			var d = $.Deferred();
			// Check fields
			var type, results, field, self;
			self = this;
			var fields = step.inputs;
			var toValidate = [];
			for ( var i = 0; i < fields.length; i++) {
				// Loop through each field and store in variable
				type = fields[i].type;
				field = fields[i];
				// Open the fields error table and extend with defaults.
				var field_preset = field.presets ? field.presets : {};
				var preset = $.extend( true, {}, self.config.validation.err_msg, field_preset )
				// Check if field is a parent ( shown by parent value )
				// If so then check the parent, if the parent is correct then validate this field as well.
				fieldParent = field.parent ? field.parent : false
				if ( fieldParent &&  $.trim( $(fieldParent.id).val() ) == fieldParent.showWhen ) {
					// This field should be shown and validated
					toValidate.push( field )
					if ( !$(field.id).is(":visible") ) {
						$(field.id).show()
						self.resize_container()
					}
				} else if ( type == "select" || type == "normal" || type == "email" ) {
					// If this field is in a showWhen state, still validate, it only fails validation if not filled or in unselct state.
					// This field maybe using a parent, check if the parent arguments are met ( showWhen ). If not then this field does not need
					// to be validated, the parent select does anyway
					if ( fieldParent ) {
						// Check parent
						if ( $.trim( $(fieldParent.id).val() ) == fieldParent.showWhen ) {
							// This field should be shown, and therefore validated
							toValidate.push( field )
						}
					} else {
						toValidate.push( field )
					}
				}
			}

			// The actual validation is done now
			results = [];
			for ( var c = 0; c < toValidate.length; c++ ) {
				// Loop through each field to validate
				var type, cid, name, val, proceed, result, results, v;
				v = toValidate[c];
				type = v.type;
				cid = v.id;
				name = v.name;
				proceed = true;
				result = {
					"name": name,
					"id": cid,
					"type": type
				}
				val = $.trim( $(cid).val() );
				if ( type == "normal" ) {
					// Validate
					if ( val == "" || !val ){
						proceed = false;
						result["error"] = 404;
						result["errorText"] = preset[404];
						// Append error to result, then we 
					}
				} else if ( type == "email" ) {
					if ( val == "" || !val ) {
						// No value
						proceed = false;
						result["error"] = 404;
						result["errorText"] = preset[404];
					} else if ( !self.validate_email(val) ) {
						// Not valid
						proceed = false;
						result["error"] = 401;
						result["errorText"] = preset[401];
					}
				} else if ( type == "select" ) {
					// If the type is select, check if the value is unselect, if its anything else then the prior block of code
					// should handle it.
					if ( val == v.select_param.unselect || val == "" || !val ) {
						// This is unselected
						proceed = false;
						result["error"] = 404;
						result["errorText"] = preset[404];
					}
				} else {
					// Unknown Type, Return 201
					proceed = false;
					console.warn("Unknown Type")
				}
				if ( proceed ) {
					// OK, return 200
					result["error"] = 200;
					result["errorText"] = preset[200];
				}
				results.push( result )
			}

			d.resolve(results)
			return d;
		},

		submit: function(){
			// Submit the form
			this.config.callback.submit();
			// Run the callback
			var self = this;
			var datac, data;
			data = {};
			datac = self.config.steps;
			for ( var i = 0; i < datac.length; i++ ) {
				// Loop each step
				// If the step wants to be posted via AJAX ( may just be there for options )
				if ( datac[i].post ) {
					for ( var c = 0; c < datac[i].inputs.length; c++ ) {
						// Loop each field
						// Check if type is select
						// Verify if the select is OTHER, then store OTHER.id, otherwise store the value of the select.
						if ( datac[i].inputs[c].type == "select" && $( datac[i].inputs[c].id ).val() == datac[i].inputs[c].select_param.other_select ) {
							data[ datac[i].inputs[c].name ] = $(datac[i].inputs[c].select_param.other.id).val()
						} else {
							data[ datac[i].inputs[c].name ] = $(datac[i].inputs[c].id).val();
							// if not select field, then just store the value
						}
					}	
				}
			}
			// Request a JSON object to the URL specified in the config. Pass data as POST arguments. On success remove the system hold and check the data response. timeout of 5 seconds
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
				// Request failed, check using function error
				console.warn( x, t, m )
				self.config.system.hold = false;
				self.error( x, t, m )
			})
		},

		error: function( x, t, m ){
			var self = this;
			$("#step-loading-node").fadeOut().promise().done(function(){
				$(this).remove();
				// Fade out then remove the SENDING screen
			})
			if ( x.statusText == "timeout" ) {
				// If the error was casued by a timeout then tell the user
				self.output({
					"header": "Connection Timeout",
					"text": "Sorry, we could not connect to the server in time.",
					"node_class": "step step-error",
					"selector": ".step.step-error",
					"btext": "Back",
					"resize_param": ".step-error",
				})
			} else if ( x.status == 404 ) {
				// If the error was because the file was not found
				self.output({
					"header": "Connection Failed",
					"text": "It appears as though the mailing system is down. We will fix this as soon as we can. Please try again later",
					"node_class": "step step-error",
					"selector": ".step.step-error",
					"btext": "Back",
					"resize_param": ".step-error",
				})
			} else if ( x.statusText == "error" ) {
				// If the error was generic ( maybe internet failure )
				self.output({
					"header": "Connection Failed",
					"text": "We could not connect to our servers. Check your internet connection and try again",
					"node_class": "step step-error",
					"selector": ".step.step-error",
					"btext": "Back",
					"resize_param": ".step-error",
				})
			} else {
				// Otherwise display a generic error message.
				self.output({
					"header": "Fatal Error",
					"text": "A fatal error prevented us from sending your message. Please try again later",
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
			defaults = { // Default message settings
				id: "step-info-node",
				header: "HEADER", // Title text
				text: "Some text", // Body text
				restart: false, // Button click takes user to start of form
				back: false, // Button click closes form
				node_class: "", // Class to be applied to the message
				resize_param: ".step-node", // Selector to be used as object when resizing container
				type: "after", // after appends a message, replace removes the form and replaces it with a message ( good when the message has been sent and you want the form to go )
				node_css: {
					container: { // CSS to be applied to the container by default
						"display": "none",
						"text-align": "center"
					},
					button: { // CSS to be applied to the button by default
						"margin": "0 auto"
					}
				},
				selector: "#step-info-node", // Selector to use when targeting
				btext: "Button", // Button text
				hideOnClick: true, // hide+remove message when the button is clicked
				button: true // false for NO button ( loading screen )
			}
			options = $.extend(true, {}, defaults, settings); // Extend settings
			self = this;
			self.config.system.r_param = options.selector;
			selector = options.selector;
			$(".step-node").stop().fadeOut().promise().done(function(){
				$(this).remove();
				// Remove any other messages
			})
			$( self.config.current_slide.cid ).fadeOut()
			// Fade out current step
			$("#contact-inner")[ ( options.type == "replace" ) ? "replaceWith" : "after" ]($("<div></div>",{ // If type replace then remove other steps, otherwise use after
				class: options.node_class+" step-node",
				id: options.id,
				css: options.node_css.container
				// Create a div with settings found in the options object
			}))
			$(selector).html( $("<h1></h1>", {
				text: options.header
			}) ).fadeIn() // Create the header then fade in the message
			$(selector + " h1").after( $("<p></p>", {
				text: options.text
			}) ) // Create the p tags with the text
			if ( options.button ) { // If button wanted, then create one
				if ( options.back ) {
					// This button will close the window, so give it a class of config.trigger so that onclick will close window
					$(selector + " p").after( $("<button></button>", { // Create button
						class: "button contact-trigger", // Add class
						css: options.node_css.button, // Add the css
						text: options.btext, // Add the text
					}) )
				} else {
					$(selector + " p").after( $("<button></button>", {
						value: "step-error-back", // Set the value used by function button_click
						class: ( options.restart ) ? "button contact-send restart" : "button contact-send", // If restart set then give the button a class of restart, otherwise dont
						css: options.node_css.button, // Add CSS
						text: options.btext,
						name: "step" // name of step, used by function button_click
					}) )
				}
				if ( options.hideOnClick ) {
					// hideOnClick enabled, then add a class of node-fade-click, this is delegated in function events
					$(selector + " button").addClass("node-fade-click")
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
			// The mail url returns a JSON object, containing all the inputs ( mirrored ) and status & statusText.
			// Status Code - Status Text - Status Description
			// 200 - sent - Message Sent
			// 201 - not_sent - Unknown Error
			// 404 - missing_fields - Missing/Invalid Fields
			// 304 - already_sent - Message already sent
			if ( data.status == 200 ) {
				self.output({
					"header": "Message Sent",
					"text": "Your message has been sent. We will get back to you using the email you provided as soon as we can.",
					"node_class": "step step-done",
					"type": "replace",
					"selector": ".step.step-done",
					"btext": "Continue",
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