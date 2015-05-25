<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<style>
		html, body {
			padding:0;
			margin:0;
			font-size: 16px;
		}

		#container {
			width:80%;
			margin:0 auto;
			text-align: center;
			border: 3px solid crimson;
			border-radius: 1em;
			color:black;
		}

		h1 {
			text-decoration: underline;
			color: crimson;
		}

		header, main {
			padding: 1em;
		}

		.emp {
			text-decoration: underline;
			font-style: italic;
		}

		footer {
			border-top: 1px solid crimson;
			font-size: 0.7em;
			text-align: left;
			padding: 0 1em;
		}
	</style>
</head>
<body>
	<div id="container">
		<?php
		
		// Depending on the content, display a differnet message
		$name = isset($_GET["name"]) ? $_GET["name"] : "Unknown";
		$email = isset($_GET["email"]) ? $_GET["email"] : "Unknown";
		if ( $name == "Unknown" || $email == "Unknown" ) {
			die("DIE");
		}
		?>
		<header>
			<h1>
				Thanks For Your Message!
			</h1>
		</header>
		<main>
			<p>Hey <?php echo($name) ?> (<span class='emp'><?php echo($email) ?></span>), <br>We are messaging to let you know we got you'r message and we will promptly respond within 3 working days.</p>
			<p>If you did not send us a message, then send us a message back and we will discard this request.</p>
		</main>
		<footer>
			<p>Sent From <a href="http://harryfelton.web44.net/digital_website">HexCode</a></p>
			<p>You were sent this message because you contacted us</p>
		</footer>
	</div>
</body>
</html>