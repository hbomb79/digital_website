var scroller;
(function( $ ){
	scroller = {
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

		init: function( options ){
			this.config = $.extend(true, {}, this.default, options)
			// Merge user and defalt settings into a deep copy, overwrite
			var element;
			for ( var i = 0; i < this.config.elements.length; i++ ) {
				element = this.config.elements[i];
				$( element.selector ).hide()
			}
			this.events()
			this.scroll()
		},

		events: function(){
			var self = this
			$(window).on("scroll resize", function(){
				// Manage
				self.scroll.call(self)
			})
		},

		scroll: function(){
			// Evaluate
			var config = this.config;
			var element, pos;
			for ( var i = 0; i < config.elements.length; i++) {
				// Check details
				element = config.elements[i];
				pos = element.pixel ? element.pixel : $(element.selector).offset().top
				if ( $(window).scrollTop() >= pos && ($(window).width() - $("#container").width()) /2 >= element.reqSpace ) {
					// show
					$( element.selector )[ element.useToggle ? config.transitionToggle : config.transitionIn ](config.speed)
				} else {
					// hide
					$( element.selector )[ element.useToggle ? config.transitionToggle : config.transitionOut ](config.speed)
				}
			}
		}
	}

	$(window).load(function(){
		scroller.init({
			elements: [
				{
					selector: "#to-top",
					pixel: aj_page.screen_percentage(50),
					reqSpace: 80
				},
			]
		})
	});

})(jQuery)
