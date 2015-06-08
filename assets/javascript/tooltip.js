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
				$("#dummy-tipped").remove()
			}
			var append = $("<div></div>", {
				class: $(this).attr("class"),
				id: "dummy-tipped"
			}).css({
				position: "fixed", // Fixed so it doesnt effect the page
				opacity: "0" // Opacity 0 so the user does not see the element floating around.
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
	$(".tipped").tooltip()
})