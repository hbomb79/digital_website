$(".handle").unbind("click").bind("click", function(){
	$("nav ul").toggleClass("showing");
	$(".handle").toggleClass("active");
})