<!DOCTYPE html>
<!-- index.html Landing Page HARRY FELTON -->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="HexCode homepage, see all of our games and navigate the site">
	<meta name="keywords" content="games, game, review, author, harry, article, section">
	<meta name="author" content="Harry Felton">
	<!-- Add meta tags for description, these are used primarily by search crawlers -->
	<title>Home Page</title>
	<link rel="stylesheet" href="assets/css/main.css">
	<!-- Import css -->
	<?php
	require_once"assets/_module/imports.php";
	?>
	<!-- Import files using PHP extension -->
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
	<?php
		require_once"assets/server/header_addin.php";
	?>
	<div id="bg-wrapper">
	 	<div class="page-bg" id="main-page-bg">
	</div> <!--Faded out and replaced using ajax--> </div>
	<div class="page-container current" id="index"> <!-- Slide off screen, slide new page on screen using ajax -->
		<div id="wrapper">
			<div id="container">
				<!-- Wrapper and container used for centering -->
				<main>
					<?php
						require_once("assets/_module/start.php");
					?>
					<!-- Add info boxes -->
					<h1 class="large" id="title">Lorem ipsum.</h1>
					<section>
						<h1>About Title</h1>
						About Lorem ipsum dolor sit amet.
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni totam atque aperiam mollitia nostrum eveniet ratione, beatae corporis laboriosam accusamus quas, aliquam recusandae dolorum aut esse voluptatibus doloribus qui ea necessitatibus deserunt et aspernatur placeat minus iure. Molestiae dolore unde soluta aliquid excepturi inventore culpa, expedita debitis maiores repellat placeat quos facere similique consequatur dolorem! Suscipit rem vitae autem quaerat repudiandae, blanditiis incidunt vero temporibus officia, eius enim cupiditate odit impedit? Deleniti minus odit veritatis perferendis nisi necessitatibus assumenda beatae modi praesentium vero, reprehenderit delectus temporibus error, nulla corrupti sit minima sequi, aut deserunt. Blanditiis fugiat ducimus qui est maxime.
					</section>
					<div class="game-container">
						<!-- Contains all the games we are reviewing -->
						<div class="game">
							<!-- A game tag -->
							<a href="gtav.php" class="tipped tipped-mid tipped-vauto ajax_load" aria-label="Click To View GTA V"><div class="game-bg" id="GTAV"></div>
								<div class="game-title"><span>Grand Theft Auto V</span></div></a>
								<!-- An A tag wraps the text and is the same size as the image. ( block ) -->
						</div>	
						<div class="game">
							<a href="ACU.html" class="tipped tipped-mid tipped-vauto" aria-label="Click To View Assassins Creed Unity"><div class="game-bg" id="AC"></div>
								<div class="game-title"><span>Assassin's Creed Unity</span></div></a>
						</div>
						<div class="game">
							<a href="TeamFortress2Pg1.html" class="tipped tipped-mid tipped-vauto" aria-label="Click To View Team Fortress 2"><div class="game-bg" id="TF"></div>
								<div class="game-title"><span>Team Fortress 2</span></div></a>
						</div>
						<div class="game">
							<a href="csgo.php" class="ajax_load tipped tipped-mid tipped-vauto" aria-label="Click To View CS:GO"><div class="game-bg" id="CS"></div>
								<div class="game-title"><span>Counter Strike: Global Offensive</span></div></a>
						</div>
						<div class="game">
							<a href="skyrim.html" class="tipped tipped-mid tipped-vauto" aria-label="Click To View Elder Scroll V: Skyrim"><div class="game-bg" id="SKY"></div>
								<div class="game-title"><span>Elder Scrolls V: Skyrim</span></div></a>
						</div>
						<div class="game">
							<a href="Portal2Pg2.html" class="tipped tipped-mid tipped-vauto" aria-label="Click To View Portal 2"><div class="game-bg" id="PORTAL2"></div>
								<div class="game-title"><span>Portal 2</span></div></a>
						</div>
						<div class="game">
							<a href="Left4Dead2Pg3.html" class="tipped tipped-mid tipped-vauto" aria-label="Click To View Left For Dead 2"><div class="game-bg" id="L4D2"></div>
								<div class="game-title"><span>Left 4 Dead 2</span></div></a>
						</div>
						<div class="game">
							<a href="Payday.html" class="tipped tipped-mid tipped-vauto" aria-label="Click To View PAYDAY: The Heist"><div class="game-bg" id="PAYDAY"></div>
								<div class="game-title"><span>PAYDAY: The Heist</span></div></a>
						</div>
						<div class="game">
							<a href="bf4.php" aria-label="Click To View Battlefield 4" class="tipped tipped-mid tipped-vauto ajax_load"><div class="game-bg" id="BF4"></div>
								<div class="game-title"><span>Battlefield 4</span></div></a>
						</div>
						<div class="game">
							<a href="hag.php" aria-label="Click To View Heroes And Generals" class="tipped tipped-mid tipped-vauto ajax_load"><div class="game-bg" id="HAG"></div>
								<div class="game-title"><span>Heroes And Generals</span></div></a>
						</div>
						<!-- Anchor tags with a href of "#" indicate a page that has not been created and/or linked with this page -->
					</div>
				</main>
			</div>
			<footer>
				<!-- Footer -->
				<div id="foot-contain">
					Page Created By <a class="anim" href="http://harryfelton.web44.net">Harry Felton</a> 2015
				</div>
			</footer>
		</div>
	</div>
	<script src="assets/javascript/page.js"></script>
	<!-- Import javascript page.js for final DOM adjustments -->
</body>
</html>