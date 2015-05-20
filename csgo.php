<!DOCTYPE html>
<!-- csgo.php Landing Page HARRY FELTON 
	https://wireframe.cc/kuJIVT
-->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Home Page</title>
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
	 	<div class="page-bg" id="cs-page-bg">
	</div> <!--Faded out and replaced using ajax--> </div>
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
						<p>Counter Strike: Global Offensive, often refereed to as CSGO is an online tactical shooter, it contains multiple game modes such as competitive, arms race, demolition and casual, all entailing their own set of rules.<br><br>CS:GO is possibly one of the most, if not the most popular FPS game on Steam today, not only that, but its player base is growing over 2 times as fast as Call Of Duty<small>*</small>.</p>
					</section>
					<section>
						<h1>Popularity</h1>
						<p>The reason CS:GO is so popular is because it brings a new meaning to tactical game play. The game relies on both your skill, and communication skills, if you can't communicate with your team, you are destined to lose. The games popularity is also due to the competitive eSport backing it, CS:GO competitions are held on a regular basis, paying out thousands of dollars to the winning team.<br><br>"But surely that isn't the only reason, there are other games that do this"... this is probably what you're thinking right now, the difference is the huge support from Valve, but most importantly the Community. Many community servers are online serving host to a multitude of custom plug-ins and maps, take your pick... there are plenty.</p>
					</section>
					<section>
						<h1>How much does this cost... a lot right?</h1>
						<p>Ah, of course, you are interested in this, lucky you, this game is $20NZD**, but remember, Steam is wonderful, sales are always around and this game, being created by Valve themselves often has its price slashed. 20 bucks isn't expensive, its the cases that get ya. CS:GO cases are dropped after a game, cases are lovely, if you can afford the <em>key</em> to open them. Cases are like the lottery, you get them for free***, but opening them requires a key. Once you have obtained said key, you can open the case, you then get a random chance of getting something that is complete and utter garbage, or a $1000 dollar knife, but bear in mind, RANDOM!!<br><br>These damn cases are where Valve make a fortune, you buy a key for as much as 30 dollars (immediately after case release, this price normally drops to about $2.59), and then you <em>might</em> get a good <em>skin</em>, thats right, these drops have no affect on the guns performance, which is a good thing if you are being shot at.</p>
					</section>
					<section>
						<h1>Hows it look?</h1>
						<p>CS:GO is built on the Source engine... so not great, although we have become used to crystal clear graphics. When I first launched the game I was rather disappointed, but within minutes of the game play, I didn't give a sh*t about the graphics, the only thing on my mind was the bast*** on the balcony shooting at me.</p>
					</section>
					<section style="text-align:center; box-shadow:none;" class="mobile-hide">
						<iframe width="560" height="315" src="https://www.youtube.com/embed/edYCtaNueQY" class="load-after" frameborder="0" allowfullscreen></iframe>
					</section>
					<section style="text-align:center; box-shadow:none;" class="mobile-show">
						Click <a href="https://www.youtube.com/watch?v=edYCtaNueQY">here</a> to watch the CS:GO trailer
					</section>
					<section>
						<h1>Final Verdict</h1>
						<p>Counter Strike: Global Offensive is a great game, with no signs of dying out in the near future, it is cheap if you don't gamble, but if you do you're screwed. The game play is great, never knowing what looms around the alleyway or in the next room. Sound is a very important part of the game (<em>sorry what?</em>). The game has good and constant support from Valve and the community and has decent graphics. I suggest it to everyone, even if I don't know them.</p>
					</section>
					<section style="text-align:center; box-shadow:none;" class="mobile-hide">
						<h1>I want more</h1>
						<p>Want to see more of me playing CS:GO? I have embedded a video of me playing below</p>
						<iframe class="load-after" width="560" height="315" src="https://www.youtube.com/embed/CSehEQiENEg" frameborder="0" allowfullscreen></iframe>
					</section>
					<section style="text-align:center; box-shadow:none;" class="mobile-show">
						<h1>I want more</h1>
						<p>Want to see more of me playing CS:GO? Click <a href="https://www.youtube.com/watch?v=CSehEQiENEg">here</a></p>
					</section>
					<section style="box-shadow:none; font-size:0.6em;">
						<p>*This is relative to COD Black Ops 2, Ghosts and Advanced Warfare on the PC</p>
						<p>**$20NZD was the price of the game at the time of writing this article</p>
						<p>***You can purchase cases on the Steam marketplace if you'd rather not wait to get one from playing</p>
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
	<script src="assets/javascript/page.js"></script>
</body>
</html>