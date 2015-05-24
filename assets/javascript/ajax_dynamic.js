// Dynamic Ajax Page Load
// Copyright 2015 HexCode (Harry Felton)
// Use Under MIT License And Written Consent From HexCode
// 
// Unauthorized usage will result in copyright court action
var timer = false;
var pop_wait = false;
_G = {};
_G.variable = {};
_G.timer = {};
_G.timer.inx = [];
_G.interval = {};
_G.interval.inx = [];
_G.preserve = {}

var cgv=cg_variable;
var cgt=cg_timer;
var cgi=cg_interval;
var cgc=cg_clear;
var cge_t=cg_erase_timer;
var cge_i=cg_erase_interval;

function is_elem_visible(elem)
{
	// Returns true if any of the elem is visible, this included the bottom and top of the element. The limit specifies how far into the element the user must scroll before this function returns true
    var $elem = $(elem);
    if ($elem.length < 1) {
    	console.log("Cannot Find This Element")
    	return false;
    }
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();
    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();
    if (!$elem.is(":visible") || $elem.css("opacity") == 0){
    	return false;
    	console.log("Element is not visible to viewport, returning false")
    }
    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop) || (elemBottom <= docViewBottom) && (elemBottom >= docViewTop) || (elemTop <= docViewTop) && (elemBottom >= docViewBottom));
    // If the elements top and bottom are both off the screen, then we can assume the middle of the element is still visible, thus we accept this as a condition
}

function cg_erase_timer(k){
	clearTimeout(_G.timer[k]);
	delete _G.timer[k];
	for (var i = 0; i < _G.timer.inx.length; i++) {
		if (_G.timer.inx[i] == k) { _G.timer.inx.splice(i, 1) }
	}
	return true;
}

function cg_erase_interval(k){
	clearInterval(_G.interval[k]);
	delete _G.interval[k];
	for (var i = 0; i < _G.timer.inx.length; i++) {
		if (_G.timer.inx[i] == k) { _G.timer.inx.splice(i, 1) }
	}
	return true;
}

function cg_variable(name, fn) {
	_G.variable[name] = fn;
}

function cg_interval(name, fn){
	if (_G.interval[name]) {
		clearInterval(_G.interval[name]);
	}
	if ($.inArray(name, _G.interval.inx) == -1) {
		_G.interval.inx.push(name);
	}
	_G.interval[name] = fn;
};

function cg_timer(name, fn){
	if (_G.timer[name]) {
		clearTimeout(_G.timer[name]);
	}
	if ($.inArray(name, _G.timer.inx) == -1) {
		_G.timer.inx.push(name);
	}
	_G.timer[name] = fn;
}

function cg_clear(){
	// Clear Intervals
	for (var i = 0; i < _G.interval.inx.length; i++) {
		clearInterval(_G.interval[_G.interval.inx[i]])
	}
	_G.interval = {};
	_G.interval.inx = [];
	// Clear Timers
	for (var i = 0; i < _G.timer.inx.length; i++) {
		clearTimeout(_G.timer[_G.timer.inx[i]])
	}
	_G.timer = {};
	_G.timer.inx = [];
	_G.variable = {}
	return true;
}

function force_load(){
	window.addEventListener("popstate", function(e) {
		if (get_cookie("animations_disable")) {
			return;
		}
		e.preventDefault()
		// Check if URL contains a HASH symbol. If it does then prevent popstate from firing.
		if (document.location.href.search("#") == -1) {
	    	clearTimeout(pop_wait)
	    	pop_wait = setTimeout(function(){
	            aj_page.start(false, location.pathname, false, false, true);
	        }, 50)
	    }
	});
}

$(window).load(function(){
	// Create event listener
	done_load()
	cg_erase_timer("temp_ready")
	cg_timer("temp_ready", setTimeout(function() {
        force_load()
    }, 500));
	// Prevent the popstate event being binded too early, without this Google Chomre and Safari (Certain Versions) would fire a popstate on page load.
});

function scroll_to(object, offset, add_time)
{
	var interval = 500;
    if ($(object).length == 0)  {
    	console.log("Object with this ID doesnt exist ("+object+")")
		return;
    }
    if (add_time){
    	interval = interval + add_time
    }
    if (offset) {
    	$('html, body').animate({
        	'scrollTop': $(object).offset().top - 10
    	}, interval);
    } else {
    	$('html, body').animate({
        	'scrollTop': $(object).offset().top + 1
    	}, interval);
    }
    return interval;
}

function scroll_top(add_time){
	var interval = 250;
	if (add_time) { interval = interval + add_time };
	$("html, body").animate({
		'scrollTop': "0"
	}, interval)
	return interval;
}

function check_hash (hash) {
	if (timer) { clearTimeout(timer) }
	timer = setTimeout(function(){
		if (hash) {
			$hash = $(hash)
			scroll_to(hash);
		}
	}, 50)
}

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

function done_load() {
	setTimeout(function(){
		$(".load-after:not(':visible')").each(function(){
			$(this).fadeIn(150)
		})
	}, 5000)
    $('a.ajax_load').unbind("click").bind('click', function(event) {
        if (event.button === 0) {
            var old, to, self;
            // Get href of click
            self = this;
            old = getFileName();
            to = $(this).attr("href");
            cg_erase_timer("temp_safe");
            cg_timer("temp_safe", setTimeout(function(){
				aj_page.start( old, to, true, self );
			}, 250));
			if ( !get_cookie("ajax_disable") ) {
				event.preventDefault()
			}
        }
    });
    $("a.anchor").on('click', function(e){
    	if (e.button === 0) {
    		check_hash($(this).attr("href"))
    		e.preventDefault()
    		return false;
    	}
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function create_cookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function get_cookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return false;
}


/*

The below code is V2.4 of the Ajax Loading system, it brings the following changes:

- less timeouts providing more fluid and dynamic experience
- less lag due to animations being activated in series as opposed to all at the same time
- much better source layout, reading, debugging and testing code is much easier
- object literal allows easy and quick plugin like implementation
- quicker more responsive loading progress bar
- removes bug of empty page (no new page slides on screen)
- greater error handling
- longer timeout
- dynamic header highlighting

To start, simply run aj_page.start( currenturl, newurl, was_button_clicked, what_button )

*/
aj_page = {
	start: function(from, to, click, elem, force) {
		if (_G.preserve.updating) {
			return false;
		}
		// First, check if the user has animations enabled, if they dont, then return
		if ( get_cookie( "ajax_disable" ) ) {
			return true;
		}
		// User has animations enabled, continue checks.
		// Check if new URL matches current.
		if ( getFileName() == getFileName( to ) && !force) {
			return false;
		}
		this.popstate = force ? true : false
		if ( click && elem ) {
			// Highlight the element using loading class
			$(elem).addClass( "loading" );
			this.elem = elem;
		} else {
			this.elem = false;
		}
		// Advance the progress bar by 10% to indicate loading has begun.
		$("#load-container").show()
		setTimeout(function(){
			$("#load-container").css({
				width: "10%"
			});
		}, 100)
		// Checks complete, fetch page
		this.to = to;
		this.from = from;
		_G.preserve.updating = true;
		aj_page.fetch( to );
	},

	fetch: function( to ) {
		var _xhr = $.ajax({
			url: to,
			timeout: 10000,
			xhr: function () {
		        var xhr = new window.XMLHttpRequest();
		        //Download progress
		        xhr.addEventListener("progress", function (evt) {
		            if (evt.lengthComputable) {
		                var percentComplete = evt.loaded / evt.total;
		                $("#load-container").css({"width":(Math.round(percentComplete * 100) - getRandomInt(10, 30) + "%")})
		            }
		        }, false);
		        return xhr;
		    }
		}).done(function( data ){
			// When ajax request completed, then run add_page()
			// Hide any load-after elements
			$(".load-after").hide()
			aj_page.add_page( data );
		}).fail(function( x, t, m ){
			aj_page.error( x, t, m );
		})
	},

	add_page: function( raw ) {
		content = $(raw).filter(".page-container")
		if ( !get_cookie("animations_disable") ) {
			// Append to body, and wait until done.
			// Filter page-container and store in current
			content = $(content).removeClass("current").addClass("new");
			content.insertAfter(".page-container.current");
			// wait until ready, then update dom and transition
			$("page-container.new").ready(function(){
				aj_page.prepare( raw ).done(function(){
					aj_page.transition_page() 
				})
			});
		} else {
			// No animate
			aj_page.prepare( raw ).done(function(){
				aj_page.transition_page( true, content ) 
			})
		}
	},

	prepare: function( raw ) {
		var d = $.Deferred();
		aj_page.update_dom( raw ).done( function() { 
			aj_page.scroll().done(function(){
				d.resolve()
			})
		})
		return d;
	},

	scroll: function(){
		var a = $.Deferred();
		if ( $(window).scrollTop() > 200 || !is_elem_visible("#title") ) {
			setTimeout(function(){
				a.resolve();
			}, scroll_top())
		} else {
			a.resolve();
		}
		return a;
	},

	transition_page: function( replace, content ){
		// Slide current page off screen, and new one on screen.
		// .waitForImages is a 3rd party plugin!
		var width, swidth;
		swidth = $(window).width()
		width = ( $("#load-container").width() * 100) / swidth
		if (width < 90) {
			$("#load-container").css({"width":"90%"})
		}
		// push new url if it was not a popstate

		if ( !this.popstate ) {
			window.history.pushState({
            	path: this.to
        	}, '', this.to);
		}

		if (!replace) {
			$(".page-container.new").waitForImages(function() {
				// Scroll user to the top of the page if they are too far down (scroll)
				$(".page-container.current").removeClass("current").addClass("leave")
				$(".page-container.new").removeClass("new").addClass("current")
				$("#load-container").animate({"width": "100%"}, 250)
				setTimeout(function(){
					$(".page-container.leave").remove()
					$("#load-container").slideUp(250).promise().done(function(){
						aj_page.finish()
					});
				}, 2000)
			})
		} else {
			content = $(content);

			// First, append the new and current class to the content, then insert it after the current page without the new class.
			content.addClass("current new")
			content.insertAfter(".page-container.current:not(.new)")
			// Now, remove the current
			$(".page-container.current:not(.new)").remove()
			$(".page-container.new").removeClass("new")

			$("#load-container").animate({"width": "100%"}, 250)
			setTimeout(function(){
				$("#load-container").slideUp(250).promise().done(function(){
					aj_page.finish()
				});
			}, 250)
		}
	},

	error: function( x, t, m ) {
		alert(x,t,m)
		console.log(x, t, m)

		// Check error type
		if (x.status == 404) {
			// Page not found
			alert("Page Not Found!");
			aj_page.revert()
		} else if (m == "timeout") {
			alert("Load Timed Out");
			document.location.href = this.to;
		}

	},

	revert: function( to, from ) {
		_G.preserve.updating = false;
		$("a.loading").removeClass("loading");
		$("#load-container").css({"width":"0%"})
	},

	finish: function( ) {
		// Set header highlighting and remove any loading classes from elements.
		// First, remove the loading class
		$("a.loading").removeClass("loading");
		$("a.current").removeClass("current");
		if (this.elem) {
			// Highlight this element
			$(this.elem).addClass("current");
		}
		// Dynamically highlight
		$("header a[href='"+getFileName()+"']").addClass("current")
		if ( $("header a#games").siblings().filter("ul").find("li a.current").length > 0 ) {
			$("header a#games").addClass("current")
		}
		$("#load-container").animate({"width": "0%"}, 10).promise().done(function(){
			cg_clear();
			done_load();
			aj_page.check();
			$(".load-after").fadeIn(350)
		});
	},

	update_dom: function( content ) {
		// Update DOM elements (title, bg etc...)
		var r = $.Deferred();
		// filter title text from content and replace current
		$("title").html( $(content).filter("title").text() )
		// filter page-bg from content and replace id of current with new
		if ( !get_cookie("animations_disable") ) {
			$(".page-bg").fadeOut(250)
			setTimeout(function() {
				$(".page-bg").attr( "id", $(content).find(".page-bg").attr("id") ).fadeIn(250)
				setTimeout(function() {
					r.resolve() //Resolve when page-bg transition complete 
				}, 250)
			}, 250)
		} else {
			$(".page-bg").attr( "id", $(content).find(".page-bg").attr("id") )
			r.resolve()
		}
		return r;
	},

	check: function() {
		// Check to make sure that a page still exists, if not then load the page again.
		var pcl, e;
		e = false;
		pcl = $(".page-container").length;
		if ( pcl != 1 ) {
			// Page is missing, reload
			e = true;
		} else if ( !$(".page-container").hasClass("current") ) {
			e = true;
		}
		if ( e ) {
			console.log("A problem occurred so the page was reloaded");
			alert("A problem occurred so the page was reloaded")
			document.location.href = this.to;
			return true;
		}
		_G.preserve.updating = false;
		// Check if current page is not the same as this.to, this may happen if the user presses the back/forward button while already loading a page, 
		// a pop-state event is fired after the history changes, therefore we cannot prevent the URL change, only record it, if check fails then load the page.
		if ( getFileName() != getFileName(this.to) ) {
			aj_page.start( getFileName(), document.location.href, false, false, true)
			return;
		}
	}
}