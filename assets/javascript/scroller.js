var scroller;
(function( $ ){

	scroller = {
		// Define defaults
		default: {
			elements: [
				{
					selector: "#example",
					pixel: 350,
					useToggle: false,
					reqSpace: 0
				}
			],
			speed: 250,
			transitionToggle: "fadeToggle",
			transitionIn: "fadeIn",
			transitionOut: "fadeOut"
		},

		// Start literal
		init: function( options ){
			// Create config using the defaults and custom settings.
			this.config = $.extend(true, {}, this.default, options)
			// Merge user and defalt settings into a deep copy, overwrite
			// Create a new variable here to be used later when looping the elements table.
			var element;
			for ( var i = 0; i < this.config.elements.length; i++ ) {
				element = this.config.elements[i];
				// Hide each element
				$( element.selector ).hide()
			}
			this.events()
			this.scroll()
			// Call the events & scroll function
		},

		events: function(){
			var self = this
			$(window).on("scroll resize", function(){
				// Manage
				self.scroll.call(self)
				// On scroll or resize call the scroll function
			})
		},

		scroll: function(){
			// Evaluate
			var config = this.config;
			var element, pos;
			for ( var i = 0; i < config.elements.length; i++) {
				// Check details
				element = config.elements[i];
				if ( typeof element.pixel == "function" ) {
					// run function to get pixels
					pos = element.pixel()
				} else {
					// Otherwise set pos to element.pixel OR the offset from the top
					pos = element.pixel ? element.pixel : $(element.selector).offset().top
				}
				// Check to see that the user has scrolled far enough, if so, also check if the remaining space either side of the contact is
				// correct ( greater than or equal to reqSpace ). This prevents overlapping by hiding the element if there is not enough space.
				if ( $(window).scrollTop() >= pos && ($(window).width() - $("#container").width()) /2 >= element.reqSpace ) {
					// show
					$( element.selector ).stop()[ element.useToggle ? config.transitionToggle : config.transitionIn ](config.speed)
				} else {
					// hide
					$( element.selector ).stop()[ element.useToggle ? config.transitionToggle : config.transitionOut ](config.speed)
				}
			}
		}
	} // End Object Literal

	$(window).load(function(){
		scroller.init({
			elements: [
				{
					selector: "#to-top",
					pixel: function(){
						return aj_page.screenh_percentage(100);
					},
					reqSpace: 80
				},
			]
		})
	});

})(jQuery) // End SIAF
