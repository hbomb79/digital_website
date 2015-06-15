<?php
	$js = isset($_GET["js"]) ? true : false; 
	if (!$js) { session_start("mailer"); }
	function check_cookie() {
		if ( isset($_SESSION["mail"]) || isset($_COOKIE["mail"]) ) {
			?>
			<div id="error">
				<div class="info-box" id="error">
					<h1>Already Sent</h1><br>
					<p>Our servers detect that you have already sent us a message. Please wait before sending another.</p>
				</div>
			</div>
			<?php
			die();
		}
	}

	function create_cookie() {
		$_SESSION["mail"] = true;
		setcookie("mail","true",time()+86400);
	}
	check_cookie();
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
					<div id="bg-wrapper">
					 	<div class="page-bg" id="cf-page-bg"></div> <!--Faded out and replaced using ajax-->
					</div>
					<div class="page-container current" id="cf">
						<div id="wrapper">
							<div id="container">
								<main>
									<div id="contact-inner">
										<?php
											if ( !isset($_GET["js"]) && !isset($_POST["step"]) || isset($_POST["step"]) && $_POST["step"] == "step1" ) {
												draw1( false, false );
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
													draw1( $error, $error_text );
												} else {
													draw2( false, false );
												}
											} else if( !isset($_GET["js"]) && isset($_POST["step"]) && $_POST["step"] == "step3" ) {
												if (  !isset($_POST["type"]) || empty($_POST["type"]) || $_POST["type"]=="NONE" ) {
													// Both are not filled
													$error = 404;
													$error_text = "Please Select A Type";
													draw2( $error, $error_text );
												} else {
													draw3( false, false );
												}
											} else if ( isset($_POST["step"]) && $_POST["step"] == "send" && !isset($_GET["js"]) ) {
												if ( !isset($_POST["message"]) || empty($_POST["message"]) ) {
													$error=404;
													$error_text="Please Type A Message";
													draw3( $error, $error_text );
												} else {
													send_now();
													// Send Message, Report Success.
													// mail.php, send information too.
												}
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

	function drawsent( $response ){
		// SENT
		?>
		<div id="final">
		<?php
			if ( $response["status"] == 200 ) {
				create_cookie();
				?>
					<h1>Message Sent</h1>
					<p>We have received your message. We will try to respond as soon as we can.</p>
				<?php
			} else if ( $response["status"] == 304 ) {
				?>
					<h1>Failed To Send</h1>
					<p>The server reported that you have already send us a message. Please wait a while before sending another</p>
				<?php
			} else if ( $response["status"] == 404 ) {
				?>
					<h1>Failed To Send</h1>
					<p>The server reported <b>missing</b> fields, please ensure all fields are filled.</p>
				<?php
			} else if ( $response["status"] == 201 ) {
				?>
					<h1>Failed To Send</h1>
					<p>An unknown error prevented the server from submitting your message. Please try again later.</p>
				<?php
			} else if ( empty($response) || gettype($response) != "Object"){
				?>
					<h1>Failed To Send</h1>
					<p>The server did not respond correctly. We will get onto this problem as soon as possible.</p>
				<?php
			} else {
				?>
					<h1>Failed To Send</h1>
					<p>An unknown error prevented the server from submitting your message. Please try again later.</p>
					<br>
					<p>Error Code: <?php echo($response["status"]) ?>
					<br>Error Description: <?php echo($response["statusText"]) ?></p>
				<?php
			}
			if ( isset($_GET["back"]) && !empty($_GET["back"]) ) { ?>
				<a style="display:inline-block !important;" href="<?php echo($_GET['back']) ?>" class="button">Close</a>
			<?php 
			} else {
				?>
				<p>Close this tab/window to cancel</p>
				<?php
			}?>
		</div>
		<?php
	}

	function send_now() {
		// Create CURL request
		$url = "http://harryfelton.web44.net/digital_website/assets/server/mail.php";
		$fields = array(
			"name" => urlencode($_POST['name']),
			"email" => urlencode($_POST['email']),
			"message" => urlencode($_POST['message']),
			"type" => urlencode($_POST['type']),
			"js" => "true" // We need an OBJECT, We already use JSON so we can call for that and change it to a PHP object.
		);
		$fields_string = "";
		// Prepare for URL transfer
		foreach($fields as $key=>$value) { 
			$fields_string .= $key.'='.$value.'&'; 
		}
		rtrim($fields_string, '&'); // Replace white space with "&", like query "+"
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL, $url);
		curl_setopt($ch,CURLOPT_POST, count($fields));
		curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_COOKIEFILE, "contact_cookie.txt");
		curl_setopt($ch, CURLOPT_COOKIEJAR, "contact_cookie.txt");

		//execute post
		$result = curl_exec($ch);
		//close connection

		curl_close($ch);
		unset($ch);
		$result = json_decode($result, true);
		drawsent( $result );

	}

	function draw1( $e, $et ) {
		?>
			<div id="step1" class="step">
				<div id="start">
					<h2>Contact</h2>
					<p>Fill in your name and email, we will use these to contact you regarding you request.</p>
				</div>
				<div>
					<div id="response">
						<?php
							if ( $e || $et ) {
								?>
								<div class="info-box error">
									<p><?php echo($et) ?></p>
								</div>
								<br><br>
								<?php
							}
						?>
					</div>
					<div id="success"></div>
					<form method="post" id="step1-form">
						<div id="hidden">
							<input type="hidden" name="type" value="<?php echo(isset($_POST['type']) ? $_POST['type'] : '') ?>">
							<input type="hidden" name="message" value="<?php echo(isset($_POST['message']) ? $_POST['message'] : '') ?>">
						</div>
						<div id="inputs">
							<h3>Name</h3>
							<input type="text" id="name" name="name" class="large" placeholder="Tell us who you are" value="<?php echo(isset($_POST['name']) ? $_POST['name']  : '') ?>">
							<h3>Email</h3>
							<input type="text" id="email" class="large" name="email" placeholder="test@example.com" value="<?php echo(isset($_POST['email']) ? $_POST['email']  : '') ?>">
						</div>
						<div id="controls">
							<?php
							if ( isset($_GET["back"]) && !empty($_GET["back"]) ) { ?>
								<a style="display:inline-block !important;" href="<?php echo($_GET['back']) ?>" class="button">Close</a>
							<?php 
							} else {
								?>
								<p>Close this tab/window to cancel</p>
								<?php
							}?>
							<button type="submit" name="step" value="step2" class="button">Next</button>
						</div>
					</form>
				</div> 
			</div> <!-- #step1 -->
		<?php
	}

	function draw2( $e, $et) {
		?>
			<div id="step2" class="step">
				<div id="start">
					<h2>Contact</h2>
					<p>What kind of message are you submitting. We use this to better sort and repond to your message.</p>
				</div>
				<div>
					<div id="response">
						<?php
							if ( $e || $et ) {
								?>
								<div class="info-box error">
									<p><?php echo($et) ?></p>
								</div>
								<br><br>
								<?php
							}
						?>
					</div>
					<div id="success"></div>
					<form method="post" id="step2-form">
						<div id="hidden">
							<input type="hidden" name="name" value="<?php echo($_POST['name']) ?>">
							<input type="hidden" name="email" value="<?php echo($_POST['email']) ?>">
							<input type="hidden" name="message" value="<?php echo(isset($_POST['message']) ? $_POST['message'] : '') ?>">
						</div>
						<div id="inputs">
							<select name="type" id="type">
								<option value="NONE">Please Select</option>
								<option value="inquiry">Inquiry</option>
								<option value="feedback">Feedback</option>
								<option value="bug">Bug Report</option>
							</select>
						</div>
						<div id="controls">
							<button type="submit" value="step1" name="step" class="button" id="contact-send">Back</button>
							<button type="submit" value="step3" name="step" class="button" id="contact-send">Next</button>
						</div>
					</form>
				</div>
			</div> <!-- #step2 -->
		<?php
	}

	function draw3( $e, $et) {
		?>
		<div id="step3" class="step">
			<div id="start">
				<h2>Contact</h2>
				<p>Enter your message below and click send.</p>
			</div>
			<div>
				<div id="response">
					<?php
						if ( $e || $et ) {
							?>
							<div class="info-box error">
								<p><?php echo($et) ?></p>
							</div>
							<br><br>
							<?php
						}
					?>
				</div>
				<div id="success"></div>
				<form method="post" id="step3-form">
					<div id="hidden">
						<input type="hidden" name="name" value="<?php echo($_POST['name']) ?>">
						<input type="hidden" name="email" value="<?php echo($_POST['email']) ?>">
						<input type="hidden" name="type" value="<?php echo($_POST['type']) ?>">
					</div>
					<div id="inputs">
						<textarea name="message" id="message" cols="30" rows="10"><?php echo( isset($_POST["message"]) ? $_POST["message"] : "" ) ?></textarea>
					</div>
					<div id="controls">
						<button type="submit" value="step2" name="step" class="button" id="contact-send">Back</button>
						<button type="submit" value="send" name="step" class="button" id="contact-send">Send</button>
					</div>
				</form>
			</div> 
		</div> <!-- #step3 -->
	<?php
	}
	
	// This file will detect what stage the user is on if using POST, otherwise it will assume the user is using Javascript and animate the transitions.
	if (!$js) {
		drawmain();
	} else {
		draw1( false, false );
		draw2( false, false );
		draw3( false, false );
	}
?>