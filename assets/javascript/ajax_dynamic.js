// Dynamic Ajax Page Load
// Copyright 2015 HexCode (Harry Felton)
// Use Under MIT License And Written Consent From HexCode
// 
// Unauthorised usage will result in copyritten court action
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
	return true;
}

function cg_erase_interval(k){
	clearInterval(_G.interval[k]);
	delete _G.interval[k];
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

$(document).ready(function(){
	// Create event listener
	done_load()
	cg_timer("temp_ready", setTimeout(function() {
        window.addEventListener("popstate", function(e) {
        	// Check if URL contains a HASH symbol. If it does then prevent popstate from firing, return true.
        	if (document.location.href.search("#") == -1) {
	        	clearTimeout(pop_wait)
		    	pop_wait = setTimeout(function(){
		            pop_start(location.pathname, true);
		        }, 50)
		    } else {
		    	e.preventDefault()
		    	return false;
		    }
        });
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

function check_hash (hash) {
	if (timer) { clearTimeout(timer) }
	timer = setTimeout(function(){
		if (hash) {
			$hash = $(hash)
			scroll_to(hash);
		}
	}, 50)
}

function done_load() {
	console.log("Done Load")
    $('a.ajax_load').unbind("click").bind('click', function(event) {
        if (event.button === 0) {
            pageUrl = $(this).attr('href');
            if (pageUrl == window.location.pathname || pageUrl == "#" || pageUrl == "" || !pageUrl) {
            	event.preventDefault();
            	return false;
            } else if (pageUrl){
            	clearTimeout(_G.timer.temp_load)
				$(this).addClass("loading")
            	cg_timer("temp_load", setTimeout(function(){
		            window.history.pushState({
		                path: pageUrl
		            }, '', pageUrl);
		            pop_start(pageUrl, document.location.href);
		            event.preventDefault();
		        }, 50))
	            return false;
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
var xhr = false;
var test_var = false;
function pop_start(page_url, from_url){
	if (!page_url || page_url == "#" || page_url == "" || page_url == document.location.href) {
		console.log("Invalid Page")
		return false;
	}
	// Display Loading Cursor
	$("html").addClass("waiting");
	cg_erase_timer(_G.timer.reset_timer)
	// Request page from AJAX
	xhr = $.ajax({
		url: page_url,
		timeout: 5000,
	}).done(function(raw){
		var integer = 250;
		if (!is_elem_visible("header")){
			integer = scroll_to("header", false)
		}
		test_var = raw;
		setTimeout(function(){
			// Update the body of the current page with this ones.
			if (!$(raw).filter(".page-container")[0] || !$(raw).filter(".page-bg")) {
				alert("This page is not configure correctly")
				window.location.href=page_url;
			}
			var $raw = $(raw).filter(".page-container")[0];
			if ($($raw).hasClass("current")) {
				$($raw).removeClass("current")
			}
			$("title").html($(raw).filter("title")[0].text)

			var update_header = false;
			if ( $($raw).attr("data-header-clear") ) {
				// New Page Has Header Clear
				$("header").slideUp(500)
			} else if ( $($raw).attr("data-header-force") || $(".page-container").attr("data-header-clear") ) {
				// New Page Has Header Force
				update_header = true;
			}
			if (update_header) {
				// Update header text, slide down if not visible
				if ( $("header").length < 1) {
					console.log("Cannot replace header, tag doesn't exist")
				} else {
					$("header").html($(raw).filter("header").find("#header-wrapper")[0])
					if (!$("header").is(":visible")) {
						$("header").slideDown(500)
					}
				}
			}
			// Get the script ID div, and evaluate it by replacing the div#script with the new content.
			cg_clear()
			var scripts = $($(raw).filter("#scripts")[0]).html();
			$("#scripts").html(scripts)
			$("body").append($raw)
			//Replace body content with received ajax code, and fade back in.
			setTimeout(function(){
				$(".page-container.current").removeClass("current").addClass("leave")
				$(".page-bg").fadeOut(200)
				setTimeout(function(){ $(".page-bg").attr("id", $(raw).filter(".page-bg").attr("id"))
				$(".page-bg").fadeIn(200) }, 200)
				setTimeout(function(){
					$($raw).addClass("current")
					$("a.loading").removeClass("loading")
					$("html").removeClass("waiting");
					done_load()
				}, 400)
			}, 50)
			setTimeout(function(){
				$(".page-container.leave").remove()
			}, 1000)
		}, integer)
	}).fail(function(x, t, m){
		pop_error(x, t, m)
		console.log(x)
		if (x.status != 404) {window.location.href = page_url;} else {console.log("404, Not Launching Page");}
		$("a.loading").removeClass("loading")
		$("html").removeClass("waiting");
		// If the AJAX request fails, the load is using normal methods.
	});
	return false;
}

function pop_terminate(pop, url){
	xhr.abort();
	console.log("Ajax Request Aborted! Loading Page Using HREF "+url);
	console.log(pop);
	window.location.href=url;
}

function pop_error(x, t, m){
	$(".about-background").show()
	console.log("")
	if (xhr) {
		xhr.abort();
		console.log("XHR Request Aborted Due To An Error");
	}
	console.log("X: "+x+":: T:"+t+":: M:"+m);
	console.log("Ajax Error, Could not complete request")
	return false;
}