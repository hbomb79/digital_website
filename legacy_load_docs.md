Legacy Load (Name not decided)
==============

This plugin will make page transitions look a lot more inviting.

Simply give an element a data-enhance type to adjust how the element will arrive/depart

When the config.trigger element/s are clicked the plugin starts, it grabs the href from the A tag and starts loading the new document via AJAX.

Once the page is loaded, ALL elements with a class of config.class in the document will be hidden, if a method is defined using the custom element it will be used, you can define a method using a function or a preset by using preset:name.

If a method is not defined, then the elements will simply fade out.

When the elements are gone, the config.loadInto element will be duplicated, and its content replaced. This will then be animated in as a whole if using whole page transitions, OR each element that matches the target will be animated in separately much like the departure of the previous page.

### Animation basics
This plugin uses presets to define how it is going to animate the target on/off the screen. These presets are functions that use the config of the current instance to animate the target in an appropriate way.

Any preset must return a jQuery deferred and does so when the animation is complete. When all animations are complete, the new page will begin loading.

### Whole page transitions
If you would like to use this plugin to animate the entire page (parent element) then specify loadType as "wholepage" in the config when calling the plugin.

The "page", which is the area all AJAX results will be output and retrieved from must be specified by using loadInto. This way, rather than looking for elements that match the target, we will look for one, which is the one that will be animated, replaced and loaded into.

loadInto must be defined even if you are *not* using whole page transitions. loadInto is where the new content will be loaded and should probably be the same as the calling function.

### Custom Animations
If you want to specify a custom animation to occur when the element arrives/departs, you should directly edit the defaults and create a new preset that you can then use on elements, like so:

	"preset:fade": function( config, direction ) {
			var d = $.Deferred()
				if ( config.cssBased ) {
					// The following block of code is for users that have cssBased transitions enabled. These transitions can result in
					// smoothers animations on laggy machines and offer less Javascript intense animations for developers that would rather
					// use CSS where possible.
					$(this).css({"transition":"opacity "+config.speed+"ms ease-in-out"})
					if ( $(this).is(":visible") && direction != "to" ) {
						$(this).css("opacity",0).delay(config.speed).promise().done(function(){
							$(this).hide()
							d.resolve();
						});
					} else if( !$(this).is(":visible") && direction != "from" ) {
						$(this).show();
						var elem = this;
						setTimeout(function(){
							$(elem).css({"opacity":1}).delay(config.speed).promise().done(function(){
								d.resolve();
							})
						})
						// Timeout is used above because jQuery has a weird issue where if .show is called, there has to be a short delay before 						   changing the opacity otherwise the CSS transition does nothing and the element is immediately visible	
					}
				} else {
					if ( $(this).is(":visible") ) {
						$(this).stop().animate({"opacity":0}, config.speed, function(){
							$(this).hide()
							d.resolve();
						})
					} else {
						$(this).show().stop().animate({"opacity":1}, config.speed, function(){
							d.resolve();
						})
					}
				}
			return d;
		}

The above function is the fade preset, this simply fades the element in, or out depending on its current visibility and direction.

The function is passed "this" as the element that is being animated, and also a config object which contains your preferences for the instance. Direction will either equal "to", "from" or "both", you can probably figure out what those mean.

When the function is called, the element is passed as "this", you can therefore use a jQuery constructor with this to target the element.

You can then use the jQuery constructor "this" to animate using .animate OR .css

The speed you pass should match the speed you initialized the plugin with, you can do this by using config.speed, the new page will not be animated until all elements have been animated unless you have async enabled, which results in lag and buggy animations. If your custom preset takes longer than the other animations, then the page transition will be delayed and may not look as good as you want it to.

If the speed will be changed, you could alternatively pass in this as your speed:

	$.fn.legacyLoad.config[id].speed = 500;

The ID is stored in a data-legacy-sid on the element you called the plugin on. You can simply use jQuery to get the sid, and then change the settings:

	$.fn.legacyLoad.config[ $(theelementIcalled).data("data-legacy-sid") ].speed = 500;


### CSS Based Animations
If you would rather use CSS animations, then support for that is available.

Our Javascript engine will automatically apply the transition time via CSS and then add any CSS inline rather than using jQuery to actually animate it.