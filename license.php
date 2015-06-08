<!DOCTYPE html>
<!-- csgo.php Landing Page HARRY FELTON 
	https://wireframe.cc/kuJIVT
-->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>License Information</title>
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
	 	<div class="page-bg" id="lic-page-bg"></div> <!--Faded out and replaced using ajax-->
	</div>
	<div class="page-container current" id="license"> <!-- Slide off screen, slide new page on screen using ajax -->
		<div id="wrapper">
			<div id="container">
				<main>
					<?php
						require_once("assets/_module/start.php");
					?>
					<div class="header">
						<h1 class="large" id="title">License Information</h1>
					</div>
					<section>
						<h1>Image Copyright</h1>
						<p>All images used on, in or around this site are not copywritten, therefore use of the images by HexCode are permitted on this site.</p>
						<p>If you own an image that is displayed on this page and have recently added copyright or believe we have made a mistake in believing the image is not copywritten, then contact us <a class="anim" href="mailto:harryfelton12@gmail.com">here</a>, including your details, the page you saw the image on, and the image context, decription or if possible its href. </p>
					</section>
					<section>
						<h1>Source Owner</h1>
						<p>All source code used on this site is held under MIT license unless other specifiied. Use of any Javascript, CSS, PhP, HTML source on other domains is not permitted, neither is the modification of the code for public, private of commercial use.</p>
						<p>Changing any source code on the site for personal use is not permitted, viewing source code is purely that, copying, editing and publishing the code in any way is <em>not</em> permitted</p>
					</section>
					<section>
						<h1>Cookie Privacy</h1>
						<p>This site stores cookies containing non perosnally identifing information, information may contain user preferences. Use of this site means you accept that cookies are in use on the site and that they are allowed to temporairly store information you may have entered</p>
						<p>Cookies do not store information that could identify you. Any contact information is not stored or published.</p>
					</section>
					<section>
						<h1>Privacy</h1>
						<p>Your privacy is important to us, any personally indentifiable information is not stored, or published</p>
						<p>We will not sell, give or trade you information to other companies, individuals or other entity</p>
					</section>
					<section>
						<h1>Accurate Reviews</h1>
						<p>Reviews on this site are personal and therefore may be inaccurate. These reviews should not be taken as such, they are more like an opinion. Authors do not simply say "I do or dont like". Authors should instead talk about the game in sections, like Gameplay, Graphics and Performance.</p>
						<p>Any opinions on perfomance may not be accurate due to machine limitations, each author may have a differnet machine and therefore graphic limitations may not be accurate if the author is running the game software on an out of date machine.</p>
						<p>If you disagree with a "review" on this site, then please ensure you understand they are not reviews, and are not accurate. If you feel an author has spoken too hostile or display a clear hatrid for the game because of personal not factual evidence, then contact HexCode <a class="anim" href="mailto:harryfelton12@gmail.com">here</a>. If you believe that an author is providing incorrect factual material, such as game specifications then contact us <a class="anim" href="mailto:harryfelton12@gmail.com">here</a>.</p>
						<p>Any messages sent to HexCode may be held and recorded for training, reference of legal purposes. Sending a message states you agree to this policy.</p>
						<p></p>
					</section>
					<section style="box-shadow:none;">
						<h1>Review Permission</h1>
						<p>Any games mentioned on this site permits public reviewals and any images used are also royalty free in the public domain.</p>
						<p>Games by large publishers such as EA or Activision permit such activity</p>
					</section>
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