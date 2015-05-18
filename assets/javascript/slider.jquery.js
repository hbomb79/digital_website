// This JavaScript file is my first attempt at a JavaScript plugin, therefore bugs will be present and optimizations few and far between.
// 
// Simply call .slider() on the element you want styled, JavaScript will then prepare the DOM element and populate it with styled elements.
// 
// The call will chain, so extra jQuery methods can be attached afterwards
// 
// Copyright (C) Harry Felton, 2015, HexCode
// Released under MIT License
// 
// Unless expressly given via recorded speech or text this product is provided AS IS WITH NO RETURNS, 
// REFUND POLICY OR WARRANTY
// 

(function ( $ ) {
 
    $.fn.greenify = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            color: "limegreen",
            backgroundColor: "white"
        }, options );

        // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });
 
    };

    $.fn.highlightLink = function( options ) {
    	var config = $.extend({
    		decoration: "underline",
    		color: "crimson",
    		background: "transparent"
    	}, options)

    	return this.filter("a").each(function(){
    		$(this).css({
    			color: config.color,
    			backgroundColor: config.background,
    			textDecoration: config.decoration
    		})
    	})
    }

    $.fn.hex_slide = function(){

    };

    $.fn.changebg = function( options ) {
    	// Change the background color of an element, the background will be randomly RGB generated
    	if ($._data( this[0], "events" )) {
    		console.log("Already assigned, trigger the destory event on the element to remove it: $('name').trigger('destroy') ")
    		return this;
    	}
    	var self = this;
    	var config = $.fn.changebg.defaults;
    	var changeSlider;
    	config = $.extend(true, {}, config, options); //Merge user options with defaults
    	
    	function events() {
    		self.on("mouseenter", function() { timerm(true, false) } )
    		self.on("mouseleave", function() { timerm(false, false) } )
    		self.on("destroy", function() { destroy() } )
    	}

    	function destroy() {
    		// Destroy this version.
    		clearInterval(changeSlider)
    		self.off("mouseenter").off("mouseleave").off("destroy")
    		console.log("Destroyed " + self.selector + " listeners")
    		return self;
    	}

    	function timerm ( ps, event ) {
    		if (ps) {
    			// Stop
    			clearTimeout(changeSlider)
    		} else {
    			// Start
    			var timeout;
    			if (!event) {
    				// Wait for resume time, then restart interval
    				timeout = config.startDelay;
    			} else {
    				timeout = 0;
    			}
    			setTimeout(function(){
	    			changeSlider = setInterval(function() {
	    				change_bg()
	    			}, config.interval)
	    		}, timeout)
    		}
    	}

    	function change_bg() {
    		// Generate new numbers and change background
    		var rgb = [];
    		for (var i = 0; i < 3; i++) {
    			rgb.push(getRandomInt(0, 255))
    		};
    		rgb = rgb.join(",")
    		self.animate({
    			"backgroundColor": "rgb(" + rgb + ")"
    		}, config.speed)
    		console.log(config.speed)
    	};
    	if (config.pauseOnHover) { events() }
    	timerm( false, true )
    	return this;
    }

    $.fn.changebg.defaults = {
    	interval: 500,
    	speed: 250,
    	startDelay: 1000,
    	pauseOnHover: true,
    	crossfade: true // False to wait until first element faded out before fading in next.
    }
 
}( jQuery ));