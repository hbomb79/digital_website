<!DOCTYPE html>
<!-- help.php Landing Page HARRY FELTON 
	https://wireframe.cc/kuJIVT

	On the page various PhP imports are used, these add the functionality to the website by revealing imports or important literals.
	PhP is used so that these important files only have to be edited once and all files with them included will see the changes, as 
	opposed to changing the information on each page.
-->
<?php
	session_start("mailer");
?>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<!-- These meta tags provide information used by search crawlers -->
	<meta name="description" content="Help content, including trouble shooting and contact form for the website">
	<meta name="keywords" content="Help, contact, troubleshooting">
	<meta name="author" content="Harry Felton">
	<!-- Add title so the user knows what the tab is about if multi tasking -->
	<title>Help | Contact</title>
	<!-- Get stylesheet to add style to the page -->
	<link rel="stylesheet" href="assets/css/main.css">
	<?php
	// Import all important files ( jQuery etc... )
	require_once"assets/_module/imports.php";
	?>
	<!-- This meta tag ensures the sites ratio stays the same on mobile devices as opposed to getting very small -->
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<script>
		// When the window is loaded run the anonymous callback
		$(window).load(function(){
			setTimeout(function(){
				// After 500ms check if #!contact is in the URL
				hash.check( "#!contact" , function(){ //#! = Hashbang to signify use of AJAX/Javascript related events as opposed to an id on the page.
					// If the contact script (help.js) is valid then open the contact form.
					if ( contact_enable ) { contact.trigger_click() }
				});
			}, 500)
		})
	</script>
</head>
<body>
	<?php
		// Import header, this includes a nav bar, settings window, loading screen. 
		require_once"assets/server/header_addin.php";
	?>
	<div id="bg-wrapper">
	 	<div class="page-bg" id="help-page-bg">
	</div> <!--Faded out and replaced using ajax--> </div>
	<div class="page-container current" id="help">
		<!--<script src="assets/javascript/help.js"></script>-->
		<script>
		// Set contact_enable to true or false depending on its current value
		var contact_enable = contact_enable ? true : false;
		if ( !_G.preserve.done_set ) {
			// If the done_set preserve was not set, set it now and create an event listener for aj_done
			_G.preserve.done_set = true;
			$(window).on( "aj_done", function(){ // Fired when ajax has completed
				hash.check( "#!contact" , function(){
					if ( contact_enable ) { contact.trigger_click() } // Contact form has been init
				});
			} )
		}
		// *deprecated* If contact is set, leave it be, otherwise set to false
		// var contact = contact ? contact : false;
		$.getScript("assets/javascript/help.js", function(){
			// Use javascript to load the script asynchronously and then call the function callback containing an object creation of CF.
			// This object is then initialized.
			contact = Object.create( CF )
			contact.init({
				// Below is the settings for the contact form, these are not commented because they are basic string settings.
				// These settings are used by the contact form.
				button: ".contact-send",
				form_class: ".step-form",
				trigger: ".contact-trigger",
				callback: {
					start: function(){
						contact_enable = true; // Set the variable used earlier to true now because the contact form has been initialized
					},
					anim_start: function(){},
					anim_done: function(){},
					submit: function(){},
					reponse: function(){}
				},
				animation: {
					offset: 64
				},
				steps: [ // Below is a definition of all the steps, each step needs a name, cid ( css id ), id and an inputs array. Also optional post.
					{
						name: "step1",
						cid: "#step1",
						post: "true", // If false the field will not be sent during submission.
						inputs: [
							// Each input must also be an object that contains a name, id and type. a presets object is optional.
							{
								name:"name",
								id:"#name",
								type:"normal"
							},
							{
								name:"email",
								id:"#email",
								type:"email",
								// presets is optional as there are defaults.
								presets: {
									401: "Enter a valid email"
								}
							}
						],
						id:0
					},
					{
						name: "step2",
						cid: "#step2",
						post: "true",
						inputs: [
							{
								name:"type",
								id:"#type",
								type:"select",
								select_param: {
									unselect: "NONE",
								},
								presets: {
									404: "Please pick one"
								}
							},
							{
								name: "type_other",
								id: "#type_other",
								type: "normal",
								shown: false,
								presets: {
									404: "Define custom type"
								},
								parent: {
									id: "#type",
									name: "type",
									showWhen: "OTHER"
								}
							}
						],
						id:1
					},
					{
						name: "step3",
						cid: "#step3",
						post: "true",
						inputs: [
							{
								name:"message",
								id:"#message",
								type:"normal",
								presets: { 404: "Go on then, type a message" }
							}
						],
						id:2
					}
				],
				current_slide: {
					cid: "#step1",
					name: "step1",
					id:0
				}
			}, contact_enable)
		});
		</script>
		<div id="wrapper">
			<div id="container" class="clearfix">
				<main>
					<?php
						require_once("assets/_module/start.php");
					?>
					<h1 id="title" class="large">Help</h1>
					<div id="help-inner">
						<!-- FAQ Sections -->
						<section>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos distinctio doloribus id doloremque cumque numquam assumenda error ducimus amet, perspiciatis vel nam, iure optio alias soluta sapiente maxime. Distinctio dicta dolore necessitatibus sunt, natus, velit laudantium incidunt, quos praesentium officia quod saepe accusamus excepturi nulla maxime mollitia qui doloremque. Placeat doloremque repellat molestiae atque, officiis ea voluptatum esse. Est blanditiis vel aperiam odit doloribus tenetur magni cum veniam. Ex laborum facilis eveniet a officiis voluptates, iusto perspiciatis provident ab itaque error quis repellat inventore eius non illo assumenda amet accusantium recusandae ipsum mollitia dolorem numquam rerum. Architecto doloribus aut, officia fugit quae voluptatum quas blanditiis commodi, minus laudantium maiores alias, animi nulla facere soluta nostrum maxime delectus cupiditate nihil earum non temporibus veniam. Omnis dolores, quae quisquam facere! Cum minima, laudantium consectetur sint ratione in perferendis quis, quasi suscipit, eligendi fugiat commodi reprehenderit neque molestiae delectus est id praesentium impedit.</p>
						</section>
						<div class="help-container clearfix">
							<div id="left">
								<div id="inner">
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
							<div id="right">
								<div id="inner">
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
						</div>
						<div class="rel-contain" id="ct" style="display:none;">
							<button class="button contact-trigger tipped tipped-mid tipped-vauto" aria-label="Contact Us" style="margin:0 auto; font-size:1.3em;">Contact Us</button>
						</div>
						<noscript>
							<div class="rel-contain" style="text-align:center;">
								<a href="contact.php?back=help.php" class="button" style="text-align:center; margin:0 auto; font-size:1.3em; display:inline-block;">Contact Us</a>
							</div>
						</noscript>
						<script>
							$("#ct").show()
						</script>
						<!-- Contact Form -->
						<div id="contact-container" style="display:none; ">
							<div id="contact-inner">
								<?php
									$js = true;
									require_once("assets/server/contact_form.php");
								?>
							</div>
						</div>
					</div>
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