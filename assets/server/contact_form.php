<?php

	function drawmain() {
		?>
			<!-- MAIN html layout -->
			<html>
				<head>
					<link rel="stylesheet" href="../css/contact.css">
					<style>
						.button{
							font-size: 0.8em;
						}
					</style>
				</head>
				<body>
					<div class="page-container current" id="cf">
						<div id="wrapper">
							<div id="container">
								<main>
									<div id="contact-inner">
										<?php
											print_r($_POST);
											if ( !isset($_GET["js"]) && !isset($_POST["step"]) || isset($_POST["step"]) && $_POST["step"] == "step1" ) {
												draw1( false, false, false );
											} else if( !isset($_GET["js"]) && isset($_POST["step"]) && $_POST["step"] == "step2" ) {
												// Verify entries
												// 
												// First, Check both were filled.
												$error = 0;
												$error_text = "done";
												if ( !isset($_POST["name"]) || empty($_POST["name"]) || empty($_POST["email"]) || !isset($_POST["email"])) {
													// Both are not filled
													$error = 404;
													$error_text = "Please Fill In Both Fields";
												}
												if ( $error != 0) {
													draw1( false, $error, $error_text );
												} else {
													draw2( false, false, false );
												}
											} else if ( isset($_POST["step"]) && $_POST["step"] == "send" && !isset($_GET["js"]) ) {
												if ( !isset($_POST["type"]) || empty($_POST["type"]) || $_POST["type"]=="NONE" ) {
													$error=404;
													$error_text="Please Select A Type";
													draw2(false, $error, $error_text);
												} else {
													drawsend();
													// Send Message, Report Success.
													// mail.php, send information too.
												}
											} else if( isset($_GET["js"]) ) {
												draw1( true, false, false );
												draw2( true, false, false );
											}
										?>
									</div>
								</main>
							</div>
						</div>
					</div>
				</body>
			</html>
		<?php
	}

	function drawsend() {
		?>
			<div id="start">
				<h2>Contact</h2>
				<p>Sending Message</p>
			</div>
		<?php
	}

	function draw1( $js, $e, $et ) {
		?>
			<div id="start">
				<h2>Contact</h2>
				<p>Fill in the fields below to send a message to our support team.</p>
			</div>
			<div id="step1" <?php if($js) { ?> class="javascript" <?php } ?> >
				<div id="response">
					<?php
						if ( $e || $et ) {
							?>
							<div class="info-box error">
								<p><?php echo($et) ?></p>
							</div>
							<?php
						}
					?>
				</div>
				<div id="success"></div>
				<form method="post" id="step1-form">
					<div id="inputs">
						<h3>Name</h3>
						<input type="text" id="name" name="name" class="large" placeholder="Tell Us Who You Are!">
						<h3>Email</h3>
						<input type="text" id="email" class="large" name="email" placeholder="test@example.com">
					</div>
					<div id="controls">
						<button type="submit" name="step" value="step2" class="button">Next</button>
					</div>
				</form>
			</div> <!-- #step1 -->
		<?php
	}

	function draw2( $js, $e, $et) {
		?>
			<div id="start">
				<h2>Contact</h2>
				<p>Fill in the fields below to send a message to our support team.</p>
			</div>
			<div id="step2" <?php if($js) { ?> class="javascript" <?php } ?> >
				<div id="response">
					<?php
						if ( $e || $et ) {
							?>
							<div class="info-box error">
								<p><?php echo($et) ?></p>
							</div>
							<?php
						}
					?>
				</div>
				<div id="success"></div>
				<div id="text">
					<h2>Step 2</h2>
				</div>
				<form method="post" id="step2-form">
					<div id="hidden">
						<input type="hidden" name="name" value="<?php echo($_POST['name']) ?>">
						<input type="hidden" name="email" value="<?php echo($_POST['email']) ?>">
					</div>
					<div id="inputs">
						<input type="text" name="type" id="type" class="large">
					</div>
					<div id="controls">
						<button type="submit" value="send" name="step" class="button" id="contact-send">Send</button>
					</div>
				</form>
			</div> <!-- #step2 -->
		<?php
	}

	function drawsuccess( $mess ) {

	}

	function drawerror( $mess, $code ){

	}
	// This file will detect what stage the user is on if using POST, otherwise it will assume the user is using Javascript and animate the transitions.
	if ( !isset($_POST["js"]) ) {
		drawmain();
		// Display the page for use without javascript
	} else if ( isset($_POST["js"]) ) {
		// Display the page for Javascript
	}
?>