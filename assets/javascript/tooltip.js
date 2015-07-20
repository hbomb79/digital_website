/*
	Author: Harry Felton

	Title: Tooltip.js

	License: MIT
	
	This Javascript plugin was created by Harry Felton for private use. Contact me here: http://harryfelton.web44.net/#contact, for more details

	It allows custom tooltips to be displayed on hover
*/

;(function( $, window, document, undefined ){
	var instance;
	$.fn.tooltip = function(){
		// This plugin will assist the css based tooltip system. This will detect each tipped element, locate where the tooltip is going to be and add/remove classes to ensure it is correctly positioned
		// This program emulates the tooltip in an invisible div towards the bottom of the page. It uses this to calculate the exact div width. This is because the :after pseudo element cannot be targeted using Javascript
		// as technically it is not part of the DOM

		// Use event delegation to catch the mouse enter event on any vauto element inside the body.
		$("body").on("mouseenter", ".tipped-vauto", function(){
			var elem = this;
			vcheck.call(elem, elem)
		})

		return this;

		function vcheck( element ) {
			// Private Function (Only accessible by the plugin)
			// This tipped wants to be automatically set
			// First create a dummy tipped element
			if ( $("#dummy-tipped").length > 0) {
				// Remove any existing dummies
				$("#dummy-tipped").remove()
			}
			var append = $("<div></div>", {
				// After creating a jQuery DOM element, add a class and id so it can be used later
				class: $(this).attr("class"),
				id: "dummy-tipped"
			}).css({
				// Apply some styling so the user cannot see the dummy, and it doesnt affect the page flow.
				position: "fixed", // Fixed so it doesnt effect the page
				opacity: "0" // Opacity 0 so the user does not see the element floating around.
				// Insert the dummy and remove the vauto class so this javascript does not catch it, also set its text to that of the 
				// aria-label of the parent
			}).insertAfter(".page-container").removeClass("tipped-vauto").text( $(this).attr("aria-label") )
			// Use this dummy to detect height
			var doc_bottom = $(window).scrollTop() + $(window).height();
			var elem_bottom = $(this).offset().top + $(this).height();

 			if ( elem_bottom + $("#dummy-tipped").height() + 32 > doc_bottom) {
 				// Bottom of element is not on screen
 				$(this).addClass("tipped-top").removeClass("tipped-bottom")
			} else {
				$(this).addClass("tipped-bottom").removeClass("tipped-top")
			}
			$("#dummy-tipped").remove();
		}

	}

})( jQuery, window, document );

$(window).load(function(){
	// Apply the plugin on any elements with .tipped. This plugin could be called on anything as it does not utilise plugin functions
	// I used the plugin constructor for practice.
	$(".tipped").tooltip()
})