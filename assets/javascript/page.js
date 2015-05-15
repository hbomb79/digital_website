$(".handle").unbind("click").bind("click", function(){
	$("nav ul").toggleClass("showing");
	$(".handle").toggleClass("active");
})

function notify(message, color, tc){
	$("#notification").html("<div onclick='hideNotify()' style='text-align:center; cursor:pointer; background: "+color+"; width:100%; color: "+tc+";'>"+message+"  -  Click To Dismiss</div>");
	if (!$("#notification").is(":visible")) { $("#notification").slideDown(500) };
};

function hideNotify(){
	if ($("#notification").is(":visible"))  {
		$("#notification").slideUp(500); 
	};
}
