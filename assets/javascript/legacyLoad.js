/* WARNING: ALPHA DO NOT MARK
 * This file is still in development and does not represent the final product and thus should not be marked
 *
 * LegacyLoad jQuery Plugin
 * Version 0.10.0000.0a1
 *
 * Not released
 *
 * Copyright 2015 Harry Felton, HexCode and all other contributors.
 * 
 */

function getFileName( obj ) {
	//this gets the full url
	// If running on XAMPP this works, although a local machine will not as index.php is not always in the URL bar, to address this, a null pathname or a pathname of /digital_website/ (For local machines using XAMPP) will return index.php
	var url = obj ? obj : document.location.href;
	//this removes the anchor at the end, if there is one
	url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
	//this removes the query after the file name, if there is one
	url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
	//this removes everything before the last slash in the path
	url = url.substring(url.lastIndexOf("/") + 1, url.length);
	//return
	if (url == "/digital_website/" || url == "" || !url) {
		return "index.php";
		// If the file name is blank, meaning you are in the root directory (Not valid if in another directory that is NOT root, for eg /assets/ would still return index.php)
		// The reason is because this code gets the last part out of the href, if there is no file name, the next section is the directory, in this case digital_website.
		// A possible fix would be to check if the file name has a dot in it, indicating somesort of file extension as filenames on this server cant and sholdn't contain more than one dot.
	} else {
		return url;
	}
}

function getHashName( obj ) {
	// This returns the hash of a url.
	var hash = obj ? obj : document.location.href;
	// Check if the URL has a hash, if so then substring it, else return false
	hash = (hash.lastIndexOf("#") != -1) ? hash.substring( ( hash.lastIndexOf("#") ), hash.length) : false
	// If index of the last # is not -1 (not found) then set hash to a substring starting at the index of the hash, to the end of the URL. If the # index, is -1 then set hash to false.
	return hash;
}

var _G = _G ? _G : {};
(function( $, window, document, undefined ){
	if ( !_G.legacyload ) {
		_G.legacyload = {}
	}
	var local = _G.legacyload;
	local["ready"] = local["ready"] ? true : false;
	local["lastSession"] = local["lastSession"] ? local["lastSession"] : 0;
	$.fn.legacyLoad = function( opts ) {
		if ( false && ($(this).data("legacy-sid") == 0 || $(this).data("legacy-sid")) ) {
			// Already setup on this target
			console.warn("You have already setup a legacyLoad instance on this target | Aborted");
			return this;
		}
		var __sid__ = local.lastSession;
		local.lastSession++;
		$(this).attr("data-legacy-sid", __sid__)
		$.fn.legacyLoad.config[__sid__] = $.extend({}, true, $.fn.legacyLoad.defaults, opts)
		var config = $.fn.legacyLoad.config[__sid__];
		if ( !local.ready ) {
			local.ready = true;
			// First time init, setup event handler
			createEvents();
		}

		var legacy = {
			start: function( toUrl ) {
				// Redefine config to catch any new changes.
				config = $.fn.legacyLoad.config[__sid__];
				var self = this;
				// Get new page
				if ( typeof config.callback.start == "function" ) {
					config.callback.start( toUrl )
				}
				$.ajax({
					url: toUrl,
					timeout: config.ajax.timeout,
					xhr: function () {
				        var xhr = new window.XMLHttpRequest();
				        xhr.addEventListener("progress", function (evt) {
				        	if ( typeof config.callback.xhr == "function" ) {
				        		config.callback.xhr( evt )
				        	}
				        }, false);
				        return xhr;
				    }
				}).done(function(html){
					self.prepare( html )
					if ( typeof config.callback.response == "function" ) {
						config.callback.response( html )
					}
				}).error(function( x, t, m ){
					if ( typeof config.callback.error == "function" ) {
						config.callback.error( x, t, m )
					}
					self.error( x, t, m )
				})
			}, 
			prepare: function( response ) {
				// Edit new page
				// Find any config.targets and process them using presets.
				var buffer = [],
					$new,
					newContent,
					$response = $(response);

				// Depending on the animation type, we need to prepare this element, first we need to make a copy of the loadInto element because that is where
				// the content is going, also the current loadInto will be removed.
				$new = $(config.loadInto).clone();
				if ($new.length <= 0 ) {
					console.error("Cannot find loadInto element ("+config.loadInto+") on current page | Aborted");
					return;
				}
				// We have the new element, now we must replace its contents.
				if ( $response.filter(config.loadInto).length > 0 ) {
					newContent = $response.filter(config.loadInto).html();
					$new.html( newContent );
				} else if ( $response.find(config.loadInto).length > 0 ) {
					$new.html( $response.find(config.loadInto) )
				} else {
					console.error("Cannot find loadInto element ("+config.loadInto+") on page | Aborted")
					return;
				}
				// We have now got the new element stored in $new. We must now find out which animation the developer selected for the elements and toggle them away
				// without animating, they must be moved using CSS immediately and then revealed using function toggle.
				
				buffer = config.loadType == "element" ? $new.find(config.target) : $new;
				// Iterate over the buffer, setting the position as defined in $.fn.legacyLoad.
				// In order to get accurate results, the new page needs to be appended to the page, but hidden using visibility:hidden. Then set to visible and execute animations
				$(config.loadInto).addClass("legacyLoad-old")
				$new.hide().insertAfter(config.loadInto).addClass("legacyLoad-new");
				$(config.loadInto+".legacyLoad-new").attr("style", "");
				for ( var i = 0; i < buffer.length; i++ ) {
					// get the preset, call them in presetDefault and set the CSS of the element to that of the function return.
					var preset;
					if ( $(buffer[i]).data("legacy-arrive") ) {
						preset = $(buffer[i]).data("legacy-arrive")
					} else {
						preset = $(buffer[i]).data("legacy-animation")
					}
					if ( !preset ) {
						preset = config.defaultTransition;
					}
					console.log( preset )
					$(buffer[i]).css( $.fn.legacyLoad.presetDefault[ preset ].call( buffer[i]) ).hide()
					console.log( $(config.loadInto+".legacyLoad-new").attr("style") )
				}
				// The element is now ready to go, we need to animate it.
				console.log( buffer )
				toggle.call( this, "from", ( config.loadType == "element" ) ? $(config.loadInto+".legacyLoad-old").find(config.target) : $(config.loadInto+".legacyLoad-old") ).done(function(){
					//$(config.loadInto+".legacyLoad-old").remove();
					if ( config.loadType == "element" ) {
						$new.show();
						toggle.call( this, "to", buffer )
					} else {
						console.log( $(config.loadInto+".legacyLoad-new") )
						toggle.call( this, "to", $(config.loadInto+".legacyLoad-new") )
					}
				})
				
			},
			check: function() {
				// Check page structure
			},
			finish: function() {
				// Done, fire events
			},
			error: function( x, t, m ) {
				console.error( x, t, m )
			}
		}

		function toggle( dir, parent ) {
			dir = dir ? dir : "both";
			var buffer = parent;
			var comp = 0,
				c = $.Deferred(),
				done = false;

			for ( var i = 0; i < buffer.length; i++ ) {
				// Check the elements animation type
				var animtype, preset;
				if ( dir == "to" ) {
					animtype = $(buffer[i]).data("legacy-arrive")
				} else if ( dir == "from" ) {
					animtype = $(buffer[i]).data("legacy-depart")
				} else {
					animtype = $(buffer[i]).data("legacy-animation")
				}
				if ( !animtype ) {
					animtype = config.defaultTransition;
				}
				if ( animtype.indexOf(":") > -1 ) {
					// Colon found
					preset = $.fn.legacyLoad.presets[animtype]
				} else if ( typeof animtype == "function" ) {
					preset = animtype
				}
				if (!config.pageAnim.async) {
					preset.call( buffer[i], config, dir).done(function(){
						// Function done.
						comp++
						// When comp is correct length then alert
						if ( comp == buffer.length ) {
							// All animations are complete, transfer to next page.
							c.resolve();
						}
					})
				} else if ( config.pageAnim.async ) {
					if ( !done ) {
						done = true;
						c.resolve();
					}
					console.log( buffer[i] )
					preset.call( buffer[i], config, dir )
				}
			}
			return c;

		}

		function createEvents() {
			console.warn("done")
			$("body").on("click", config.trigger, function( e ){
				legacy.start( getFileName( $(this).attr("href") ) );
				e.preventDefault();
				return false;
			})
		}
		//toggle.call(this, "both")
		//legacy.start("gtav.php")
		return this;
	}

	$.fn.legacyLoad.defaults = {
		trigger: "a.legacy",
		target: "div.target",
		loadInto: "#wrapper", // Where AJAX loaded content will be output and whole page transitions will be based.
		speed: 500,
		cssBased: false, // Set true to use CSS classes, requires LegacyLoad.css. These are better than CSS animations. (Beta)
		/* For each layer use a buffer to accumulate a list of matching elements, keep searching these elements for 
	     * matching targets until the layer == loopI
	     */
		defaultTransition: "preset:fade",
		pageAnim: {
			//
			async: false, // If true, do not wait for animations
			animateArrival: true,
			animateDepart: true
		},
		loadType: "element", // Set to "wholepage" to animate the whole page (target). Therefore target should be set to the parent container.
		ajax: {
			timeout: 10000,
		},
		callback: {
			xhr: function( e ){},
			start: function( url ){},
			error: function( x, t, m ){},
			response: function( response ){},
		}
	}

	$.fn.legacyLoad.config = {}

	$.fn.legacyLoad.presetDefault = {
		"preset:slideLeft": function(){
			return {
				"left": $(this).outerWidth()*-1,
				"opacity":0,
				"position":"relative"
			}
		},
		"preset:slideRight": function(){
			return {
				"right": $(this).outerWidth()*-1,
				"opacity":0,
				"position":"relative"
			}
		},
		"preset:fade": function() {
			return {
				"opacity":0
			}
		}
	}

	$.fn.legacyLoad.presets = {
		// Each of these function should return a jQuery deferred.
		"preset:slideLeft" : function( config, direction ){
			console.log("called")
			var d = $.Deferred();
				// If already visible, then slide out, otherwise set left to 0 and position back to initial
				// If CSS based animations are enabled, then set the transition.
				if ( config.cssBased ) {
					// The following block of code is for users that have cssBased transitions enabled. These transitions can result in
					// smoothers animations on laggy machines and offer less Javascript intense animations for developers that would rather
					// use CSS where possible.
					$(this).css({"transition":"left "+config.speed+"ms ease-in-out, opacity "+config.speed+"ms ease-in-out"})
					if ( $(this).is(":visible") && direction != "to" ) {
						$(this).css({ "position": "relative", "left":$(this).outerWidth()*-1, "opacity":0}).delay(config.speed).promise().done(function(){
							$(this).css({"display":"none"});
							d.resolve();
						});
					} else if( !$(this).is(":visible") && direction != "from" ) {
						$(this).show().css({"opacity":1, "left":0, "position":"relative"}).delay(config.speed).promise().done(function(){
							d.resolve();
						})
					}
				} else {
					if ( $(this).is(":visible") && direction != "to" ) {
						$(this).css("position", "relative").stop().animate({"left":$(this).outerWidth()*-1, "opacity":0}, config.speed, function(){
							$(this).css({"display":"none", "position":""});
							d.resolve();
						})
					} else if( !$(this).is(":visible") && direction != "from" ) {
						console.log("hit")
						$(this).css({"position":"relative", "display":"", "opacity":0}).stop().animate({"left":0, "opacity":1}, config.speed, function(){
							$(this).css({"position":""});
							d.resolve();
						})
					}
				}
			return d;
		},
		"preset:slideRight" : function( config, direction ) {
			var d = $.Deferred();
				// If already visible, then slide out, otherwise set left to 0 and position back to initial
				// If CSS based animations are enabled, then set the transition.
				if ( config.cssBased ) {
					// The following block of code is for users that have cssBased transitions enabled. These transitions can result in
					// smoothers animations on laggy machines and offer less Javascript intense animations for developers that would rather
					// use CSS where possible.
					$(this).css({"transition":"right "+config.speed+"ms ease-in-out, opacity "+config.speed+"ms ease-in-out"})
					if ( $(this).is(":visible") && direction != "to" ) {
						$(this).css({ "position": "relative", "right":$(this).outerWidth()*-1, "opacity":0}).delay(config.speed).promise().done(function(){
							$(this).css({"display":"none"});
							d.resolve();
						});
					} else if( !$(this).is(":visible") && direction != "from" ) {
						$(this).show().css({"opacity":1, "right":0, "position":"relative"}).delay(config.speed).promise().done(function(){
							d.resolve();
						})
					}
				} else {
					if ( $(this).is(":visible") && direction != "to" ) {
						$(this).css("position", "relative").stop().animate({"right":$(this).outerWidth()*-1, "opacity":0}, config.speed, function(){
							$(this).css({"display":"none", "position":""});
							d.resolve();
						})
					} else if( !$(this).is(":visible") && direction != "from" ) {
						console.log("hit")
						$(this).css({"position":"relative", "display":"", "opacity":0}).stop().animate({"right":0, "opacity":1}, config.speed, function(){
							$(this).css({"position":""});
							d.resolve();
						})
					}
				}
			return d;
		},
		"preset:slideTop": function() {
			var d = $.Deferred()
				d.resolve()
			return d;
		},
		"preset:slideBottom": function(){
			var d = $.Deferred()
				d.resolve()
			return d;
		},
		"preset:collapse" : function( config, direction ) {
			// Config = the current session IDs config
			var d = $.Deferred()
				$(this).animate({"height":0, "width":0}, config.speed, function(){
					$(this).hide()
					d.resolve();
				})
			return d;
		},
		"preset:fade": function( config, direction ) {
			var d = $.Deferred()
				if ( config.cssBased ) {
					// The following block of code is for users that have cssBased transitions enabled. These transitions can result in
					// smoothers animations on laggy machines and offer less Javascript intense animations for developers that would rather
					// use CSS where possible.
					$(this).css({"transition":"opacity "+config.speed+"ms ease-in-out"})
					if ( $(this).is(":visible") && direction != "to" ) {
						$(this).css("opacity",0).delay(config.speed).promise().done(function(){
							$(this).hide()
							d.resolve();
						});
					} else if( !$(this).is(":visible") && direction != "from" ) {
						$(this).show();
						var elem = this;
						setTimeout(function(){
							$(elem).css({"opacity":1}).delay(config.speed).promise().done(function(){
								d.resolve();
							})
						})
						// Timeout is used above because jQuery has a weird issue where if .show is called, there has to be a short delay before changing the opacity
						// otherwise the CSS transition does nothing and the element is immediately visible	
					}
				} else {
					if ( $(this).is(":visible") && direction != "to" ) {
						$(this).stop().animate({"opacity":0}, config.speed, function(){
							$(this).hide()
							d.resolve();
						})
					} else if( !$(this).is(":visible") && direction != "from" ) {
						console.log("showing")
						$(this).show().stop().animate({"opacity":1}, config.speed, function(){
							d.resolve();
						})
					}
				}
			return d;
		}
	}

})( jQuery, window, document )