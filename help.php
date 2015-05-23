<!DOCTYPE html>
<!-- csgo.php Landing Page HARRY FELTON 
	https://wireframe.cc/kuJIVT
-->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="Help content, including trouble shooting and contact form for the website">
	<meta name="keywords" content="Help, contact, troubleshooting">
	<meta name="author" content="Harry Felton">
	<title>Help | Contact</title>
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
	 	<div class="page-bg" id="help-page-bg">
	</div> <!--Faded out and replaced using ajax--> </div>
	<div class="page-container current" id="help">
		<div id="wrapper">
			<div id="container" class="clearfix">
				<main>
					<h1>Help</h1>
					<!-- FAQ Sections -->
					<section>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos distinctio doloribus id doloremque cumque numquam assumenda error ducimus amet, perspiciatis vel nam, iure optio alias soluta sapiente maxime. Distinctio dicta dolore necessitatibus sunt, natus, velit laudantium incidunt, quos praesentium officia quod saepe accusamus excepturi nulla maxime mollitia qui doloremque. Placeat doloremque repellat molestiae atque, officiis ea voluptatum esse. Est blanditiis vel aperiam odit doloribus tenetur magni cum veniam. Ex laborum facilis eveniet a officiis voluptates, iusto perspiciatis provident ab itaque error quis repellat inventore eius non illo assumenda amet accusantium recusandae ipsum mollitia dolorem numquam rerum. Architecto doloribus aut, officia fugit quae voluptatum quas blanditiis commodi, minus laudantium maiores alias, animi nulla facere soluta nostrum maxime delectus cupiditate nihil earum non temporibus veniam. Omnis dolores, quae quisquam facere! Cum minima, laudantium consectetur sint ratione in perferendis quis, quasi suscipit, eligendi fugiat commodi reprehenderit neque molestiae delectus est id praesentium impedit.</p>
					</section>
					<div class="help-container">
						<div id="left">
							<section>
								<div class="title-wrap">
									<h2>Troubleshooting</h2>
								</div>
								<div class="body-wrap">
									<ul>
										<li><a href="#">Animations Lag</a></li>
										<li><a href="#">Slow Animations</a></li>
										<li><a href="#">Something Else</a></li>
										<li><a href="#">Another Thing</a></li>
										<li><a href="#">Last One</a></li>
									</ul>
								</div>
							</section>
						</div>
						<div id="right">
							<section>
								<div class="title-wrap">
									<h2>Troubleshooting</h2>
								</div>
								<div class="body-wrap">
									<ul>
										<li><a href="#">Animations Lag</a></li>
										<li><a href="#">Slow Animations</a></li>
										<li><a href="#">Something Else</a></li>
										<li><a href="#">Another Thing</a></li>
										<li><a href="#">Last One</a></li>
									</ul>
								</div>
							</section>
						</div>
					</div>
					<button class="contact-trigger" style="display:none">Contact Us</button>
					<h1 id="contact-title">Contact Us</h1>
					<!-- Contact Form -->
					<div id="contact-container">
						<div id="contact-inner" class="clearfix">
							<form action="assets/server/mail.php">
								<div id="left">
									<h2>Name</h2>
									<input class="sl" name="name" id="name" type="text">
									<h2>Type</h2>
									<select name="type" id="type">
										<option value="inquiry">Inquiry</option>
										<option value="bug_report">Bug Report</option>
										<option value="feedback">Feedback</option>
										<option value="suggestion">Suggestion</option>
									</select>
									<button>Send Message</button>
									<button class="contact-trigger">Cancel</button>
								</div>
								<div id="right">
									<h2>Message</h2>
									<textarea name="message" id="message" cols="30" rows="10"></textarea>
								</div>
							</form>
						</div>
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
	<script src="assets/javascript/help.js"></script>
</body>
</html>