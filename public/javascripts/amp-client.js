/* TODO
 * function -> toggle class
 * function -> delay
 * function -> display picture trail (for i in a; do flick(i, time))
 */

/*
 * Handle Keyboard Input (requires jQuery)
 *
 */

var  DOT    =  "/images/dot.jpg"
var  NOISE  =  "/images/noise.jpg"

/* do something with a delay after */
var delayAfter = function(f, s) {
	return setTimeout(function() { f; }, s);
}

/* toggle hide-class on an image for a certain duration */
var showImage = function(id, duration) {
	return delayAfter($(id).toggleClass("hide"), delay);
};

var flick = function (div, timeout, callback) {
	setTimeout(function() { $('#flick ' + div + ' img').toggleClass("hide"); }, timeout+500);
	setTimeout(function() { $('#flick ' + div + ' img').toggleClass("hide"); }, timeout);
	return;
};

// Usage: randomFile(letters);
//     or randomFile(pictures);

var pickRandom = function (array) {
	return array[Math.floor(Math.random()*array.length)];
};

var flickTrail = function () {
	//$('#picture img').attr('src', pickRandom(pictures));
	//$('#character img').attr('src', pickRandom(characters));
	console.log("TYPE: " + window.pictures.constructor == Hash); // FIXME why is this no array?
	console.log(window.pictures[0]);
	console.log(window.pictures.length);
	console.log("KEYS: " + window.pictures.class);
	console.log(Math.floor(Math.random()*(window.pictures.keys(hash_table).length)));
	console.log(pickRandom(characters));

	flick("#dot", 500);
	flick("#picture", 1000);
	flick("#character", 1500);
	flick("#noise", 2000);
	return;
};

$(function() {
	$(window).keypress(function(e) {
		switch(e.which) {
			case 112: // lowercase p
				//console.log("Yay, like! :) Keycode: " + e.which);
				$('#right.button').toggleClass("active");
				setTimeout(function() { $('#right.button').toggleClass("active"); }, 300);
				break;
			case 113: // lowercase q
				//console.log("Ugh, dislike. :/ Keycode: " + e.which);
				$('#left.button').toggleClass("active");
				setTimeout(function() { $('#left.button').toggleClass("active"); }, 300);
				break;
			case 114: // lowercase r
				flickTrail();
				break;
		}
	});
});

