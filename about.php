<!DOCTYPE html>
<!-- index.html Landing Page HARRY FELTON -->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>About</title>
	<link rel="stylesheet" href="assets/css/main.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="assets/javascript/ajax_dynamic.js"></script>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
	<?php
		require_once"assets/server/header_addin.php";
	?>
	<div id="bg-wrapper">
	 	<div class="page-bg" id="about-page-bg">
	</div> <!--Faded out and replaced using ajax--> </div>
	<div class="page-container current" id="about"> <!-- Slide off screen, slide new page on screen using ajax -->
		<div id="wrapper">
			<div id="container">
				<main>
					<h1 class="large" id="title">About</h1>
					<section>
						<h1>Whats our aim?</h1>
						About Lorem ipsum dolor sit amet.
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni totam atque aperiam mollitia nostrum eveniet ratione, beatae corporis laboriosam accusamus quas, aliquam recusandae dolorum aut esse voluptatibus doloribus qui ea necessitatibus deserunt et aspernatur placeat minus iure. Molestiae dolore unde soluta aliquid excepturi inventore culpa, expedita debitis maiores repellat placeat quos facere similique consequatur dolorem! Suscipit rem vitae autem quaerat repudiandae, blanditiis incidunt vero temporibus officia, eius enim cupiditate odit impedit? Deleniti minus odit veritatis perferendis nisi necessitatibus assumenda beatae modi praesentium vero, reprehenderit delectus temporibus error, nulla corrupti sit minima sequi, aut deserunt. Blanditiis fugiat ducimus qui est maxime.
					</section>
					<section class="person-container">
						<h1 class="large" style="text-decoration:underline; text-align:center;">Our Team</h1>
						<div class="person clearfix">
							<img src="assets/image/user.png" alt="">
							<div class="content">
								<h1>Harry</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, consequuntur hic officiis odio unde vero magnam non voluptas? Maiores, rem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, error tempore fugit perspiciatis reiciendis officia obcaecati cum aspernatur dolor repellendus doloremque nihil molestiae voluptatem, deleniti pariatur? Itaque cum, voluptas fugit totam praesentium cupiditate aliquid enim. Molestiae, nesciunt asperiores maxime quos, ex dolor veniam eius sunt temporibus molestias nobis modi accusamus doloremque aspernatur nulla voluptas hic reprehenderit animi rerum recusandae. Sint!</p>
							</div>
						</div>
						<div class="person clearfix">
							<img src="assets/image/user.png" alt="">
							<div class="content">
								<h1>Clayton</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus corporis voluptates, aliquid rem quod quos, architecto sunt dignissimos tenetur ullam consequatur ipsam harum unde doloribus suscipit tempore, ea, sequi nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ullam, iusto, explicabo officiis consequatur deserunt quae, ipsa quo eveniet autem fugiat nostrum incidunt eius!</p>
							</div>
						</div>
						<div class="person clearfix">
							<img src="assets/image/user.png" alt="">
							<div class="content">
								<h1>Brynn</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem perferendis quos reiciendis. In, excepturi, amet?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, dignissimos? Debitis neque, necessitatibus maxime consectetur excepturi repellat unde sequi saepe qui veritatis quibusdam repellendus quae voluptate adipisci consequuntur facilis omnis blanditiis? Nisi ipsa architecto consectetur officia velit quaerat, perferendis odio veritatis obcaecati rem cumque molestiae inventore dolore distinctio nemo praesentium error. Consequuntur iure fugit consequatur unde ab, inventore veniam repellendus, incidunt aliquam voluptas voluptatum. Ducimus facilis non molestias, deleniti amet, temporibus suscipit similique dolorem dignissimos earum commodi excepturi explicabo sapiente sed, esse vitae perferendis tempore, impedit beatae? Commodi inventore unde sunt quo, aliquam saepe id assumenda repellat voluptates sint quae.</p>
							</div>
						</div>
					</section>
					<div class="nerd-container" style="clear:both;">
						<h1 style="font-size:2.5em; text-decoration:underline; text-align:center;">Stats For Nerds</h1>
						<section>
							<h2>How does it all work?</h2>
							<p>Some of you may have noticed a few things around here... Firstly, animations galore, some people say this place is a crazy house containing an uncontrollable JavaScript creature, for me, its just my testing ground</p>
							<p>The reason for so many animations is because I was rather tired of the boring page change, with that ugly flicker of white, and the pop-ins as things loaded via slow Internet, I have tried to make this unavoidable procedure of loading by using JavaScript to lessen its impact of the user. Rather than the page losing styling and popping in during image load, I use an Ajax request to retrieve all the DOM elements and show them when ready</p>
						</section>
						<section>
							<h2>Ajax?</h2>
							<p>Ajax is the art of communicating between the server and client without reloading the entire page to display information, it allows things like Node.JS to pass in live updates from a database and get the displayed on a page in real time, or in this instance, allow people to load an entire page off the server and load it using some JavaScript wizardry</p>
							<p>When you click a link, a click bind is instantly fired telling JavaScript to get ready, after 250ms of no clicking (prevents spam clicking) the JavaScript code executes, the first thing it does is submit an Ajax request containing the URL in the href of the link, while loading a progress bar at the top of the page slides across indicating the level of completeness. Once the HTML for the page has been returned, I wait for all Images to load before hiding the progress bar, and letting the JavaScipt continue. <br><br>Once the JavaScript continues, I simply append the new page to the body, the new div has a class of .page-container, but it wont slide on screen until it has a class .current. <br><br>So I remove the class current from the old page and add a class .leave, making it slide off to the left, and I then add the class .current to the new page, sliding it in from the right. I then use a function to highlight any appropriate header links and clear any timers, intervals or page relative variables stored in _G. This means that you wont get 2 or more of the same interval just because each page needs one.</p>
							<p>And all of this... in one JavaScript file</p>
						</section>
						<section style="box-shadow:none;">
							<h2>Well... whats the second thing?</h2>
							<p>The second thing you may have noticed, is lag, users that have a poor quality computer or browser will experience lag during page change because of the sheer amount of things happening, if you want to disable the JavaScript animations you can turn them off by clicking settings in the top right, and toggling animations in the window.</p>
							<p>Although, thats not the only thing that can lag the animation, Embedded YouTube videos seem to cause a huge problem. <br>The YouTube embed API assumes you have <a target="_blank" href="https://www.google.co.nz/chrome/devices/chromecast/">Chromecast</a> Installed, when it tries to access it, the embed throws in excess of ten errors if you do not have the plugin like myself, while there errors are piling up, <strong>huge</strong> lag is present. <br><br>Closing the console window helps, but not enough to make it acceptable, if a fix doesn't present itself, this site will resort to YouTube links as a replacement.<br><br>Images are not the cause, after running extensive testing no lag can be noticed when loading to and from pages with over 30 HD images, but one YouTube embed screws it up.</p>
						</section>
					</div>
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