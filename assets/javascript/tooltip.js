/*
	Author: Harry Felton

	Title: Tooltip.js

	License: MIT
	
	This Javascript plugin was created by Harry Felton for private use. Contact me here: http://harryfelton.web44.net/#contact, for more details

	It allows custom tooltips to be displayed on hover
*/
;(function( $ ){
	var instance;
	$.fn.tooltip = function( force ){
		//console.warn("This Plugin (Harry Felton - Tooltip) is deprecated and will soon be replaced by a CSS/JavaScript alternative.");
		console.error("deprecated plugin call caught. Terminating. Remove call to tooltip.js");
		return this;
		//console.warn("This plugin (tooltip.js) is still in development, therefore problems may arise")
		// Init this plugin to monitor "this"
		if (instance && !force) {
			console.error("A plugin (tooltip) instance is already running");
			return this;
		}
		instance = true;
		return this.each(function(){
			// Bind event
			// If the button has a title attribute then convert it to tooltip-title
			if ( $(this).attr("title") ) {
				$(this).attr("title", "")
			}
			// Remove the title attribute from any elements passed into this plugin. This prevents two differnet (or same) 
			// tooltips from displaying, withput this both the custom and browser tooltip would appear
			var timeout, elem;
			$(this).on("mouseenter", function( e ){
				elem = this
				timeout = setTimeout(function(){
					// Fade in tooltip
					setTooltip( elem )
				}, 500)
			}).on("mouseleave", function( e ){
				clearTimeout(timeout);
				clearTooltip( this )
			})
		});

		// The following functions are private!
		function adjust_position( tooltip ) {
			if ( !is_elem_visible(tooltip) ) {
				$(tooltip).css({
					bottom: "100%"
				})
				$(tooltip).hide().fadeIn(250)
			} else {
				$(tooltip).css("bottom", "")
			}
		}

		function setTooltip( element ) {
			// Check if element already contains a tooltip
			// The element needs to have a data-tooltip-children attribute, else return.
			var sibs = $(element).siblings().filter(".tooltip-diag[data-tooltip-parent]");
			if ( sibs.length == 1 ) {
				sibs.stop().fadeIn(250).promise().done(function(){
					adjust_position( sibs[0] )
				})
				// Check if tooltip visible, if not then adjust bottom to 100% (above)
				return false;
			}
			// Process. Create a div (if does not exist) with a class of tooltip-diag. Set the attribute data-tooltip-parent to the data-tooltip-children of the parent element.
			var appended = $("<div></div>", {
				"data-tooltip-parent": $(element).data("tooltip-children") ? $(element).data("tooltip-children") : "tooltip",
				text: $(element).data("tooltip-title"),
				class:"tooltip-diag"
			}).insertAfter(element).addClass( ($(element).data("tooltip-block") ) ? "center-diag" :"" ).stop().fadeIn(250);
			timeout = setTimeout(function(){
				adjust_position(appended)
			}, 250)
		}

		function clearTooltip( element ) {
			var sibs = $(element).siblings().filter(".tooltip-diag[data-tooltip-parent]");
			if ( sibs.length > 0 ) {
				sibs.stop().fadeOut(250).promise().done(function(){
					sibs.css("bottom", "")
				})
			} else {
				return;
			}
		}

	}

})( jQuery );