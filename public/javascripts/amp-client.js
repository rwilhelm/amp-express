/*
 * amp-client.js
 *
 * © 2012 René Wilhelm <rene.wilhelm@gmail.com>
 * https://www.github.com/rwilhelm/amp-express
 *
 * vi: set ts=2 sw=2 sts=2
 */

var  characters         =  []
,    pictures           =  []
,    flickTrailRunning  =  false;

var socket = io.connect('http://localhost');
socket.on('arrays', function (data) {
	characters = data.characters;
	pictures = data.pictures;
});

var pickRandom = function(array) {
	return array[Math.floor(Math.random()*array.length)].replace(/\public/, '');
};

/*
 * noise -> dot -> picture -> character -> noise
 */

var flickTrail = function() { // setTimeout(callback, delay, [arg], [...])
	flickTrailRunning = true;
	$('#flick img#noise').addClass("hide"); // noise off
	$('#flick img#dot').removeClass("hide"); // dot on
	setTimeout(function() {
		$('#flick img#dot').addClass("hide"); // dot off
		$('img#picture').attr('src', pickRandom(pictures)); // random picture
		$('#flick img#picture').removeClass("hide"); // picture on
		setTimeout(function() {
			$('#flick img#picture ').addClass("hide"); // picture off
			$('img#character').attr('src', pickRandom(characters)); // random character
			$('#flick img#character ').removeClass("hide"); // character on
			setTimeout(function() {
				$('#flick img#character ').addClass("hide"); // character off
				$('#flick img#noise ').removeClass("hide"); // noise on
				flickTrailRunning = false;
			},300); // character
		},300); // picture
	},300); // dot
};

$(window).keypress(function(e) {
	switch(e.which) {
		case 112: // lowercase p
			if (flickTrailRunning) break;
			flickTrail();
			break;
		case 113: // lowercase q
			if (flickTrailRunning) break;
			flickTrail();
			break;
		case 114: // lowercase r
			if (flickTrailRunning) break;
			flickTrail();
			break;
		case 104: // lowercase h
			$('#left.button').toggleClass("hide");
			$('#right.button').toggleClass("hide");
			break;
	}
});
