# digital_website
Harry, Clayton and Brynns School Website

Gaming site, includes Grand Theft Auto V, Assassin's Creed, TF2 and more!!


Page Layout
=====

Requirements:
 - Title
 - Fixed navigation
 - footer
 - background image (blur)

All game specific content must be contained in <div class="page" id="YOUR_PAGE_NAME">

For example:

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Test Document</title>
</head>
<body>
	<div class="page-bg" id="your-page-background"> <!--Assign CSS Background Image center center cover--> </div>
	<!--The background image must be contained on the outside of this div because it is being animated using other methods-->
	<header>
		<nav>
			<ul>
				<li><a href="#">Item</a></li>
			</ul>
		</nav>
	</header>
	<div class="page" id="home-page">
		<h1>My page</h1>
		<p>This is my page</p>
	</div>
</body>
</html>