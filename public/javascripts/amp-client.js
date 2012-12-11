/* TODO
 * function -> toggle class
 * function -> delay
 * function -> display picture trail (for i in a; do flick(i, time))
 */

/*
 * Handle Keyboard Input (requires jQuery)
 *
 */

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
			case 114: // lowercase q
				//console.log("Ugh, dislike. :/ Keycode: " + e.which);
				setTimeout(function()  {  $('#flick  #dot    img').toggleClass("hide");  },  500);
				setTimeout(function()  {  $('#flick  #dot    img').toggleClass("hide");  },  500);
				setTimeout(function()  {  $('#flick  #pic    img').toggleClass("hide");  },  300);
				setTimeout(function()  {  $('#flick  #pic    img').toggleClass("hide");  },  400);
				setTimeout(function()  {  $('#flick  #china  img').toggleClass("hide");  },  500);
				setTimeout(function()  {  $('#flick  #china  img').toggleClass("hide");  },  400);
				setTimeout(function()  {  $('#flick  #noise  img').toggleClass("hide");  },  0);
				break;
		}
	});
});

