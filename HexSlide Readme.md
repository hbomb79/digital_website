HexSlide Documentation
======================


The HTML Basics
---------------

To setup your HTML markup, simply start by creating an image tag.

### Image Tag
<img src="youimg.extension" alt="What is this image?">

HTML 5 allows us to use custom attributes, aslong as they are prefixed with data-.  
We are going to use data-slideshow-src.

Inside of this attribute, we place our image URLs separated using "|" (No Quotes).

### Add the custom attribute
<img src="youimg.extension" alt="What is this image?" data-slideshow-src="img.jpg|img2.jpg|img3.jpg|img4.jpg">

Your required HTML code is done now. You may want to target the image to adjust its size and other properties.

The CSS
-------

The CSS required to make this work is contained in the file hexslide.css, move or copy the css file into your site directory *first*

Dont edit CSS rules unless you know what you're doing, rules before the appearance comment should *NOT* be edited at all.

*Only* edit appearence related css rules after this comment:

	/* ONLY EDIT APPEARENCE */

Only change rules like background, color, opacity. But not positioning or transitions etc...

After this comment:

	/* EDIT HERE AND BELOW */

edit the rules *however* you like. Be aware that editing the rules may result in unwanted changes.

All CSS before the above comment in the css file is required and should not be adjusted unless you know what your doing.

You may *link* the CSS file to your document, or copy & paste the code into your current CSS file.

I *recommend* linking the CSS.

### Link the hexslide.css file to your document, or copy the CSS rules contained inside.


The Javascript
--------------

The Javascript is minified to reduce file size, and reduce modification attempts.

### Step 1
First off, link the *hexslide.min.js* file from the downloaded .zip into your document. Move or copy the javascript file into your site directory *first*

Then *link* the Javascript document using

<script src="hexslide.min.js"></script>

Replace the *src* argument with the path to the javascript file.

### Step 2
Now that you have the Javascript file included in your document we must now initialize the plugin.

If you want to run the plugin using all default settings, then all you have to do is the following code:

$("img").hexSlide();

The above snippet of code will convert the image into a hexslide slide-show div, similar to this:

<div class="hexslide" id="hexslide-0-container">
	<div class="slide-btn left" data-slide-direction="backward">
		<span>BACK</span>
	</div>
	<div class="slide-btn right" data-slide-direction="forward">
		<span>NEXT</span>
	</div>
	<div class="indicator-container">
		<span class="indicator" data-hexslide-id="0"></span>
		<span class="indicator" data-hexslide-id="1"></span>
		<span class="indicator" data-hexslide-id="2"></span>
		<span class="indicator" data-hexslide-id="3"></span>
		<span class="indicator" data-hexslide-id="4"></span>
	</div>
	<div class="hexslide-slide-container">
		<div class="slide" data-hexslide-id="0"></div>
		<div class="slide" data-hexslide-id="1"></div>
		<div class="slide" data-hexslide-id="2"></div>
		<div class="slide" data-hexslide-id="3"></div>
		<div class="slide" data-hexslide-id="4"></div>
	</div>
</div>

Although if you want custom settings to make your slide-show perform how you need it to, we need to understand the settings available.

def. = Default Setting ( Does not need to be set unless changed )

Available String Settings
-------------------------
* interval ( def. 3000 )
* speed ( def. 500 )
* pauseOnHover ( def. true )
* autoPlay ( def. true )
* navigation ( def. true )
* alwaysShowNav ( def. false )
* stopAutoOnNav ( def. false )
* indicators ( def. true )
* animation ( def. fade )
* width ( def. false )
* height ( def. false )
* maxwidth ( def.false )
* maxheight ( def.false )

### Interval ( int )
	The interval is the time ( in ms ) spent waiting between slides ( Only used when autoPlay is true )

### Speed ( int )
	The speed is how fast ( in ms ) the slide fades in and out

### pauseOnHover ( boolean )
	If true, the slide show will not auto play if the user moves mouse onto slide-show, and wont restart until the user moves mouse off of slide-show

### autoPlay ( boolean )
	If true the slide show will use the interval to automatically play the slide-show

### navigation ( boolean )
	If true Back and Next buttons will be created and can be used to navigate the slide-show

### alwaysShowNav ( boolean )
	If true, the navigation and indicators will not hide them selves when the user is not hovering on the slide-show

### stopAutoOnNav ( boolean )
	If true autoPlay will be disabled when the user navigates ( using forward/back or indicator )

### indicators ( boolean )
	If true, circles will be created underneath the slide show, one per slide. A user can use these to navigate the slides.

### animation ( string )
	If this string is set to "slide" the fade transitions for the slides will be replaced with sliding ones. If you want to go back to fade mode, simply unset this option when initializing the plugin or set it to "fade"

### width ( string / int / percentage / CSS value )
	If this setting is left unchanged ( false ), set to false or an unknown value the width of the original image tag will be applied to the new container. This will not be dynamic so you should set this value to a percentage, vw or vh value.

### height ( string / int / percentage / CSS value )
	If this setting is false or unknown then the height of the original image tag will be applied to the container. Just like the width it wont be dynamic so you should set it to a dynamic value.

### maxwidth ( string / int / percentage / CSS value )
	If this setting is left unchanged, set to default or if an unknown value is set the maxwidth will not be set.

### maxheight ( string / int / percentage / CSS value )
	If this is left at default or an unknown value is entered, the maxheight wont be set.


### NOTE ###
	If you want to set max width, or heights you can target .hexslide in your CSS. Same goes for width and height, although !important will be needed to override the default.



Available Object Settings
-------------------------
* additionalCSS ( def. false )
* additionalClass ( def.false )
* callback ( def. Object [object] )

### additionalCSS ( object )
	The additionalCSS object can contain 1-2 other objects, indexed using *container* or *slide*
	EG: additionalCSS: { container: { "cssrule": "cssvalue" }, slide: { "cssrule": "cssvalue" } }

	Any CSS in the slide index will be applied to each individual slide. Any rules in the container index will be applied to the parent div.hexslide

### additionalClass ( object )
	This object can contain 1-2 string values, indexed using either *container* or *slide*
	EG: additionalClass: { container: "my-container-class", slide: "my-slide-class and-another-slide-class" }
	
	Mutliple classes must be separated using a *space* not a comma, semi-colon or other character

### callback ( object )
	This object currently only contains one index, named *start*. The key must be a function, this function will be called *after* and *every* time the plugin is used.
	EG: callback:{ start: function(){ alert("done!"); } }

Example Call
------------


$("img").hexSlide({
	speed: 1000,	
	interval: 5000,
	additionalCSS:{
		container:{
			"display":"inline-block",
			"background": "black"
		}
	},
	additionalClass: {
		container: "center-image"
	},
	callback: {
		start: function(){
			console.log("Done!")
			$(window).trigger("resize");
		}
	}
})


The above code will turn any img tags with data-slideshow-src into a hexslide slide-show.

The image will change over 1 second every 5 seconds. The container has a background color of black and a display of inline-block. The container also has a class of center-image

When the plugin has finished, "Done!" will be output to the console and any Javascript listening for a window resize, will fire in case the size of the img (slideshow) has changed.

### Step 3

Nothing, you're done.

Feel free to contact me here:
	
http://harryfelton.web44.net/digital_website/help.php#!contact
	* Only works with javascript.

Email: harryfelton12@gmail.com

### NOTES

Global Settings
---------------

If you want to change the plugin settings permanently ( so you don't have to set the setting each time you call the plugin ) you can change them using the following directive:

	$.fn.hexSlide.defaults;

You will have to reset the entire table, so here are the defaults:

	interval: 3000,
	speed: 500,
	pauseOnHover: true,
	autoPlay: true,
	navigation: true,
	alwaysShowNav: false,
	stopAutoOnNav: false,
	indicators: true,
	animation: "fade",
	width: false,
	height: false,
	maxheight: false,
	maxwidth: false,
	minwidth: false,
	minheight: false,
	additionalClass: {
		slide: false,
		container: false
	},
	additionalCSS: {
		slide: false,
		container: false
	},
	callback: {	start: function(){} }

You can simply copy these, change what you need to, and set the directive to them, OR you can simply target them like so:

	$.fn.hexSlide.defaults.interval = 4000

Now unless specified when running the plugin, the interval will be 4 seconds, instead of three.

If any of these defaults are missing the program may crash or not function correctly, because of this the second method of default adjustment is *recommended*

Changing the global defaults is dangerous and can result in undesired changes.


Dynamic Sizes
-------------

When setting the width and height properties, it can be hard to pick ones that offer a good size. I personally use view window measuements.

Width: 60vw
Height: 41vw

These two values seem to work well and offer a reasonably good ratio.

If you need to limit the minimum width of the slideshow, I then use set px (pixel) values, such as 500px and 710px
