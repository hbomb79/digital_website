var HASH;
( function( $ ) {
	HASH = {
		check: function( tocheck, callback ) {
			console.log("Checking for " + tocheck)
			if ( document.location.hash == tocheck ) {
				if ( typeof callback == "function" ) {
					callback()
				}
				console.log("true")
				return true;
			}
			console.log("false")
			return false;
		}
	}
})(jQuery)
var hash = Object.create( HASH )