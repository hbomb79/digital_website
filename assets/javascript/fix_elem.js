// This javascript document will fix any elements to the designated location when the scroll top limit is reached.

var fixer = {
	default: {
		elements: [
			/*{
				selector: "#example-selector > a#test",
				pixel: 450, // Can be function, must return a integer
				position: {
					fix: {
						top: 0,
						position: "fixed"
					},
					norm: {
						position: "static"
					}
				},
				callback: {
					shown: function(){
						alert("Fixed")
					},
					hidden: function(){
						alert("Reverted")
					}
				}
			},
			{
				selector: "#anoter-selector",
				pixel: function(){
					return $("#another-selector").offset().top + 56;
					// This will trigger when the element hits the top of the page (+56 to account for header)
				},
				position: {
					top: 0,
					right: false,
					left: false,
					bottom: false // If a value is false, it is skipped.
				}
			}*/
		]
	},

	init: function( options ){
		// This function will setup the elements registered and hide them if needed.
		var self, config;
		self = this;
		config = $.extend(true, {}, self.default, options)
		this.config = config;
		this.scroll.call(self)
		this.events.call(self)
	},

	events: function(){
		// Creates window events listener
		var self = this;
		$(window).on("scroll resize", function(){
			self.scroll.call(self, this)
		})
	},

	scroll: function( e ){
		var self, pos, elements, element;
		elements = this.config.elements;
		self = this;
		for ( var i = 0; i < elements.length; i++ ) {
			element = elements[i]
			pos = ( typeof element.pixel == "function" ) ? element.pixel() : element.pixel;
			if ( $(window).scrollTop() > pos ) {
				$( element.selector ).css( element.position.fix )
				element.callback.shown()
			} else {
				$( element.selector ).css( element.position.norm )
				element.callback.hidden()
			}
		}
	}
}

$(window).load( fixer_init )

function fixer_init() {
	console.warn("Fixer Init")
	fixer.init({
		elements: [
			{
				selector: ".page-container.current .header",
				pixel: $(".page-container.current .header").offset().top - 89,
				position: {
					fix: {
						top: "28px",
						position: "fixed"
					},
					norm: {
						position: "static"
					}
				},
				callback: {
					shown: function(){
						$(".page-container.current .header").addClass("fix")
						$(".page-container.current .header-after").css({ "margin-top": $(".header h1").height() + 56 })
					},
					hidden: function() {
						$(".page-container.current .header").removeClass("fix")
						$(".page-container.current .header-after").css({ "margin-top":"" })
					}
				}
			}
		]
	})
}