var HASH;
( function( $ ) {
	// Begin object literal, create this when usage required
	HASH = {
		// Check function returns true or false if the hash is present.
		check: function( tocheck, callback ) {
			console.log("Checking for " + tocheck)
			// If the hash of the document is the same as the criteria
			if ( document.location.hash == tocheck ) {
				// Run use callback if it is a function
				if ( typeof callback == "function" ) {
					callback()
				}
				console.log("true")
				// Return true
				return true;
			}
			console.log("false")
			// return false
			return false;
		}
	}
})(jQuery)
var hash = Object.create( HASH )