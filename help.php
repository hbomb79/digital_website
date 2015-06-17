<!DOCTYPE html>
<!-- csgo.php Landing Page HARRY FELTON 
	https://wireframe.cc/kuJIVT
-->
<?php
	session_start("mailer");
?>
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
	<div class="page-container current" id="help" data-fix-header="fix">
		<div id="wrapper">
			<div id="container" class="clearfix">
				<main>
					<?php
						require_once("assets/_module/start.php");
					?>
					<div class="header">
						<h1 id="title" class="large">Help</h1>
					</div>
					<div id="help-inner">
						<!-- FAQ Sections -->
						<section class="header-after">
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos distinctio doloribus id doloremque cumque numquam assumenda error ducimus amet, perspiciatis vel nam, iure optio alias soluta sapiente maxime. Distinctio dicta dolore necessitatibus sunt, natus, velit laudantium incidunt, quos praesentium officia quod saepe accusamus excepturi nulla maxime mollitia qui doloremque. Placeat doloremque repellat molestiae atque, officiis ea voluptatum esse. Est blanditiis vel aperiam odit doloribus tenetur magni cum veniam. Ex laborum facilis eveniet a officiis voluptates, iusto perspiciatis provident ab itaque error quis repellat inventore eius non illo assumenda amet accusantium recusandae ipsum mollitia dolorem numquam rerum. Architecto doloribus aut, officia fugit quae voluptatum quas blanditiis commodi, minus laudantium maiores alias, animi nulla facere soluta nostrum maxime delectus cupiditate nihil earum non temporibus veniam. Omnis dolores, quae quisquam facere! Cum minima, laudantium consectetur sint ratione in perferendis quis, quasi suscipit, eligendi fugiat commodi reprehenderit neque molestiae delectus est id praesentium impedit.</p>
						</section>
						<div class="help-container clearfix">
							<div id="left">
								<section>
									<div class="title-wrap">
										<h2>Troubleshooting</h2>
									</div>
									<div class="body-wrap">
										<ul>
											<li><a class="anim" href="#">Animations Lag</a></li>
											<li><a class="anim" href="#">Slow Animations</a></li>
											<li><a class="anim" href="#">Something Else</a></li>
											<li><a class="anim" href="#">Another Thing</a></li>
											<li><a class="anim" href="#">Last One</a></li>
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
											<li><a class="anim" href="#">Animations Lag</a></li>
											<li><a class="anim" href="#">Slow Animations</a></li>
											<li><a class="anim" href="#">Something Else</a></li>
											<li><a class="anim" href="#">Another Thing</a></li>
											<li><a class="anim" href="#">Last One</a></li>
										</ul>
									</div>
								</section>
							</div>
						</div>
						<div class="rel-contain">
							<button class="button contact-trigger tipped tipped-mid tipped-vauto" aria-label="Sorry. This is not available at the moment" style="margin:0 auto; font-size:1.3em;">Contact Us</button>
						</div>
						<h1 id="contact-title">Contact Us</h1>
						<!-- Contact Form -->
						<div id="contact-container">
							<div id="contact-inner">
								<?php
									$js = true;
									require_once("assets/server/contact_form.php");
								?>
							</div>
						</div>
						<script>
							//$("#contact-inner").load("assets/server/contact_form.php?js=true")
						</script>
					</div>
				</main>
			</div>
			<footer>
				<div id="foot-contain">
					Page Created By <a class="anim" href="http://harryfelton.web44.net">Harry Felton</a> 2015
				</div>
			</footer>
			<script src="assets/javascript/help.js">
				//$.getScript("assets/javascript/help.js")
			</script>
		</div>
	</div>
	<script src="assets/javascript/page.js"></script>
</body>
</html>