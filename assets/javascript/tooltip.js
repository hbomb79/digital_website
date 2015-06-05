// This plugin allows custom tooltips
var test_2;
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
			if ( sibs.length == 1 ) {
				sibs.stop().fadeIn(250)
				// Check if tooltip visible, if not then adjust bottom to 100% (above)
				setTimeout(function(){
					$(sibs[0]).css({
						bottom: ( !is_elem_visible( sibs[0] ) ) ? "100%" : ""
					})
				}, 250)
				return false;
			}
			// Process. Create a div (if does not exist) with a class of tooltip-diag. Set the attribute data-tooltip-parent to the data-tooltip-children of the parent element.
			var appended = $("<div></div>", {
				"data-tooltip-parent": $(element).data("tooltip-children") ? $(element).data("tooltip-children") : "tooltip",
				text: $(element).data("tooltip-title"),
				class:"tooltip-diag"
			}).insertAfter(element).stop().fadeIn(250);
			test_2 = appended;
			setTimeout(function(){
				$(appended).css({
					bottom: ( !is_elem_visible( appended ) ) ? "100%" : ""
				})
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