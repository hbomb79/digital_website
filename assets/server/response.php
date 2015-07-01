<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<style>
		@import url(http://fonts.googleapis.com/css?family=Roboto:400,700,900);
		@import url(http://fonts.googleapis.com/css?family=Orbitron:400,700);
		html, body {
			padding:0;
			margin:0;
			font-size: 16px;
			background: lightgray;
			font-family: 'Roboto', sans-serif;
		}

		#container {
			width:80%;
			margin:0 auto;
			text-align: center;
			border: 3px solid crimson;
			border-top:none;
			color:black;
			max-width:960px;
			background: white;
			box-shadow: 0 0 5px black;
		}

		h1 {
			color: crimson;
			font-family: 'Orbitron', sans-serif;
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
			text-align: center;
		}
		.button {
			padding:1em;
			background: white;
			border: 3px solid #FF003F;
			text-decoration: none !important;
			-webkit-transition: background 250ms ease, color 250ms ease;
			-o-transition: background 250ms ease, color 250ms ease;
			transition: background 250ms ease, color 250ms ease;
			cursor:pointer;
			color: #FF003F;
			display:block;
			outline: none;
		}

		.button:hover {
			background:#FF003F;
			color:white;
		}
		a.button {
			display: inline-block;
			margin: 0 auto;
		}

		a{
			color: crimson;
			text-decoration: none;
		}
		a:hover, a:active {
			text-decoration: underline;
		}

		@media screen and (max-width:770px) {
			#container {
				width:100vw;
				border:none;
				border-bottom: solid 3px crimson;
			}
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
			die("missing fields");
		}
		?>
		<header>
			<h1>
				Thanks For Your Message!
			</h1>
		</header>
		<main>
			<p>Hey <?php echo($name) ?> (<span class='emp'><?php echo($email) ?></span>), <br>We are messaging to let you know we got your message and we will promptly respond within 3 working days.</p>
			<p>If you did not send us a message, then send us a message back and we will discard this request.</p><br>
			<a href="http://harryfelton.web44.net/digital_website" class="button">Visit Us</a><br><br>
			<p>Kind Regards,<br><a href="http://harryfelton.web44.net">HexCode</a></p>
		</main>
		<footer>
			<p>Sent From <a href="http://harryfelton.web44.net/digital_website">HexCode</a></p>
			<p>You were sent this message because you contacted us</p>
		</footer>
	</div>
</body>
</html>