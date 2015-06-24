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
			indicators: true,
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

			if ( options.pauseOnHover ) {
				// Add a class to be used by event listeners. This indicates the slideshow should be paused when a user hovers on it.
				dummy.addClass("hexslide-hover")
			}
			slideshowImgs[item] = $container.data("slideshow-src").split("|");
			if ( options.navigation ) {
				// Compile list of static steps.
				var temp_slides = [];
				temp_slides[0] = $container.attr('src');
				var temp_imgs = [];
				temp_imgs = $container.data("slideshow-src").split("|");
				for ( var i = 0; i < temp_imgs.length; i++ ) {
					temp_slides.push( temp_imgs[i] );
				}
				createGUI( temp_slides );
			}

			img = $("<div></div>", {
				class: "slide",
				css: {
					"background-image": "url("+ $container.attr('src') +")"
				},
				"data-hexslide-id": 0
			}).appendTo( dummy )

			if ( options.additionalClass.slide ) {
				img.addClass( options.additionalClass.slide )
			}

			if ( options.additionalCSS.slide ) {
				img.css( options.additionalCSS.slide )
			}
			var i = 1;
			for ( var index = 0; index < slideshowImgs[item].length; index++ ) {
				img = $("<div></div>", {
					class: "slide",
					css: {
						"background-image": "url(" + slideshowImgs[item][index] + ")"
					},
					"data-hexslide-id": i
				}).appendTo( dummy )
				if ( options.additionalClass.slide ) {
					img.addClass( options.additionalClass.slide )
				}
				if ( options.additionalCSS.slide ) {
					img.css( options.additionalCSS.slide )
				}
				i++;
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
				// Emulate a click on the next button
				nextSlide.call( $slideshow.find(".slide"), true )
			}, options.interval)
		}

		function stop( i ) {
			clearTimeout(timers[i]);
			console.warn("stopped "+i)
		}

		function createGUI( id ) {
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

			if ( options.indicators ) {
				// Now create the slide indicators.
				var indCont, inds, slides;
				indCont = $("<div></div>", {
					class: "indicator-container"
				})
				slides = id;
				for ( var i = 0; i < slides.length; i++ ) {
					var ind = $("<span></span>", {
						class: "indicator",
						"data-hexslide-id": i
					}).appendTo( indCont )

					if ( i == 0 ) {
						ind.addClass("active")
					}
				}
				if ( !options.alwaysShowNav ) {
					indCont.addClass("hide");
				}
				indCont.appendTo( dummy );
			}
		}

		function nextSlide( auto ) {
			// Clear the corresponding interval to stop the slideshow
			if (!auto) { clearInterval(timers[($(this).parent(".hexslide").attr('id').split('-')[1])]) }

			// Fade out the current image, fade in the next ID.
			var $currentSlide = $(this).parent(".hexslide").find(".slide:first");
			var currentID = $currentSlide.data("hexslide-id");
			currentID++;
			// If current ID is greater than the amount of slides, then set to 0
			if ( currentID > $(this).parent(".hexslide").find(".slide").length-1 ) {
				currentID = 0;
			}

			$currentSlide.stop().fadeOut( options.speed );
			$(this).parent(".hexslide").find(".slide").filter(function(){
				return $(this).data("hexslide-id") == currentID;
			}).fadeIn( options.speed ).insertBefore( $currentSlide );

			/*$(this).parent(".hexslide").find('.slide:first').stop().fadeOut( options.speed )
			    .next('.slide').stop().fadeIn( options.speed )
			    .end().appendTo($(this).parent(".hexslide"));
			*/

			if ( options.stopAutoOnNav ) {
				$(this).parent(".hexslide").removeClass("hexslide-hover");
				stop( $(this).parent(".hexslide").attr('id').split("-")[1] );
			}
			var newID = $(this).parent(".hexslide").find('.slide:first').data("hexslide-id");
				updateInd( newID, this )
		}

		function updateInd( newID, sibling ) {
			test_2 = sibling;
			$(sibling).siblings(".indicator-container").find(".indicator.active").removeClass("active");
			$(sibling).siblings(".indicator-container").find(".indicator").filter(function(){
				return $(this).data("hexslide-id") == newID;
			}).addClass("active")
		}

		function indClick() {
			// Find the slide with the correct ID, fade in and move to top of queue
			var $currentSlide, currentID, ind;
			ind = $(this).data("hexslide-id")
			$currentSlide = $(this).parents(".hexslide").find(".slide:first");
			console.log( $currentSlide )
			currentID = $currentSlide.data("hexslide-id");
			$currentSlide.fadeOut( options.speed )
			$(this).parents(".hexslide").find(".slide").filter(function(){
				return $(this).data("hexslide-id") == ind;
			}).fadeIn( options.speed ).insertBefore( $currentSlide );
			updateInd( ind, $currentSlide );
		}

		function prevSlide( auto ) {
			// Clear the corresponding interval to stop the slideshow
			if (!auto) { clearInterval(timers[($(this).parent(".hexslide").attr('id').split('-')[1])]) }

			var $currentSlide = $(this).parent(".hexslide").find(".slide:first");
			var currentID = $currentSlide.data("hexslide-id");
			currentID--;

			// If currentID is less that 0, set to highest slide ( last ).
			if ( currentID < 0 ) {
				currentID = $(this).parent(".hexslide").find(".slide").length;
				currentID -= 1;
			}

			$currentSlide.stop().fadeOut( options.speed );

			$(this).parent(".hexslide").find(".slide").filter(function(){
				return $(this).data("hexslide-id") == currentID;
			}).fadeIn( options.speed ).insertBefore( $currentSlide )

			/*$(this).parent(".hexslide").find('.slide:last').fadeIn( options.speed )
				.insertBefore($(this).parent(".hexslide").find('.slide:first').fadeOut( options.speed ));*/


			if ( options.stopAutoOnNav ) {
				$(this).parent(".hexslide").removeClass("hexslide-hover");
				stop( $(this).parent(".hexslide").attr('id').split("-")[1] );
			}
			var newID = $(this).parent(".hexslide").find('.slide:first').data("hexslide-id");
			updateInd( newID, this )
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
						if ( options.indicators ) {
							$(this).find(".indicator-container").removeClass("hide")
						}
					}
				}).on("mouseleave", ".hexslide.hexslide-hover", function(){
					// Restart slideshow
					start( $(this).attr('id').split('-')[1] )
					if ( !options.alwaysShowNav ) {
						$(this).find(".slide-btn").addClass("hide")
						if ( options.indicators ) {
							$(this).find(".indicator-container").addClass("hide")
						}
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
			if ( options.indicators ) {
				$("body").on("click", ".indicator", function( e ){
					indClick.call( this )
				})
			}

		}

		if ( typeof options.callback.start == "function" ) {
			options.callback.start();
		}

	}

})( jQuery, window, document )