$("body").addClass("JS")

$(document).ready(function() {
	$(".handle").unbind("click").bind("click", function(){
		$("nav > ul").toggleClass("showing");
		$("nav > .handle").toggleClass("active");
	});

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
		e.preventDefault();
		// Animate
		aj_page.start( getFileName(), $(this).data("js-link"), false, false, false )
	})
})

