<!DOCTYPE html>
<!--
	Landing Page HARRY FELTON 
	https://wireframe.cc/kuJIVT
-->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Grand Theft Auto V</title>
	<link rel="stylesheet" href="assets/css/main.css">
	<?php
	require_once"assets/_module/imports.php";
	?>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
	<?php
		require_once"assets/server/header_addin.php";
	?>
	<div id="bg-wrapper">
	 	<div class="page-bg" id="gta-page-bg">
	</div> <!--Faded out and replaced using ajax--> </div>
	<div class="page-container current two" id="gtav" data-fix-header="fix"> <!-- Slide off screen, slide new page on screen using ajax -->
		<div id="wrapper">
			<div id="container-right" class="load-after">
				<ul id="contents">
					<h1>Contents</h1>
					<li><a class="anim" href="#info">GTA Story</a></li>
					<li><a class="anim" href="#multi">GTA Online</a></li>
					<li><a class="anim" href="#pc">PC Port</a></li>
					<li><a class="anim" href="#down">Downside</a></li>
				</ul>
			</div>
			<div id="container">
				<main>
					<?php
						require_once("assets/_module/start.php");
					?>
					<div class="image-wrapper wide">
						<img src="assets/image/cs1.jpg" class="center-image" alt="Picture of counter strike: global offensive" data-slideshow-src="assets/image/cs.png|assets/image/cs1.jpg|assets/image/gmod.jpg|assets/image/hag.jpg"><br>
					</div>
					<div class="header">
						<h1 class="large" id="title">Grand Theft Auto V</h1>
					</div>
					<section id="info" class="header-after">
						<p>Grand Theft Auto is possibly one of the most infamous video game titles to date, constantly under the microscope for various things. Certain people believe the game causes people to become murderers, whereas others think it glamorizes a life of crime and disrespect to women. <br><br>Grand Theft Auto V is no exception to this tradition and it certainly offers a lot to scrutinize.</p>
						<h1>Story?</h1>
						<p>In this day and age, most people disagree that games need a story mode, although Rockstar went ahead and made one of the best campains, not only in Grand Theft Auto history, but in general. Character switching adds a new level of intuition and complexity, allowing the player to freely switch between Franklin, Micheal and Trevor, the main characters in GTA V story mode. <br><br>The story mode is too large to write up, but it does contain the following:</p>
						<ul>
							<li>Murder</li>
							<li>Explosions</li>
							<li>Torture</li>
							<li>More murder</li>
							<li>Kidnapping (with murder)</li>
							<li>Driving at top speeds (with guns (and murder))</li>
						</ul>
						<p>Did I mention <em>murder</em>?</p>
					</section>
					<section id="multi">
						<h1>Online</h1>
						<p>This game would not be complete without the ability to login and blow up your own <em>friends</em>, groundbreaking! Yes, Grand Theft Auto V comes with online, but not like GTA IV, this online is good! <br><br> GTA V allows you to experience the world of Los Santos in freemode, much like in story mode although this timer the pedestrian you killed was actually your best friend, AWESOME.</p>
						<p>The online mode offers a large range of missions to get the cash rolling, and the new addition <em>heists</em> allows you to make big bucks in a team effort, heists include setup phases where you get ready for the bug "job", before finally executing your diabolical plan of destruction.</p>
					</section>
					<section id="pc">
						<h1>PC port?</h1>
						<p>Ah, The PC port, many people (including myself) have speculated that Rockstar put the PC players on the back burner, but never the less, Rockstar still presented us with a new GTA, one created for the PC, bringing Next Generation Graphics to a new level, fu*k consoles.</p>
						<p>The PC port is surprisingly good, everything works as it should, the settings are very exstensive which is great, and they allow anything from a Dell workstation from 2012 to a custom build with SLI 980s to run the game, and it still looks beautiful.</p>
					</section>
					<section class="last" id="down">
						<h1>Wheres the bad part?</h1>
						<p>My only problem with Grand Theft Auto V, is the online portion is very laggy, most of the time people teleport, and killing players is very difficult, as such the online experience turns into a pile of sh*t on the front lawn, although this lag is intermittent and most of the time, I can cope.</p>
					</section>
					<div class="info-box warn">
						<div id="close" onclick="$(this).parent('.info-box').hide()">&times;</div>					
						<p>This article is not yet completed</p>
					</div>
				</main>
			</div>
			<footer>
				<div id="foot-contain">
					Page Created By <a class="anim" href="http://harryfelton.web44.net">Harry Felton</a> 2015
				</div>
			</footer>
		</div>
	</div>
	<script src="assets/javascript/page.js"></script>
</body>
</html>