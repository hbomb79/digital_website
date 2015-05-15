<!-- Created by Harry Felton, header addin includes the loading animation and ajax_loading scripts -->
<div id="shadow" style="display:none;"></div>
	<div id="loading" style="display:none;">
		<div id="diag">
			<h1>Loading</h1>
			<p>Please wait while we load the document</p>
			<img src="http://i.imgur.com/6EkrPfM.gif?1" id="load-spinner" title="Loading..." alt="Loading Animation" />
		</div>
	</div>
	<script>
		if (!get_cookie("loading_disable")) {
			$("#loading").show()
		}
	</script>
	<div id="settings">
		<div id="settings-inner">
			<div id="setting-notify" style="display:none;"></div>
			<div id="top-bar">
				<a href="#" onclick="$('#settings').fadeOut(); $('#shadow').fadeOut();">&times</a>
			</div>
			<div id="pane">
				<div id="inner">
					<h1>Settings</h1>
					<p>Welcome to your settings page, any options changed here will revert automatically in 30 days afterwards.</p>
					<div class="setting-content">
						<a class="button" href="#" onclick="toggle_animations()" id="js_setting">An Error Occured, Enable Javascript</a><br>	
					</div>
					<div class="setting-content" id="load_content">
						<a class="button" href="#" onclick="toggle_loading()" id="load_setting">An Error Occured, Enable Javascript</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<header><!--This header is fixed, meaning it will stay at the top of the page constantly, a media query will disable this on a mobile level-->
		<div id="head-container">
			<div id="load-container"><div id="load-progress"></div></div>
			<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery.waitforimages/1.5.0/jquery.waitforimages.min.js"></script>
			<script>
				var timer_out = setTimeout(function(){
					if ($("#loading").is(":visible")) {
						$("#loading").slideUp(500)
						console.log("Load Timed Out")
						force_load()
					}
				}, 20000)
			</script>
			
			<script>
				$(window).load(function(){
					setTimeout(function() { $("#loading").slideUp(500) } , 500)
					clearTimeout(timer_out)
				})
			</script>
			<nav>
				<div class="handle">
					<span id="text">Menu</span>
					<span id="icon">&#9776;</span>
				</div>
				<ul>
					<a href="index.php" class="ajax_load"><li>Home</li></a><a href="about.php" class="ajax_load"><li>About</li></a><a href="#" class="ajax_load"><li>Contact</li></a><a href="#" onclick="$('#settings').fadeIn(); $('#shadow').fadeIn()" class="float-right"><li>Settings</li></a>
				</ul>
			</nav>
		<div id="notification" style="display:none;">Undefined Content</div>
		</div>
	</header>
	<script>
		// Highlight the home, contact or about button depending on active page
		$("header a[href='"+getFileName()+"']").addClass("current")
		// Setup settings *XD*

		function settings() {
			if (get_cookie("animations_disable")) {
				// Animations disabled.
				$("#js_setting").html("Turn On Animations");
				$("#load_content").show()
			} else {
				$("#js_setting").html("Turn Off Animations");
				document.cookie = "loading_disable=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
				$("#load_content").hide()
			}
			if (get_cookie("loading_disable")) {
				// Animations disabled.
				$("#load_setting").html("Turn On Loading");
			} else {
				$("#load_setting").html("Turn Off Loading");
			}
		}
		settings()
		function toggle_animations(){
			if (get_cookie("animations_disable")) {
				document.cookie = "animations_disable=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
				notify("Animation setting enabled", "limegreen", "white", "#setting-notify")
			} else {
				create_cookie("animations_disable", "true", 30)
				notify("Animation setting disabled", "limegreen", "white", "#setting-notify")
			}
			settings()
		}
		function toggle_loading(){
			if (get_cookie("loading_disable")) {
				document.cookie = "loading_disable=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
				notify("Loading setting enabled", "limegreen", "white", "#setting-notify")
			} else {
				create_cookie("loading_disable", "true", 30)
				notify("Loading setting disabled", "limegreen", "white", "#setting-notify")
			}
			settings()
		}
	</script>
</div>