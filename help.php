<!DOCTYPE html>
<!-- csgo.php Landing Page HARRY FELTON 
	https://wireframe.cc/kuJIVT
-->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Help | Contact</title>
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
	 	<div class="page-bg" id="help-page-bg">
	</div> <!--Faded out and replaced using ajax--> </div>
	<div class="page-container current" id="help">
		<div id="wrapper">
			<div id="container">
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

					<h1>Contact Us</h1>
					<!-- Contact Form -->
					<div class="form-container clearfix">
						<form action="post">
							<div id="left">
								<h2>Name</h2>
								<input class="sl" type="text">
								<h2>Type</h2>
								<select name="sup" id="sup">
									<option value="Inquiry">Inquiry</option>
									<option value="Bug Report">Bug Report</option>
									<option value="Feedback">Feedback</option>
									<option value="Suggestion">Suggestion</option>
								</select>
								<button>Send Message</button>
							</div>
							<div id="right">
								<h2>Message</h2>
								<textarea name="" id="" cols="30" rows="10"></textarea>
							</div>
						</form>
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