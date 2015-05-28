$("body").addClass("JS")

$(".handle").unbind("click").bind("click", function(){
	$("nav > ul").toggleClass("showing");
	$("nav > .handle").toggleClass("active");
})

$("header li.has-drop").on("mouseenter", function(){
	$(this).children().filter("ul").find("#ul-wrap").stop().slideDown(250);
}).on("mouseleave", function(){
	$(this).children().filter("ul").find("#ul-wrap").stop().slideUp(250)
})

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

$("#notification").unbind("click").bind("click", function(){
	console.log("HIT")
	if($("#notification div").attr("data-notify-couple")) {
		$($("#notification div").attr("data-notify-couple")).slideUp(500)
		console.log($("#notification div").attr("data-notify-couple"))
	}
})