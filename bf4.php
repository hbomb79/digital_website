<!DOCTYPE html>
<!--
	Landing Page HARRY FELTON 
	https://wireframe.cc/kuJIVT
-->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Battlefield 4</title>
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
	 	<div class="page-bg" id="bf4-page-bg">
	</div> <!--Faded out and replaced using ajax--> </div>
	<div class="page-container current two" id="bf4" data-fix-header="fix"> <!-- Slide off screen, slide new page on screen using ajax -->
		<div id="wrapper">
			<div id="container-right">
				<ul id="contents">
					<h1>Contents</h1>
					<li><a class="anim" href="#">Test</a></li>
					<li><a class="anim" href="#">Tester</a></li>
					<li><a class="anim" href="#">Testing</a></li>
					<li><a class="anim" href="#">Testaro</a></li>
					<li><a class="anim" href="#">Shut Up</a></li>
				</ul>
			</div>
			<div id="container">
				<main>
					<?php
						require_once("assets/_module/start.php");
					?>
					<div class="header">
						<h1 class="large" id="title">Battlefield 4</h1>
					</div>
					<div class="image-wrapper wide header-after">
						<img src="assets/image/bf41.jpg" class="center-image" alt="Picture of GTA">
					</div>
					<section>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis incidunt veniam sequi quas, recusandae rem iure quibusdam non temporibus dolorem, atque earum, nulla at. Nemo voluptatem neque aliquid itaque quae eveniet soluta non recusandae sapiente, ratione praesentium laboriosam dolore minima fugiat, ea, sint. Suscipit maiores corporis, exercitationem, dignissimos, ratione error ipsam numquam molestias expedita magnam voluptatibus commodi libero distinctio deserunt labore consequuntur maxime. Officia quasi quo magnam, nulla, facere iusto asperiores earum, atque dolores in vitae. Labore esse, voluptatibus atque dicta unde sed est quae earum facilis, cum at tempore, quaerat ex consectetur maxime totam, quidem perferendis. Sequi, a, consequuntur!</p>
						<h1>Header</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi fugiat magnam saepe pariatur voluptatem id optio, officia porro laborum deleniti, eveniet quidem vitae. Reprehenderit beatae non nemo veritatis dignissimos, pariatur velit, blanditiis doloremque quis laudantium aperiam temporibus nobis reiciendis commodi illo quasi optio explicabo, ducimus rerum voluptas. Temporibus nisi perferendis voluptatibus nostrum unde! Vitae consectetur iste aliquid quis nam veniam totam, pariatur porro! Tempora, dolore unde possimus repellat laudantium maxime atque officiis nam veniam aperiam! In voluptates, ad beatae cumque repellendus et aut fugiat facere perspiciatis sed, quis consequuntur, recusandae, fuga possimus impedit ipsum labore. Earum adipisci error repudiandae labore.</p>
					</section>
					<section>
						<h1>Header</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi possimus similique rerum officia excepturi, voluptates, dolorum odio ullam illum nulla culpa quibusdam architecto, ea saepe? Porro, perspiciatis nobis eaque accusantium deserunt qui facilis rem, velit voluptatibus nihil ratione sunt voluptatem ea quia. Quas ad nobis quo saepe voluptates aspernatur enim tempore commodi officiis natus nihil dolorum et incidunt at in est, esse doloremque amet aliquid facilis, autem. Eligendi odit maiores optio sint cum sequi esse hic beatae quas dicta similique iste excepturi assumenda aliquam natus saepe illum, exercitationem eos corporis vitae inventore corrupti eaque. Tempora ipsum debitis deleniti, ullam autem beatae deserunt vel. Autem eos hic sint molestias omnis eius quidem illo ullam pariatur, libero earum, laudantium praesentium reiciendis iste veniam modi in ipsum quae unde impedit excepturi, at. Dicta veritatis velit atque incidunt dignissimos excepturi labore neque delectus facere ullam iste, numquam et dolores nostrum placeat voluptate quo voluptates.</p>
					</section>
					<section>
						<h1>Header</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod temporibus vel quia nobis harum sunt explicabo voluptatem recusandae. Sed quae alias enim aspernatur quis omnis animi doloremque non quisquam, ullam dolores obcaecati molestiae dolorum dignissimos, consequatur tempore iste nemo quasi eum reiciendis iusto hic at. Libero nihil ipsum iure aut!</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, voluptatibus. Quidem pariatur repellendus enim, voluptates minus dolorem aspernatur. Molestiae dignissimos maiores obcaecati, necessitatibus. Rerum minus fuga saepe commodi deserunt illum non nemo iste delectus accusantium dicta accusamus numquam, enim nulla at architecto animi expedita sapiente repellendus quasi facilis. Eligendi, magnam?</p>
					</section>
					<section style="box-shadow: none;">
						<h1>Header</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos nobis dolorem obcaecati ab dignissimos unde fugiat dolore aliquam quibusdam quae nesciunt nam, accusantium doloribus sit. Ipsam alias rem ipsum fugiat, quaerat, vero aliquid saepe, voluptates libero veniam ipsa aut ducimus! Eligendi magnam accusamus est, laborum laboriosam sed quas, soluta sequi!</p>
					</section>
					<div class="info-box warn">
						<div id="close" onclick="$(this).parent('.info-box').hide()">&times;</div>
						<p>This article is a placeholder and currently contains no information</p>
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