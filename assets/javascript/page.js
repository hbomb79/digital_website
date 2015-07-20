// Add class JS to body to be used by CSS
$("body").addClass("JS")

// When the DOM is ready, bind a click event to the handle (mobile) so we can expand/collapse the menu bar
$(document).ready(function() {
	$(".handle").unbind("click").bind("click", function(){
		$("nav > ul").toggleClass("showing");
		$("nav > .handle").toggleClass("active");
	});
	// If the user hovers on dropdown with JS, animate it
	$("header li.has-drop").on("mouseenter", function(){
		$(this).children().filter("ul").stop().slideDown(250);
	}).on("mouseleave", function(){
		$(this).children().filter("ul").stop().slideUp(250)
	});

	$("#notification").unbind("click").bind("click", function(){
		if($("#notification div").attr("data-notify-couple")) {
			$($("#notification div").attr("data-notify-couple")).slideUp(500)
		}
	});
});
// Create a notification onscreen.
function notify(message, color, tc, optional){
	if (!optional) {
		optional = false;
	}
	$("#notification").html("<div onclick='hideNotify()' data-notify-couple='"+ optional +"' style='text-align:center; cursor:pointer; background: "+color+"; width:100%; color: "+tc+";'>"+message+"  -  Click To Dismiss</div>");
	if (!$("#notification").is(":visible")) { $("#notification").slideDown(500) };
	if (optional) {
		$(optional).html("<div onclick='hideNotify()' style='text-align:center; cursor:pointer; background: "+color+"; width:100%; color: "+tc+";'>"+message+"  -  Click To Dismiss</div>");
		if (!$(optional).is(":visible")) { $(optional).slideDown(500) };
	}
};

// Remove notification
function hideNotify(){
	if ($("#notification").is(":visible"))  {
		$("#notification").slideUp(500); 
	};
	if ($($("#notification div").attr("data-notify-couple")).is(":visible")) {
		$($("#notification div").attr("data-notify-couple")).slideUp(500)
	}
}

// Load data-js-link if javascript is on, else load the href

$(document).ready(function(){
	$("html").on("click", "a.js-link", function( e ){
		if ( get_cookie( "ajax_disable" ) ) {
			document.location.href=$(this).data("js-link")
		}
		e.preventDefault();
		// Animate
		aj_page.start( getFileName(), $(this).data("js-link"), false, false, false )
	})
})

// Initiate slideshow.
$(window).on("load aj_done", function(){
	$("img#test").hexSlide({
		height: "34vw",
		width: "60vw",
		shuffle: true,
		maxwidth: "960px",
		maxheight: "490px",
		animation: "slide",
		additionalCSS:{
			container:{
				"display":"inline-block",
				"background": "black",
				"box-shadow": "0 10px 10px -7px black"
			}
		},
		additionalClass: {
			container: "center-image"
		},
		callback: {
			start: function(){
				$(".img-border").css({
					"height": "41vw",
					"border": ""
				});
				$(window).trigger("resize");
			}
		},
		text: {
			next: "NEXT",
			previous: "BACK"
		}
	})
})