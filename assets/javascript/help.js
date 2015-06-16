// This JS document is used by the help.php page, this will hide the contact form allowing javascript to animate it, also allowing Ajax requests to assets/server/mail.php
//
// mail.php returns a JSON object, this JSON object will contain what the user typed, along side a status code and status text, here are the possible values:

// To prevent spam messaging this file must store a cookie, PHP could also be used...

// 200 - sent: Message successfully sent
// 201 - not_sent - could not send message
// 404 - missing_fields: Required fields were not filled in
// 208 - error: Unknown Error Occurred.

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

	var CF = {
		defaults: {
			container: "#contact-container",
			callback: {
				start: function(){}, // When the file is started
				anim_start: function(){}, // When the slide begins animating
				anim_done: function(){}, // When the slide stops animating
				submit: function(){}, // When the final form is submitted
				reponse: function(){} // When an AJAX response is received
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
			current_slide: 0 // NAME
		},

		init: function( options ){
			this.config = $.extend(true, {}, this.defaults, options)
			var config = this.config;
			// Hide and position the contact form. Non JS users simply wont see the contact form.
			// Firstly, grab the step widths and heights to animate.
			var cache_width, width, height, $element;
			for (var i = 0; i < config.steps.length; i++) {
				$element = $(config.steps[i].cid)
				width = $element.width();
				cache_width += width;
				if ( i > 0 ) {
					
				}
			}
		},

		slide_to: function(){
			// Slide from left to right (go forward)
		},

		slide_from: function(){
			// Slide from right to left (go back)
		},

		validate: function(){

		},

		submit: function(){

		},

		response: function(){

		}
	}

	CF.init()

})(jQuery, window, document);