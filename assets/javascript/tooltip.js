// This plugin allows custom tooltips
;(function( $ ){
	var instance;
	$.fn.tooltip = function( force ){
		// Init this plugin to monitor "this"
		if (instance && !force) {
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

		// The following functions are private!
		function adjust_position( tooltip ) {
			if ( !is_elem_visible(tooltip) ) {
				$(tooltip).animate({
					bottom: "100%"
				})
			} else {
				$(tooltip).css("bottom", "")
			}
		}

		function setTooltip( element ) {
			// Check if element already contains a tooltip
			// The element needs to have a data-tooltip-children attribute, else return.
			var sibs = $(element).siblings().filter(".tooltip-diag[data-tooltip-parent]");
			if ( sibs.length == 1 ) {
				sibs.stop().fadeIn(250)
				// Check if tooltip visible, if not then adjust bottom to 100% (above)
				setTimeout(function(){
					adjust_position( sibs[0] )
				}, 250)
				return false;
			}
			// Process. Create a div (if does not exist) with a class of tooltip-diag. Set the attribute data-tooltip-parent to the data-tooltip-children of the parent element.
			var appended = $("<div></div>", {
				"data-tooltip-parent": $(element).data("tooltip-children") ? $(element).data("tooltip-children") : "tooltip",
				text: $(element).data("tooltip-title"),
				class:"tooltip-diag"
			}).insertAfter(element).stop().fadeIn(250);
			setTimeout(function(){
				adjust_position(appended)
			}, 250)
		}

		function clearTooltip( element ) {
			var sibs = $(element).siblings().filter(".tooltip-diag[data-tooltip-parent]");
			if ( sibs.length > 0 ) {
				sibs.stop().fadeOut(250).delay(250).css("bottom", "")
			} else {
				return;
			}
		}

	}

})( jQuery );

$(document).ready(function(){
	$("a[data-tooltip-title]").tooltip()
})