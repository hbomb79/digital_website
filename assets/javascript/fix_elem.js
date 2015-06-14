// This javascript document will fix any elements to the designated location when the scroll top limit is reached.

var fixer = {
	default: {
		elements: []
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
		var res_time;
		$(window).on("scroll", function(){
			self.scroll.call(self, this)
		})
		$(window).on("resize", function(){
			if ( res_time ) {
				clearTimeout(res_time)
			}
			res_time = setTimeout(function(){
				for ( var i = 0; i < self.config.elements.length; i++ ) {
					var element = self.config.elements[i]
					element.callback.onresize( element )
				}
				$(window).trigger("scroll")
			}, 500)
		})
		$(".info-box #close").on("click", function(){
			$(window).trigger("resize")
		})
	},

	remove_element: function( name ){
		var self = this;
		if ( !fixer.config ) { return; }
		for ( var i = 0; i < self.config.elements.length; i++) {
			var element = self.config.elements[i];
			if ( element.selector == name || name == "all") {
				$(element.selector).removeClass("fix").css( element.position.norm )
				element.callback.hidden()
				self.config.elements.splice( i, 1 )
			}
		}
	},

	scroll: function( e ){
		var self, pos, elements, element;
		elements = this.config.elements;
		self = this;
		for ( var i = 0; i < elements.length; i++ ) {
			element = elements[i]
			pos = ( typeof element.pixel == "function" ) ? element.pixel() : element.pixel;
			if ( $(window).scrollTop() + element.position.offset > pos && $(element.selector).css("position") != element.position.check ) {
				$( element.selector ).css( element.position.fix )
				element.callback.shown()
			} else if( $(window).scrollTop() + element.position.offset < pos && $(element.selector).css("position") == element.position.check ) {
				$( element.selector ).css( element.position.norm )
				element.callback.hidden()
			}
		}
	}
}

$(window).load(function(){
	if( $(".page-container.current").data("fix-header") ) {
		if (fixer_init) {
			fixer_init()
		}
	}
})