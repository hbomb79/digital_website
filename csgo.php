<!DOCTYPE html>
<!-- csgo.php Landing Page HARRY FELTON -->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Home Page</title>
	<link rel="stylesheet" href="assets/css/main.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="assets/javascript/ajax_dynamic.js"></script>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
	<?php
		require_once"assets/server/header_addin.php";
	?>
	<div class="page-bg" id="cs-page-bg"> <!--Faded out and replaced using ajax--> </div>
	<div class="page-container current" id="csgo"> <!-- Slide off screen, slide new page on screen using ajax -->
		<div id="wrapper">
			<div id="container">
				<main>
					<h1 class="large" id="title">Counter Strike: Global Offensive</h1>
					<div class="image-wrapper wide">
						<img src="assets/image/cs1.jpg" class="center-image" alt="Picture of counter strike: global offensive">
					</div>
					<section>
						<h1>What is Counter Strike?</h1>
						<p>Counter Strike: Global Offensive, often refereed to as CSGO is an online tactical shooter, it contains multiple game modes such as competitive, arms race, demolition and casual, all entaling their own set of rules, although, the counter strike franchise is popular for a reason that isn't its game modes. <br>Lets be honest, CS:GO doesn't have many game modes. <br>You might be asking yourself, if it doesn't have an abundance of game modes, then why is it so popular...</p>
					</section>
					<section>
						<h1>Go on then, tell me</h1>
						<p>CS:GO, is popular because its competitive game mode is tactical and well... competitive, not many first person shooter games are, most of them are like call of duty, very fast paced, not designed to be tactical, and often is not. Although CS:GO on the other hand, relies on your ability to communicate with your teammates, to formulate strategies. <br>In CS:GO competitive there are two teams, Terrorists, and Counter Terrorists, Abbreviated T and CT</p>
					</section>
					<section>
						<h1>Example</h1>
					</section>
					<section>
						<h1>Example</h1>
					</section>
				</main>
			</div>
			<footer>
				<div id="foot-contain">
					Page Created By <a href="http://harryfelton.web44.net">Harry Felton</a> 2015
				</div>
			</footer>
		</div>
	</div>
</body>
</html>