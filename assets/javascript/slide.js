// This function will target a particular target, using no delegation ( because it needs to be recalled each time ).
// When the plugin is initialized the plugin will


(function( $, window, document, undefined ){

	_G.variable.last_slide_id = 0;
	_G.variable.slide_done = _G.variable.slide_done ? true : false;

	$.fn.hexSlide = function( options ){

		options = $.extend(true, {}, {
			interval: 3000,
			speed: 500,
			pauseOnHover: true,
			navigation: true,
			alwaysShowNav: false,
			stopAutoOnNav: false,
			additionalClass: {
				slide: false,
				container: false
			},
			additionalCSS: {
				slide: false,
				container: false
			},
			callback: {
				start: function(){}
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
				class: "hexslide"
			});

			if ( options.additionalClass.container ) {
				dummy.addClass( options.additionalClass.container )
			}

			if ( options.additionalCSS.container ) {
				dummy.css( options.additionalCSS.container )
			}

			if ( options.navigation ) {
				createGUI();
			}

			if ( options.pauseOnHover ) {
				// Add a class to be used by event listeners. This indicates the slideshow should be paused when a user hovers on it.
				dummy.addClass("hexslide-hover")
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
			start( item )
		}

		function start( i ) {
			console.warn("started "+i)
			var $slideshow;
			$slideshow = $("#hexslide-" + i + "-container");
			$slideshow.children(".slide:gt(0)").hide();

			if (timers[i]) {
				// Timer already set, clear it just incase it is still running.
				clearInterval( timer[i] );
			}
			timers[i] = setInterval(function(){
				// First, fade out the first item, then fade in the second, last append (move) the first (faded out) 
				// element to the end of the chain
				$("#hexslide-"+i+"-container .slide:first").fadeOut( options.speed )
					.next( ".slide" ).fadeIn( options.speed )
					.end().appendTo("#hexslide-"+i+"-container");
			}, options.interval)
		}

		function stop( i ) {
			clearTimeout(timers[i]);
			console.warn("stopped "+i)
		}

		function createGUI( i ) {
			var nextBtn, prevBtn, nextTxt, prevTxt;
			nextBtn = $("<div></div>", {
				class: "slide-btn right",
				"data-slide-direction": "forward"
			})
			prevBtn = $("<div></div>", {
				class: "slide-btn left",
				"data-slide-direction":"backward"
			})
			nextTxt = $("<span></span>", {
				text:"NEXT"
			})
			prevTxt = $("<span></span>", {
				text:"BACK"
			})
			if ( options.additionalCSS.nextBtn ) {
				nextBtn.addClass( options.additionalCSS.nextBtn );
			}
			if ( options.additionalCSS.nextTxt ) {
				nextBtn.addClass( options.additionalCSS.nextTxt );
			}
			if ( options.additionalCSS.prevBtn ) {
				nextBtn.addClass( options.additionalCSS.prevBtn );
			}
			if ( options.additionalCSS.prevTxt ) {
				nextBtn.addClass( options.additionalCSS.prevTxt );
			}
			if ( !options.alwaysShowNav ) {
				nextBtn.addClass("hide");
				prevBtn.addClass("hide");
			}
			nextTxt.appendTo(nextBtn);
			prevTxt.appendTo(prevBtn);
			nextBtn.appendTo(dummy);
			prevBtn.appendTo(dummy);
		}

		function nextSlide() {
			// Clear the corresponding interval to stop the slideshow
            clearInterval(timers[($(this).parent(".hexslide").attr('id').split('-')[1])]);

            // Fade out the current image and append it to the parent, making it last
            // Fade in the next one

            $(this).parent(".hexslide").find('.slide:first').stop().fadeOut( options.speed )
                .next('.slide').stop().fadeIn( options.speed )
                .end().appendTo($(this).parent(".hexslide"));

            if ( options.stopAutoOnNav ) {
            	$(this).parent(".hexslide").removeClass("hexslide-hover");
            	stop( $(this).parent(".hexslide").attr('id').split("-")[1] );
            }
		}

		function prevSlide() {
			// Clear the corresponding interval to stop the slideshow
            clearInterval(timers[($(this).parent(".hexslide").attr('id').split('-')[1])]);

            // Fade out the current image and append it to the parent, making it last
            // Fade in the next one

          	 $(this).parent(".hexslide").find('.slide:last').fadeIn( options.speed )
                    .insertBefore($(this).parent(".hexslide").find('.slide:first').fadeOut( options.speed ));


            if ( options.stopAutoOnNav ) {
	            $(this).parent(".hexslide").removeClass("hexslide-hover");
	            stop( $(this).parent(".hexslide").attr('id').split("-")[1] );
	        }
		}


		$(window).on("ajax_start", function() {
			for ( var i = 0; i < timers.length; i++ ) {
				clearTimeout(timers[i]);
			}
		})
		if ( !_G.variable.slide_done ) {
			_G.variable.slide_done = true;
			if ( options.pauseOnHover ) {
				// Stop the slideshow when hovering. This only needs to be run once per session because it uses delegation
				$("body").on("mouseenter", ".hexslide.hexslide-hover", function(){
					// Stop slideshow
					stop( $(this).attr('id').split('-')[1] )
					// Show navigation
					if ( !options.alwaysShowNav ) {
						$(this).find(".slide-btn").removeClass("hide")
					}
				}).on("mouseleave", ".hexslide.hexslide-hover", function(){
					// Restart slideshow
					start( $(this).attr('id').split('-')[1] )
					if ( !options.alwaysShowNav ) {
						$(this).find(".slide-btn").addClass("hide")
					}
				});
			}
			$("body").on("click", ".slide-btn", function( e ){
				var dir;
				dir = $(this).data("slide-direction")
				if ( dir == "forward" ) {
					nextSlide.call( this )
				} else if ( dir == "backward" ) {
					prevSlide.call( this )
				}
			})

		}

		if ( typeof options.callback.start == "function" ) {
			options.callback.start();
		}

	}

})( jQuery, window, document )