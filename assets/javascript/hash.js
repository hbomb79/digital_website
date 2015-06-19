var HASH;
( function( $ ) {
	HASH = {
		check: function( tocheck, callback ) {
			if ( document.location.hash == tocheck ) {
				if ( typeof callback == "function" ) {
					callback()
				}
				return true;
			}
			return false;
		}
	}
})(jQuery)
var hash = Object.create( HASH )