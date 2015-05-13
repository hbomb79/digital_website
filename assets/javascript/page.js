function doc_load(){
	// Display loading screen.
	$("#loading").show()
}

$(document).ready(function(){
	setTimeout(function() { $("#loading").fadeOut(250) }, 2000)
})