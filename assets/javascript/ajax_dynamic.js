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
		e.preventDefault()
		// Check if URL contains a HASH symbol. If it does then prevent popstate from firing, return true.
		if (document.location.href.search("#") == -1) {
	    	clearTimeout(pop_wait)
	    	pop_wait = setTimeout(function(){
	            pop_start(location.pathname, true);
	        }, 50)
	    }
	    return false;
	});
}

$(window).load(function(){
	// Create event listener
	done_load()
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

function getFileName() {
	//this gets the full url
	// If running on XAMPP this works, although a local machine will not as index.php is not always in the URL bar, to address this, a null pathname or a pathname of /digital_website/ (For local machines using XAMPP) will return index.php
	var url = document.location.href;
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
    $('a.ajax_load').unbind("click").bind('click', function(event) {
    	if (_G.variable.updating) {
    		return false;
    	}
        if (event.button === 0) {
            pageUrl = $(this).attr('href');
            if (pageUrl == window.location.pathname || pageUrl == getFileName() || pageUrl == "#" || pageUrl == "" || !pageUrl) {
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
		        }, 250))
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var _xhr = false;
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
	if (!$("#load-progress").is(":visible")) {
		$("#load-progress").show()
		setTimeout(function() { $("#load-progress").css({"width":"10%"}) }, 10)
	}
	_xhr = $.ajax({
		url: page_url,
		timeout: 5000,
		xhr: function () {
	        var xhr = new window.XMLHttpRequest();
	        //Download progress
	        xhr.addEventListener("progress", function (evt) {
	            if (evt.lengthComputable) {
	                var percentComplete = evt.loaded / evt.total;
	                setTimeout(function(){
	                	$("#load-progress").css({"width":(Math.round(percentComplete * 100) - getRandomInt(10, 30) + "%")})
	                }, 10)
	            }
	        }, false);
	        return xhr;
	    },
	}).done(function(raw){
		_G.variable.updating = true;
		var integer = 250;
		if ( $(document).scrollTop() > 200 || !is_elem_visible("#title") ){
			integer = scroll_top()
		}
		test_var = raw;
		setTimeout(function(){
			// Update the body of the current page with this ones.
			if (!$(raw).filter(".page-container")[0] || !$(raw).filter(".page-bg")) {
				console.log("This page is not configured correctly")
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
				var timedout = false;
				var timer_out = setTimeout(function() {
					console.log("Load Timed out while loading images")
					pop_proceed(raw, $raw)
				}, 10000)
				$($raw).waitForImages(function() {
					if (!timedout) {
						clearTimeout(timer_out)
						console.log("Images Loaded")
						pop_proceed(raw, $raw)
					}
				})
			}, 400)
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



function pop_proceed(raw, $raw) {
	cgt("wait", setTimeout(function(){ _G.variable.updating = false; }, 2000))
	$("#load-progress").css({"width":"100%"})
	$(".page-container.current").removeClass("current").addClass("leave")
	$(".page-bg").fadeOut(200)
	setTimeout(function(){ $(".page-bg").attr("id", $(raw).filter("#bg-wrapper").find(".page-bg").attr("id"))
		$(".page-bg").fadeIn(200)
		setTimeout(function(){
			$("#load-progress").slideUp(100)
			setTimeout(function(){
				$("#load-progress").css({"width":"0%"})
				_G.variable.updating = false;
				cge_t("wait")
			}, 100)
		}, 1000)
	}, 200)
	setTimeout(function(){
		$($raw).addClass("current")
		$("a.current").removeClass("current")
		if ($("a.loading").length == 0) {
			// No button pressed
			$("header a[href='"+getFileName()+"']").addClass("current")
		} else {
			$("a.loading").removeClass("loading").addClass("current")
		}
		$("html").removeClass("waiting");
		done_load()
	}, 50)
}

function pop_terminate(pop, url){
	_xhr.abort();
	console.log("Ajax Request Aborted! Loading Page Using HREF "+url);
	console.log(pop);
	window.location.href=url;
}

function pop_error(x, t, m){
	$(".about-background").show()
	console.log("")
	if (_xhr) {
		_xhr.abort();
		console.log("XHR Request Aborted Due To An Error");
	}
	console.log("X: "+x+":: T:"+t+":: M:"+m);
	console.log("Ajax Error, Could not complete request")
	return false;
}