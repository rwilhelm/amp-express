/*
 * amp-server.js
 *
 * © 2012 René Wilhelm <rene.wilhelm@gmail.com>
 * https://www.github.com/rwilhelm/amp-express
 *
 * vi: set ts=2 sw=2 sts=2
 */

// Primary Dependencies
var  express  =  require('express')
,    app      =  express()
,    server   =  require('http').createServer(app)
,    io       =  require('socket.io').listen(server);

// Secondary Dependencies
var  fs    =  require('fs')
,    path  =  require('path');

//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(app.router); // We don't need no router!
app.use(express.static(__dirname + '/public'));

/*
 * Traverse a directory and return an array of files.
 * http://stackoverflow.com/a/5827895/220472
 */

var walk = function(dir, done) {
	var res = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, res);
		list.forEach(function(file) {
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, res) {
						res = res.concat(res);
						if (!--pending) done(null, res);
					});
				} else {
					res.push(file);
					if (!--pending) done(null, res);
				}
			});
		});
	});
};

walk('public/images/characters', function(err, res) { // 1
	if (err) throw err;
	var characters = res;
	walk('public/images/pictures', function(err, res) { // 2
		if (err) throw err;
		var pictures = res;
		io.sockets.on('connection', function (socket) {
			socket.emit('arrays', {
				characters: characters,
				pictures: pictures
			});
		});
		app.get('/image', function(req, res){ // 3
			res.render('image', { /* bla */ });
		});
		app.get('/', function(req, res){
			res.render('index', { /* blub */ });
		});
	});
});

server.listen(3000);
