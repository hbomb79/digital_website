<!-- Created by Harry Felton, header addin includes the loading animation and ajax_loading scripts -->
<div id="head-container">
	<div id="load-progress"></div>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery.waitforimages/1.5.0/jquery.waitforimages.min.js"></script>
	<script>
		var timer_out = setTimeout(function(){
			if ($("#loading").is(":visible")) {
				$("#loading").slideUp(500)
				console.log("Load Timed Out")
				force_load()
			}
		}, 15000)
	</script>
	<div id="loading">
		<div id="shadow"></div>
		<div id="diag">
			<h1>Loading</h1>
			<p>Please wait while we load the document</p>
			<img src="http://i.imgur.com/6EkrPfM.gif?1" style="display:none;" id="load-spinner" title="Loading..." alt="Loading Animation" />
		</div>
	</div>
	<script>
		$("#load-spinner").load(function(){
			$("#load-spinner").slideDown(250)
		})
		$("#loading").show()
		$(window).load(function(){
			setTimeout(function() { $("#loading").slideUp(500) } , 500)
			clearTimeout(timer_out)
		})
	</script>
	<header><!--This header is fixed, meaning it will stay at the top of the page constantly, a media query will disable this on a mobile level-->
		<nav>
			<ul>
				<a href="index.php" class="ajax_load"><li>Home</li></a><a href="#" class="ajax_load"><li>About</li></a><a href="#" class="ajax_load"><li>Contact</li></a>
			</ul>
		</nav>
	</header>
	<script>
		// Highlight the home, contact or about button depending on active page
		$("header a[href='"+getFileName()+"']").addClass("current")
	</script>
</div>