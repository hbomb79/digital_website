// This function will target a particular target, using no delegation ( because it needs to be recalled each time ).
// When the plugin is initialized the plugin will


(function( $, window, document, undefined ){

	_G.variable.last_slide_id = 0;

	$.fn.hexSlide = function( options ){

		options = $.extend(true, {}, {
			interval: 3000,
			pauseOnHover: true,
			navigation: true,
			alwaysShowNav: false,
			additionalClass: {
				slide: false,
				container: false
			},
			additionalCSS: {
				slide: false,
				container: false
			}
		}, options)

		var timers = [],
		slideshowImgs = [],
		img,
		dummy,
		container,
		$container,
		listArray = this.filter(function(){
			return $(this).data("slideshow-src")
		}),
		lastID,
		width,
		height;

		lastID = _G.variable.last_slide_id ? _G.variable.last_slide_id : 0;

		for ( var i = 0; i < listArray.length; i++ ) {

			container = listArray[i];
			$container = $(container);

			var item = i+lastID;

			width = $container.outerWidth();
			height = $container.outerHeight();

			dummy = $("<div></div>", {
				id: "hexslide-" + item + "-container",
				class: "slideshow"
			});

			if ( options.additionalClass.container ) {
				dummy.addClass( options.additionalClass.container )
			}

			if ( options.additionalCSS.container ) {
				dummy.css( options.additionalCSS.container )
			}

			dummy.height( height );
			dummy.width( width );

			if ( options.navigation ) {
				//createGUI();
			}

			img = $("<div></div>", {
				class: "slide",
				css: {
					"background-image": "url("+ $container.attr('src') +")"
				}
			}).appendTo( dummy )

			if ( options.additionalClass.slide ) {
				img.addClass( options.additionalClass.slide )
			}

			if ( options.additionalCSS.slide ) {
				img.css( options.additionalCSS.slide )
			}

			slideshowImgs[item] = $container.data("slideshow-src").split("|");

			for ( var index = 0; index < slideshowImgs[item].length; index++ ) {
				img = $("<div></div>", {
					class: "slide",
					css: {
						"background-image": "url(" + slideshowImgs[item][index] + ")"
					}
				}).appendTo( dummy )
				if ( options.additionalClass.slide ) {
					img.addClass( options.additionalClass.slide )
				}
				if ( options.additionalCSS.slide ) {
					img.css( options.additionalCSS.slide )
				}
			}

			$container.replaceWith( dummy );
			// Container done, now adjust stuff!
			lastID++;
			_G.variable.last_slide_id = lastID;
		}


	}

})( jQuery, window, document )