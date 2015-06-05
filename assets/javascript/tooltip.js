// This plugin allows custom tooltips
;(function( $ ){
	var instance;
	$.fn.tooltip = function(){
		// Init this plugin to monitor "this"
		if (instance) {
			console.error("A plugin (tooltip) instance is already running");
			return this;
		}
		instance = true;
		return this.each(function(){
			// Bind event
			var timeout, elem;
			$(this).on("mouseenter", function(){
				elem = this
				timeout = setTimeout(function(){
					// Fade in tooltip
					setTooltip( elem )
				}, 500)
			}).on("mouseleave", function(){
				clearTimeout(timeout);
				clearTooltip( this )
			})
		});

		function setTooltip( element ) {
			// Check if element already contains a tooltip
			// The element needs to have a data-tooltip-children attribute, else return.
			var sibs = $(element).siblings().filter(".tooltip-diag[data-tooltip-parent]");
			if ( sibs.length > 0 ) {
				sibs.stop().fadeIn(250)
				return false;
			}
			// Process. Create a div (if does not exist) with a class of tooltip-diag. Set the attribute data-tooltip-parent to the data-tooltip-children of the parent element.
			$("<div></div>", {
				"data-tooltip-parent": $(element).data("tooltip-children") ? $(element).data("tooltip-children") : "tooltip",
				text: $(element).data("tooltip-title"),
				class:"tooltip-diag"
			}).insertAfter(element).stop().fadeIn(250);
		}

		function clearTooltip( element ) {
			var sibs = $(element).siblings().filter(".tooltip-diag[data-tooltip-parent]");
			if ( sibs.length > 0 ) {
				sibs.stop().fadeOut(250)
			} else {
				return;
			}
		}

	}

})( jQuery );

$(document).ready(function(){
	$("a[data-tooltip-title]").tooltip()
})