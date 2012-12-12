//vi:set ts=2 sw=2 sts=2

/*
	 EVERYTHING'S HAPPENING AT ONCE!
	 CALLBACKS, EVENT EMITTERS, CLOSURES! OMG. oO
*/

var  express  =  require('express')
,    expose   =  require('express-expose')
,    http     =  require('http')
,    path     =  require('path')
,    events   =  require('events')
,    fs       =  require('fs');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

/*
	 http://stackoverflow.com/a/5827895/220472
*/

var walk = function(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function(file) {
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, res) {
						results = results.concat(res);
						if (!--pending) done(null, results);
					});
				} else {
					results.push(file);
					if (!--pending) done(null, results);
				}
			});
		});
	});
};

var pickRandom = function (array) {
	return array[Math.floor(Math.random()*array.length)].replace(/\public/, '');
};

var walkCharacters = function () {
	walk('public/images/characters', function(err, results) {
		if (err) throw err;
		console.log(results);
		return results;
	});
};

walk('public/images/characters', function(err, results) { // 1
	if (err) throw err;
	var characters = results;
	walk('public/images/pictures', function(err, results) { // 2
		if (err) throw err;
		var pictures = results;
		app.get('/image', function(req, res){ // 1
			res.expose(characters, 'characters');
			res.expose(pictures, 'pictures');
			res.render('image', {
				character: pickRandom(characters),
				picture: pickRandom(pictures)
			});
		});
		app.get('/', function(req, res){
			res.render('index', { title: 'Express' });
		});
	});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
