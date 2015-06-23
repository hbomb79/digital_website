// This function will target a particular target, using no delegation ( because it needs to be recalled each time ).
// When the plugin is initialized the plugin will


(function( $, window, document, undefined ){

	$.fn.hexSlide = function( options ){

		options = $.extend(true, {}, {
			container: ".container",
			interval: 3000,
			pauseOnHover: true,
			navigation: true,
			alwaysShowNav: false
		}, options)

		var timers = [],


	}

})( jQuery, window, document )