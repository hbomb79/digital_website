<!-- Created by Harry Felton, header addin includes the loading animation and ajax_loading scripts -->
<a id="to-top" class="tipped tipped-left tipped-vmid" aria-label="Go To Top" href="#!top"></a>
<div id="shadow" style="display:none;"></div>
<div id="loading" style="display:none;">
	<div id="diag">
		<h1>Loading</h1>
		<div id="norm" style="margin:0;">	
			<p>Please wait while we load the document</p>
		</div>
		<div id="error" style="margin:0; display:none;">
			<p>Loading is taking longer than usual. We suggest waiting, but if you like you can skip or reload the page</p>
		</div>
		<img src="http://i.imgur.com/6EkrPfM.gif?1" id="load-spinner" title="Loading..." alt="Loading Animation" />
		<div id="error" style="margin:0; display:none;">
			<button style="display: inline-block;" class="button" onclick="cancel()">Close</button>
			<button class="button" style="display: inline-block;" onclick="retry()">Reload</button>
		</div>
	</div>
</div>
<script>
	if (!get_cookie("loading_disable")) {
		$("#loading").show();
		$("html, body").css("overflow-y", "hidden");
	}

	function retry() {
		location.reload(true);
	}

	function cancel() {
		$("#loading").fadeOut(500).promise().done(function(){
			$("html, body").css("overflow-y", "auto");
			$(window).trigger("scroll");
		});
	}
</script>
<div id="settings">
	<div id="settings-inner">
		<div id="setting-notify" style="display:none;"></div>
		<div id="top-bar">
			<a href="#" onclick="$('#settings').fadeOut(); $('#shadow').fadeOut();">&times;</a>
		</div>
		<div id="pane">
			<div id="inner">
				<h1>Settings</h1>
				<p>Welcome to your settings page, any options changed here will revert 30 days afterwards.</p>
				<div class="setting-content rel-contain first" id="ajax_content">
					<a class="button tipped tipped-top tipped-mid" aria-label="Toggle Use Of AJAX Loading. Using this increases speed but decreases performance" href="#" data-default="ON" data-required-set="[  ]" data-exclude-set="[  ]" data-c-name="ajax_disable" data-title-name="AJAX Loading" id="ajax_setting">An Error Occured, Enable Javascript</a>
				</div>
				<div class="setting-content rel-contain">
					<a class="button tipped tipped-bottom tipped-mid" aria-label="Toggle animated AJAX Loading using this makes page loading look nicer, but decreases performance" href="#" data-default="ON" data-required-set="[  ]" data-exclude-set="[ 'ajax_disable' ]" data-c-name="animations_disable" data-title-name="Animated Transitions" id="js_setting">An Error Occured, Enable Javascript</a><br>	
				</div>
				<div class="setting-content rel-contain" id="load_content">
					<a class="button tipped tipped-bottom tipped-mid" aria-label="Toggle loading screen, this is not reccomended as it displays the page while loading, although this is helpful on slow connections" href="#" data-default="ON" data-required-set="[ 'ajax_disable' ]" data-exclude-set="[  ]" data-c-name="loading_disable" data-title-name="Animated Loading" id="load_setting">An Error Occured, Enable Javascript</a>
				</div>
			</div>
		</div>
	</div>
</div>
<header><!--This header is fixed, meaning it will stay at the top of the page constantly, a media query will disable this on a mobile level-->
	<div id="head-container">
		<div id="load-container" style="width:0%; display:none;"><div id="load-progress"></div></div>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery.waitforimages/1.5.0/jquery.waitforimages.min.js"></script>
		<script src="assets/javascript/page.js"></script>
		<script>
			var timer_out = setTimeout(function(){
				if ($("#loading").is(":visible")) {
					$("#loading #error").show()
					$("#loading #norm").hide()
				}
			}, 10000)
		</script>
		
		<script>
			$(window).on("load", function(){
				setTimeout(function() { $("#loading").slideUp(500).promise().done(function(){ $("html, body").css("overflow-y", "auto"); $(window).trigger("scroll"); }); } , 500)
				clearTimeout(timer_out)
			})
		</script>
		<nav>
			<div class="handle">
				<span id="text">Menu</span>
				<span id="icon">&#9776;</span>
			</div>
			<ul>
				<!-- OLD NAV <a href="index.php" class="ajax_load"><li>Home</li></a><a href="about.php" class="ajax_load"><li>About</li></a><a href="help.php" class="ajax_load"><li>Help</li></a><a href="#" onclick="$('#settings').fadeIn(); $('#shadow').fadeIn()" class="float-right"><li>Settings</li></a>-->
				
				<!-- New NAV -->

				<li><a href="index.php" class="ajax_load">Home</a></li><li>
				<a href="about.php" class="ajax_load">About</a></li><li class="mobile-hide has-drop"> <!-- This nav button is hidden on mobile devices, there is simply not enough room to work with -->
					<a href="#" id="games">Games</a>
					<ul>
						<li><a href="gtav.php" class="ajax_load">Grand Theft Auto V</a></li>
						<li><a href="ACU.html">Assassin's Creed Unity</a></li>
						<li><a href="TeamFortress2Pg1.html">Team Fortress 2</a></li>
						<li><a href="csgo.php" class="ajax_load">Counter Strike: Global Offensive</a></li>
						<li><a href="skyrim.html">Elder Scrolls V: Skyrim</a></li>
						<li><a href="Portal2Pg2.html">Portal 2</a></li>
						<li><a href="Left4Dead2Pg3.html">Left 4 Dead 2</a></li>
						<li><a href="Payday.html">PAYDAY: The Heist</a></li>
						<li><a href="bf4.php" class="ajax_load">Battlefield 4</a></li>
						<li><a href="hag.php" class="ajax_load">Heroes And Generals</a></li>
					</ul>
				</li><li>
				<a href="help.php" id="test" class="ajax_load">Help</a></li><li><a class="ajax_load" href="license.php">License</a></li>
				<li class="float-right js-req"><a href="#" onclick="$('#settings').fadeIn(); $('#shadow').fadeIn()">Settings</a></li>
			</ul>
		</nav>
		<div id="notification" style="display:none;">Undefined Content</div>
	</div>
</header>
<script>
	// Highlight the home, contact or about button depending on active page
	$("header a[href='"+getFileName()+"']").addClass("current")
	if ( $("header a#games").siblings().filter("ul").find("li a.current").length > 0 ) {
		$("header a#games").addClass("current")
		// If the active tab is within the games dropdown, then highlight the dropdown parent as well.
	}
	
	var settings = {

		init: function() {
			this.events()
			this.update()
			this.change();
		},

		change: function() {
			$(".setting-content > a").each(function(index, element){
				if ( get_cookie( $(element).data("c-name") ) ) {
					// Currently Disabled
					settings.change_text( element, "Enable " + $(element).data("title-name") )
				} else {
					settings.change_text( element, "Disable " + $(element).data("title-name") )
				}
			})
		},

		events: function() {
			$(".setting-content > a").on("click", function(){
				settings.trigger( this )
			} )
		},

		trigger: function( self ) {
			var $self, text;
			$self = $(self)
			switch ( $self.attr("id") ) {
				case "ajax_setting":
					text = "Ajax Loading";
					break;
				case "load_setting":
					text = "Loading Animation";
					break;
				case "js_setting":
					text = "Page Change Animations";
					break;
			}
			settings.toggle( $self.data("c-name"), true, 30, text, self)
		},

		remove_cookie: function( name ) {
			document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		},

		toggle: function( setting, value, expiry, text, self) {
			if (!get_cookie(setting)) {
				create_cookie(setting, value, expiry)
				text += " Disabled";
				settings.change_text( self, "Enable " + $(self).data("title-name") )
			} else if ( get_cookie(setting) ) {
				document.cookie = setting+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
				text += " Enabled";
				settings.change_text( self, "Disable " + $(self).data("title-name"))
			}
			_G.preserve.test = self;
			settings.tell( text )
			settings.update()
		},

		vis: function( element, action ) {
			$(element)[action]();
		},

		tell: function( text, tc, bg ) {
			var t, b;
			t = tc ? tc : "white";
			b = bg ? bg : "limegreen";
			notify( text, b, t, "#setting-notify")
		},

		change_text: function( element, text ) {
			$(element).html( text )
		},

		update: function() {
			var missing, req, exclude;
			$(".setting-content > a").each(function( index, item ){
				missing = false;
				req = eval($(item).data("required-set"));
				exclude = eval($(item).data("exclude-set"));
				if ( req ) {
					for ( var i = 0; i < req.length; i++) {
						if ( !get_cookie( req[i] ) ) {
							missing = true;
						}
					}
				}
				if (exclude) {
					for ( var i = 0; i < exclude.length; i++) {
						if ( get_cookie( exclude[i] ) ) {
							missing = true;
						}
					}
				}
				if ( !missing ) {
					// Element matches all required objects
					$(item).parent(".setting-content").show()
				} else {
					$(item).parent(".setting-content").hide()
					// Apply defaults because the item is now hidden
					settings.remove_cookie( $(item).data("c-name") )
				}
			});
			settings.change();
		}
	}
	settings.init()
</script>