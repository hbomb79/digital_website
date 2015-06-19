<!-- MAIN html layout -->
<html>
	<head>
		<link rel="stylesheet" href="assets/css/contact.css">
		<style>
			.button{
				font-size: 0.8em;
			}
		</style>
	</head>
	<body>
		<div id="bg-wrapper">
		 	<div class="page-bg" id="cf-page-bg"></div> <!--Faded out and replaced using ajax-->
		</div>
		<div class="page-container current" id="cf">
			<div id="wrapper">
				<div id="container">
					<main>
						<div id="contact-inner">
						<?php
							require_once"assets/server/contact_form.php";
						?>
						</div>
					</main>
				</div>
			</div>
		</div>
	</body>
</html>