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

You can adjust this if you like, although only edit rules specified after the comment

EG: /* You May Edit Now */

All CSS before the above comment in the css file is required and should not be adjusted unless you know what your doing.

You may *link* the CSS file to your document, or copy & paste the code into your current CSS file.

I *recommend* linking the CSS.

### Link the hexslide.css file to your document, or copy the CSS rules contained inside.


The Javascript
--------------

The Javascript is minified to reduce file size, and reduce modification attempts.

### Step 1
First off, link the *hexslide.min.js* file from the downloaded .zip into your document. Move or copy the javascript file into your site directory *first*

Then *link* the javascript document using

<script src="hexslide.min.js"></script>

Replace the *src* argument with the path to the javascript file.

### Step 2
Now that you have the Javascript file included in your document we must now initialize the plugin.

If you want to run the plugin using all default settings, then all you have to do is the following code:

$("img").hexSlide();

The above snippet of code will convert the image into a hexslide slideshow div. Although if you want custom settings to make your slideshow perform how you need it to, we need to understand the settings available.

def. = Default Setting ( Does not need to be set unless changed )

Available String Settings:
	* interval ( def. 3000 )
	* speed ( def. 500 )
	* pauseOnHover ( def. true )
	* autoPlay ( def. true )
	* navigation ( def. true )
	* alwaysShowNav ( def. false )
	* stopAutoOnNav ( def. false )
	* indicators ( def. true )

	### Interval ( int )
		The interval is the time ( in ms ) spent waiting between slides ( Only used when autoPlay is true )

	### Speed ( int )
		The speed is how fast ( in ms ) the slide fades in and out

	### pauseOnHover ( boolean )
		If true, the slide show will not auto play if the user moves mouse onto slideshow, and wont restart until the user moves mouse off of slideshow

	### autoPlay ( boolean )
		If true the slide show will use the interval to automatically play the slideshow

	### navigation ( boolean )
		If true Back and Next buttons will be created and can be used to navigate the slideshow

	### alwaysShowNav ( boolean )
		If true, the navigation and indicators will not hide them selves when the user is not hovering on the slideshow


Available Object Settings:
	* additionalCSS
