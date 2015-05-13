function doc_load(){
	// Display loading screen.
	$("#loading").show()
}

$(window).load(function(){
	$("#loading").fadeOut(250)
})